'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Package, MapPinned, User, Star } from 'lucide-react'

interface Stat {
  end: number
  suffix: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const stats: Stat[] = [
  { end: 500, suffix: '+', label: 'Tour Packages', icon: Package },
  { end: 50, suffix: '+', label: 'Destinations', icon: MapPinned },
  { end: 10000, suffix: '+', label: 'Happy Travelers', icon: User },
  { end: 5, suffix: '★', label: 'Avg Rating', icon: Star },
]

function CountUp({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut)
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end])

  return <span ref={countRef}>{count}{suffix}</span>
}

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" ref={sectionRef} className="py-16 bg-[#FAFAF8]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-card"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-secondary">
                  <CountUp end={stat.end} suffix={stat.suffix} isVisible={isVisible} />
                </div>
                <p className="text-gray-600 mt-2 text-sm">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
