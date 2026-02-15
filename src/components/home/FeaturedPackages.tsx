'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { formatPrice, formatDuration, getDiscountPercent, getMainImageUrl } from '@/lib/utils'

interface Package {
  id: string
  title: string
  slug: string
  destination?: {
    name: string
    state?: string
  }
  category: string
  duration?: {
    days: number
    nights: number
  }
  price?: {
    original: number
    discounted?: number
  }
  images?: Array<{
    image: {
      url?: string
    }
    isMain?: boolean
  }>
}

interface FeaturedPackagesProps {
  packages: Package[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturedPackages({ packages }: FeaturedPackagesProps) {
  if (!packages || packages.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary" style={{ fontFamily: 'var(--font-playfair)' }}>
            ✨ Featured Packages
          </h2>
          <p className="text-gray-600 mt-3">Handpicked tours for unforgettable experiences</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {packages.map((pkg) => {
            const imageUrl = getMainImageUrl(pkg.images)
            const discount = pkg.price?.discounted
              ? getDiscountPercent(pkg.price.original, pkg.price.discounted)
              : 0

            return (
              <motion.div
                key={pkg.id}
                variants={itemVariants}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <Link href={`/packages/${pkg.slug}`}>
                  <div className="relative h-56 overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                        <span className="text-4xl">🧭</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {discount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      {pkg.destination && (
                        <>
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{pkg.destination.name}</span>
                          {pkg.destination.state && (
                            <span className="text-gray-400">, {pkg.destination.state}</span>
                          )}
                        </>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors line-clamp-2">
                      {pkg.title}
                    </h3>

                    {pkg.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                        <Clock className="w-4 h-4" />
                        <span>{formatDuration(pkg.duration.days, pkg.duration.nights)}</span>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        {pkg.price?.discounted ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">
                              {formatPrice(pkg.price.discounted)}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(pkg.price.original)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-2xl font-bold text-primary">
                            {pkg.price?.original ? formatPrice(pkg.price.original) : 'Price on Request'}
                          </span>
                        )}
                        <span className="text-xs text-gray-500">/person</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="text-center mt-10">
          <Link href="/packages" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All Packages <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
