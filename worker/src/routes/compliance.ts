import { Hono } from 'hono'
import { verifyJWT } from '../utils/crypto'
import type { Env } from '../index'

const compliance = new Hono<{ Bindings: Env }>()

// Middleware to verify auth
compliance.use('*', async (c, next) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401)

  const token = authHeader.slice(7)
  const payload = await verifyJWT(token, c.env.JWT_SECRET)
  if (!payload) return c.json({ error: 'Invalid token' }, 401)

  c.set('userId', payload.userId)
  await next()
})

// Get compliance status
compliance.get('/status', async (c) => {
  const userId = c.get('userId')

  const status = await c.env.DB.prepare(
    'SELECT * FROM compliance_gates WHERE user_id = ?'
  ).bind(userId).first()

  if (!status) return c.json(null)

  return c.json({
    ageConfirmed: !!status.age_confirmed,
    isResearcher: !!status.is_researcher,
    ruoAgreed: !!status.ruo_agreed,
    phoneVerified: !!status.phone_verified,
    fullyCompliant: !!status.fully_compliant,
  })
})

// Update compliance
compliance.post('/update', async (c) => {
  const userId = c.get('userId')
  const updates = await c.req.json()

  // Get existing or create new
  let gate = await c.env.DB.prepare('SELECT * FROM compliance_gates WHERE user_id = ?').bind(userId).first()

  if (!gate) {
    const gateId = crypto.randomUUID()
    await c.env.DB.prepare(
      `INSERT INTO compliance_gates (id, user_id, age_confirmed, is_researcher, ruo_agreed, phone_verified)
       VALUES (?, ?, 0, 0, 0, 0)`
    ).bind(gateId, userId).run()
    gate = { id: gateId, user_id: userId, age_confirmed: 0, is_researcher: 0, ruo_agreed: 0, phone_verified: 0 }
  }

  // Build update query dynamically
  const fields: string[] = []
  const values: (string | number)[] = []

  if (updates.ageConfirmed !== undefined) {
    fields.push('age_confirmed = ?')
    values.push(updates.ageConfirmed ? 1 : 0)
    if (updates.ageConfirmed && !gate.age_confirmed) {
      fields.push('age_confirmed_at = datetime("now")')
    }
  }
  if (updates.isResearcher !== undefined) {
    fields.push('is_researcher = ?')
    values.push(updates.isResearcher ? 1 : 0)
    if (updates.isResearcher && !gate.is_researcher) {
      fields.push('researcher_confirmed_at = datetime("now")')
    }
  }
  if (updates.ruoAgreed !== undefined) {
    fields.push('ruo_agreed = ?')
    values.push(updates.ruoAgreed ? 1 : 0)
    if (updates.ruoAgreed && !gate.ruo_agreed) {
      fields.push('ruo_agreed_at = datetime("now")')
    }
  }
  if (updates.phoneVerified !== undefined) {
    fields.push('phone_verified = ?')
    values.push(updates.phoneVerified ? 1 : 0)
    if (updates.phoneVerified && !gate.phone_verified) {
      fields.push('phone_verified_at = datetime("now")')
    }
  }

  // Add IP and user agent for audit
  fields.push('ip_address = ?')
  values.push(c.req.header('CF-Connecting-IP') || 'unknown')
  fields.push('user_agent = ?')
  values.push(c.req.header('User-Agent') || 'unknown')

  if (fields.length > 0) {
    await c.env.DB.prepare(
      `UPDATE compliance_gates SET ${fields.join(', ')} WHERE user_id = ?`
    ).bind(...values, userId).run()
  }

  // Check if fully compliant
  const updated = await c.env.DB.prepare('SELECT * FROM compliance_gates WHERE user_id = ?').bind(userId).first()
  const fullyCompliant = updated?.age_confirmed && updated?.is_researcher && updated?.ruo_agreed && updated?.phone_verified

  if (fullyCompliant && !updated?.fully_compliant) {
    await c.env.DB.prepare(
      'UPDATE compliance_gates SET fully_compliant = 1, compliant_at = datetime("now") WHERE user_id = ?'
    ).bind(userId).run()
  }

  return c.json({
    compliance: {
      ageConfirmed: !!updated?.age_confirmed,
      isResearcher: !!updated?.is_researcher,
      ruoAgreed: !!updated?.ruo_agreed,
      phoneVerified: !!updated?.phone_verified,
      fullyCompliant: !!fullyCompliant,
    },
    nextStep: fullyCompliant ? 0 : [
      !updated?.age_confirmed && 1,
      !updated?.is_researcher && 2,
      !updated?.ruo_agreed && 3,
      !updated?.phone_verified && 4,
    ].filter(Boolean)[0] || 0,
  })
})

export { compliance as complianceRoutes }
