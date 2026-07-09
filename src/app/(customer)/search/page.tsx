'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import RestaurantCard from '@/components/RestaurantCard'
import { DEMO_RESTAURANTS } from '@/lib/demo-data'
import type { Restaurant } from '@/lib/types'

// Recent and popular searches
const RECENT_SEARCHES = ['Chicken', 'Jollof rice', 'Bunche Kitchen']
const POPULAR_SEARCHES = ['Nigerian food', 'Fast food', 'Pizza', 'Burgers', 'Chinese', 'Grilled chicken']

export default function SearchPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchRestaurants()
    // Auto-focus the search input on mount
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants?lat=6.5994&lng=3.3419&radius=50')
      const data = await response.json()
      setRestaurants(data.restaurants || [])
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
      // Fall back to demo data
      setRestaurants(DEMO_RESTAURANTS)
    } finally {
      setLoading(false)
    }
  }

  const filteredRestaurants = restaurants.filter((r: Restaurant) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.cuisine_type?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (r.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  )

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setShowResults(query.length > 0)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResults(searchQuery.length > 0)
  }

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Search
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Search Input */}
      <div className="p-4 bg-white border-b border-[#F5F5F5]">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search restaurants or cuisines"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
          </div>
        </form>
      </div>

      {/* Content */}
      <main className="p-4 pb-20">
        {showResults ? (
          // Search Results
          <>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                    <div className="h-40 bg-[#E5E5E5]"/>
                    <div className="p-4">
                      <div className="h-5 bg-[#E5E5E5] rounded w-3/4 mb-2"/>
                      <div className="h-4 bg-[#E5E5E5] rounded w-1/2 mb-3"/>
                      <div className="flex gap-2">
                        <div className="h-4 bg-[#E5E5E5] rounded w-16"/>
                        <div className="h-4 bg-[#E5E5E5] rounded w-16"/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRestaurants.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.3-4.3"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">No restaurants found</h3>
                <p className="text-sm text-[#666666]">Try adjusting your search terms</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#666666] mb-4">
                  {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRestaurants.map((restaurant, index) => (
                    <div key={restaurant.id} style={{ animationDelay: `${index * 50}ms` }}>
                      <RestaurantCard restaurant={restaurant} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // Search Suggestions
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {RECENT_SEARCHES.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="px-4 py-2 bg-[#F5F5F5] text-[#666666] text-sm rounded-full hover:bg-[#E5E5E5] transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((search) => (
                  <button
                    key={search}
                    onClick={() => handleQuickSearch(search)}
                    className="px-4 py-2 bg-[#E85D04]/10 text-[#E85D04] text-sm font-medium rounded-full hover:bg-[#E85D04] hover:text-white transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse by Cuisine */}
            <div>
              <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
                Browse by Cuisine
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Nigerian', 'Fast Food', 'Chinese', 'Pizza', 'Burgers', 'Grilled'].map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => handleQuickSearch(cuisine)}
                    className="p-4 bg-white rounded-xl shadow-sm text-[#1A1A1A] font-medium hover:bg-[#F5F5F5] transition-colors"
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
