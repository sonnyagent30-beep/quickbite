'use client'

import { useState } from 'react'

interface CompletedOrder {
  id: string
  restaurant_name: string
  customer_name: string
  earning: number
  completed_at: string
}

export default function RiderOrdersPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')
  const [activeOrders, setActiveOrders] = useState([
    {
      id: 'DLV-003',
      restaurant_name: 'Taste of Lagos',
      customer_name: 'Tobi A.',
      items: [{ name: 'Abacha & Fish', quantity: 1 }],
      earning: 750,
      status: 'picked_up',
    },
  ])
  const [completedOrders] = useState<CompletedOrder[]>([
    { id: 'DLV-001', restaurant_name: 'Bunche Kitchen', customer_name: 'John Eze', earning: 850, completed_at: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
    { id: 'DLV-002', restaurant_name: 'Chicken Republic', customer_name: 'Ada N.', earning: 650, completed_at: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
    { id: 'DLV-003', restaurant_name: 'Bunche Kitchen', customer_name: 'Emeka O.', earning: 800, completed_at: new Date(Date.now() - 1000 * 60 * 180).toISOString() },
    { id: 'DLV-004', restaurant_name: 'Chicken Republic', customer_name: 'Fatima K.', earning: 550, completed_at: new Date(Date.now() - 1000 * 60 * 240).toISOString() },
  ])

  const handleDelivered = (orderId: string) => {
    setActiveOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const formatTime = (dateString: string) => {
    const mins = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    return `${hours}h ago`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          My Orders
        </h1>
        <p className="text-sm text-[#666666]">Track and manage your deliveries</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#F5F5F5] rounded-xl p-1">
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'active' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#666666]'
          }`}
        >
          Active ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'completed' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#666666]'
          }`}
        >
          Completed ({completedOrders.length})
        </button>
      </div>

      {/* Active Orders */}
      {activeTab === 'active' && (
        <div className="space-y-3">
          {activeOrders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">✅</p>
              <p className="text-[#666666]">No active deliveries</p>
            </div>
          ) : (
            activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#E85D04]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#1A1A1A]">{order.id}</span>
                  <span className="text-xs bg-[#FD7E14]/10 text-[#FD7E14] px-2 py-1 rounded-full font-medium">
                    IN TRANSIT
                  </span>
                </div>
                <p className="text-sm text-[#666666] mb-1">📍 {order.restaurant_name} → {order.customer_name}</p>
                <p className="text-sm text-[#666666] mb-3">📦 {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E85D04]">₦{order.earning}</span>
                  <button
                    onClick={() => handleDelivered(order.id)}
                    className="px-4 py-2 bg-[#2D6A4F] text-white rounded-xl text-sm font-medium"
                  >
                    Mark Delivered ✓
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Completed Orders */}
      {activeTab === 'completed' && (
        <div className="space-y-3">
          {completedOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[#1A1A1A]">{order.id}</span>
                <span className="text-xs text-[#666666]">{formatTime(order.completed_at)}</span>
              </div>
              <p className="text-sm text-[#666666]">{order.restaurant_name} → {order.customer_name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-2 py-1 rounded-full font-medium">Delivered</span>
                <span className="font-bold text-[#2D6A4F]">₦{order.earning}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
