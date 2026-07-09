'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { DEMO_RESTAURANTS } from '@/lib/demo-data'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, restaurantId, restaurantName, subtotal, clearCart } = useCart()
  const [deliveryAddress, setDeliveryAddress] = useState('15 Admiralty Way, Lekki Phase 1, Lagos')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('+234 801 111 1111')
  
  // Get delivery fee from restaurant if available
  const restaurant = DEMO_RESTAURANTS.find(r => r.id === restaurantId)
  const deliveryFee = restaurant?.delivery_fee || 500
  const total = subtotal + deliveryFee

  const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `QB-${timestamp}-${random}`
  }

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address')
      return
    }

    if (!phoneNumber.trim()) {
      alert('Please enter a phone number')
      return
    }

    setIsProcessing(true)
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Generate order ID
    const orderId = generateOrderId()
    
    // Store order details in localStorage for demo purposes
    const orderData = {
      id: orderId,
      restaurant_name: restaurantName,
      items: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      delivery_fee: deliveryFee,
      total,
      delivery_address: deliveryAddress,
      customer_phone: phoneNumber,
      payment_method: paymentMethod,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    }
    
    // Save to localStorage (demo)
    const existingOrders = JSON.parse(localStorage.getItem('quickbite_orders') || '[]')
    existingOrders.unshift(orderData)
    localStorage.setItem('quickbite_orders', JSON.stringify(existingOrders))
    
    clearCart()
    
    // Show success message then redirect
    alert(`Order placed! Order ID: ${orderId}`)
    router.push('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666666]">Your cart is empty</p>
          <Link href="/" className="text-[#E85D04] font-medium mt-2 inline-block">
            Browse Restaurants
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/cart" className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Checkout
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-32">
        {/* Delivery Details */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Delivery Details
          </h2>
          <div className="space-y-3">
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
            <textarea
              placeholder="Delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04] resize-none"
            />
            <input
              type="text"
              placeholder="Delivery instructions (optional)"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Order Summary
          </h2>
          <div className="bg-[#F8F9FA] rounded-xl p-4">
            <p className="text-sm font-medium text-[#333333] mb-3">{restaurantName}</p>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#666666]">{item.quantity}x {item.name}</span>
                  <span className="text-[#1A1A1A]">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666666]">Subtotal</span>
              <span className="text-[#1A1A1A]">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666666]">Delivery Fee</span>
              <span className="text-[#1A1A1A]">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#E5E5E5] mt-2">
              <span className="text-[#1A1A1A]">Total</span>
              <span className="text-[#E85D04]">₦{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-4">
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Payment Method
          </h2>
          <div className="space-y-3">
            {/* Cash on Delivery - Default */}
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#E85D04] bg-[#FFF3CD]' : 'border-[#E5E5E5] bg-white'}`}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="w-5 h-5 accent-[#E85D04]"
              />
              <div className="flex-1">
                <p className="font-medium text-[#1A1A1A]">Cash on Delivery</p>
                <p className="text-xs text-[#666666]">Pay with cash when your order arrives</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="12" x="2" y="6" rx="2"/>
                <circle cx="12" cy="12" r="2"/>
                <path d="M6 12h.01M18 12h.01"/>
              </svg>
            </label>

            {/* Card Payment */}
            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#E85D04] bg-[#FFF3CD]' : 'border-[#E5E5E5] bg-white'}`}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="w-5 h-5 accent-[#E85D04]"
              />
              <div className="flex-1">
                <p className="font-medium text-[#1A1A1A]">Card Payment</p>
                <p className="text-xs text-[#666666]">Pay with your debit/credit card</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
            </label>
          </div>
        </div>
      </main>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E5E5]">
        <button
          onClick={handlePlaceOrder}
          disabled={isProcessing}
          className="btn-primary w-full text-center flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.657A8 8 0 0112 4v0c-3.314 0-6 2.686-6 6h4zm2-2.657A8 8 0 0120 12h-4c0-3.314-2.686-6-6-6v4z"/>
              </svg>
              Processing...
            </>
          ) : (
            <>Place Order • ₦{total.toLocaleString()}</>
          )}
        </button>
      </div>
    </div>
  )
}
