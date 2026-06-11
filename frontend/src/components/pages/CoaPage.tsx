import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { Search, Beaker, ChevronRight, Info } from 'lucide-react'

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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Certificate of Analysis</h1>
          <p className="text-gray-600">Each lot is tested by UPLC/MS for endotoxins and purity.</p>
        </div>

        {/* Search + Validate */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Enter the product name or lot #"
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            How to validate your COA <Info className="h-4 w-4" />
          </button>
        </div>

        {/* Product COA Rows */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(product => (
              <div key={product.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
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
                    <Beaker className="h-8 w-8 text-gray-300 absolute" style={{ display: 'none' }} id={`fallback-${product.id}`} />
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
                        <span key={coa.id} className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium">
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
      </div>
    </div>
  )
}
