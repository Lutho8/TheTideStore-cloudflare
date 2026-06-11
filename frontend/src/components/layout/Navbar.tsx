import { Link, useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Search,
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'
import { useCartStore } from '../../hooks/useCartStore'

export function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
  const { user, logout } = useAuthStore()
  const { totalItems, openDrawer } = useCartStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src="/logo-animated.png" alt="Ride The Tide" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <Link to="/shop" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Products</Link>
            <a href="https://blog.ridethetide.site/blog/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
            <Link to="/coa" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">COA</Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search */}
            <div className="relative flex items-center">
              <form
                onSubmit={handleSearchSubmit}
                className={
                  'flex items-center overflow-hidden transition-all duration-300 ' +
                  (searchOpen ? 'w-48 sm:w-56 opacity-100' : 'w-0 opacity-0')
                }
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full text-sm bg-gray-100 text-gray-900 placeholder-gray-500 px-3 py-2 rounded-l-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors"
                  aria-label="Submit search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle search"
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
            </div>

            {/* Cart */}
            <button
              onClick={openDrawer}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-semibold ring-2 ring-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1.5 rounded-lg transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden lg:inline">{user.name || user.phone}</span>
                </Link>
                <button onClick={logout} className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Exit</button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="hidden sm:block text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sign In
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1">Home</Link>
          <Link to="/shop" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1">Products</Link>
          <a href="https://blog.ridethetide.site/blog/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1">Blog</a>
          <Link to="/coa" onClick={() => setMobileOpen(false)} className="block text-sm text-gray-600 hover:text-gray-900 py-1">COA</Link>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileOpen(false)
                openDrawer()
              }}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 py-1"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="ml-1 h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-semibold">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {!user && (
              <button
                onClick={() => {
                  setMobileOpen(false)
                  onAuthClick()
                }}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
