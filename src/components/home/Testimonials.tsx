'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  city: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    city: 'Delhi',
    rating: 5,
    text: 'Amazing experience! The team at SafariIndia made our honeymoon to Kerala absolutely magical. Every detail was perfectly planned, and the accommodations were outstanding. Highly recommend!',
  },
  {
    name: 'Rahul Verma',
    city: 'Mumbai',
    rating: 5,
    text: 'Our family trip to Rajasthan was unforgettable. The local guides were knowledgeable, and the itinerary was well-balanced. SafariIndia truly understands what travelers need.',
  },
  {
    name: 'Anita Desai',
    city: 'Bangalore',
    rating: 5,
    text: 'From the snow-capped mountains of Manali to the beaches of Goa, SafariIndia delivered an incredible adventure. Excellent customer service throughout our journey!',
  },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary" style={{ fontFamily: 'var(--font-playfair)' }}>
            What Our Travelers Say
          </h2>
          <p className="text-gray-600 mt-3">Real stories from real travelers</p>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-card border border-gray-100"
            >
              <div className="text-primary text-6xl font-serif opacity-20">"</div>
              
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-gray-700 text-lg text-center mb-8 leading-relaxed">
                {testimonials[currentIndex].text}
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                  {getInitials(testimonials[currentIndex].name)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-secondary">{testimonials[currentIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[currentIndex].city}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
