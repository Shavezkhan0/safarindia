'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { CATEGORIES } from '@/lib/constants'

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      router.push(`/packages?category=${category}`)
    } else {
      router.push('/packages')
    }
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar justify-center flex-wrap">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`rounded-full px-5 py-2.5 font-medium transition-all cursor-pointer ${
              !currentCategory
                ? 'bg-primary text-white shadow-orange-glow'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryClick(cat.value)}
              className={`rounded-full px-5 py-2.5 font-medium transition-all cursor-pointer whitespace-nowrap ${
                currentCategory === cat.value
                  ? 'bg-primary text-white shadow-orange-glow'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
