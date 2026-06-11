import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { Search, Beaker, ChevronRight, Info, MessageCircle, ShieldCheck, FlaskConical } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  slug: string
  casNumber: string | null
  images: { url: string }[]
  variants: { id: string; dosageMg: number | null }[]
  coaBatches: { id: string; batchNumber: string; testType: string }[]
}

export function CoaPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/products?limit=100').then(data => {
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.codeLabel.toLowerCase().includes(search.toLowerCase()) ||
    p.coaBatches.some(c => c.batchNumber.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Certificate of Analysis
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each lot is tested by UPLC/MS for endotoxins and purity.
          </p>
        </div>
      </section>

      {/* How to Validate Your COA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <Info className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">How to Validate Your COA</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every Certificate of Analysis includes a unique batch number, test date, and laboratory signature.
                To validate, match the batch number on your product label with the batch listed below, then download the
                corresponding PDF from the product page. All testing is performed by independent third-party laboratories
                using UPLC/MS, HPLC, and endotoxin assays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Have questions? Text us. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <MessageCircle className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Have questions? Text us.</h3>
                <p className="text-sm text-gray-600">Reach out and get a response within minutes.</p>
              </div>
            </div>
            <a
              href="https://wa.me/491624747159"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              +49 162 4747159
            </a>
          </div>
        </div>
      </section>

      {/* Product List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Enter the product name or lot #"
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(product => (
              <div key={product.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <Beaker className="h-8 w-8 text-gray-300" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-xs text-gray-500 mb-0.5">Product Name</p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {product.name.replace('Research Compound', '').trim()}
                    </Link>
                  </div>

                  {/* Dose */}
                  <div className="shrink-0">
                    <p className="text-xs text-gray-500 mb-1">Dose</p>
                    <div className="flex flex-wrap gap-1">
                      {product.variants
                        .filter(v => v.dosageMg !== null)
                        .map(v => (
                          <span key={v.id} className="px-2 py-0.5 bg-white border border-gray-300 rounded text-xs text-gray-700">
                            {v.dosageMg}mg
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Lot Batch */}
                  <div className="shrink-0">
                    <p className="text-xs text-gray-500 mb-1">Lot Batch</p>
                    <div className="flex flex-wrap gap-2 items-center">
                      {product.coaBatches.slice(0, 2).map(coa => (
                        <span key={coa.id} className="px-3 py-1.5 border border-blue-600 text-blue-600 rounded-lg text-xs font-medium">
                          {coa.batchNumber}
                        </span>
                      ))}
                      <Link
                        to={`/product/${product.slug}`}
                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-0.5"
                      >
                        View all Lots <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Test Type Tabs */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                  <span className="px-2 py-1 bg-white border border-blue-600 text-blue-600 rounded text-xs font-medium">
                    Purity, ID, Quantity
                  </span>
                  <span className="px-2 py-1 bg-white border border-gray-300 text-gray-600 rounded text-xs">
                    Endotoxin
                  </span>
                </div>
              </div>
            ))}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products or lot numbers found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Made in the USA Banner */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Made in the USA</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Peptides are precision-synthesized and lyophilized at state-of-the-art laboratories
                under strict GMP-like conditions. Every batch undergoes rigorous third-party testing
                for purity, identity, and endotoxin levels before release.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FlaskConical className="h-4 w-4" />
                <span>Independent lab verified · 99%+ purity</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm h-48 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                <Beaker className="h-16 w-16 text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
