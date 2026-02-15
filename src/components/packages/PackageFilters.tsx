'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { CATEGORIES } from '@/lib/constants'

interface Destination {
  id: string
  name: string
  slug: string
}

interface PackageFiltersProps {
  destinations: Destination[]
}

type DurationFilter = 'any' | '1-3' | '4-6' | '7-10' | '11+'
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest'

export default function PackageFilters({ destinations }: PackageFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category')?.split(',').filter(Boolean) || []
  )
  const [duration, setDuration] = useState<DurationFilter>(
    (searchParams.get('duration') as DurationFilter) || 'any'
  )
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'featured'
  )
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const activeFilterCount = selectedCategories.length + 
    (duration !== 'any' ? 1 : 0) + 
    (minPrice ? 1 : 0) + 
    (maxPrice ? 1 : 0)

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set('category', selectedCategories.join(','))
    }
    if (duration !== 'any') {
      params.set('duration', duration)
    }
    if (minPrice) {
      params.set('minPrice', minPrice)
    }
    if (maxPrice) {
      params.set('maxPrice', maxPrice)
    }
    if (sortBy !== 'featured') {
      params.set('sort', sortBy)
    }

    router.push(`${pathname}?${params.toString()}`)
    setIsMobileOpen(false)
  }

  const clearAllFilters = () => {
    setSelectedCategories([])
    setDuration('any')
    setMinPrice('')
    setMaxPrice('')
    setSortBy('featured')
    router.push(pathname)
  }

  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category))
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-secondary mb-3">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map(cat => (
            <label key={cat.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.value)}
                onChange={() => handleCategoryToggle(cat.value)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-secondary mb-3">Duration</h3>
        <div className="space-y-2">
          {[
            { value: 'any', label: 'Any Duration' },
            { value: '1-3', label: '1-3 Days' },
            { value: '4-6', label: '4-6 Days' },
            { value: '7-10', label: '7-10 Days' },
            { value: '11+', label: '11+ Days' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={duration === opt.value}
                onChange={() => setDuration(opt.value as DurationFilter)}
                className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-secondary mb-3">Price Range</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min ₹"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <span className="flex items-center text-gray-400">-</span>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Max ₹"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-secondary mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
        >
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button onClick={applyFilters} className="flex-1 btn-primary text-sm py-2.5">
          Apply Filters
        </button>
        <button onClick={clearAllFilters} className="text-primary text-sm font-medium hover:underline">
          Clear All
        </button>
      </div>
    </div>
  )

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 btn-primary shadow-lg flex items-center gap-2"
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="bg-white text-primary px-2 py-0.5 rounded-full text-xs font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:block w-72 sticky top-24 h-fit">
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h2 className="text-lg font-semibold text-secondary mb-4">Filters</h2>
          <FilterContent />
        </div>
      </aside>
    </>
  )
}
