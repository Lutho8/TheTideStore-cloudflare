import { Hono } from 'hono'
import type { Env } from '../index'

const webhooks = new Hono<{ Bindings: Env }>()

// PayFast ITN webhook
webhooks.post('/payfast', async (c) => {
  const formData = await c.req.formData()
  const payload: Record<string, string> = {}
  formData.forEach((value, key) => { payload[key] = value.toString() })

  if (payload.payment_status === 'COMPLETE') {
    await c.env.DB.prepare(
      'UPDATE orders SET payment_status = "paid", status = "confirmed" WHERE id = ?'
    ).bind(payload.m_payment_id).run()

    await c.env.DB.prepare(
      'INSERT INTO order_activity_logs (id, order_id, action, details) VALUES (?, ?, ?, ?)'
    ).bind(crypto.randomUUID(), payload.m_payment_id, 'payment_received', JSON.stringify({ processor: 'payfast', ref: payload.pf_payment_id })).run()
  }

  return c.text('OK')
})

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
