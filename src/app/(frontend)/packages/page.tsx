import { Metadata } from 'next'
import Link from 'next/link'
import { getPackages, getDestinations } from '@/lib/payload-api'
import PackageFilters from '@/components/packages/PackageFilters'
import PackageGrid from '@/components/packages/PackageGrid'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{
    category?: string
    destination?: string
    sort?: string
    page?: string
    search?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const category = params.category
  const title = category ? ` ${category.replace('-', ' ')} Packages` : 'Tour Packages'

  return {
    title: `Explore${title} - SafariIndia`,
    description:
      'Browse our curated collection of tour packages across India. Find the perfect trip for your next adventure.',
  }
}

export default async function PackagesPage({ searchParams }: PageProps) {
  const params = await searchParams

  const page = parseInt(params.page || '1')
  const category = params.category?.split(',')[0]
  const destination = params.destination
  const search = params.search
  const minPrice = params.minPrice ? parseInt(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? parseInt(params.maxPrice) : undefined

  const sortMap: Record<string, string> = {
    'price-low': 'price.original',
    'price-high': '-price.original',
    newest: '-createdAt',
    featured: '-isFeatured',
  }
  const sort = params.sort ? sortMap[params.sort] : undefined

  const [packagesResult, destinations] = await Promise.all([
    getPackages({
      category,
      destination,
      search,
      page,
      limit: 12,
    }),
    getDestinations(),
  ])

  const totalPages = Math.ceil(packagesResult.totalDocs / packagesResult.limit)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Packages</span>
          </nav>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Explore Our Tour Packages
          </h1>
          <p className="text-white/80 mt-3 text-lg">
            {packagesResult.totalDocs} packages available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PackageFilters destinations={destinations as any} />

          <div className="flex-1">
            <PackageGrid packages={packagesResult.docs as any} />

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {page > 1 && (
                  <Link
                    href={`/packages?${new URLSearchParams({ ...params, page: String(page - 1) }).toString()}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    Previous
                  </Link>
                )}

                <div className="flex gap-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    const isActive = pageNum === page
                    return (
                      <Link
                        key={pageNum}
                        href={`/packages?${new URLSearchParams({ ...params, page: String(pageNum) }).toString()}`}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  })}
                </div>

                {page < totalPages && (
                  <Link
                    href={`/packages?${new URLSearchParams({ ...params, page: String(page + 1) }).toString()}`}
                    className="px-4 py-2 border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
