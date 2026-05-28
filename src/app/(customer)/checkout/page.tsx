'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, restaurantName, subtotal, clearCart } = useCart()
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ussd' | 'transfer'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const deliveryFee = items.length > 0 ? 500 : 0
  const total = subtotal + deliveryFee

  const handlePayment = async () => {
    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address')
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Create order
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurant_id: items[0]?.restaurant_id,
          items: items.map(item => ({
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            unit_price: item.price,
            subtotal: item.price * item.quantity,
          })),
          subtotal,
          delivery_fee: deliveryFee,
          total,
          delivery_address: deliveryAddress,
          payment_method: paymentMethod,
        }),
      })

      if (response.ok) {
        const order = await response.json()
        clearCart()
        router.push(`/orders/${order.id}`)
      }
    } catch (error) {
      console.error('Failed to create order:', error)
      setIsProcessing(false)
    }
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
        {/* Delivery Address */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Delivery Address
          </h2>
          <div className="space-y-3">
            <input
              type="tel"
              placeholder="Phone number (for updates)"
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
                <p className="text-xs text-[#666666]">Pay with your debit/credit card via Flutterwave</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="5" rx="2"/>
                <line x1="2" x2="22" y1="10" y2="10"/>
              </svg>
            </label>

            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'ussd' ? 'border-[#E85D04] bg-[#FFF3CD]' : 'border-[#E5E5E5] bg-white'}`}>
              <input
                type="radio"
                name="payment"
                value="ussd"
                checked={paymentMethod === 'ussd'}
                onChange={() => setPaymentMethod('ussd')}
                className="w-5 h-5 accent-[#E85D04]"
              />
              <div className="flex-1">
                <p className="font-medium text-[#1A1A1A]">USSD</p>
                <p className="text-xs text-[#666666]">Pay via USSD (GTC, UBA, First Bank)</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </label>

            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'transfer' ? 'border-[#E85D04] bg-[#FFF3CD]' : 'border-[#E5E5E5] bg-white'}`}>
              <input
                type="radio"
                name="payment"
                value="transfer"
                checked={paymentMethod === 'transfer'}
                onChange={() => setPaymentMethod('transfer')}
                className="w-5 h-5 accent-[#E85D04]"
              />
              <div className="flex-1">
                <p className="font-medium text-[#1A1A1A]">Bank Transfer</p>
                <p className="text-xs text-[#666666]">Transfer to QuickBite account</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                <path d="M13 5v2"/>
                <path d="M13 17v2"/>
                <path d="M13 11v2"/>
              </svg>
            </label>
          </div>
        </div>

        {/* Flutterwave Payment Form */}
        {paymentMethod === 'card' && (
          <div className="p-4 border-t border-[#E5E5E5]">
            <div className="bg-[#F8F9FA] rounded-xl p-4">
              <h3 className="text-sm font-semibold text-[#1A1A1A] mb-4">Card Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder name"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E5E5E5]">
        <button
          onClick={handlePayment}
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
            <>Pay ₦{total.toLocaleString()}</>
          )}
        </button>
      </div>
    </div>
  )
}