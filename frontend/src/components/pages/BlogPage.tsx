import { ArrowRight, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Research insights, peptide science, and industry updates from the Ride The Tide team.
          </p>
        </div>
      </section>

      {/* Placeholder */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 max-w-lg mx-auto">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h2>
          <p className="text-sm text-gray-600 mb-6">
            We are preparing in-depth articles on peptide research, laboratory best practices,
            and the latest developments in biochemical science. Check back soon.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
