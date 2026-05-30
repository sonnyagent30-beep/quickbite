'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Restaurant } from '@/lib/types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAnimating(true)
    setIsFavorite(!isFavorite)
    setTimeout(() => setIsAnimating(false), 200)
  }

  return (
    <Link href={`/restaurants/${restaurant.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer animate-slide-up">
        {/* Image */}
        <div className="relative h-40 bg-[#F5F5F5]">
          <img 
            src={restaurant.image_url || 'https://via.placeholder.com/400x200?text=Food'} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Food'
            }}
          />
          
          {/* Favorite Heart Overlay */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors z-10"
            style={{
              transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.2s ease-out'
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill={isFavorite ? '#E85D04' : 'none'} 
              stroke={isFavorite ? '#E85D04' : '#666666'} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

          {restaurant.is_open ? (
            <span className="absolute top-3 left-3 bg-[#2D6A4F] text-white text-xs font-medium px-2 py-1 rounded-full">
              Open
            </span>
          ) : (
            <span className="absolute top-3 left-3 bg-[#DC3545] text-white text-xs font-medium px-2 py-1 rounded-full">
              Closed
            </span>
          )}
          {restaurant.distance && (
            <span className="absolute bottom-3 left-3 bg-white/90 text-[#333333] text-xs font-medium px-2 py-1 rounded-full">
              {restaurant.distance.toFixed(1)} km
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-[#1A1A1A] text-lg leading-tight">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-[#FFF3CD] px-2 py-1 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-xs font-semibold text-[#1A1A1A]">{restaurant.rating}</span>
              <span className="text-xs text-[#666666]">({restaurant.rating_count})</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm mb-2">
            <span className="text-[#333333]">
              <span className="font-medium">{restaurant.cuisine_type}</span>
            </span>
            <span className="text-[#CCCCCC]">•</span>
            <span className="text-[#666666]">
              Min ₦{Number(restaurant.min_order).toLocaleString()}
            </span>
            <span className="text-[#CCCCCC]">•</span>
            <span className="text-[#666666]">
              Delivery ₦{Number(restaurant.delivery_fee).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}