import Link from 'next/link'
import { Target, Eye, Heart, Award } from 'lucide-react'
import StatsCounter from '@/components/home/StatsCounter'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export const metadata = {
  title: 'About Us - SafariIndia',
  description: 'Learn about SafariIndia - your trusted travel partner for exploring the incredible diversity of India.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="text-white/80 text-sm mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>
            About SafariIndia
          </h1>
          <p className="text-white/80 mt-3 text-lg">
            Your Gateway to Incredible India
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Founded with a passion for showcasing the incredible diversity of India, SafariIndia has been helping travelers discover the magic of this beautiful country for over a decade. From the snow-capped Himalayas in the north to the pristine beaches of the south, we curate unforgettable experiences that capture the essence of India.
          </p>
          <p className="text-gray-600 leading-relaxed text-lg mt-4">
            Our team of travel experts, all born and raised in India, bring insider knowledge and authentic connections that you won't find elsewhere. We believe travel is more than just visiting places—it's about creating memories that last a lifetime.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-secondary text-center mb-12" style={{ fontFamily: 'var(--font-playfair)' }}>
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAFAF8] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To make the wonders of India accessible to every traveler by providing exceptional tour packages, authentic experiences, and unparalleled customer service.
              </p>
            </div>
            <div className="bg-[#FAFAF8] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be India's most trusted travel partner, known for creating life-changing journeys that inspire a deeper appreciation for India's rich culture and natural beauty.
              </p>
            </div>
            <div className="bg-[#FAFAF8] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Our Values</h3>
              <p className="text-gray-600">
                Integrity, authenticity, and a deep respect for the places and people we introduce our travelers to. Every journey is crafted with care and cultural sensitivity.
              </p>
            </div>
            <div className="bg-[#FAFAF8] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-3">Our Promise</h3>
              <p className="text-gray-600">
                Every traveler returns home with not just photographs, but stories to tell and a piece of India's heart in their own.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <StatsCounter />

      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Ready to Explore India?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let us help you plan your perfect Indian adventure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/packages" className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors">
              Start Planning
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
