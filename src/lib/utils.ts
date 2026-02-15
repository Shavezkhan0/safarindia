import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { CATEGORIES } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDuration(days: number, nights: number): string {
  return `${days} Day${days !== 1 ? 's' : ''} / ${nights} Night${nights !== 1 ? 's' : ''}`
}

export function getDiscountPercent(original: number, discounted: number): number {
  if (!original || !discounted) return 0
  return Math.round((1 - discounted / original) * 100)
}

export function getCategoryLabel(category: string): string {
  const found = CATEGORIES.find(c => c.value === category)
  return found?.label || category
}

export function getCategoryEmoji(category: string): string {
  const found = CATEGORIES.find(c => c.value === category)
  return found?.emoji || '📍'
}

export function getCategoryColor(category: string): string {
  const found = CATEGORIES.find(c => c.value === category)
  return found?.color || 'text-gray-700'
}

export function getCategoryBgColor(category: string): string {
  const found = CATEGORIES.find(c => c.value === category)
  return found?.bgColor || 'bg-gray-100'
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getMediaUrl(media: any): string | null {
  if (!media) return null
  
  // If it's already a full URL, return it
  if (media.url && (media.url.startsWith('http') || media.url.startsWith('https'))) {
    return media.url
  }

  // If we have a Cloudinary Public ID, construct the URL
  if (media.cloudinaryPublicId) {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'do69hljgk'
    // Ensure we don't double slash if not needed, though Cloudinary is forgiving
    return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${media.cloudinaryPublicId}`
  }

  // Fallback to the provided URL (might be relative local path, capable of 404ing if file missing)
  return media.url || null
}

export function getMainImageUrl(images?: Array<{ image: any; isMain?: boolean }>): string | null {
  if (!images || images.length === 0) return null
  
  const mainImage = images.find(img => img.isMain)
  if (mainImage?.image) return getMediaUrl(mainImage.image)
  
  if (images[0]?.image) return getMediaUrl(images[0].image)
  
  return null
}
