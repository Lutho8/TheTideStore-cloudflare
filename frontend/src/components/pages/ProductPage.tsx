import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { apiFetch } from '../../hooks/useAuthStore'
import { useCartStore } from '../../hooks/useCartStore'
import {
  ShoppingCart,
  Check,
  Beaker,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  FlaskConical,
  Truck,
  ShieldCheck,
  Home,
} from 'lucide-react'

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
  variants: {
    id: string
    name: string
    price: number
    comparePrice: number | null
    dosageMg: number | null
    vialCount: number
  }[]
  references: {
    authors: string | null
    title: string
    journal: string | null
    year: number | null
    doi: string | null
    pmid: string | null
  }[]
  coaBatches: {
    id: string
    batchNumber: string
    testType: string
    pdfUrl: string | null
  }[]
  coaLab: string | null
  hplcPurity: string | null
  pubchemId: string | null
  structureImageUrl: string | null
}

const FAQS = [
  {
    q: 'What is the purity of your research compounds?',
    a: 'All compounds are third-party tested via HPLC and MS to confirm ≥99% purity, identity, and quantity. Certificates of Analysis (COAs) are available for every batch.',
  },
  {
    q: 'How quickly do orders ship?',
    a: 'Orders placed before 14:00 CET ship the same business day. Most EU deliveries arrive within 1–3 business days.',
  },
  {
    q: 'Are these products for human consumption?',
    a: 'No. All products are sold strictly for in-vitro research and laboratory use only. They are not intended for human or animal consumption.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, SEPA bank transfers, and cryptocurrency via NOWPayments.',
  },
]

export function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantityType, setQuantityType] = useState<'single' | 'pack'>('single')
  const [added, setAdded] = useState(false)
  const [coaTab, setCoaTab] = useState('purity')
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    setLoading(true)
    apiFetch(`/products/${slug}`)
      .then((data) => {
        setProduct(data)
        const defaultV =
          data.variants.find((v: any) => v.isDefault) || data.variants[0]
        if (defaultV) setSelectedVariant(defaultV.id)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(p)

  const renderFormula = (f: string) => {
    const subscriptMap: Record<string, string> = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉',
    }
    const parts: { text: string; isSub: boolean }[] = []
    let current = '',
      inNumber = false
    for (const char of f) {
      if (/\d/.test(char)) {
        if (!inNumber && current) {
          parts.push({ text: current, isSub: false })
          current = ''
        }
        inNumber = true
        current += char
      } else {
        if (inNumber && current) {
          parts.push({ text: current, isSub: true })
          current = ''
        }
        inNumber = false
        current += char
      }
    }
    if (current) parts.push({ text: current, isSub: inNumber })
    return parts.map((part, i) => {
      if (part.isSub)
        return (
          <sub key={i} className="text-xs text-gray-500">
            {part.text
              .split('')
              .map((c) => subscriptMap[c] || c)
              .join('')}
          </sub>
        )
      return <span key={i}>{part.text}</span>
    })
  }

  const handleAddToCart = () => {
    if (!product || !variant) return
    const vialCount = quantityType === 'pack' ? 10 : 1
    const price = displayPrice
    addItem({
      id: `${product.id}-${variant.id}-${quantityType}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      variantId: variant.id,
      variantName: variant.name,
      price,
      quantity: 1,
      imageUrl: product.images[0]?.url || '',
      dosageMg: variant.dosageMg,
      vialCount,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )

  if (!product)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
          <Link
            to="/shop"
            className="text-blue-600 hover:underline mt-2 inline-block text-sm"
          >
            Back to catalog
          </Link>
        </div>
      </div>
    )

  const variant =
    product.variants.find((v) => v.id === selectedVariant) ||
    product.variants[0]
  const unitPrice = variant?.price ?? 0
  const packPrice = unitPrice * 10 * 0.85
  const displayPrice = quantityType === 'pack' ? packPrice : unitPrice

  const dosageVariants = product.variants.filter((v) => v.dosageMg !== null)
  const uniqueDosages = Array.from(
    new Map(dosageVariants.map((v) => [v.dosageMg, v])).values()
  )

  let keyAreas: string[] = []
  try {
    if (product.keyAreasJson) keyAreas = JSON.parse(product.keyAreasJson)
  } catch {}

  const filteredCoas = product.coaBatches.filter(
    (c) => coaTab === 'all' || c.testType === coaTab
  )
  const activeDosage = variant?.dosageMg ?? 10
  const displayName = product.name.replace('Research Compound', '').trim()

  return (
    <div className="min-h-screen bg-white">
      {/* Support Banner */}
      <div className="bg-gray-50 border-b border-gray-200 py-2.5 text-center text-sm text-gray-600">
        Need help? Text us and our team of experts will reply in minutes{' '}
        <a
          href="https://wa.me/491624747159"
          className="text-blue-600 font-medium hover:underline"
        >
          +49 162 4747159
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-900 flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <span className="text-gray-300">&gt;</span>
          <Link to="/shop" className="hover:text-gray-900">
            Products
          </Link>
          <span className="text-gray-300">&gt;</span>
          <span className="text-gray-900 font-medium">{displayName}</span>
        </nav>

        {/* Product Header - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {product.images[activeImage] ? (
                <img
                  src={product.images[activeImage].url}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Beaker className="h-24 w-24 text-gray-200" />
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 bg-gray-50 rounded-lg border overflow-hidden transition-all ${
                      i === activeImage
                        ? 'border-blue-600 ring-2 ring-blue-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.alt || ''}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title + CAS */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {displayName}
              </h1>
              {product.casNumber && (
                <p className="text-sm text-gray-500">
                  CAS #: {product.casNumber}
                </p>
              )}
            </div>

            {/* Size Selector */}
            {uniqueDosages.length > 0 && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {uniqueDosages.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v.id)}
                      className={`px-5 py-2 rounded-full text-sm border-2 transition-all ${
                        v.id === selectedVariant
                          ? 'border-blue-600 bg-blue-600 text-white font-medium'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
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
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Quantity
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setQuantityType('single')}
                  className={`px-5 py-2 rounded-full text-sm border-2 transition-all ${
                    quantityType === 'single'
                      ? 'border-blue-600 bg-blue-600 text-white font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Single Vial
                </button>
                <button
                  onClick={() => setQuantityType('pack')}
                  className={`px-5 py-2 rounded-full text-sm border-2 transition-all ${
                    quantityType === 'pack'
                      ? 'border-blue-600 bg-blue-600 text-white font-medium'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Pack of 10
                </button>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="border-t border-gray-200 pt-5">
              <p className="text-sm text-gray-900 font-medium mb-0.5">
                {displayName}
              </p>
              <p className="text-sm text-gray-500 mb-3">
                Order Now, Ships Today
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(displayPrice)}
                </span>
                {quantityType === 'pack' && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(unitPrice * 10)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-5">One-time</p>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3.5 rounded-lg font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-sm ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add To Cart
                  </>
                )}
              </button>

              {/* NowPayments Crypto Button */}
              <div className="mt-3">
                <a
                  href="https://nowpayments.io/payment/?iid=6076227642&source=button"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block"
                >
                  <img
                    src="https://nowpayments.io/images/embeds/payment-button-black.svg"
                    alt="Crypto payment button by NOWPayments"
                    className="w-full max-w-xs mx-auto"
                  />
                </a>
              </div>
            </div>

            {/* RUO Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-1.5">
                Research Use Only
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All products are intended solely for laboratory research and are
                not for human or animal consumption. By purchasing, the buyer
                agrees to use these products in compliance with all applicable
                laws.
              </p>
            </div>
          </div>
        </div>

        {/* COA Section */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-2 mb-4">
            {['purity', 'endotoxin'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCoaTab(tab)}
                className={`px-4 py-2 rounded-full text-sm border-2 transition-all ${
                  coaTab === tab
                    ? 'border-blue-600 bg-blue-600 text-white font-medium'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                }`}
              >
                {tab === 'purity'
                  ? 'Purity, ID, Quantity'
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <span className="px-4 py-2 rounded-full text-sm border-2 border-gray-200 bg-white text-gray-600">
              {activeDosage}mg
            </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Certificate of Analysis
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              Third-party tested for 99% purity, ID, quantity.
            </p>

            <div className="flex flex-wrap gap-2 items-center">
              {filteredCoas.length > 0 ? (
                filteredCoas.map((coa) => (
                  <a
                    key={coa.id}
                    href={coa.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    {coa.batchNumber}
                  </a>
                ))
              ) : (
                <>
                  <span className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium">
                    DPS-6963679
                  </span>
                  <span className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-full text-sm font-medium">
                    DPS-7058391
                  </span>
                </>
              )}
              <button className="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">
                View all
              </button>
            </div>
          </div>
        </div>

        {/* Overview */}
        {product.overview && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {displayName} Overview
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>{product.overview}</p>
            </div>
            {product.references[0] && (
              <p className="text-xs text-gray-500 mt-3 italic">
                {product.references[0].authors} et al. (
                {product.references[0].year}).
              </p>
            )}
          </div>
        )}

        {/* History */}
        {product.history && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">History</h2>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>{product.history}</p>
            </div>
            {product.references[1] && (
              <p className="text-xs text-gray-500 mt-3 italic">
                {product.references[1].authors} et al. (
                {product.references[1].year}).
              </p>
            )}
          </div>
        )}

        {/* Structure */}
        {(product.structureImageUrl || product.molecularFormula) && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {displayName} Structure
            </h2>
            {product.structureImageUrl && (
              <div className="bg-gray-50 rounded-xl p-8 mb-5 flex items-center justify-center border border-gray-100">
                <img
                  src={product.structureImageUrl}
                  alt={`${product.name} molecular structure`}
                  className="max-w-full max-h-80 object-contain"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {product.casNumber && (
                <div>
                  <span className="text-gray-500">CAS #:</span>{' '}
                  <span className="font-mono text-gray-900">
                    {product.casNumber}
                  </span>
                </div>
              )}
              {product.molecularFormula && (
                <div>
                  <span className="text-gray-500">Molecular Formula:</span>{' '}
                  <span className="font-mono text-gray-900">
                    {renderFormula(product.molecularFormula)}
                  </span>
                </div>
              )}
              {product.molecularWeight && (
                <div>
                  <span className="text-gray-500">Molecular Weight:</span>{' '}
                  <span className="font-mono text-gray-900">
                    {product.molecularWeight} g/mol
                  </span>
                </div>
              )}
              {product.pubchemId && (
                <div>
                  <span className="text-gray-500">PubChem ID:</span>{' '}
                  <span className="font-mono text-gray-900">
                    {product.pubchemId}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Research Findings */}
        {product.researchFindings && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Research Findings
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed mb-4 space-y-3">
              <p>{product.researchFindings}</p>
            </div>
            {keyAreas.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Key Areas of Research:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {keyAreas.map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-xs text-gray-500 italic">
              Together, these findings suggest broad experimental potential for{' '}
              {displayName} across multiple biological pathways.
            </p>
            {product.references[2] && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {product.references[2].authors} et al. (
                {product.references[2].year}).
              </p>
            )}
          </div>
        )}

        {/* References */}
        {product.references.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">References</h2>
            <div className="space-y-3">
              {product.references.map((ref, i) => (
                <div key={i} className="text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-900">
                      {i + 1}.{' '}
                    </span>
                    {ref.authors && (
                      <span className="font-medium">{ref.authors}</span>
                    )}
                    {ref.year && <span> ({ref.year}). </span>}
                    {ref.title && (
                      <span className="italic">{ref.title}</span>
                    )}
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

        {/* Our Process */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Our Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FlaskConical className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                1. Synthesis
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Compounds are synthesized under strict laboratory conditions by
                experienced chemists.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                2. Testing
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every batch is third-party tested for purity, identity, and
                quantity via HPLC & MS.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                3. Shipping
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Discreet, temperature-controlled packaging with same-day dispatch
                on orders before 14:00 CET.
              </p>
            </div>
          </div>
        </div>

        {/* SMS Support Widget */}
        <div className="mb-16">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Questions about {displayName}?
              </h3>
              <p className="text-sm text-gray-600">
                Text our research support team and get a reply in minutes.
              </p>
            </div>
            <a
              href="https://wa.me/491624747159"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shrink-0"
            >
              Text Us
            </a>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    {faq.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 shrink-0 ml-2" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="space-y-2">
          {/* Size pills */}
          {uniqueDosages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {uniqueDosages.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v.id)}
                  className={`px-3 py-1 rounded-full text-xs border-2 whitespace-nowrap transition-all ${
                    v.id === selectedVariant
                      ? 'border-blue-600 bg-blue-600 text-white font-medium'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  {v.dosageMg}mg
                </button>
              ))}
            </div>
          )}
          {/* Quantity pills */}
          <div className="flex gap-2">
            <button
              onClick={() => setQuantityType('single')}
              className={`px-3 py-1 rounded-full text-xs border-2 transition-all ${
                quantityType === 'single'
                  ? 'border-blue-600 bg-blue-600 text-white font-medium'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              Single Vial
            </button>
            <button
              onClick={() => setQuantityType('pack')}
              className={`px-3 py-1 rounded-full text-xs border-2 transition-all ${
                quantityType === 'pack'
                  ? 'border-blue-600 bg-blue-600 text-white font-medium'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              Pack of 10
            </button>
          </div>
          {/* Price + CTA */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900">
                {formatPrice(displayPrice)}
              </p>
              <p className="text-xs text-gray-500">
                {quantityType === 'pack' ? 'Pack of 10' : 'Single Vial'}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {added ? 'Added' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
