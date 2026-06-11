import { Hono } from 'hono'
import { verifyJWT } from '../utils/crypto'
import type { Env } from '../index'

const checkout = new Hono<{ Bindings: Env }>()

checkout.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)
  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)
  c.set('userId', payload.userId)
  await next()
})

// Initiate checkout — returns payment URL (Euro-only)
checkout.post('/', async (c) => {
  const userId = c.get('userId')
  const { address, paymentMethod } = await c.req.json()

  const user = await c.env.DB.prepare('SELECT phone FROM users WHERE id = ?').bind(userId).first()
  const currency = 'EUR'

  // Get cart items with Euro pricing
  const { results: cartItems } = await c.env.DB.prepare(
    `SELECT ci.*, p.name as product_name, p.sku as product_sku,
      pv.price as unit_price
     FROM cart_items ci
     JOIN products p ON p.id = ci.product_id
     LEFT JOIN product_variants pv ON pv.id = ci.variant_id
     WHERE ci.user_id = ?`
  ).bind(userId).all()

  if (!cartItems || cartItems.length === 0) {
    return c.json({ error: 'Cart is empty' }, 400)
  }

  // Calculate totals (Euro thresholds)
  let subtotal = 0
  for (const item of cartItems) {
    subtotal += (item.unit_price || 0) * item.quantity
  }
  const shippingCost = subtotal > 300 ? 0 : 15  // Free shipping over €300, else €15
  const total = subtotal + shippingCost

  // Generate order
  const date = new Date()
  const orderNumber = `RT-${date.getFullYear().toString().slice(2)}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
  const orderId = crypto.randomUUID()

  await c.env.DB.prepare(
    `INSERT INTO orders (id, order_number, user_id, status, payment_status, subtotal, shipping_cost, total, currency, shipping_address, payment_method)
     VALUES (?, ?, ?, 'pending', 'pending', ?, ?, ?, ?, ?, ?)`
  ).bind(orderId, orderNumber, userId, subtotal, shippingCost, total, currency, JSON.stringify(address), paymentMethod).run()

  // Create order items
  for (const item of cartItems) {
    await c.env.DB.prepare(
      `INSERT INTO order_items (id, order_id, product_id, variant_id, quantity, unit_price, total_price, product_name, product_sku, variant_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(), orderId, item.product_id, item.variant_id, item.quantity,
      item.unit_price, item.unit_price * item.quantity, item.product_name, item.product_sku, item.variant_name || null
    ).run()
  }

  // Clear cart
  await c.env.DB.prepare('DELETE FROM cart_items WHERE user_id = ?').bind(userId).run()

  // Generate payment URL based on method (Euro market)
  let paymentUrl: string | null = null

  if (paymentMethod === 'stripe') {
    // Stripe integration placeholder
    paymentUrl = `https://ridethetide.site/order/${orderId}?stripe=pending`
  } else if (paymentMethod === 'nowpayments') {
    // NowPayments crypto
    try {
      const res = await fetch('https://api.nowpayments.io/v1/payment', {
        method: 'POST',
        headers: {
          'x-api-key': c.env.NOWPAYMENTS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_amount: total,
          price_currency: currency,
          pay_currency: 'btc',
          order_id: orderId,
          order_description: `Order ${orderNumber}`,
          ipn_callback_url: `https://api.ridethetide.site/api/webhook/nowpayments`,
          success_url: `https://ridethetide.site/order/success/${orderId}`,
          cancel_url: `https://ridethetide.site/order/cancel/${orderId}`,
        }),
      })
      const data = await res.json()
      paymentUrl = data.invoice_url || data.pay_address
    } catch (e) {
      console.error('NowPayments error:', e)
    }
  }

  // Update order with payment ref
  if (paymentUrl) {
    await c.env.DB.prepare('UPDATE orders SET payment_ref = ? WHERE id = ?').bind(paymentUrl, orderId).run()
  }

  return c.json({
    success: true,
    orderId,
    orderNumber,
    total,
    currency,
    paymentUrl,
  })
})

export { checkout as checkoutRoutes }
