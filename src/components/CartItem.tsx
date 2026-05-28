'use client'

import { useState } from 'react'

interface CartItemType {
  id: string
  menu_item_id: string
  name: string
  price: number
  quantity: number
  image_url: string
}

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
      {/* Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F5F5F5]">
        <img 
          src={item.image_url || 'https://via.placeholder.com/80x80?text=Food'} 
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=Food'
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-[#1A1A1A] text-sm line-clamp-1">
            {item.name}
          </h4>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[#666666] hover:text-[#DC3545] transition-colors p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-bold text-[#E85D04] text-sm">
            ₦{(Number(item.price) * item.quantity).toLocaleString()}
          </span>
          
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 bg-[#F5F5F5] hover:bg-[#E5E5E5] text-[#333333] rounded-full flex items-center justify-center transition-colors"
              disabled={item.quantity <= 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
              </svg>
            </button>
            <span className="w-8 text-center font-semibold text-[#1A1A1A]">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 bg-[#E85D04] hover:bg-[#D45103] text-white rounded-full flex items-center justify-center transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14"/>
                <path d="M5 12h14"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}