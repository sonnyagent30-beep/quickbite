'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import RestaurantCard from '@/components/RestaurantCard'

interface Restaurant {
  id: string
  name: string
  description: string
  cuisine_type: string
  address: string
  rating: number
  rating_count: number
  is_open: boolean
  min_order: number
  delivery_fee: number
  image_url: string
  distance?: number
}

export default function SearchPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurants?lat=6.5994&lng=3.3419&radius=50')
      const data = await response.json()
      setRestaurants(data.restaurants || [])
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRestaurants = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search restaurants or cuisines"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
          />
        </div>
      </div>

      {/* Results */}
      <main className="p-4 pb-20">
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
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">
              {searchQuery ? 'No restaurants found' : 'Start searching'}
            </h3>
            <p className="text-[#666666]">
              {searchQuery ? 'Try adjusting your search terms' : 'Enter a restaurant name or cuisine type'}
            </p>
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
      </main>
    </div>
  )
}