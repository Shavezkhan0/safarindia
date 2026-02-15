import React from 'react'
import './styles.css'
import { BookingProvider } from '@/components/shared/BookingContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  description: 'SafariIndia - Your Gateway to Incredible India',
  title: 'SafariIndia',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <BookingProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-16 md:pt-20">
              {children}
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </body>
    </html>
  )
}
