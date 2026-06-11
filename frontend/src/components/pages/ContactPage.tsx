import { useState } from 'react'
import { MessageCircle, Mail, Send, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl">
            Have a question about an order, product, or shipping? Reach out — we typically reply within minutes.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">WhatsApp / SMS</h3>
              </div>
              <a
                href="https://wa.me/491624747159"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-semibold hover:underline text-lg"
              >
                +49 162 4747159
              </a>
              <p className="text-xs text-gray-500 mt-1">Fastest response — usually within minutes.</p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-gray-900">Email</h3>
              </div>
              <a
                href="mailto:support@ridethetide.site"
                className="text-blue-600 font-semibold hover:underline text-lg"
              >
                support@ridethetide.site
              </a>
              <p className="text-xs text-gray-500 mt-1">We aim to respond within 24 hours.</p>
            </div>

            <div className="text-sm text-gray-600 leading-relaxed">
              <p className="mb-2">
                For order-related inquiries, please include your order number. For product questions,
                mention the product name or SKU so we can assist you faster.
              </p>
              <p>
                Our support team is available Monday–Friday, 09:00–18:00 CET.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Send a Message</h3>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 font-medium">Message sent! We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
