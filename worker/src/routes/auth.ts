import { Hono } from 'hono'
import { signJWT, verifyJWT, generateOtp, hashPassword } from '../utils/crypto'
import type { Env } from '../index'

const auth = new Hono<{ Bindings: Env }>()

// Send OTP
auth.post('/otp', async (c) => {
  const { phone, channel = 'whatsapp' } = await c.req.json()
  if (!phone || phone.length < 10) return c.json({ error: 'Invalid phone number' }, 400)

  // Normalize phone number (international format)
  let normalized = phone.replace(/\s/g, '').replace(/^0/, '+27')
  if (!normalized.startsWith('+')) normalized = '+27' + normalized

  const code = generateOtp()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

  // Store OTP in D1
  await c.env.DB.prepare(
    'INSERT INTO otp_codes (id, phone, code, channel, expires_at) VALUES (?, ?, ?, ?, ?)'
  ).bind(crypto.randomUUID(), normalized, code, channel, expiresAt).run()

  // Send via WhatsApp Business API
  if (channel === 'whatsapp') {
    try {
      await fetch(`https://graph.facebook.com/v18.0/${c.env.WHATSAPP_PHONE_ID}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${c.env.WHATSAPP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: normalized,
          type: 'template',
          template: {
            name: 'ride_the_tide_otp',
            language: { code: 'en' },
            components: [{
              type: 'body',
              parameters: [{ type: 'text', text: code }]
            }]
          }
        }),
      })
    } catch (e) {
      console.error('WhatsApp send failed:', e)
      // Fallback to SMS via Twilio
      if (c.env.TWILIO_SID) {
        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${c.env.TWILIO_SID}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + btoa(`${c.env.TWILIO_SID}:${c.env.TWILIO_TOKEN}`),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: normalized,
            From: c.env.TWILIO_PHONE,
            Body: `Your Ride The Tide verification code is: ${code}. Valid for 10 minutes.`,
          }),
        })
      }
    }
  } else {
    // SMS via Twilio
    if (c.env.TWILIO_SID) {
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${c.env.TWILIO_SID}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${c.env.TWILIO_SID}:${c.env.TWILIO_TOKEN}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: normalized,
          From: c.env.TWILIO_PHONE,
          Body: `Your Ride The Tide verification code is: ${code}. Valid for 10 minutes.`,
        }),
      })
    }
  }

  return c.json({
    success: true,
    message: c.env.NODE_ENV === 'development' ? `OTP: ${code}` : 'OTP sent',
    ...(c.env.NODE_ENV === 'development' ? { code } : {}),
    expiresAt,
  })
})

// Verify OTP and create session
auth.post('/verify', async (c) => {
  const { phone, code } = await c.req.json()
  if (!phone || !code) return c.json({ error: 'Phone and code required' }, 400)

  let normalized = phone.replace(/\s/g, '').replace(/^0/, '+27')
  if (!normalized.startsWith('+')) normalized = '+27' + normalized

  // Find valid OTP
  const otp = await c.env.DB.prepare(
    'SELECT * FROM otp_codes WHERE phone = ? AND code = ? AND verified = 0 AND expires_at > datetime("now") ORDER BY created_at DESC LIMIT 1'
  ).bind(normalized, code).first()

  if (!otp) return c.json({ error: 'Invalid or expired code' }, 400)

  // Mark OTP as verified
  await c.env.DB.prepare('UPDATE otp_codes SET verified = 1 WHERE id = ?').bind(otp.id).run()

  // Find or create user
  let user = await c.env.DB.prepare('SELECT * FROM users WHERE phone = ?').bind(normalized).first()

  if (!user) {
    const userId = crypto.randomUUID()
    await c.env.DB.prepare(
      'INSERT INTO users (id, phone, phone_verified) VALUES (?, ?, 1)'
    ).bind(userId, normalized).run()
    user = { id: userId, phone: normalized, phone_verified: 1 }
  } else {
    await c.env.DB.prepare('UPDATE users SET phone_verified = 1, updated_at = datetime("now") WHERE id = ?').bind(user.id).run()
  }

  // Create compliance gate if not exists
  const existingCompliance = await c.env.DB.prepare('SELECT * FROM compliance_gates WHERE user_id = ?').bind(user.id).first()
  if (!existingCompliance) {
    await c.env.DB.prepare(
      'INSERT INTO compliance_gates (id, user_id, phone_verified, phone_verified_at) VALUES (?, ?, 1, datetime("now"))'
    ).bind(crypto.randomUUID(), user.id).run()
  } else {
    await c.env.DB.prepare(
      'UPDATE compliance_gates SET phone_verified = 1, phone_verified_at = datetime("now") WHERE user_id = ?'
    ).bind(user.id).run()
  }

  // Generate JWT
  const token = await signJWT({ userId: user.id, phone: user.phone }, c.env.JWT_SECRET)

  return c.json({
    success: true,
    token,
    user: {
      id: user.id,
      phone: user.phone,
      name: user.name,
    },
  })
})

// Get current user
auth.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)

  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)

  const user = await c.env.DB.prepare('SELECT id, phone, name, email FROM users WHERE id = ?').bind(payload.userId).first()
  if (!user) return c.json({ error: 'User not found' }, 404)

  return c.json(user)
})

export { auth as authRoutes }
