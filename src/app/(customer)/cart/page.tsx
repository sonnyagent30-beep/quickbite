'use client'

import { useState } from 'react'
import Link from 'next/link'
import CartItemComponent from '@/components/CartItem'
import { useCart } from '@/lib/cart-context'
import { DEMO_RESTAURANTS } from '@/lib/demo-data'

export default function CartPage() {
  const { items, restaurantId, restaurantName, updateQuantity, removeItem, subtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState('')
  
  // Get delivery fee from restaurant if available
  const restaurant = DEMO_RESTAURANTS.find(r => r.id === restaurantId)
  const deliveryFee = restaurant?.delivery_fee || 500
  const total = subtotal + deliveryFee - promoDiscount

  const applyPromoCode = () => {
    // Simple demo promo codes
    const promoCodes: Record<string, number> = {
      'QUICK10': 10,
      'FIRST20': 20,
      'BITE5': 5,
    }
    
    const discount = promoCodes[promoCode.toUpperCase()]
    if (discount) {
      setPromoDiscount(subtotal * (discount / 100))
      setPromoError('')
    } else {
      setPromoDiscount(0)
      setPromoError('Invalid promo code')
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
          <div className="flex items-center h-14 px-4">
            <Link href="/home" className="w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </Link>
            <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Your Cart
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#1A1A1A] mb-2">Your cart is empty</h2>
            <p className="text-[#666666] mb-6">Add items from a restaurant to get started</p>
            <Link href="/home" className="px-6 py-3 bg-[#E85D04] text-white rounded-xl font-semibold inline-block">
              Browse Restaurants
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/home" className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Your Cart
          </h1>
          <button onClick={clearCart} className="w-10 h-10 flex items-center justify-center text-[#666666]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-32">
        {/* Restaurant Name */}
        <div className="px-4 py-3 bg-[#F8F9FA] border-b border-[#E5E5E5]">
          <p className="text-sm font-medium text-[#333333]">{restaurantName}</p>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-3">
          {items.map((item) => (
            <CartItemComponent
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Promo Code */}
        <div className="px-4 py-4 border-t border-[#E5E5E5]">
          <label className="text-sm font-medium text-[#333333] mb-2 block">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
            <button
              onClick={applyPromoCode}
              className="px-6 py-3 bg-[#1A1A1A] text-white rounded-xl font-medium hover:bg-[#333333] transition-colors"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="text-[#DC3545] text-xs mt-1">{promoError}</p>}
          {promoDiscount > 0 && <p className="text-[#2D6A4F] text-xs mt-1">Promo applied! {promoCode.toUpperCase()}</p>}
        </div>

        {/* Price Breakdown */}
        <div className="px-4 py-4 bg-[#F8F9FA] border-t border-[#E5E5E5] space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#666666]">Subtotal</span>
            <span className="text-[#1A1A1A]">₦{subtotal.toLocaleString()}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-[#2D6A4F]">Promo Discount</span>
              <span className="text-[#2D6A4F]">-₦{promoDiscount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-[#666666]">Delivery Fee</span>
            <span className="text-[#1A1A1A]">₦{deliveryFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#E5E5E5]">
            <span className="text-[#1A1A1A]">Total</span>
            <span className="text-[#E85D04]">₦{total.toLocaleString()}</span>
          </div>
        </div>
      </main>

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E5E5] md:hidden">
        <Link href="/checkout" className="block w-full py-4 bg-[#E85D04] text-white font-semibold text-center rounded-xl hover:bg-[#D45103] transition-colors">
          Proceed to Checkout • ₦{total.toLocaleString()}
        </Link>
      </div>
    </div>
  )
}
