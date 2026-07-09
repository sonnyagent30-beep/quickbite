'use client'

import { useState } from 'react'
import Link from 'next/link'

interface DeliveryOrder {
  id: string
  restaurant_name: string
  restaurant_address: string
  customer_name: string
  customer_address: string
  customer_phone: string
  items: { name: string; quantity: number }[]
  earning: number
  distance: number
  status: 'available' | 'accepted' | 'picked_up' | 'delivered'
}

export default function RiderHomePage() {
  const [online, setOnline] = useState(true)
  const [orders, setOrders] = useState<DeliveryOrder[]>([
    {
      id: 'DLV-001',
      restaurant_name: 'Bunche Kitchen',
      restaurant_address: '15 Admiralty Way, Lekki Phase 1',
      customer_name: 'John Eze',
      customer_address: '8 Closure Drive, Lekki Phase 1',
      customer_phone: '+234 801 111 1111',
      items: [{ name: 'Jollof Rice & Chicken', quantity: 2 }, { name: 'Moi Moi', quantity: 1 }],
      earning: 850,
      distance: 1.2,
      status: 'available',
    },
    {
      id: 'DLV-002',
      restaurant_name: 'Chicken Republic',
      restaurant_address: '42 Adeola Odeku St, Victoria Island',
      customer_name: 'Ada Nwankwo',
      customer_address: '25 Akin Adesola St, Victoria Island',
      customer_phone: '+234 802 222 2222',
      items: [{ name: 'Grilled Chicken Box', quantity: 1 }],
      earning: 650,
      distance: 2.1,
      status: 'available',
    },
  ])
  const [activeOrder, setActiveOrder] = useState<DeliveryOrder | null>(null)

  const handleAccept = (order: DeliveryOrder) => {
    setActiveOrder({ ...order, status: 'accepted' })
    setOrders(prev => prev.filter(o => o.id !== order.id))
  }

  const handlePickup = () => {
    if (activeOrder) {
      setActiveOrder({ ...activeOrder, status: 'picked_up' })
    }
  }

  const handleDelivered = () => {
    if (activeOrder) {
      setActiveOrder(null)
    }
  }

  const todayEarnings = activeOrder
    ? 850 + 650
    : 0

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Welcome, Emeka 👋
          </h1>
          <p className="text-sm text-[#666666]">Here are delivery opportunities near you</p>
        </div>
        {/* Online Toggle */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#666666]">{online ? 'Online' : 'Offline'}</span>
          <button
            onClick={() => setOnline(!online)}
            className={`relative w-14 h-8 rounded-full transition-colors ${online ? 'bg-[#2D6A4F]' : 'bg-[#E5E5E5]'}`}
          >
            <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform ${online ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#E85D04]">₦{todayEarnings.toLocaleString()}</p>
          <p className="text-xs text-[#666666] mt-1">Today&apos;s Earnings</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">12</p>
          <p className="text-xs text-[#666666] mt-1">Deliveries</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-[#1A1A1A]">4.8</p>
          <p className="text-xs text-[#666666] mt-1">Rating</p>
        </div>
      </div>

      {/* Active Delivery */}
      {activeOrder && (
        <div className="bg-[#2D6A4F] rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
              {activeOrder.status === 'accepted' ? 'ACCEPTED' : activeOrder.status === 'picked_up' ? 'IN TRANSIT' : ''}
            </span>
            <span className="text-sm font-bold">₦{activeOrder.earning}</span>
          </div>
          <h3 className="font-semibold mb-2">Order {activeOrder.id}</h3>
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-start gap-2">
              <span>📍</span>
              <div>
                <p className="font-medium text-white">{activeOrder.restaurant_name}</p>
                <p className="text-xs text-white/70">{activeOrder.restaurant_address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span>🏠</span>
              <div>
                <p className="font-medium text-white">{activeOrder.customer_name}</p>
                <p className="text-xs text-white/70">{activeOrder.customer_address}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {activeOrder.status === 'accepted' && (
              <button
                onClick={handlePickup}
                className="flex-1 py-3 bg-white text-[#2D6A4F] font-semibold rounded-xl"
              >
                Picked Up ✓
              </button>
            )}
            {activeOrder.status === 'picked_up' && (
              <button
                onClick={handleDelivered}
                className="flex-1 py-3 bg-white text-[#2D6A4F] font-semibold rounded-xl"
              >
                Delivered ✓
              </button>
            )}
          </div>
        </div>
      )}

      {/* Available Deliveries */}
      {!activeOrder && (
        <div>
          <h2 className="font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Available Deliveries
          </h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-[#1A1A1A]">{order.restaurant_name}</p>
                    <p className="text-xs text-[#666666] mt-1">{order.restaurant_address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#E85D04]">₦{order.earning}</p>
                    <p className="text-xs text-[#666666]">{order.distance}km away</p>
                  </div>
                </div>
                <div className="text-sm text-[#666666] mb-3">
                  <p>📦 {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.restaurant_address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 border border-[#E5E5E5] text-[#666666] rounded-xl text-center text-sm font-medium hover:bg-[#F8F9FA] transition-colors"
                  >
                    📍 Navigate
                  </a>
                  <button
                    onClick={() => handleAccept(order)}
                    className="flex-1 py-2 bg-[#E85D04] text-white rounded-xl font-medium hover:bg-[#D45103] transition-colors"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-12 text-[#666666]">
                <p className="text-4xl mb-3">🛵</p>
                <p>No deliveries available right now</p>
                <p className="text-sm mt-1">Check back in a few minutes</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
