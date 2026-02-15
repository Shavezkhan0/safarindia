import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, MapPin, Users, Calendar, Check, X } from 'lucide-react'
import { getPackageBySlug, getRelatedPackages } from '@/lib/payload-api'
import {
  formatPrice,
  getDiscountPercent,
  getCategoryLabel,
  getCategoryEmoji,
  getMainImageUrl,
  getCategoryColor,
  getCategoryBgColor,
} from '@/lib/utils'
import PackageGallery from '@/components/packages/PackageGallery'
import ItineraryAccordion from '@/components/packages/ItineraryAccordion'
import BookNowButton from '@/components/shared/BookNowButton'
import PackageCard from '@/components/packages/PackageCard'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)

  if (!pkg) {
    return { title: 'Package Not Found - SafariIndia' }
  }

  return {
    title: pkg.seo?.metaTitle || `${pkg.title} - SafariIndia`,
    description:
      pkg.seo?.metaDescription ||
      pkg.shortDescription ||
      `Book your ${pkg.title} tour package with SafariIndia.`,
  }
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)

  if (!pkg) {
    notFound()
  }

  const relatedPackages = await getRelatedPackages(pkg.category, pkg.id, 4)
  const discount = pkg.price?.discounted
    ? getDiscountPercent(pkg.price.original, pkg.price.discounted)
    : 0

  const imageUrl = getMainImageUrl(pkg.images as any)

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-gradient-to-r from-primary to-accent py-8">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-white/80 text-sm">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/packages" className="hover:text-white">
              Packages
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{pkg.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          <div>
            <PackageGallery images={pkg.images as any} video={pkg.video as any} title={pkg.title} />

            <div className="mt-8">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getCategoryBgColor(pkg.category)} ${getCategoryColor(pkg.category)}`}
                >
                  <span>{getCategoryEmoji(pkg.category)}</span>
                  <span>{getCategoryLabel(pkg.category)}</span>
                </span>
                {pkg.duration && (
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {pkg.duration.days} Days / {pkg.duration.nights} Nights
                  </span>
                )}
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold text-secondary mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {pkg.title}
              </h1>

              {pkg.destination && (
                <div className="flex items-center gap-2 text-gray-600 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{(pkg.destination as any).name}</span>
                  {(pkg.destination as any).state && (
                    <span>, {(pkg.destination as any).state}</span>
                  )}
                </div>
              )}

              <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-8">
                  <button className="pb-3 border-b-2 border-primary text-primary font-semibold">
                    Overview
                  </button>
                  <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-primary transition-colors">
                    Itinerary
                  </button>
                  <button className="pb-3 border-b-2 border-transparent text-gray-500 hover:text-primary transition-colors">
                    Includes & Excludes
                  </button>
                </div>
              </div>

              <div className="prose max-w-none">
                {pkg.description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-secondary mb-4">About This Tour</h2>
                    <p className="text-gray-600 leading-relaxed">{String(pkg.description)}</p>
                  </div>
                )}

                {pkg.highlights && pkg.highlights.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-secondary mb-4">Tour Highlights</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pkg.highlights.map((highlight: any, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{highlight.item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-secondary mb-4">Detailed Itinerary</h2>
                  <ItineraryAccordion itinerary={(pkg.itinerary || []) as any} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold text-secondary mb-4">What's Included</h2>
                    <ul className="space-y-2">
                      {pkg.includes?.map((inc: any, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{inc.item}</span>
                        </li>
                      )) || <li className="text-gray-500">Coming soon</li>}
                    </ul>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-secondary mb-4">
                      What's Not Included
                    </h2>
                    <ul className="space-y-2">
                      {pkg.excludes?.map((exc: any, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{exc.item}</span>
                        </li>
                      )) || <li className="text-gray-500">Coming soon</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <div className="mb-4">
                {pkg.price?.discounted ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(pkg.price.discounted)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {formatPrice(pkg.price.original)}
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                      {discount}% OFF
                    </span>
                  </div>
                ) : pkg.price?.original ? (
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(pkg.price.original)}
                  </span>
                ) : (
                  <span className="text-2xl font-bold text-primary">Price on Request</span>
                )}
                <span className="text-gray-500 text-sm">/person</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  <Clock className="w-3 h-3" />
                  {pkg.duration?.days}D / {pkg.duration?.nights}N
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                  {getCategoryEmoji(pkg.category)} {getCategoryLabel(pkg.category)}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <BookNowButton
                  packageId={String(pkg.id)}
                  packageTitle={String(pkg.title)}
                  packageSlug={String(pkg.slug)}
                  imageUrl={imageUrl || undefined}
                  className="w-full text-lg py-4"
                >
                  Book Now — Free Callback
                </BookNowButton>

                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-3 bg-green-500 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>2-15 people per group</span>
                </div>
                {pkg.startDates && pkg.startDates.length > 0 && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span>
                      Next:{' '}
                      {new Date(pkg.startDates[0].date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {relatedPackages.length > 0 && (
          <section className="mt-16">
            <h2
              className="text-3xl font-bold text-secondary mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPackages.map((relatedPkg: any) => (
                <PackageCard key={relatedPkg.id} pkg={relatedPkg} />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            {pkg.price?.discounted ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(pkg.price.discounted)}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  {formatPrice(pkg.price.original)}
                </span>
              </>
            ) : pkg.price?.original ? (
              <span className="text-2xl font-bold text-primary">
                {formatPrice(pkg.price.original)}
              </span>
            ) : (
              <span className="text-xl font-bold text-primary">Price on Request</span>
            )}
          </div>
          <BookNowButton
            packageId={String(pkg.id)}
            packageTitle={String(pkg.title)}
            packageSlug={String(pkg.slug)}
            imageUrl={imageUrl || undefined}
          >
            Book Now
          </BookNowButton>
        </div>
      </div>
    </div>
  )
}
