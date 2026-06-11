import { Link } from 'react-router-dom'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const { user, logout } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount] = useState(0)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-animated.png" alt="Ride The Tide" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
            <Link to="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</Link>
            <Link to="/coa" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">COA</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-medium">{cartCount}</span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.name || user.phone}</span>
                </Link>
                <button onClick={logout} className="text-xs text-gray-500 hover:text-gray-700">Exit</button>
              </div>
            ) : (
              <button onClick={onAuthClick} className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">Sign In</button>
            )}
            <button className="md:hidden p-2 text-gray-600" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link to="/" className="block text-sm text-gray-600">Home</Link>
          <Link to="/shop" className="block text-sm text-gray-600">Products</Link>
          <Link to="/blog" className="block text-sm text-gray-600">Blog</Link>
          <Link to="/coa" className="block text-sm text-gray-600">COA</Link>
        </div>
      )}
    </nav>
  )
}
