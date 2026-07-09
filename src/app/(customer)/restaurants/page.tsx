'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DEMO_RESTAURANTS } from '@/lib/demo-data'

export default function RestaurantsPage() {
  const [restaurants] = useState(DEMO_RESTAURANTS)
  const [search, setSearch] = useState('')

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.cuisine_type || '').toLowerCase().includes(search.toLowerCase())
  )

  const getCuisineEmoji = (cuisine?: string) => {
    switch (cuisine) {
      case 'Nigerian': return '🍛'
      case 'Fast Food': return '🍔'
      case 'Chinese': return '🥡'
      case 'Italian': return '🍕'
      case 'Japanese': return '🍣'
      case 'Street Food': return '🌮'
      case 'Indian': return '🍛'
      case 'Yoruba': return '🍲'
      default: return '🍽️'
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-[#1A1A1A] mb-3">All Restaurants</h1>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              placeholder="Search restaurants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F5F5] rounded-xl text-sm text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#E85D04]/30"
            />
          </div>
        </div>
      </header>

      {/* Restaurant Grid */}
      <main className="p-4 pb-24">
        <p className="text-sm text-[#666666] mb-4">{filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found</p>
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((restaurant) => (
            <Link
              key={restaurant.id}
              href={`/restaurants/${restaurant.id}`}
              className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gradient-to-br from-[#E85D04]/10 to-[#D45103]/10 flex items-center justify-center">
                <span className="text-5xl">{getCuisineEmoji(restaurant.cuisine_type)}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-[#1A1A1A]">{restaurant.name}</h3>
                  <span className="text-xs bg-[#E85D04]/10 text-[#E85D04] px-2 py-0.5 rounded-full font-medium">
                    ⭐ {restaurant.rating}
                  </span>
                </div>
                <p className="text-sm text-[#666666] mb-1">{restaurant.cuisine_type || 'Restaurant'}</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#666666]">
                  <span>🕐 {restaurant.delivery_time || '30-45 min'}</span>
                  <span>·</span>
                  <span>₦{(restaurant.delivery_fee || 450).toLocaleString()} delivery</span>
                  <span>·</span>
                  <span>Min ₦{(restaurant.min_order || 1000).toLocaleString()}</span>
                </div>
                {restaurant.is_open && (
                  <span className="inline-block mt-2 text-xs text-green-600 font-medium">✓ Open</span>
                )}
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-[#666666]">No restaurants found for &quot;{search}&quot;</p>
          </div>
        )}
      </main>
    </div>
  )
}
