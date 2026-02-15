'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { formatPrice, getDiscountPercent, getMainImageUrl, getCategoryEmoji, getCategoryLabel, getCategoryColor, getCategoryBgColor } from '@/lib/utils'

interface Package {
  id: string
  title: string
  slug: string
  category: string
  isFeatured?: boolean
  destination?: {
    name: string
    state?: string
  }
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

interface PackageCardProps {
  pkg: Package
  onBookNow?: (pkg: Package) => void
}

export default function PackageCard({ pkg, onBookNow }: PackageCardProps) {
  const imageUrl = getMainImageUrl(pkg.images)
  const discount = pkg.price?.discounted
    ? getDiscountPercent(pkg.price.original, pkg.price.discounted)
    : 0

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <Link href={`/packages/${pkg.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={pkg.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <span className="text-5xl">🧭</span>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBgColor(pkg.category)} ${getCategoryColor(pkg.category)}`}>
            <span>{getCategoryEmoji(pkg.category)}</span>
            <span>{getCategoryLabel(pkg.category)}</span>
          </span>
        </div>

        <div className="absolute top-3 right-3">
          {discount > 0 ? (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {discount}% OFF
            </span>
          ) : pkg.isFeatured ? (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              ⭐ FEATURED
            </span>
          ) : null}
        </div>

        {pkg.duration && (
          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {pkg.duration.days}D / {pkg.duration.nights}N
            </span>
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        {pkg.destination && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{pkg.destination.name}</span>
            {pkg.destination.state && <span>, {pkg.destination.state}</span>}
          </div>
        )}

        <Link href={`/packages/${pkg.slug}`} className="block mt-1">
          <h3 className="font-heading font-semibold text-lg leading-tight text-secondary line-clamp-2 group-hover:text-primary transition-colors">
            {pkg.title}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div className="flex-shrink-0">
            {pkg.price?.discounted ? (
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(pkg.price.discounted)}
                </span>
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(pkg.price.original)}
                </span>
              </div>
            ) : pkg.price?.original ? (
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">
                  {formatPrice(pkg.price.original)}
                </span>
                <span className="text-xs text-gray-400">/person</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">Price on Request</span>
            )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Link
              href={`/packages/${pkg.slug}`}
              className="px-3 py-2 text-sm border border-gray-200 rounded-full text-gray-600 hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              Details
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                onBookNow?.(pkg)
              }}
              className="px-4 py-2 text-sm bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
