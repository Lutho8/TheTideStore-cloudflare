import { Link } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-900 text-lg">Ride The Tide</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Verified compounds.</h3>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to ship.</h3>
          </div>

          {/* Right - Contact */}
          <div className="md:text-right">
            <p className="text-sm text-gray-600 mb-2">
              Need help? Text us, and a team member will reply in minutes.
            </p>
            <a 
              href="https://wa.me/491624747159" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline block mb-1"
            >
              +49 162 4747159
            </a>
            <a 
              href="mailto:support@ridethetide.site" 
              className="text-blue-600 hover:underline text-sm"
            >
              support@ridethetide.site
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © Ride The Tide {new Date().getFullYear()}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-900">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-900">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            All products on this site are for research and development use only. Products are not for human consumption of any kind. The statements made on this website have not been evaluated by the US Food and Drug Administration. The statements and the products of this company are not intended to diagnose, treat, cure, or prevent any disease.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed mb-3">
            Ride The Tide is a chemical supplier. Ride The Tide is not a compounding pharmacy or chemical compounding facility as defined under 503A of the Federal Food, Drug, and Cosmetic Act. Ride The Tide is not an outsourcing facility as defined under 503B of the Federal Food, Drug, and Cosmetic Act.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            All products are sold for research, laboratory, or analytical purposes only, and are not for human consumption.
          </p>
        </div>
      </div>
    </footer>
  )
}
