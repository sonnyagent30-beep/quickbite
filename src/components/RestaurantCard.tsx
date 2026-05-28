'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Restaurant {
  id: string
  name: string
  cuisine_type: string
  rating: number
  rating_count: number
  is_open: boolean
  min_order: number
  delivery_fee: number
  image_url: string
  distance?: number
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
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
            <span className="absolute top-3 right-3 bg-white/90 text-[#333333] text-xs font-medium px-2 py-1 rounded-full">
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