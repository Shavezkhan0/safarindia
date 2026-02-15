'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface Destination {
  id: string
  name: string
  slug: string
  state?: string
  description?: string
  image?: {
    url?: string
  }
}

interface DestinationGridProps {
  destinations: Destination[]
}

export default function DestinationGrid({ destinations }: DestinationGridProps) {
  if (!destinations || destinations.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary" style={{ fontFamily: 'var(--font-playfair)' }}>
            Popular Destinations
          </h2>
          <p className="text-gray-600 mt-3">Explore the most beloved places in India</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.slice(0, 8).map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Link href={`/destinations/${destination.slug}`}>
                <div className="relative h-48 md:h-56 lg:h-64">
                  {destination.image?.url ? (
                    <Image
                      src={destination.image.url}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                      <span className="text-4xl">🌄</span>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-heading font-bold text-lg md:text-xl">
                      {destination.name}
                    </h3>
                    {destination.state && (
                      <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {destination.state}
                      </p>
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="bg-white text-primary px-4 py-2 rounded-full font-semibold text-sm">
                      Explore →
                    </span>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/destinations" className="btn-outline">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}
