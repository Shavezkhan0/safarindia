'use client'

import { useBooking } from './BookingContext'

interface BookNowButtonProps {
  packageId: string
  packageTitle: string
  packageSlug: string
  imageUrl?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: React.ReactNode
}

export default function BookNowButton({
  packageId,
  packageTitle,
  packageSlug,
  imageUrl,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
}: BookNowButtonProps) {
  const { openBooking } = useBooking()

  const handleClick = () => {
    openBooking({
      id: packageId,
      title: packageTitle,
      slug: packageSlug,
      imageUrl,
    })
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'text-primary hover:bg-primary/10 transition-colors',
  }

  return (
    <button
      onClick={handleClick}
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children || 'Book Now'}
    </button>
  )
}
