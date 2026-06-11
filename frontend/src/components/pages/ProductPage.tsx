import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { Shield, Microscope, FileCheck, Beaker, ArrowLeft, ShoppingCart, Check } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  compoundName: string | null
  casNumber: string | null
  molecularFormula: string | null
  molecularWeight: string | null
  sequence: string | null
  purity: string | null
  shortDescription: string
  fullDescription: string
  mechanismOfAction: string
  basePrice: number
  comparePrice: number | null
  images: { url: string; alt: string | null }[]
  variants: { id: string; name: string; price: number; comparePrice: number | null; dosageMg: number | null; vialCount: number }[]
  references: { authors: string | null; title: string; journal: string | null; year: number | null; doi: string | null; pmid: string | null }[]
  coaUrl: string | null
  coaBatchNumber: string | null
  coaLab: string | null
  hplcPurity: string | null
}

export function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    apiFetch(`/products/${slug}`).then(data => {
      setProduct(data)
      if (data.variants[0]) setSelectedVariant(data.variants[0].id)
    })
  }, [slug])

  const formatPrice = (p: number) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(p)

  const renderFormula = (f: string) => {
    const subscriptMap: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' }
    const parts: { text: string; isSub: boolean }[] = []
    let current = '', inNumber = false
    for (const char of f) {
      if (/\d/.test(char)) {
        if (!inNumber && current) { parts.push({ text: current, isSub: false }); current = '' }
        inNumber = true; current += char
      } else {
        if (inNumber && current) { parts.push({ text: current, isSub: true }); current = '' }
        inNumber = false; current += char
      }
    }
    if (current) parts.push({ text: current, isSub: inNumber })
    return parts.map((part, i) => {
      if (part.isSub) return <sub key={i} className="text-sm text-tide-400">{part.text.split('').map(c => subscriptMap[c] || c).join('')}</sub>
      return <span key={i}>{part.text}</span>
    })
  }

  if (!product) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tide-400" /></div>

  const variant = product.variants.find(v => v.id === selectedVariant) || product.variants[0]
  const price = variant?.price ?? product.basePrice

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8"><ArrowLeft className="h-4 w-4" />Back to Catalog</Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              {product.images[0] ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Beaker className="h-24 w-24 text-slate-700" /></div>}
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="text-xs font-mono bg-tide-500/10 text-tide-400 px-2 py-1 rounded border border-tide-500/20">{product.codeLabel}</span>
                {product.purity && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded border border-emerald-500/20">{product.purity} HPLC</span>}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-slate-400">{product.shortDescription}</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold">{formatPrice(price)}</span>
                {variant?.comparePrice && <span className="text-lg text-slate-500 line-through">{formatPrice(variant.comparePrice)}</span>}
              </div>
              {product.variants.length > 0 && (
                <div className="mb-4">
                  <label className="text-sm text-slate-400 mb-2 block">Select variant</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map(v => (
                      <button key={v.id} onClick={() => setSelectedVariant(v.id)} className={`px-4 py-2 rounded-lg text-sm border transition-colors ${v.id === selectedVariant ? 'border-tide-500 bg-tide-500/10 text-tide-400' : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600'}`}>
                        {v.name}<span className="ml-2 text-slate-500">{formatPrice(v.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-700 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-slate-400 hover:text-white">-</button>
                  <span className="px-3 py-2 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-slate-400 hover:text-white">+</button>
                </div>
                <button onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-colors ${added ? 'bg-emerald-600 text-white' : 'bg-tide-600 hover:bg-tide-500 text-white'}`}>
                  {added ? <><Check className="h-5 w-5" />Added</> : <><ShoppingCart className="h-5 w-5" />Add to Cart</>}
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2"><Microscope className="h-5 w-5 text-tide-400" />Scientific Data</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.casNumber && <div className="bg-slate-900 border border-slate-800 rounded-lg p-4"><span className="text-xs text-slate-500 uppercase tracking-wider">CAS Number</span><p className="font-mono text-tide-400 mt-1">{product.casNumber}</p></div>}
                {product.molecularFormula && <div className="bg-slate-900 border border-slate-800 rounded-lg p-4"><span className="text-xs text-slate-500 uppercase tracking-wider">Molecular Formula</span><p className="font-mono text-tide-400 mt-1 text-lg">{renderFormula(product.molecularFormula)}</p></div>}
                {product.molecularWeight && <div className="bg-slate-900 border border-slate-800 rounded-lg p-4"><span className="text-xs text-slate-500 uppercase tracking-wider">Molecular Weight</span><p className="font-mono text-white mt-1">{product.molecularWeight} Da</p></div>}
                {product.sequence && <div className="bg-slate-900 border border-slate-800 rounded-lg p-4"><span className="text-xs text-slate-500 uppercase tracking-wider">Sequence</span><p className="font-mono text-xs text-tide-400 mt-1 break-all">{product.sequence}</p></div>}
              </div>
            </div>
            {product.coaUrl && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><FileCheck className="h-5 w-5 text-emerald-400" />Certificate of Analysis</h2>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-10 bg-slate-800 rounded border border-slate-700 flex items-center justify-center"><FileCheck className="h-5 w-5 text-slate-600" /></div>
                    <div>
                      <p className="text-sm font-medium">COA_{product.coaBatchNumber || 'doc'}.pdf</p>
                      <p className="text-xs text-slate-500">{product.coaLab} • {product.hplcPurity} HPLC</p>
                    </div>
                  </div>
                  <a href={product.coaUrl} download className="px-3 py-2 bg-tide-600 hover:bg-tide-500 rounded-lg text-sm text-white transition-colors">Download</a>
                </div>
              </div>
            )}
            {product.references.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><Beaker className="h-5 w-5 text-tide-400" />Research References ({product.references.length})</h2>
                <div className="space-y-3">
                  {product.references.map((ref, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-tide-500/10 text-tide-400 text-xs font-mono shrink-0">{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium">{ref.title}</p>
                          <p className="text-xs text-slate-500 mt-1">{ref.authors && `${ref.authors}. `}{ref.journal && <span className="italic">{ref.journal}</span>}{ref.year && ` (${ref.year})`}</p>
                          {ref.pmid && <a href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`} target="_blank" rel="noopener noreferrer" className="text-xs text-tide-400 hover:text-tide-300 mt-1 inline-block">PubMed: {ref.pmid}</a>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-amber-400">Research Use Only</h3>
                <p className="text-xs text-slate-400 mt-1">This product is sold for research purposes only. Not for human consumption, veterinary use, or any purpose outside of controlled laboratory research.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
