import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ComplianceGate } from './components/compliance/ComplianceGate'
import { AuthModal } from './components/auth/AuthModal'
import { HomePage } from './components/pages/HomePage'
import { ShopPage } from './components/pages/ShopPage'
import { ProductPage } from './components/pages/ProductPage'
import { CheckoutPage } from './components/pages/CheckoutPage'
import { AccountPage } from './components/pages/AccountPage'
import { useAuthStore } from './hooks/useAuthStore'

function App() {
  const [showAuth, setShowAuth] = useState(false)
  const { user, checkSession } = useAuthStore()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onAuthClick={() => setShowAuth(true)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
      <Footer />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {user && <ComplianceGate />}
    </div>
  )
}

export default App
