import { Link } from 'react-router-dom'
import { FlaskConical, Shield, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-tide-400" />
              <span className="font-bold">Ride The Tide</span>
            </div>
            <p className="text-sm text-slate-400">
              Premium research peptides for the scientific community. 99%+ HPLC purity. COA on every batch.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Markets</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-white">South Africa</span> — Cape Town, JHB, Durban</li>
              <li><span className="text-white">Germany</span> — Berlin, Munich, Hamburg</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/ruo" className="hover:text-white">Research Use Only</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@ridethetide.site</li>
              <li className="flex items-center gap-2"><Shield className="h-4 w-4" /> WhatsApp Support</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-600">
          <p className="mb-2">All products are for research and development use only. Not for human consumption.</p>
          <p>© {new Date().getFullYear()} Ride The Tide. South Africa & Germany.</p>
        </div>
      </div>
    </footer>
  )
}
