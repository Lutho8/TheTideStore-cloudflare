import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiFetch, useAuthStore } from '../../hooks/useAuthStore'
import { CreditCard, Bitcoin, ArrowRight, Loader2, Shield, MapPin, Package } from 'lucide-react'

const METHODS = [
  { id: 'stripe', name: 'Stripe', desc: 'Card / SEPA (Germany & EU)', icon: CreditCard },
  { id: 'nowpayments', name: 'Crypto', desc: 'BTC, ETH, USDT', icon: Bitcoin },
]

export function CheckoutPage() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [method, setMethod] = useState('stripe')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({ recipientName: '', phone: '', street: '', city: '', province: '', postalCode: '', country: 'DE' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await apiFetch('/checkout', {
        method: 'POST',
        body: JSON.stringify({ address, paymentMethod: method }),
      })
      if (res.paymentUrl) window.location.href = res.paymentUrl
      else navigate(`/order/${res.orderId}`)
    } catch (err: any) {
      alert(err.message)
    }
    setLoading(false)
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Shield className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Sign In Required</h2>
        <p className="text-slate-400">Please sign in to complete your purchase.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="font-semibold flex items-center gap-2 mb-4"><MapPin className="h-5 w-5 text-tide-400" />Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" value={address.recipientName} onChange={e => setAddress({ ...address, recipientName: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
                <input type="tel" placeholder="Phone" value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
                <input type="text" placeholder="Street" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
                <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
                <select value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-tide-500">
                  <option value="DE">Germany</option>
                  <option value="AT">Austria</option>
                  <option value="CH">Switzerland</option>
                  <option value="NL">Netherlands</option>
                  <option value="BE">Belgium</option>
                </select>
                <input type="text" placeholder="Postal Code" value={address.postalCode} onChange={e => setAddress({ ...address, postalCode: e.target.value })} className="bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="font-semibold flex items-center gap-2 mb-4"><CreditCard className="h-5 w-5 text-tide-400" />Payment Method</h2>
              <div className="space-y-3">
                {METHODS.map(m => (
                  <button key={m.id} onClick={() => setMethod(m.id)} className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-colors ${method === m.id ? 'border-tide-500 bg-tide-500/5' : 'border-slate-700 bg-slate-800 hover:border-slate-600'}`}>
                    <div className={`p-2 rounded-lg ${method === m.id ? 'bg-tide-500/10' : 'bg-slate-700'}`}><m.icon className={`h-5 w-5 ${method === m.id ? 'text-tide-400' : 'text-slate-400'}`} /></div>
                    <div className="text-left flex-1">
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-slate-500">{m.desc}</p>
                    </div>
                    {method === m.id && <div className="h-5 w-5 rounded-full bg-tide-500 flex items-center justify-center"><div className="h-2 w-2 rounded-full bg-white" /></div>}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
              <p className="text-sm text-amber-400">By placing this order, you confirm all products are for research purposes only and you are a qualified researcher.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h2 className="font-semibold flex items-center gap-2 mb-4"><Package className="h-5 w-5 text-tide-400" />Order Summary</h2>
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span>€0.00</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Shipping</span><span>Calculated</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-800"><span>Total</span><span>TBD</span></div>
              </div>
              <button onClick={handleSubmit} disabled={loading} className="w-full mt-6 bg-tide-600 hover:bg-tide-500 disabled:opacity-50 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="h-5 w-5 animate-spin" />Processing...</> : <><ArrowRight className="h-5 w-5" />Place Order</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
