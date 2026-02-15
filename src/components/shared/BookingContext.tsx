'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface SelectedPackage {
  id: string
  title: string
  slug: string
  imageUrl?: string
}

interface BookingContextType {
  isOpen: boolean
  selectedPackage: SelectedPackage | null
  openBooking: (pkg: SelectedPackage) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextType>({
  isOpen: false,
  selectedPackage: null,
  openBooking: () => {},
  closeBooking: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null)

  const openBooking = (pkg: SelectedPackage) => {
    setSelectedPackage(pkg)
    setIsOpen(true)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setSelectedPackage(null)
  }

  return (
    <BookingContext.Provider value={{ isOpen, selectedPackage, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
