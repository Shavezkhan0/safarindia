'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, MessageCircle, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES, NAV_LINKS } from '@/lib/constants'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                <Globe className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold italic" style={{ fontFamily: 'var(--font-playfair)' }}>
                  SafariIndia
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  {link.label === 'Packages' ? (
                    <div>
                      <button
                        onClick={() => toggleSection('packages')}
                        className="w-full text-left py-3 px-2 text-lg font-medium hover:text-primary transition-colors flex items-center justify-between"
                      >
                        Packages
                        <span className={`transform transition-transform ${expandedSection === 'packages' ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedSection === 'packages' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat.value}
                                href={`/packages?category=${cat.value}`}
                                onClick={onClose}
                                className="block py-2 px-4 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                              >
                                <span className="mr-2">{cat.emoji}</span>
                                {cat.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 px-2 text-lg font-medium hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t p-4">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+919999999999" className="text-lg font-semibold">
                  +91-9999999999
                </a>
              </div>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full w-fit"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>

            <div className="border-t p-4 text-center text-gray-500 text-sm">
              © SafariIndia
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
