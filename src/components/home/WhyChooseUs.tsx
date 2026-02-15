'use client'

import { motion } from 'framer-motion'
import { UserRound, Tag, Headphones, Bed } from 'lucide-react'

interface Feature {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: UserRound,
    title: 'Expert Local Guides',
    description: 'Our guides know every hidden gem in India',
  },
  {
    icon: Tag,
    title: 'Best Price Guarantee',
    description: 'Unbeatable prices with no hidden costs',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'We are available round the clock for you',
  },
  {
    icon: Bed,
    title: 'Handpicked Hotels',
    description: 'Only the best stays for our travelers',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary" style={{ fontFamily: 'var(--font-playfair)' }}>
            Why Choose Us
          </h2>
          <p className="text-gray-600 mt-3">Experience the difference with our premium services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
