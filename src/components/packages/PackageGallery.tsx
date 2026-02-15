'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { getMediaUrl } from '@/lib/utils'

interface MediaItem {
  image?: {
    url?: string
  }
  isMain?: boolean
}

interface PackageGalleryProps {
  images: MediaItem[]
  video?: {
    url?: string
  }
  title: string
}

export default function PackageGallery({ images, video, title }: PackageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  const validImages = images?.filter(img => getMediaUrl(img.image)) || []
  const hasVideo = video?.url

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const goToPrevious = () => {
    setLightboxIndex(prev => (prev === 0 ? validImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setLightboxIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
      if (e.key === 'Escape') setLightboxOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  if (validImages.length === 0 && !hasVideo) {
    return (
      <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
        <span className="text-6xl">🧭</span>
      </div>
    )
  }

  return (
    <div>
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
        <AnimatePresence mode="wait">
          {showVideo && hasVideo ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <video
                src={video.url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : getMediaUrl(validImages[activeIndex]?.image) ? (
            <motion.div
              key={`image-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => openLightbox(activeIndex)}
            >
              <Image
                src={getMediaUrl(validImages[activeIndex].image) || ''}
                alt={`${title} - Image ${activeIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {hasVideo && (
          <button
            onClick={() => setShowVideo(!showVideo)}
            className={`absolute top-4 right-4 z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              showVideo 
                ? 'bg-primary text-white' 
                : 'bg-white/90 text-secondary hover:bg-white'
            }`}
          >
            {showVideo ? 'View Photos' : 'Watch Video'}
          </button>
        )}

        {!showVideo && validImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex(prev => prev === 0 ? validImages.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveIndex(prev => (prev === validImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {validImages.length > 1 && !showVideo && (
          <button
            onClick={() => openLightbox(activeIndex)}
            className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
          >
            View All Photos
          </button>
        )}
      </div>

      {validImages.length > 1 && !showVideo && (
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          {validImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 relative ${
                index === activeIndex ? 'ring-2 ring-primary ring-offset-1' : ''
              }`}
            >
              <Image
                src={getMediaUrl(img.image) || ''}
                alt={`${title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
          {hasVideo && (
            <button
              onClick={() => setShowVideo(true)}
              className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 flex items-center justify-center relative"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </button>
          )}
        </div>
      )}

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
          <div className="relative">
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative aspect-[16/9]">
              {getMediaUrl(validImages[lightboxIndex]?.image) && (
                <Image
                  src={getMediaUrl(validImages[lightboxIndex].image) || ''}
                  alt={`${title} - Image ${lightboxIndex + 1}`}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {lightboxIndex + 1} / {validImages.length}
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
