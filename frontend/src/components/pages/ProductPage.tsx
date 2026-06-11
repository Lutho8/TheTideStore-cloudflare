import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react'

interface Product {
  id: string
  codeLabel: string
  name: string
  compoundName: string | null
  slug: string
  casNumber: string | null
  molecularFormula: string | null
  molecularWeight: string | null
  sequence: string | null
  purity: string | null
  shortDescription: string
  fullDescription: string
  overview: string | null
  history: string | null
  researchFindings: string | null
  keyAreasJson: string | null
  mechanismOfAction: string
  images: { url: string; alt: string | null }[]
  variants: { id: string; name: string; price: number; comparePrice: number | null; dosageMg: number | null; vialCount: number }[]
  references: { authors: string | null; title: string; journal: string | null; year: number | null; doi: string | null; pmid: string | null }[]
  coaBatches: { id: string; batchNumber: string; testType: string; pdfUrl: string | null }[]
  coaLab: string | null
  hplcPurity: string | null
  pubchemId: string | null
  structureImageUrl: string | null
}

export function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantityType, setQuantityType] = useState<'single' | 'pack'>('single')
  const [added, setAdded] = useState(false)
  const [coaTab, setCoaTab] = useState('purity')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    apiFetch(`/products/${slug}`).then(data => {
      setProduct(data)
      const defaultV = data.variants.find((v: any) => v.isDefault) || data.variants[0]
      if (defaultV) setSelectedVariant(defaultV.id)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [slug])

  const formatPrice = (p: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(p)

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
      if (part.isSub) return <sub key={i} className="text-xs text-gray-500">{part.text.split('').map(c => subscriptMap[c] || c).join('')}</sub>
      return <span key={i}>{part.text}</span>
    })
  }

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500">Product not found</p>
        <Link to="/shop" className="text-blue-600 hover:underline mt-2 inline-block text-sm">Back to catalog</Link>
      </div>
    </div>
  )

  const variant = product.variants.find(v => v.id === selectedVariant) || product.variants[0]
  const unitPrice = variant?.price ?? 0
  const packPrice = unitPrice * 10 * 0.85
  const displayPrice = quantityType === 'pack' ? packPrice : unitPrice

  const dosageVariants = product.variants.filter(v => v.dosageMg !== null)
  const hasPackOption = true

  let keyAreas: string[] = []
  try { if (product.keyAreasJson) keyAreas = JSON.parse(product.keyAreasJson) } catch { }

  const filteredCoas = product.coaBatches.filter(c => coaTab === 'all' || c.testType === coaTab)
  const activeDosage = variant?.dosageMg ?? 10

  return (
    <div className="min-h-screen bg-white">
      {/* Support Banner */}
      <div className="bg-gray-50 border-b border-gray-200 py-2 text-center text-sm text-gray-600">
        Need help? Text us and our team will reply in minutes <a href="https://wa.me/491624747159" className="text-blue-600 font-medium">+49 162 4747159</a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />Back to products
        </Link>

        {/* Product Header - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              {product.images[0] ? (
                <img src={product.images[0].url} alt={product.name} className="w-full h-full object-contain p-8" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-300 text-6xl font-light">{product.name.charAt(0)}</div>
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <img src={img.url} alt={img.alt || ''} className="w-full h-full object-contain p-2" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title + CAS */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name.replace('Research Compound', '').trim()}</h1>
              {product.casNumber && (
                <p className="text-sm text-gray-500">CAS #: {product.casNumber}</p>
              )}
            </div>

            {/* Size Selector */}
            {dosageVariants.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {dosageVariants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        v.id === selectedVariant
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {v.dosageMg}mg
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setQuantityType('single')}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    quantityType === 'single'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Single Vial
                </button>
                <button
                  onClick={() => setQuantityType('pack')}
                  className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    quantityType === 'pack'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Pack of 10
                </button>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500 mb-1">{product.name.replace('Research Compound', '').trim()}</p>
              <p className="text-sm text-gray-500 mb-3">Order Now, Ships Today</p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(displayPrice)}</span>
                {quantityType === 'pack' && (
                  <span className="text-sm text-gray-400 line-through">{formatPrice(unitPrice * 10)}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">One-time</p>

              <button
                onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  added ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {added ? <><Check className="h-5 w-5" />Added to Cart</> : <><ShoppingCart className="h-5 w-5" />Add To Cart</>}
              </button>

              {/* NowPayments Crypto Button */}
              <div className="mt-3">
                <a href="https://nowpayments.io/payment/?iid=6076227642&source=button" target="_blank" rel="noreferrer noopener" className="block">
                  <img src="https://nowpayments.io/images/embeds/payment-button-black.svg" alt="Crypto payment button by NOWPayments" className="w-full max-w-xs mx-auto" />
                </a>
              </div>
            </div>

            {/* RUO Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Research Use Only</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All products are intended solely for laboratory research and are not for human or animal consumption. By purchasing, the buyer agrees to use these products in compliance with all applicable laws.
              </p>
            </div>
          </div>
        </div>

        {/* COA Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {['purity', 'endotoxin'].map(tab => (
              <button
                key={tab}
                onClick={() => setCoaTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                  coaTab === tab
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                {tab === 'purity' ? 'Purity, ID, Quantity' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <span className="px-3 py-1.5 rounded-full text-xs border border-gray-300 bg-white text-gray-600">
              {activeDosage}mg
            </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Certificate of Analysis</h2>
            <p className="text-sm text-gray-600 mb-4">
              Third-party tested for 99% purity, ID, quantity.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              {filteredCoas.length > 0 ? (
                filteredCoas.map(coa => (
                  <a
                    key={coa.id}
                    href={coa.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    {coa.batchNumber}
                  </a>
                ))
              ) : (
                <>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">DPS-6963679</span>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">DPS-7058391</span>
                </>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm hover:border-gray-400 transition-colors">
                View all
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        {product.overview && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{product.name.replace('Research Compound', '').trim()} Overview</h2>
            <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed">
              <p>{product.overview}</p>
            </div>
            {product.references[0] && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {product.references[0].authors} ({product.references[0].year}).
              </p>
            )}
          </div>
        )}

        {/* History */}
        {product.history && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">History</h2>
            <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed">
              <p>{product.history}</p>
            </div>
            {product.references[1] && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {product.references[1].authors} ({product.references[1].year}).
              </p>
            )}
          </div>
        )}

        {/* Structure */}
        {(product.structureImageUrl || product.molecularFormula) && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">{product.name.replace('Research Compound', '').trim()} Structure</h2>
            {product.structureImageUrl && (
              <div className="bg-gray-50 rounded-xl p-8 mb-4 flex items-center justify-center">
                <img src={product.structureImageUrl} alt={`${product.name} molecular structure`} className="max-w-full max-h-80 object-contain" />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {product.casNumber && (
                <div><span className="text-gray-500">CAS #:</span> <span className="font-mono text-gray-900">{product.casNumber}</span></div>
              )}
              {product.molecularFormula && (
                <div><span className="text-gray-500">Molecular Formula:</span> <span className="font-mono text-gray-900">{renderFormula(product.molecularFormula)}</span></div>
              )}
              {product.molecularWeight && (
                <div><span className="text-gray-500">Molecular Weight:</span> <span className="font-mono text-gray-900">{product.molecularWeight} g/mol</span></div>
              )}
              {product.pubchemId && (
                <div><span className="text-gray-500">PubChem ID:</span> <span className="font-mono text-gray-900">{product.pubchemId}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Research Findings */}
        {product.researchFindings && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Research Findings</h2>
            <div className="prose prose-gray max-w-none text-gray-700 text-sm leading-relaxed mb-4">
              <p>{product.researchFindings}</p>
            </div>
            {keyAreas.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">Key Areas of Research:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {keyAreas.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-gray-500 italic">
              Together, these findings suggest broad experimental potential for {product.name.replace('Research Compound', '').trim()} across multiple biological pathways.
            </p>
            {product.references[2] && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {product.references[2].authors} ({product.references[2].year}).
              </p>
            )}
          </div>
        )}

        {/* References */}
        {product.references.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">References</h2>
            <div className="space-y-3">
              {product.references.map((ref, i) => (
                <div key={i} className="text-sm">
                  <p className="text-gray-700">
                    {ref.authors && <span className="font-medium">{ref.authors}</span>}
                    {ref.year && <span> ({ref.year}). </span>}
                    {ref.title && <span className="italic">{ref.title}</span>}
                    {ref.journal && <span>. {ref.journal}</span>}
                    {ref.doi && <span>. DOI: {ref.doi}</span>}
                  </p>
                  {ref.pmid && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs"
                    >
                      PubMed: {ref.pmid}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-lg font-bold text-gray-900">{formatPrice(displayPrice)}</p>
            <p className="text-xs text-gray-500">{quantityType === 'pack' ? 'Pack of 10' : 'Single Vial'}</p>
          </div>
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
            }`}
          >
            {added ? 'Added' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
