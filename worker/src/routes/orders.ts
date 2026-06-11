import { Hono } from 'hono'
import { verifyJWT } from '../utils/crypto'
import type { Env } from '../index'

const orders = new Hono<{ Bindings: Env }>()

orders.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)
  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)
  c.set('userId', payload.userId)
  await next()
})

// Create order
orders.post('/', async (c) => {
  const userId = c.get('userId')
  const { items, shippingAddressId, paymentMethod, customerNote } = await c.req.json()

  // Get user for market/currency
  const user = await c.env.DB.prepare('SELECT market FROM users WHERE id = ?').bind(userId).first()
  const market = user?.market || 'ZA'
  const currency = market === 'DE' ? 'EUR' : 'ZAR'

  // Calculate totals
  let subtotal = 0
  for (const item of items) {
    const variant = await c.env.DB.prepare(
      `SELECT CASE WHEN ? = 'DE' THEN price_de ELSE price_za END as price FROM product_variants WHERE id = ?`
    ).bind(market, item.variantId || item.productId).first()
    subtotal += (variant?.price || 0) * item.quantity
  }

  const shippingCost = subtotal > (market === 'DE' ? 300 : 5000) ? 0 : (market === 'DE' ? 15 : 150)
  const total = subtotal + shippingCost

  // Generate order number
  const date = new Date()
  const orderNumber = `RT-${date.getFullYear().toString().slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`

  const orderId = crypto.randomUUID()
  await c.env.DB.prepare(
    `INSERT INTO orders (id, order_number, user_id, status, payment_status, subtotal, shipping_cost, total, currency, payment_method, customer_note)
     VALUES (?, ?, ?, 'pending', 'pending', ?, ?, ?, ?, ?, ?)`
  ).bind(orderId, orderNumber, userId, subtotal, shippingCost, total, currency, paymentMethod, customerNote || '').run()

  // Create order items
  for (const item of items) {
    const product = await c.env.DB.prepare('SELECT name, sku FROM products WHERE id = ?').bind(item.productId).first()
    const variant = item.variantId ? await c.env.DB.prepare('SELECT name FROM product_variants WHERE id = ?').bind(item.variantId).first() : null
    const price = await c.env.DB.prepare(
      `SELECT CASE WHEN ? = 'DE' THEN price_de ELSE price_za END as price FROM product_variants WHERE id = ?`
    ).bind(market, item.variantId || item.productId).first()

    await c.env.DB.prepare(
      `INSERT INTO order_items (id, order_id, product_id, variant_id, quantity, unit_price, total_price, product_name, product_sku, variant_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(), orderId, item.productId, item.variantId || null, item.quantity,
      price?.price || 0, (price?.price || 0) * item.quantity, product?.name || '', product?.sku || '', variant?.name || null
    ).run()
  }

  // Log activity
  await c.env.DB.prepare(
    'INSERT INTO order_activity_logs (id, order_id, action, details, actor) VALUES (?, ?, ?, ?, ?)'
  ).bind(crypto.randomUUID(), orderId, 'order_placed', JSON.stringify({ items: items.length }), userId).run()

  return c.json({ success: true, orderId, orderNumber, total, currency })
})

// List user orders
orders.get('/', async (c) => {
  const userId = c.get('userId')
  const { results } = await c.env.DB.prepare(
    `SELECT o.*, COUNT(oi.id) as item_count
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     WHERE o.user_id = ?
     GROUP BY o.id
     ORDER BY o.created_at DESC`
  ).bind(userId).all()

  return c.json({ orders: results || [] })
})

export { orders as orderRoutes }
