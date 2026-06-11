import { Link } from 'react-router-dom'
import { FlaskConical, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const { user, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount] = useState(0)

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-tide-400" />
            <span className="text-lg font-bold tracking-tight">
              Ride The <span className="text-tide-400">Tide</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-sm text-slate-300 hover:text-white transition-colors">Research Catalog</Link>
            <Link to="/research" className="text-sm text-slate-300 hover:text-white transition-colors">Research Hub</Link>
            <Link to="/testing" className="text-sm text-slate-300 hover:text-white transition-colors">Lab Testing</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-tide-500 text-[10px] flex items-center justify-center font-medium">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-2 text-sm text-slate-300 hover:text-white">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.name || user.phone}</span>
                </Link>
                <button onClick={logout} className="text-xs text-slate-500 hover:text-slate-300">Exit</button>
              </div>
            ) : (
              <button onClick={onAuthClick} className="text-sm bg-tide-600 hover:bg-tide-500 text-white px-4 py-2 rounded-lg transition-colors">Sign In</button>
            )}
            <button className="md:hidden p-2 text-slate-300" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          <Link to="/shop" className="block text-sm text-slate-300">Research Catalog</Link>
          <Link to="/research" className="block text-sm text-slate-300">Research Hub</Link>
          <Link to="/testing" className="block text-sm text-slate-300">Lab Testing</Link>
        </div>
      )}
    </nav>
  )
}
