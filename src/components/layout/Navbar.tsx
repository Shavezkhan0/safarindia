'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Phone, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, NAV_LINKS } from '@/lib/constants'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPackagesOpen, setIsPackagesOpen] = useState(false)

  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = NAV_LINKS.filter(link => link.label !== 'Home')

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage && !isScrolled
            ? 'bg-transparent text-white'
            : 'bg-white shadow-md text-secondary'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <Globe className={`w-8 h-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-primary'}`} />
            <span
              className={`text-xl font-bold italic ${
                isHomePage && !isScrolled ? 'text-white' : ''
              }`}
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              SafariIndia
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative">
                {link.label === 'Packages' ? (
                  <div
                    className="relative cursor-pointer py-4"
                    onMouseEnter={() => setIsPackagesOpen(true)}
                    onMouseLeave={() => setIsPackagesOpen(false)}
                  >
                    <span className={`font-medium hover:text-primary transition-colors ${pathname === link.href ? 'text-primary' : ''}`}>
                      Packages
                    </span>
                    <AnimatePresence>
                      {isPackagesOpen && (
                        <motion.div
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-2xl shadow-xl p-4 min-w-[400px]"
                          onMouseEnter={() => setIsPackagesOpen(true)}
                          onMouseLeave={() => setIsPackagesOpen(false)}
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.value}
                                href={`/packages?category=${cat.value}`}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                              >
                                <span className="text-2xl">{cat.emoji}</span>
                                <div>
                                  <p className="font-medium text-secondary text-sm">{cat.label}</p>
                                  <p className="text-xs text-gray-500">{cat.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={`font-medium hover:text-primary transition-colors relative py-4 ${
                      pathname === link.href ? 'text-primary' : ''
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919999999999"
              className={`hidden lg:flex items-center gap-2 text-sm ${
                isHomePage && !isScrolled ? 'text-white' : 'text-secondary'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>+91-9999999999</span>
            </a>

            <Link
              href="/packages"
              className="btn-primary text-sm px-5 py-2"
            >
              Book Now
            </Link>

            <button
              className={`lg:hidden p-2 ${isHomePage && !isScrolled ? 'text-white' : 'text-secondary'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
