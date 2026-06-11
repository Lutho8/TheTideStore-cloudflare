import { SignJWT, jwtVerify } from 'jose'

export async function signJWT(payload: object, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  return new SignJWT(payload as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30d')
    .sign(encoder.encode(secret))
}

export async function verifyJWT(token: string, secret: string): Promise<{ userId: string; phone: string; market: string } | null> {
  try {
    const encoder = new TextEncoder()
    const { payload } = await jwtVerify(token, encoder.encode(secret), { clockTolerance: 60 })
    return payload as any
  } catch {
    return null
  }
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or Argon2
  // For Cloudflare Workers, use Web Crypto API
  return password // Placeholder - implement proper hashing
}
