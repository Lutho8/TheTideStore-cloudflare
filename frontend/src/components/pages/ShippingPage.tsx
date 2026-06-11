import { Truck, Clock, Globe, Package, MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-gray-600 max-w-2xl">
            Fast, discreet, and tracked shipping throughout the EU and selected international destinations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-900 mb-1">Same-Day Dispatch</h3>
            <p className="text-xs text-gray-600">Orders placed before 14:00 CET ship the same business day.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-900 mb-1">DHL / DPD Express</h3>
            <p className="text-xs text-gray-600">Reliable courier partners with full tracking and insurance.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <Package className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-900 mb-1">Discreet Packaging</h3>
            <p className="text-xs text-gray-600">Plain, unmarked boxes with no external product identifiers.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-900 mb-1">EU & International</h3>
            <p className="text-xs text-gray-600">We ship throughout the EU, Switzerland, and selected worldwide destinations.</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">EU Shipping</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              All EU orders are dispatched from our European distribution facility. Standard delivery
              times range from 1–3 business days for Western Europe and 3–7 business days for Eastern Europe.
              Tracking information is emailed within 24 hours of dispatch.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Tracking Your Order</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Once your order ships, you will receive an email with a tracking link. You can also contact
              us via WhatsApp or SMS with your order number for real-time updates. Tracking is available
              for all DHL and DPD shipments.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">International Shipping</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We ship to Switzerland, Norway, the United Kingdom, and selected other international destinations.
              Delivery times vary by country, typically 5–10 business days. Customs duties and import taxes
              are the responsibility of the recipient. Please contact us before ordering if your country
              is not listed at checkout.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Shipping Address Requirements</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Please ensure your shipping address is complete and accurate, including a valid phone number
                  for courier contact. We are not responsible for delays or losses caused by incorrect addresses.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Start Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
