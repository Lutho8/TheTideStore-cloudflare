import { Hono } from 'hono'
import type { Env } from '../index'

const webhooks = new Hono<{ Bindings: Env }>()

// NowPayments webhook
webhooks.post('/nowpayments', async (c) => {
  const payload = await c.req.json()

  if (payload.payment_status === 'finished') {
    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = "paid", status = "confirmed" WHERE id = ?'
    ).bind(payload.order_id).run()
  }

  return c.json({ received: true })
})

// Stripe webhook
webhooks.post('/stripe', async (c) => {
  const payload = await c.req.json()

  if (payload.type === 'payment_intent.succeeded') {
    const orderId = payload.data.object.metadata.order_id
    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = "paid", status = "confirmed" WHERE id = ?'
    ).bind(orderId).run()
  }

  return c.json({ received: true })
})

export { webhooks as webhookRoutes }
