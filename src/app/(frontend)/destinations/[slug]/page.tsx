import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MapPin, Cloud, Calendar } from 'lucide-react'
import { getDestinationBySlug, getPackages } from '@/lib/payload-api'
import PackageGrid from '@/components/packages/PackageGrid'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)
  
  if (!destination) {
    return { title: 'Destination Not Found - SafariIndia' }
  }

  return {
    title: `${destination.name} - SafariIndia`,
    description: destination.description || `Explore tour packages in ${destination.name}. Discover the best of ${destination.name} with SafariIndia.`,
  }
}

export default async function DestinationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  const packages = await getPackages({ destination: slug })

  const getBestSeason = (category?: string) => {
    switch (category) {
      case 'hill-station': return 'March - June, October - December'
      case 'beach': return 'October - March'
      case 'heritage': return 'October - March'
      case 'adventure': return 'March - June, September - November'
      default: return 'October - March'
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="relative h-[400px]">
        {(destination.image as any)?.url ? (
          <Image
            src={(destination.image as any).url}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
            <span className="text-8xl">🌄</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <nav className="text-white/80 text-sm mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/destinations" className="hover:text-white">Destinations</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{destination.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
              {destination.name}
            </h1>
            {destination.state && (
              <p className="text-white/80 text-lg mt-2 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {destination.state}, India
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-secondary mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
              About {destination.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {destination.description || `${destination.name} is a beautiful destination in India offering unique experiences for travelers. From stunning natural beauty to rich cultural heritage, this destination has something for everyone.`}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-card">
            <h3 className="text-lg font-semibold text-secondary mb-4">Destination Info</h3>
            <div className="space-y-4">
              {destination.state && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">State</p>
                    <p className="font-medium">{destination.state}</p>
                  </div>
                </div>
              )}
              {destination.category && (
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="font-medium capitalize">{destination.category.replace('-', ' ')}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-gray-500">Best Season</p>
                  <p className="font-medium">{getBestSeason(destination.category)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-3xl font-bold text-secondary mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
            Packages in {destination.name}
          </h2>
          <PackageGrid packages={packages.docs as any} />
        </section>
      </div>
    </div>
  )
}
