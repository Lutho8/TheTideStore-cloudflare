import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { Search, ChevronRight, Beaker } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  compoundName: string | null
  slug: string
  casNumber: string | null
  shortDescription: string
  basePrice: number
  comparePrice: number | null
  purity: string | null
  images: { url: string }[]
  variants: { name: string }[]
}

export function ShopPage() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  useEffect(() => {
    apiFetch('/products').then(data => {
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.codeLabel.toLowerCase().includes(search.toLowerCase()) ||
    (p.compoundName && p.compoundName.toLowerCase().includes(search.toLowerCase()))
  )

  const isBlend = (p: Product) => p.name.includes('+') || p.name.includes('Blend') || p.compoundName?.includes('/')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Product Catalog */}
          <div className="lg:w-56 shrink-0">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">Product Catalog</h2>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-full" />
                  ))}
                </div>
              ) : (
                products.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onMouseEnter={() => setSelectedProduct(p.id)}
                    onMouseLeave={() => setSelectedProduct(null)}
                    className={`block text-sm py-1.5 px-2 rounded transition-colors ${
                      selectedProduct === p.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {p.name.replace('Research Compound', '').trim()}
                  </Link>
                ))
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Explore our products</h1>
              <p className="text-sm text-gray-500">All orders ship same day from our EU facility.</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by product name or type"
                className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Product Grid */}
            {loading ? (
              <div className="text-center py-24">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <div key={product.id} className="group">
                    {/* Card Header */}
                    <div className="mb-3">
                      {product.casNumber && (
                        <p className="text-xs text-gray-400 mb-1">CAS #: {product.casNumber}</p>
                      )}
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {product.name.replace('Research Compound', '').trim()}
                      </h3>
                      {isBlend(product) && (
                        <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Blend</span>
                      )}
                    </div>

                    {/* Learn More Button */}
                    <Link
                      to={`/product/${product.slug}`}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors mb-4"
                    >
                      Learn More <ChevronRight className="h-4 w-4" />
                    </Link>

                    {/* Product Image */}
                    <Link to={`/product/${product.slug}`} className="block bg-gray-50 rounded-xl overflow-hidden border border-gray-100 aspect-square">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Beaker className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {filtered.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-gray-500">No products found matching your search.</p>
                <button
                  onClick={() => setSearch('')}
                  className="mt-2 text-blue-600 hover:underline text-sm"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
