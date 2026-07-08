'use client'

import { useState, useEffect } from 'react'
import RestaurantCard from '@/components/RestaurantCard'
import { DEMO_RESTAURANTS } from '@/lib/demo-data'
import { getSession } from '@/lib/demo-auth'
import { Restaurant } from '@/lib/types'

// Extended type for demo mode — adds fields needed by UI
interface DemoRestaurant extends Restaurant {
  rating_count: number
  distance?: number
}

interface Category {
  id: string
  name: string
  icon: string
}

const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'nigerian', name: 'Nigerian', icon: '🍛' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'american', name: 'American', icon: '🍔' },
  { id: 'yoruba', name: 'Yoruba', icon: '🍲' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'italian', name: 'Italian', icon: '🍕' },
]

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Ikeja, Lagos')

  useEffect(() => {
    // Check if logged in - redirect to / if not
    try {
      const user = localStorage.getItem('quickbite_user')
      if (!user) {
        window.location.href = '/'
        return
      }
    } catch (err) {
      console.warn('Failed to check user authentication:', err)
      window.location.href = '/'
      return
    }
    
    // Check onboarding status - if not completed, redirect to onboarding
    try {
      const onboardingComplete = localStorage.getItem('onboarding_complete')
      if (onboardingComplete !== 'true') {
        window.location.href = '/onboarding'
        return
      }
    } catch (err) {
      console.warn('Failed to check onboarding status:', err)
      window.location.href = '/onboarding'
      return
    }
    
    fetchRestaurants()
  }, [])

  const fetchRestaurants = async () => {
    // Check if we're in demo mode
    const session = getSession()
    
    if (session) {
      // Use demo data in demo mode
      const demoRestaurants = DEMO_RESTAURANTS.map(r => ({
        id: r.id,
        name: r.name,
        description: r.description || '',
        cuisine_type: r.cuisine_type || '',
        address: 'Lagos, Nigeria',
        rating: r.rating,
        rating_count: 127,
        is_open: true,
        min_order: r.min_order,
        delivery_fee: r.delivery_fee,
        image_url: r.image_url || '',
        distance: 1.2,
        owner_id: 'demo-owner-1',
        location_lat: 6.5994,
        location_lng: 3.3419,
      }))
      setRestaurants(demoRestaurants)
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/restaurants?lat=6.5994&lng=3.3419&radius=20')
      const data = await response.json()
      setRestaurants(data.restaurants || [])
    } catch (error) {
      console.error('Failed to fetch restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRestaurants = restaurants.filter(r => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (r.cuisine_type || '').toLowerCase() === selectedCategory.toLowerCase()
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.cuisine_type || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredRestaurants = restaurants.filter(r => r.rating >= 4.5).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#E85D04] to-[#D45103] text-white">
        <div className="px-4 py-6">
          {/* Location Selector */}
          <div className="flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-transparent border-b border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>

          {/* Search Bar */}
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
              className="w-full pl-12 pr-4 py-3 rounded-xl text-[#1A1A1A] text-base shadow-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>
      </section>

      {/* Categories - Horizontal Scroll */}
      <section className="py-4 bg-white border-b border-[#F5F5F5]">
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#E85D04] text-white'
                  : 'bg-[#F5F5F5] text-[#333333] hover:bg-[#E5E5E5]'
              }`}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="pb-20">
        {/* Featured Section */}
        {featuredRestaurants.length > 0 && selectedCategory === 'all' && (
          <section className="py-6">
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <h2 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  Featured
                </h2>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
              {featuredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="w-64 flex-shrink-0">
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restaurants Grid */}
        <section className="py-6 bg-[#F8F9FA]">
          <div className="px-4 mb-4">
            <h2 className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              restaurants near you
            </h2>
            <p className="text-sm text-[#666666]">
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
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
            <div className="text-center py-16 px-4">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">No restaurants found</h3>
              <p className="text-[#666666]">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {filteredRestaurants.map((restaurant, index) => (
                <div key={restaurant.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}