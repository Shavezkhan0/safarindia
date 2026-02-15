'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Search, X } from 'lucide-react'
import PackageCard from './PackageCard'
import BookingModal from './BookingModal'
import { useBooking } from '@/components/shared/BookingContext'

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

interface PackageGridProps {
  packages: Package[]
  isLoading?: boolean
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

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card">
      <div className="aspect-[4/3] shimmer-loading" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 shimmer-loading rounded" />
        <div className="h-5 w-3/4 shimmer-loading rounded" />
        <div className="h-4 w-1/2 shimmer-loading rounded" />
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <div className="h-6 w-20 shimmer-loading rounded" />
          <div className="flex gap-2">
            <div className="h-8 w-16 shimmer-loading rounded-full" />
            <div className="h-8 w-20 shimmer-loading rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PackageGrid({ packages, isLoading }: PackageGridProps) {
  const { openBooking } = useBooking()
  const [searchQuery, setSearchQuery] = useState('')

  const handleBookNow = (pkg: Package) => {
    openBooking({
      id: pkg.id,
      title: pkg.title,
      slug: pkg.slug,
    })
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <MapPin className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-secondary mb-2">No packages found</h3>
        <p className="text-gray-500 mb-4">Try adjusting your filters or search criteria</p>
        <Link href="/packages" className="btn-outline">
          Reset Filters
        </Link>
      </div>
    )
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.id} variants={itemVariants}>
            <PackageCard pkg={pkg} onBookNow={handleBookNow} />
          </motion.div>
        ))}
      </motion.div>
      <BookingModal />
    </>
  )
}
