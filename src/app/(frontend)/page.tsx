import { Metadata } from 'next'
import {
  getActiveBanners,
  getFeaturedPackages,
  getDestinations,
  getSiteSettings,
} from '@/lib/payload-api'
import HeroBanner from '@/components/home/HeroBanner'
import StatsCounter from '@/components/home/StatsCounter'
import CategoryFilter from '@/components/home/CategoryFilter'
import FeaturedPackages from '@/components/home/FeaturedPackages'
import DestinationGrid from '@/components/home/DestinationGrid'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'SafariIndia - Your Gateway to Incredible India',
  description:
    'Discover the magic of India with SafariIndia. Explore curated tour packages, beautiful destinations, and unforgettable adventures across India.',
}

export default async function HomePage() {
  const [banners, featuredPackages, destinations] = await Promise.all([
    getActiveBanners(),
    getFeaturedPackages(),
    getDestinations({ featured: true }),
  ])

  return (
    <>
      <HeroBanner banners={banners as any} />
      <StatsCounter />
      <CategoryFilter />
      <FeaturedPackages packages={featuredPackages as any} />
      <DestinationGrid destinations={destinations as any} />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}
