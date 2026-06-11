import { useAuthStore } from '../../hooks/useAuthStore'
import { User, Shield, Phone, Calendar, Package } from 'lucide-react'

export function AccountPage() {
  const { user } = useAuthStore()

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <User className="h-12 w-12 text-slate-600 mx-auto mb-4" />
        <h2 className="text-xl font-bold">Sign In Required</h2>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-8">My Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-tide-500/10 rounded-xl"><User className="h-6 w-6 text-tide-400" /></div>
              <div>
                <p className="font-semibold">{user.name || 'Researcher'}</p>
                <p className="text-sm text-slate-500">{user.phone}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400"><Phone className="h-4 w-4" />{user.phone}</div>
              <div className="flex items-center gap-2 text-slate-400"><Calendar className="h-4 w-4" />Member since {new Date().getFullYear()}</div>
              <div className="flex items-center gap-2 text-emerald-400"><Shield className="h-4 w-4" />Verified Researcher</div>
            </div>
          </div>
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="font-semibold flex items-center gap-2 mb-4"><Package className="h-5 w-5 text-tide-400" />My Orders</h2>
            <p className="text-sm text-slate-500">No orders yet. Browse the catalog to place your first order.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
