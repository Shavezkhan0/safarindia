import { Phone, Mail, MessageCircle, Clock, MapPin, Facebook, Instagram, Youtube, MessageSquare } from 'lucide-react'
import Link from 'next/link'

const POPULAR_DESTINATIONS = [
  'Manali',
  'Goa',
  'Rajasthan',
  'Kashmir',
  'Andaman',
  'Kerala',
  'Ladakh',
  'Coorg',
]

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Packages', href: '/packages' },
  { label: 'Destinations', href: '/destinations' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-12 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🧭</span>
            <span className="text-2xl font-bold italic" style={{ fontFamily: 'var(--font-playfair)' }}>
              SafariIndia
            </span>
          </div>
          <p className="text-white/70 mb-4">
            Your Gateway to Incredible India
          </p>
          <p className="text-white/60 text-sm mb-6">
            Discover the magic of India with our curated travel experiences. From snow-capped mountains to pristine beaches, we make your dream vacation come true.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 hover:text-accent hover:pl-1 transition-all inline-block"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <ul className="space-y-2">
            {POPULAR_DESTINATIONS.map((dest) => (
              <li key={dest}>
                <Link
                  href={`/destinations?search=${dest.toLowerCase()}`}
                  className="flex items-center gap-2 text-white/70 hover:text-accent transition-colors"
                >
                  <MapPin className="w-4 h-4 text-accent" />
                  {dest}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="tel:+919999999999"
                className="flex items-center gap-3 text-lg font-semibold hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                +91-9999999999
              </a>
            </li>
            <li>
              <a
                href="mailto:info@safariindia.com"
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@safariindia.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with us
              </a>
            </li>
            <li className="flex items-center gap-3 text-white/70">
              <Clock className="w-5 h-5" />
              Mon-Sat, 9AM - 7PM
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 SafariIndia. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Made with ❤️ for Indian Travelers 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}
