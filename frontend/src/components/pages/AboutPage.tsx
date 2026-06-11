import { Link } from 'react-router-dom'
import { FlaskConical, ShieldCheck, Microscope, MessageCircle, ArrowRight } from 'lucide-react'

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About Ride The Tide</h1>
          <p className="text-gray-600 max-w-2xl">
            A trusted supplier of research peptides and biochemical compounds for laboratories,
            universities, and research institutions worldwide.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <FlaskConical className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Laboratory Grade</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              All compounds are synthesized under strict laboratory conditions with rigorous quality control at every stage.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Lyophilized</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Products are freeze-dried to maximize stability and shelf life, ensuring you receive compounds in optimal condition.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <Microscope className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Made In-House</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Synthesized and quality-tested at state-of-the-art facilities with full chain-of-custody documentation.
            </p>
          </div>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>
            Ride The Tide is a research chemical supplier dedicated to providing high-purity peptides
            and biochemical compounds for scientific research. We serve academic institutions, private
            laboratories, and research professionals across the European Union and beyond.
          </p>
          <p>
            Every product in our catalog is accompanied by a Certificate of Analysis (COA) from independent
            third-party laboratories. We test for purity (UPLC/MS, HPLC), identity, quantity, and endotoxins
            to ensure the highest standards.
          </p>
          <p>
            We operate with full transparency: batch numbers are public, COAs are downloadable, and our
            team is available via WhatsApp or SMS for rapid support. Same-day dispatch and tracked shipping
            mean your research never has to wait.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-gray-500">WhatsApp / SMS</p>
                <a href="https://wa.me/491624747159" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">
                  +49 162 4747159
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-gray-500">Email</p>
                <a href="mailto:support@ridethetide.site" className="text-blue-600 font-semibold hover:underline">
                  support@ridethetide.site
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
