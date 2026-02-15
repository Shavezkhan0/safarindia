import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { getDestinations } from '@/lib/payload-api'
import { getMediaUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Explore Destinations in India - SafariIndia',
  description:
    'Discover the most beautiful destinations in India. From Himalayan mountains to pristine beaches, find your perfect travel destination.',
}

export default async function DestinationsPage() {
  const destinations = await getDestinations()

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Destinations</span>
          </nav>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Discover India
          </h1>
          <p className="text-white/80 mt-3 text-lg">
            Explore our curated destinations across Incredible India
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest: any) => {
            const imageUrl = getMediaUrl(dest.image)

            return (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative aspect-[16/10] rounded-2xl overflow-hidden"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <span className="text-6xl">🌄</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {dest.state && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary">
                    {dest.state}
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: 'var(--font-playfair)' }}
                  >
                    {dest.name}
                  </h3>
                  {dest.state && (
                    <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {dest.state}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="bg-white text-primary px-5 py-2 rounded-full font-semibold">
                    Explore Packages →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
