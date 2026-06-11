import { Link } from 'react-router-dom'
import { ArrowRight, FlaskConical, Shield, Truck, Microscope, Globe } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-tide-900/20 via-slate-950 to-slate-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tide-500/10 border border-tide-500/20 text-tide-400 text-sm mb-8">
              <Globe className="h-4 w-4" />
              South Africa & Germany — Research Use Only
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Premium Research <span className="text-tide-400">Peptides</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              99%+ HPLC purity. COA on every batch. Same-day dispatch from Cape Town & Berlin.
              For qualified researchers only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 bg-tide-600 hover:bg-tide-500 text-white px-8 py-4 rounded-xl font-medium transition-colors">
                Browse Catalog <ArrowRight className="h-5 w-5" />
              </Link>
              <Link to="/testing" className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-medium transition-colors">
                <Microscope className="h-5 w-5" /> Lab Testing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Microscope, title: '99%+ HPLC', desc: 'Third-party verified' },
              { icon: Shield, title: 'COA Every Batch', desc: 'Janoshik tested' },
              { icon: Truck, title: 'Same-Day Dispatch', desc: 'Cape Town & Berlin' },
              { icon: FlaskConical, title: 'Research Only', desc: 'Not for human use' },
            ].map(b => (
              <div key={b.title}>
                <div className="inline-flex p-3 bg-tide-500/10 rounded-xl mb-3"><b.icon className="h-6 w-6 text-tide-400" /></div>
                <h3 className="font-semibold text-sm">{b.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Research Categories</h2>
            <p className="text-slate-400">Browse our catalog by research area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'GLP-1 & Metabolic', desc: 'Triple agonists, dual agonists, and metabolic research compounds.', href: '/shop?tag=GLP-1', code: 'DP Series' },
              { title: 'Healing & Recovery', desc: 'BPC-157, TB-500, and tissue repair research peptides.', href: '/shop?tag=healing', code: 'HR Series' },
              { title: 'Growth & Performance', desc: 'CJC-1295, Ipamorelin, Tesamorelin, and related compounds.', href: '/shop?tag=growth', code: 'GP Series' },
            ].map(cat => (
              <Link key={cat.title} to={cat.href} className="group block p-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-tide-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-tide-400 bg-tide-500/10 px-2 py-1 rounded">{cat.code}</span>
                  <ArrowRight className="h-5 w-5 text-slate-600 group-hover:text-tide-400 transition-colors" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{cat.title}</h3>
                <p className="text-sm text-slate-400">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="border-t border-slate-800 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-600 leading-relaxed">
            All products are for research and development use only. Not for human consumption.
            Ride The Tide is a chemical supplier. Not a compounding pharmacy. All products sold for research, laboratory, or analytical purposes only.
          </p>
        </div>
      </section>
    </div>
  )
}
