import { useState } from 'react'
import { apiFetch, useAuthStore } from '../../hooks/useAuthStore'
import { X, Phone, MessageSquare, Loader2, CheckCircle } from 'lucide-react'

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp')
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [loading, setLoading] = useState(false)
  const { setUser } = useAuthStore()

  const handleSendOtp = async () => {
    setError('')
    if (!phone || phone.length < 10) { setError('Enter a valid phone number'); return }
    setLoading(true)
    try {
      const res = await apiFetch('/auth/otp', {
        method: 'POST',
        body: JSON.stringify({ phone, channel }),
      })
      setStep('code')
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown(c => { if (c <= 1) { clearInterval(timer); return 0 } return c - 1 })
      }, 1000)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  const handleVerify = async () => {
    setError('')
    if (!code || code.length !== 6) { setError('Enter the 6-digit code'); return }
    setLoading(true)
    try {
      const res = await apiFetch('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ phone, code }),
      })
      setUser(res.user, res.token)
      onClose()
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Sign In</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        {step === 'phone' ? (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Enter your phone number. We&apos;ll send a code via {channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}.</p>
            <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
              <button onClick={() => setChannel('whatsapp')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-colors ${channel === 'whatsapp' ? 'bg-tide-600 text-white' : 'text-slate-400 hover:text-white'}`}><MessageSquare className="h-4 w-4" />WhatsApp</button>
              <button onClick={() => setChannel('sms')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm transition-colors ${channel === 'sms' ? 'bg-tide-600 text-white' : 'text-slate-400 hover:text-white'}`}><Phone className="h-4 w-4" />SMS</button>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">+27</span>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="82 123 4567" maxLength={10} className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button onClick={handleSendOtp} disabled={loading} className="w-full bg-tide-600 hover:bg-tide-500 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : 'Send Code'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Enter the 6-digit code sent to +27{phone}</p>
            <input type="text" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="000000" maxLength={6} className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-center text-2xl tracking-[0.5em] text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-tide-500" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button onClick={handleVerify} disabled={loading} className="w-full bg-tide-600 hover:bg-tide-500 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Verifying...</> : <><CheckCircle className="h-4 w-4" />Verify & Sign In</>}
            </button>
            <div className="text-center">
              {countdown > 0 ? <p className="text-sm text-slate-500">Resend in {countdown}s</p> : <button onClick={handleSendOtp} className="text-sm text-tide-400 hover:text-tide-300">Resend code</button>}
            </div>
            <button onClick={() => setStep('phone')} className="w-full text-sm text-slate-500 hover:text-slate-300">Change phone number</button>
          </div>
        )}
      </div>
    </div>
  )
}
