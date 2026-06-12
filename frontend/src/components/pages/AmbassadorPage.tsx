import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Gift, Clock, Headphones,
  Package, Zap, BarChart3, Star, ChevronDown, ChevronUp,
  Percent, Award, Mail, MessageCircle
} from 'lucide-react'

const TIERS = [
  {
    name: 'Tide Starter',
    salesMin: 0,
    salesMax: 999,
    commission: 20,
    benefits: ['20% commission', '90-day cookie', 'Custom discount code', 'Marketing kit'],
    color: 'bg-gray-100',
    badge: 'bg-gray-200 text-gray-700',
  },
  {
    name: 'Tide Pro',
    salesMin: 1000,
    salesMax: 4999,
    commission: 25,
    benefits: ['25% commission', '90-day cookie', 'Custom discount code', 'Marketing kit', '€50 product voucher monthly', 'Priority support'],
    color: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Tide Elite',
    salesMin: 5000,
    salesMax: 9999,
    commission: 30,
    benefits: ['30% commission', '90-day cookie', 'Custom discount code', 'Marketing kit', '€100 product voucher monthly', 'Dedicated manager', 'Early product access', 'Exclusive ambassador products'],
    color: 'bg-indigo-50',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Tide Legend',
    salesMin: 10000,
    salesMax: Infinity,
    commission: 35,
    benefits: ['35% commission', '90-day cookie', 'Custom discount code', 'Marketing kit', '€200 product voucher monthly', 'Dedicated manager', 'Early product access', 'Exclusive ambassador products', 'Co-branded content', 'Annual retreat invite'],
    color: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
  },
]

const BENEFITS = [
  {
    icon: Percent,
    title: '20% Base Commission',
    desc: 'Earn 20% on every sale you refer. Scale up to 35% as you grow.',
  },
  {
    icon: Clock,
    title: '90-Day Cookie',
    desc: 'Industry-leading 90-day tracking window. Get credit even if they buy later.',
  },
  {
    icon: Gift,
    title: 'Product Vouchers',
    desc: 'Earn €50–€200 in free product vouchers monthly based on your tier.',
  },
  {
    icon: Package,
    title: 'Free Samples',
    desc: 'Receive complimentary peptide samples for content creation and reviews.',
  },
  {
    icon: Zap,
    title: 'Custom Discount Codes',
    desc: 'Give your audience 10% off with your personal code. Boosts conversions.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    desc: 'Pro and Elite ambassadors get a dedicated affiliate manager.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Dashboard',
    desc: 'Track clicks, conversions, commissions, and payouts in real time.',
  },
  {
    icon: Star,
    title: 'Early Access',
    desc: 'Elite & Legend ambassadors get first access to new peptide launches.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Apply',
    desc: 'Fill out the application below. We review every applicant personally within 2 business days.',
  },
  {
    step: '02',
    title: 'Get Approved',
    desc: 'Receive your unique affiliate link, custom discount code, and marketing kit.',
  },
  {
    step: '03',
    title: 'Share',
    desc: 'Promote Ride The Tide to your audience via social, blog, email, or any channel.',
  },
  {
    step: '04',
    title: 'Earn',
    desc: 'Earn 20–35% commission on every sale. Get paid monthly via PayPal or SEPA.',
  },
]

const COMPARISON = [
  { feature: 'Base Commission', tide: '20%', blank: 'Not disclosed', dp: 'Not disclosed', ag: '20%' },
  { feature: 'Max Commission', tide: '35%', blank: 'Not disclosed', dp: 'Not disclosed', ag: '20%' },
  { feature: 'Cookie Duration', tide: '90 days', blank: '90 days', dp: '30 days', ag: '60 days' },
  { feature: 'Product Vouchers', tide: '€50–€200/mo', blank: 'No', dp: 'No', ag: 'No' },
  { feature: 'Free Samples', tide: 'Yes', blank: 'No', dp: 'No', ag: 'No' },
  { feature: 'Custom Discount Codes', tide: 'Yes (10% off)', blank: 'No', dp: 'No', ag: 'Yes' },
  { feature: 'Tiered Structure', tide: '4 tiers', blank: 'No', dp: 'No', ag: 'No' },
  { feature: 'Dedicated Manager', tide: 'Pro+ tiers', blank: 'Priority support', dp: 'No', ag: 'Yes' },
  { feature: 'Early Product Access', tide: 'Elite+ tiers', blank: 'No', dp: 'No', ag: 'No' },
  { feature: 'Payout Methods', tide: 'PayPal / SEPA / Crypto', blank: 'Not disclosed', dp: 'Not disclosed', ag: 'Check / PayPal' },
]

const FAQS = [
  {
    q: 'Who can become a Tide Ambassador?',
    a: 'Anyone with an engaged audience in the health, fitness, biohacking, research, or wellness space. This includes bloggers, YouTubers, Instagram/TikTok creators, podcasters, email newsletter writers, and even researchers with professional networks.',
  },
  {
    q: 'How and when do I get paid?',
    a: 'We pay monthly via PayPal, SEPA bank transfer, or cryptocurrency (BTC/ETH/USDT). Minimum payout is €50. Commissions are verified 30 days after the sale to account for returns.',
  },
  {
    q: 'Can I promote outside the EU?',
    a: 'Yes. While our primary market is the EU, we ship to many international destinations. You can promote to any audience that can legally receive research peptides in their jurisdiction.',
  },
  {
    q: 'What marketing materials do you provide?',
    a: 'Every ambassador receives a marketing kit including: high-resolution product images, COA documents, research summaries, pre-written social media captions, email templates, banner ads, and a brand style guide.',
  },
  {
    q: 'How does the tiered commission work?',
    a: 'Your commission rate increases automatically as your monthly referred sales grow. Hit €1,000 in a month → 25%. Hit €5,000 → 30%. Hit €10,000 → 35%. It resets monthly, so you always have a fresh start.',
  },
  {
    q: 'Do I get free products?',
    a: 'Yes. All ambassadors receive free product samples upon approval. Additionally, Pro ambassadors get €50/month in product vouchers, Elite get €100/month, and Legend get €200/month.',
  },
  {
    q: 'Can I use my own discount code?',
    a: 'Absolutely. Every ambassador gets a personalized discount code (e.g., AMBASSADOR10) that gives their audience 10% off. This boosts your conversion rate and gives your followers real value.',
  },
  {
    q: 'Is there a minimum sales requirement?',
    a: 'No. There is no minimum sales quota to remain in the program. However, accounts with zero sales for 6 consecutive months may be reviewed for inactivity.',
  },
]

export function AmbassadorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    website: '',
    instagram: '',
    youtube: '',
    tiktok: '',
    audience: '',
    why: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would POST to the API
    setFormSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gray-50 pt-16 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              Now Accepting Applications
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The Tide<br />Ambassadors
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
              Join the most rewarding peptide affiliate program in Europe. 
              Earn <span className="font-bold text-blue-600">20–35% commission</span>, get free products, 
              and grow with a brand that puts its partners first.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors text-lg"
              >
                Apply Now <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-colors text-lg"
              >
                Learn More
              </a>
            </div>
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>20% base commission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>90-day cookie</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Monthly payouts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-blue-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '20–35%', label: 'Commission Rate' },
              { value: '90 Days', label: 'Cookie Duration' },
              { value: '€50', label: 'Min. Payout' },
              { value: '2 Days', label: 'Approval Time' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Ambassadors Choose Ride The Tide
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We built this program by studying the best affiliate programs in health, supplements, and peptides — then made ours better.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group bg-gray-50 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <b.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tiered Commission Structure
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The more you sell, the more you earn. Scale from 20% to 35% as you grow your audience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`${tier.color} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow`}
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${tier.badge}`}>
                  {tier.name}
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-1">{tier.commission}%</div>
                <div className="text-sm text-gray-500 mb-4">
                  {tier.salesMax === Infinity
                    ? `€${tier.salesMin.toLocaleString()}+ / month`
                    : `€${tier.salesMin.toLocaleString()} – €${tier.salesMax.toLocaleString()} / month`}
                </div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four simple steps from application to your first commission.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How We Compare
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See why The Tide Ambassadors outperforms other peptide and supplement affiliate programs.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Feature</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-blue-600 bg-blue-50">Ride The Tide</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-gray-500">Blank Peptides</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-gray-500">Direct Peptides</th>
                    <th className="text-center px-4 py-4 text-sm font-semibold text-gray-500">Athletic Greens</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-3 text-sm text-gray-700 font-medium">{row.feature}</td>
                      <td className="px-4 py-3 text-sm text-center text-blue-700 font-semibold bg-blue-50/50">{row.tide}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-500">{row.blank}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-500">{row.dp}</td>
                      <td className="px-4 py-3 text-sm text-center text-gray-500">{row.ag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Earnings Calculator
            </h2>
            <p className="text-lg text-gray-600">
              See how much you could earn as a Tide Ambassador.
            </p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-sm text-gray-500 mb-2">Starter Ambassador</div>
                <div className="text-3xl font-bold text-gray-900">€500/mo</div>
                <div className="text-sm text-gray-500 mt-1">~€2,500 in sales @ 20%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Pro Ambassador</div>
                <div className="text-3xl font-bold text-blue-600">€1,250/mo</div>
                <div className="text-sm text-gray-500 mt-1">~€5,000 in sales @ 25%</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Elite Ambassador</div>
                <div className="text-3xl font-bold text-indigo-600">€3,000/mo</div>
                <div className="text-sm text-gray-500 mt-1">~€10,000 in sales @ 30%</div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                Plus product vouchers, free samples, and performance bonuses. 
                Legend ambassadors earning €10,000+ in monthly sales make <span className="font-semibold text-gray-900">€3,500+/mo</span> at 35%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {formSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying to The Tide Ambassadors. Our team will review your application and be in touch within 2 business days.
              </p>
              <p className="text-sm text-gray-500">
                In the meantime, follow us on social media for updates and ambassador spotlights.
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <a href="https://wa.me/491624747159" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageCircle className="h-4 w-4" /> Contact Us
                </a>
                <Link to="/shop" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors">
                  Browse Products
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Apply to Become an Ambassador
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below. We review every application personally.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization / Lab Name</label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your lab, company, or brand"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website / Blog</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Handles</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Instagram @handle"
                    />
                    <input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="YouTube channel"
                    />
                    <input
                      type="text"
                      value={formData.tiktok}
                      onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="TikTok @handle"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Audience Size & Niche *</label>
                  <textarea
                    required
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                    rows={3}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 15K Instagram followers in the biohacking niche, or a research blog with 5K monthly visitors..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why you'd be a great fit *</label>
                  <textarea
                    required
                    value={formData.why}
                    onChange={(e) => setFormData({ ...formData, why: e.target.value })}
                    rows={4}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your audience, your content style, and why you want to partner with Ride The Tide..."
                  />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Submit Application <ArrowRight className="h-5 w-5" />
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    We review every application within 2 business days. No spam, ever.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions about the program?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Our ambassador team is here to help. Reach out and get a response within minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/491624747159"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-blue-50 transition-colors"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a
              href="mailto:ambassadors@ridethetide.site"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              <Mail className="h-5 w-5" /> ambassadors@ridethetide.site
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
