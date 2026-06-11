export interface User {
  id: string
  phone: string
  name: string | null
  email: string | null
  market: 'ZA' | 'DE'
  phoneVerified: boolean
  createdAt: string
}

export interface ComplianceGate {
  ageConfirmed: boolean
  isResearcher: boolean
  ruoAgreed: boolean
  phoneVerified: boolean
  fullyCompliant: boolean
}

export interface Product {
  id: string
  sku: string
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
  mechanismOfAction: string
  basePrice: number
  comparePrice: number | null
  status: 'draft' | 'active' | 'out_of_stock' | 'discontinued'
  isFeatured: boolean
  images: ProductImage[]
  variants: ProductVariant[]
  references: ResearchReference[]
  coaUrl: string | null
  coaBatchNumber: string | null
  coaLab: string | null
  hplcPurity: string | null
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  dosageMg: number | null
  vialCount: number
  price: number
  comparePrice: number | null
  isDefault: boolean
}

export interface ProductImage {
  id: string
  url: string
  alt: string | null
  isPrimary: boolean
}

export interface ResearchReference {
  id: string
  authors: string | null
  title: string
  journal: string | null
  year: number | null
  doi: string | null
  pmid: string | null
}

export interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  currency: string
  createdAt: string
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  productName: string
  productSku: string
  variantName: string | null
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface Address {
  id: string
  name: string
  recipientName: string
  phone: string
  street: string
  city: string
  province: string | null
  postalCode: string
  country: 'ZA' | 'DE'
  isDefault: boolean
}

export type PaymentMethod = 'payfast' | 'stripe' | 'nowpayments'

export type ShippingMethod = 
  | 'courier-gauteng'
  | 'courier-wc'
  | 'overnight-national'
  | 'standard-national'
  | 'dhl-germany'
  | 'dpd-germany'
