import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { ComplianceGate } from './components/compliance/ComplianceGate'
import { AuthModal } from './components/auth/AuthModal'
import { HomePage } from './components/pages/HomePage'
import { ShopPage } from './components/pages/ShopPage'
import { ProductPage } from './components/pages/ProductPage'
import { CheckoutPage } from './components/pages/CheckoutPage'
import { AccountPage } from './components/pages/AccountPage'
import { useAuthStore } from './hooks/useAuthStore'

import { CoaPage } from './components/pages/CoaPage'
import { AboutPage } from './components/pages/AboutPage'
import { ShippingPage } from './components/pages/ShippingPage'
import { ContactPage } from './components/pages/ContactPage'
import { TermsPage } from './components/pages/TermsPage'
import { PrivacyPage } from './components/pages/PrivacyPage'
import { BlogPage } from './components/pages/BlogPage'

function App() {
  const [showAuth, setShowAuth] = useState(false)
  const { user, checkSession } = useAuthStore()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar onAuthClick={() => setShowAuth(true)} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/coa" element={<CoaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </main>
      <Footer />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      {user && <ComplianceGate />}
    </div>
  )
}

export default App
