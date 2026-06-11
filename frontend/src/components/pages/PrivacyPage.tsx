import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl">
            We respect your privacy and are committed to protecting your personal data in compliance with GDPR.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Data We Collect</h2>
            <p className="mb-2">
              We collect only the information necessary to process your orders and provide customer support:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>Name and contact details (email, phone, shipping address)</li>
              <li>Order history and payment transaction references</li>
              <li>Account credentials (if you create an account)</li>
              <li>Communication records (support messages, emails)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">How We Use Your Data</h2>
            <p className="mb-2">
              Your personal data is used exclusively for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>Processing and fulfilling your orders</li>
              <li>Providing shipping updates and tracking information</li>
              <li>Responding to customer support inquiries</li>
              <li>Complying with legal and tax obligations</li>
              <li>Preventing fraud and ensuring site security</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Data Storage & Security</h2>
            <p>
              We store your data on secure servers with encryption at rest and in transit. Access is restricted
              to authorized personnel only. We do not sell, rent, or trade your personal information to third parties.
              Payment details are handled by our PCI-compliant payment processors (Stripe, NowPayments) — we do not
              store full card numbers on our servers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">GDPR Compliance (EU Customers)</h2>
            <p className="mb-2">
              If you are located in the European Union, you have the following rights under the General Data Protection Regulation:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>Right to access the personal data we hold about you</li>
              <li>Right to rectification of inaccurate or incomplete data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:support@ridethetide.site" className="text-blue-600 hover:underline">support@ridethetide.site</a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Cookies & Analytics</h2>
            <p>
              We use essential cookies to maintain your session and shopping cart. We do not use third-party
              advertising cookies or tracking pixels. Basic anonymized analytics may be used to improve site performance.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Retention</h2>
            <p>
              We retain your personal data for as long as necessary to fulfill the purposes outlined above,
              or as required by applicable law (typically 6–10 years for tax and accounting records).
              After this period, data is securely deleted or anonymized.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">Data Controller</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Ride The Tide is the data controller for personal data collected through this website.
                  For privacy-related inquiries, email{' '}
                  <a href="mailto:support@ridethetide.site" className="text-blue-600 hover:underline">support@ridethetide.site</a>.
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
