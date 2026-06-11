import { Hono } from 'hono'
import { verifyJWT } from '../utils/crypto'
import type { Env } from '../index'

const admin = new Hono<{ Bindings: Env }>()

// Simple admin auth check
admin.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)
  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)

  // Check if user is admin (phone-based check for now)
  const user = await c.env.DB.prepare('SELECT phone FROM users WHERE id = ?').bind(payload.userId).first()
  if (!user?.phone?.includes('admin')) return c.json({ error: 'Admin access required' }, 403)

  c.set('userId', payload.userId)
  await next()
})

// Dashboard stats
admin.get('/stats', async (c) => {
  const totalOrders = await c.env.DB.prepare('SELECT COUNT(*) as count FROM orders').first()
  const totalUsers = await c.env.DB.prepare('SELECT COUNT(*) as count FROM users').first()
  const totalProducts = await c.env.DB.prepare('SELECT COUNT(*) as count FROM products WHERE status = "active"').first()
  const revenueToday = await c.env.DB.prepare(
    `SELECT COALESCE(SUM(total), 0) as revenue FROM orders WHERE payment_status = "paid" AND date(created_at) = date("now")`
  ).first()

  return c.json({
    totalOrders: totalOrders?.count || 0,
    totalUsers: totalUsers?.count || 0,
    totalProducts: totalProducts?.count || 0,
    revenueToday: revenueToday?.revenue || 0,
  })
})

// List orders
admin.get('/orders', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT o.*, u.phone as user_phone, COUNT(oi.id) as item_count
     FROM orders o
     JOIN users u ON u.id = o.user_id
     LEFT JOIN order_items oi ON oi.order_id = o.id
     GROUP BY o.id
     ORDER BY o.created_at DESC
     LIMIT 100`
  ).all()

  return c.json({ orders: results || [] })
})

// List products
admin.get('/products', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT p.*, c.name as category_name,
      (SELECT COUNT(*) FROM research_references WHERE product_id = p.id) as ref_count
     FROM products p
     LEFT JOIN categories c ON c.id = p.category_id
     ORDER BY p.created_at DESC`
  ).all()

  return c.json({ products: results || [] })
})

// List customers
admin.get('/customers', async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT u.*, COUNT(o.id) as order_count,
      CASE WHEN cg.fully_compliant = 1 THEN 1 ELSE 0 END as is_compliant
     FROM users u
     LEFT JOIN orders o ON o.user_id = u.id
     LEFT JOIN compliance_gates cg ON cg.user_id = u.id
     GROUP BY u.id
     ORDER BY u.created_at DESC`
  ).all()

  return c.json({ customers: results || [] })
})

// Update product
admin.put('/products/:id', async (c) => {
  const id = c.req.param('id')
  const updates = await c.req.json()

  const fields: string[] = []
  const values: (string | number)[] = []

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`)
    values.push(value as string | number)
  }

  if (fields.length === 0) return c.json({ error: 'No fields to update' }, 400)

  await c.env.DB.prepare(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`).bind(...values, id).run()

  return c.json({ success: true })
})

export { admin as adminRoutes }
