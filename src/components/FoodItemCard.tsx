'use client'

import { useState } from 'react'
import type { MenuItem } from '@/lib/types'

interface FoodItemCardProps {
  item: MenuItem
  onAdd: (item: MenuItem) => void
  quantity?: number
}

export default function FoodItemCard({ item, onAdd, quantity = 0 }: FoodItemCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
          <img 
            src={item.image_url || 'https://via.placeholder.com/100x100?text=Food'} 
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Food'
            }}
          />
          {!item.is_available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-xs font-medium">Unavailable</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[#1A1A1A] text-base mb-1 line-clamp-1">
            {item.name}
          </h4>
          <p className="text-xs text-[#666666] mb-2 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#E85D04]">
              ₦{Number(item.price).toLocaleString()}
            </span>
            {item.is_available && (
              <button
                onClick={() => onAdd(item)}
                className="w-8 h-8 bg-[#E85D04] hover:bg-[#D45103] text-white rounded-full flex items-center justify-center transition-colors"
              >
                {quantity > 0 ? (
                  <span className="text-sm font-bold">{quantity}</span>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}