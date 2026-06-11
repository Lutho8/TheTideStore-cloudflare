import { useState, useEffect } from 'react'
import { apiFetch, useAuthStore } from '../../hooks/useAuthStore'
import { CheckCircle, Shield, FlaskConical, AlertTriangle, Phone, Loader2 } from 'lucide-react'

const STEPS = [
  { number: 1, key: 'ageConfirmed', title: 'Age Verification', description: 'I confirm that I am 21 years of age or older.', icon: Shield },
  { number: 2, key: 'isResearcher', title: 'Qualified Researcher', description: 'I confirm that I am a qualified researcher with appropriate laboratory facilities and training.', icon: FlaskConical },
  { number: 3, key: 'ruoAgreed', title: 'Research Use Only', description: 'I understand all products are for research purposes only and not for human consumption.', icon: AlertTriangle },
  { number: 4, key: 'phoneVerified', title: 'Phone Verification', description: 'Verify your phone number to complete compliance.', icon: Phone },
]

export function ComplianceGate() {
  const { user } = useAuthStore()
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [_complianceStatus, setComplianceStatus] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!user) return
    apiFetch('/compliance/status').then(s => {
      setComplianceStatus(s || {})
      const next = STEPS.find(s => !s[s.key as keyof typeof s])?.number || 0
      setShow(next > 0)
      setStep(next || 1)
    }).catch(() => {})
  }, [user])

  const handleConfirm = async (field: string) => {
    setLoading(true)
    try {
      const res = await apiFetch('/compliance/update', {
        method: 'POST',
        body: JSON.stringify({ [field]: true }),
      })
      setComplianceStatus(res.compliance)
      const next = STEPS.find(s => !res.compliance[s.key])?.number || 0
      if (next === 0) setShow(false)
      else setStep(next)
    } catch (e: any) {
      console.error(e)
    }
    setLoading(false)
  }

  if (!show || !user) return null

  const current = STEPS.find(s => s.number === step)
  if (!current) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Compliance Verification</h2>
            <span className="text-sm text-slate-500">Step {step} of 4</span>
          </div>
          <div className="flex gap-2">
            {STEPS.map(s => (
              <div key={s.number} className={`flex-1 h-2 rounded-full transition-colors ${s.number < step ? 'bg-tide-500' : s.number === step ? 'bg-tide-400' : 'bg-slate-800'}`} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-tide-500/10 rounded-xl"><current.icon className="h-6 w-6 text-tide-400" /></div>
            <div>
              <h3 className="font-semibold">{current.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{current.description}</p>
            </div>
          </div>
          {step === 4 ? (
            <div className="bg-slate-800 rounded-lg p-4">
              <p className="text-sm text-slate-300 mb-2">Phone: {user.phone}</p>
              <p className="text-xs text-slate-500">Your phone was verified during sign-in. Click below to confirm.</p>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <input type="checkbox" id="compliance-check" className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-700 text-tide-500" />
              <label htmlFor="compliance-check" className="text-sm text-slate-300 cursor-pointer">
                I confirm the above and understand false information may result in account termination.
              </label>
            </div>
          )}
          <button onClick={() => handleConfirm(current.key)} disabled={loading} className="w-full bg-tide-600 hover:bg-tide-500 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" />Processing...</> : <><CheckCircle className="h-4 w-4" />Confirm & Continue</>}
          </button>
        </div>
        <p className="mt-6 text-xs text-slate-600 text-center">All confirmations are logged for audit purposes.</p>
      </div>
    </div>
  )
}
