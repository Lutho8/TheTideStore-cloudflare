import { ArrowRight, FlaskConical } from 'lucide-react'
import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 max-w-2xl">
            Please read these terms carefully before placing an order. By using this website, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Research Use Only</h2>
            <p>
              All products sold on this website are intended strictly for research, laboratory, and analytical purposes.
              They are not for human or animal consumption. By purchasing, you confirm that you are a qualified researcher
              or laboratory professional and that you understand the intended use of these compounds.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Purchase Terms</h2>
            <p className="mb-2">
              All orders are subject to availability and confirmation of the order price. We reserve the right to refuse
              or cancel any order for any reason, including but not limited to suspected misuse, incomplete verification,
              or shipping restrictions to your location.
            </p>
            <p>
              Prices are displayed in EUR and include applicable VAT for EU customers where required. Shipping costs
              are calculated at checkout based on destination and package weight.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Legal Compliance</h2>
            <p className="mb-2">
              It is your responsibility to ensure that the products you order are legal to import and possess in your
              country or jurisdiction. Ride The Tide is not liable for customs seizures, import restrictions, or legal
              consequences arising from local regulations.
            </p>
            <p>
              Ride The Tide is a chemical supplier. We are not a compounding pharmacy or outsourcing facility as defined
              under 503A or 503B of the Federal Food, Drug, and Cosmetic Act. We do not provide medical advice, diagnosis,
              or treatment recommendations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Returns & Refunds</h2>
            <p>
              Due to the nature of research chemicals, all sales are final. We do not accept returns for opened or
              unopened products. If your order arrives damaged or incorrect, contact us within 48 hours of delivery
              with photographic evidence and your order number. We will review and resolve eligible claims at our discretion.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Limitation of Liability</h2>
            <p>
              Ride The Tide shall not be liable for any indirect, incidental, or consequential damages arising from
              the use or misuse of our products. Our total liability shall not exceed the purchase price of the product
              in question.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <FlaskConical className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Disclaimer</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The statements made on this website have not been evaluated by the US Food and Drug Administration.
                  The products and statements of this company are not intended to diagnose, treat, cure, or prevent any disease.
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
            Back to Shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
