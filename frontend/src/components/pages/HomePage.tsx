import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { ArrowRight, ChevronRight, Beaker, FlaskConical, Shield, Microscope, Truck, MessageCircle } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  slug: string
  casNumber: string | null
  images: { url: string }[]
}

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    apiFetch('/products?limit=8').then(data => {
      setProducts(data.products || [])
    })
  }, [])

  const faqs = [
    { q: "Are your products tested?", a: "Every batch is third-party tested by Janoshik Laboratory for purity (99%+ HPLC), identity, and quantity. COAs are available for download on each product page." },
    { q: "Where do you ship from?", a: "All orders ship same-day from our EU facility via DHL or DPD Express. Tracking is provided within 24 hours." },
    { q: "Are these for human consumption?", a: "No. All products are sold strictly for research, laboratory, and analytical purposes only. Not for human or animal consumption." },
    { q: "Do you ship internationally?", a: "We ship throughout the European Union, Switzerland, and selected international destinations. Contact us for specific country availability." },
    { q: "What payment methods do you accept?", a: "We accept Stripe (Card / SEPA), and cryptocurrency via NowPayments (BTC, ETH, USDT)." },
    { q: "How should I store these products?", a: "Store lyophilized peptides in a cool, dry place away from direct sunlight. For long-term storage, refrigeration at 2-8°C is recommended." },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gray-50 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              research peptides
            </h1>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              View Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Lyophilized<br />in the EU.</h3>
                <p className="text-sm text-gray-500 mt-1">Made in-house.</p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors w-fit"
              >
                View Products <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex-1 flex items-end justify-center">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <FlaskConical className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">No more<br />guessing games.</h3>
                <p className="text-sm text-gray-500 mt-1">EU-made, third-party batch tested.</p>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors w-fit"
              >
                View Products <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex-1 flex items-end justify-center">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <Microscope className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">Batch Produced,<br />Batch Tested</h3>
                <p className="text-sm text-gray-500 mt-1">COAs available for each batch.</p>
              </div>
              <Link
                to="/coa"
                className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors w-fit"
              >
                View COA <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex-1 flex items-end justify-center">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <Shield className="h-16 w-16 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Use Only Banner */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">Research Use Only</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All products are intended solely for laboratory research and are not for human or animal consumption. By purchasing, the buyer agrees to use these products in compliance with all applicable laws. All products currently listed on this site are for research purposes ONLY.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Products */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explore our products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="group">
                {product.casNumber && (
                  <p className="text-xs text-gray-400 mb-1">CAS #: {product.casNumber}</p>
                )}
                <h3 className="font-bold text-gray-900 mb-2">
                  {product.name.replace('Research Compound', '').trim()}
                </h3>
                <Link
                  to={`/product/${product.slug}`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors mb-3"
                >
                  View Product <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to={`/product/${product.slug}`} className="block bg-gray-50 rounded-xl overflow-hidden border border-gray-100 aspect-square relative group-hover:shadow-lg transition-all duration-300">
                  {product.images[0] ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const fallback = target.parentElement?.querySelector('.img-fallback') as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                  ) : null}
                  <div className={`img-fallback w-full h-full flex items-center justify-center ${product.images[0] ? 'hidden' : ''}`}>
                    <Beaker className="h-12 w-12 text-gray-300" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-colors"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Process</h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              View Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 'STEP 1',
                title: 'Precision Lyophilization',
                desc: 'Manufactured in a controlled EU facility under strict compounding standards.',
                icon: FlaskConical,
              },
              {
                step: 'STEP 2',
                title: 'Verified Purity',
                desc: 'Every batch third-party tested with HPLC and mass spectrometry.',
                icon: Microscope,
              },
              {
                step: 'STEP 3',
                title: 'Same-Day Fulfillment',
                desc: 'Orders dispatched same-day from our EU facility.',
                icon: Truck,
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <item.icon className="h-20 w-20 text-blue-600" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-gray-400 uppercase">{item.step}</span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SMS Support */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Text us, our dedicated team is here to help</h3>
                <p className="text-sm text-gray-600">Reach out and get a response within minutes.</p>
              </div>
              <a
                href="https://wa.me/491624747159"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shrink-0"
              >
                <MessageCircle className="h-5 w-5" /> Text Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <p className="text-sm text-gray-500 mt-1">Everything you need to know about our products and processes.</p>
            </div>
            <Link
              to="/shop"
              className="hidden sm:inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              View Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-sm text-gray-900">{faq.q}</span>
                  <ChevronRight className={`h-4 w-4 text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
