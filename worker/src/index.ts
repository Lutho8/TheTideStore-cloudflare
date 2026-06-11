import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authRoutes } from './routes/auth'
import { productRoutes } from './routes/products'
import { orderRoutes } from './routes/orders'
import { complianceRoutes } from './routes/compliance'
import { checkoutRoutes } from './routes/checkout'
import { webhookRoutes } from './routes/webhooks'
import { adminRoutes } from './routes/admin'

export interface Env {
  DB: D1Database
  COAS: R2Bucket
  IMAGES: R2Bucket
  SESSIONS: KVNamespace
  JWT_SECRET: string
  WHATSAPP_API_KEY: string
  WHATSAPP_PHONE_ID: string
  TWILIO_SID: string
  TWILIO_TOKEN: string
  TWILIO_PHONE: string
  PAYFAST_MERCHANT_ID: string
  PAYFAST_MERCHANT_KEY: string
  STRIPE_SECRET_KEY: string
  NOWPAYMENTS_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS for frontend
app.use('/api/*', cors({
  origin: ['https://ridethetide.site', 'https://www.ridethetide.site', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// Health check
app.get('/', (c) => c.json({ status: 'ok', service: 'Ride The Tide API', version: '1.0.0' }))

// Mount routes
app.route('/api/auth', authRoutes)
app.route('/api/products', productRoutes)
app.route('/api/orders', orderRoutes)
app.route('/api/compliance', complianceRoutes)
app.route('/api/checkout', checkoutRoutes)
app.route('/api/webhook', webhookRoutes)
app.route('/api/admin', adminRoutes)

export default app
