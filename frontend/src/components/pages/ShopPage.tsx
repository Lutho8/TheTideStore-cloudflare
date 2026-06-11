import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { Search, ArrowRight, FlaskConical } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  slug: string
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

  useEffect(() => {
    apiFetch('/products').then(data => {
      setProducts(data.products || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.codeLabel.toLowerCase().includes(search.toLowerCase())
  )

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(p)

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Research Catalog</h1>
          <p className="text-slate-400">All compounds listed by research code. CAS numbers available for verified researchers.</p>
        </div>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by code, CAS, or compound..." className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-tide-500" />
        </div>
        {loading ? (
          <div className="text-center py-24"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tide-400 mx-auto" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(product => (
              <Link key={product.id} to={`/product/${product.slug}`} className="group block bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-tide-500/50 transition-all">
                <div className="aspect-square bg-slate-800 relative overflow-hidden">
                  {product.images[0] ? (
                    <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><FlaskConical className="h-12 w-12 text-slate-700" /></div>
                  )}
                  <div className="absolute top-3 left-3"><span className="text-xs font-mono bg-slate-950/80 text-tide-400 px-2 py-1 rounded border border-tide-500/20">{product.codeLabel}</span></div>
                  {product.purity && <div className="absolute top-3 right-3"><span className="text-xs bg-tide-500/20 text-tide-300 px-2 py-1 rounded">{product.purity} HPLC</span></div>}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold group-hover:text-tide-400 transition-colors">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-white">{formatPrice(product.basePrice)}</span>
                      {product.comparePrice && <span className="ml-2 text-sm text-slate-500 line-through">{formatPrice(product.comparePrice)}</span>}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-tide-400">View <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
