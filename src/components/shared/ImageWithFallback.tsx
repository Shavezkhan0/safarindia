'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallback?: string
}

export default function ImageWithFallback({
  src,
  alt,
  fallback = '',
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)

  const handleError = () => {
    setError(true)
  }

  if (error || !src) {
    return (
      <div className="w-full h-full min-h-[200px] flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-100">
        <span className="text-4xl">🧭</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  )
}
