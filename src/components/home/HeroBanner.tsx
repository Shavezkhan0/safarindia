'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Keyboard } from 'swiper/modules'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface Banner {
  title: string
  subtitle?: string
  type: string
  media?: {
    url?: string
  }
  ctaText?: string
  ctaLink?: string
}

interface HeroBannerProps {
  banners: Banner[]
}

const defaultBanner: Banner = {
  title: 'Discover Incredible India',
  subtitle: 'Your Gateway to Unforgettable Journeys',
  type: 'image',
  ctaText: 'Explore Packages',
  ctaLink: '/packages',
}

export default function HeroBanner({ banners }: HeroBannerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const displayBanners = banners.length > 0 ? banners : [defaultBanner]

  if (!mounted) {
    return (
      <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-primary to-accent">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
            SafariIndia
          </h1>
          <p className="text-xl mt-4">Your Gateway to Incredible India</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Keyboard]}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary',
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
        }}
        keyboard={{ enabled: true }}
        className="h-screen"
      >
        {displayBanners.map((banner, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/20 z-10" />
            
            {banner.media?.url ? (
              <Image
                src={banner.media.url}
                alt={banner.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-600 to-accent" />
            )}

            <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
              <div className="text-center max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-full px-4 py-1 text-sm mb-6"
                >
                  <span>🇮🇳</span>
                  <span>Incredible India</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  {banner.title}
                </motion.h1>

                {banner.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/90 mt-4"
                  >
                    {banner.subtitle}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-4 justify-center mt-8 flex-wrap"
                >
                  {banner.ctaText && banner.ctaLink ? (
                    <Link href={banner.ctaLink} className="btn-primary text-base">
                      {banner.ctaText}
                    </Link>
                  ) : (
                    <Link href="/packages" className="btn-primary text-base">
                      Explore Packages
                    </Link>
                  )}
                  <Link
                    href="/destinations"
                    className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-all"
                  >
                    View Destinations
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Link href="#stats" className="text-white animate-bounce block">
          <ChevronDown className="w-8 h-8" />
        </Link>
      </motion.div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background-color: #E05C2A !important;
        }
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255, 0.5) !important;
          width: 12px !important;
          height: 12px !important;
        }
      `}</style>
    </div>
  )
}
