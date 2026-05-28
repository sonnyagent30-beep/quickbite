'use client'

import { useState, useEffect } from 'react'

interface Order {
  id: string
  customer_name: string
  items: Array<{ name: string; quantity: number }>
  total: number
  created_at: string
  status: string
}

interface StatCards {
  todayOrders: number
  revenue: number
  avgRating: number
  pendingOrders: number
}

export default function RestaurantDashboardPage() {
  const [stats, setStats] = useState<StatCards>({
    todayOrders: 24,
    revenue: 156500,
    avgRating: 4.6,
    pendingOrders: 3,
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [countdowns, setCountdowns] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      updateCountdowns()
    }, 60000)
    return () => clearInterval(interval)
  }, [orders])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders?restaurant_id=restaurant_id')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      // Demo orders for display
      setOrders([
        {
          id: 'order-1',
          customer_name: 'Tobi A.',
          items: [{ name: 'Jollof Rice', quantity: 2 }, { name: 'Grilled Chicken', quantity: 1 }],
          total: 6500,
          created_at: new Date(Date.now() - 5 * 60000).toISOString(),
          status: 'new',
        },
        {
          id: 'order-2',
          customer_name: 'Ada N.',
          items: [{ name: 'Coconut Rice', quantity: 1 }],
          total: 2200,
          created_at: new Date(Date.now() - 8 * 60000).toISOString(),
          status: 'preparing',
        },
        {
          id: 'order-3',
          customer_name: 'Emeka O.',
          items: [{ name: 'Peppered Goat', quantity: 1 }, { name: 'Amala', quantity: 2 }],
          total: 6000,
          created_at: new Date(Date.now() - 12 * 60000).toISOString(),
          status: 'preparing',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const updateCountdowns = () => {
    const newCountdowns: Record<string, string> = {}
    orders.forEach(order => {
      const mins = Math.floor((Date.now() - new Date(order.created_at).getTime()) / 60000)
      newCountdowns[order.id] = `${mins}m`
    })
    setCountdowns(newCountdowns)
  }

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'preparing' } : o))
  }

  const handleDeclineOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Dashboard
        </h1>
        <p className="text-sm text-[#666666]">Welcome back! Here's your restaurant overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.todayOrders}</p>
          <p className="text-sm text-[#666666]">Today's Orders</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">₦{(stats.revenue / 1000).toFixed(1)}k</p>
          <p className="text-sm text-[#666666]">Revenue</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#FFB703]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.avgRating}</p>
          <p className="text-sm text-[#666666]">Avg Rating</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#FD7E14]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FD7E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{stats.pendingOrders}</p>
          <p className="text-sm text-[#666666]">Pending</p>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Active Orders
          </h2>
        </div>

        <div className="divide-y divide-[#E5E5E5]">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#E85D04] border-t-transparent rounded-full mx-auto" />
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-[#666666]">
              No active orders at the moment
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className={`p-4 ${order.status === 'new' ? 'bg-[#FFF3CD]/30' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Order #{order.id.slice(-4)}</p>
                    <p className="text-sm text-[#666666]">{order.customer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#E85D04]">₦{order.total.toLocaleString()}</p>
                    <p className="text-sm text-[#666666]">{countdowns[order.id] || '0m'} ago</p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-3">
                  {order.items.map((item, i) => (
                    <span key={i} className="text-sm text-[#666666]">
                      {item.quantity}x {item.name}{i < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                {order.status === 'new' && (
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="flex-1 py-2 bg-[#2D6A4F] text-white rounded-lg font-medium hover:bg-[#1B4332] transition-colors text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineOrder(order.id)}
                      className="flex-1 py-2 bg-[#DC3545] text-white rounded-lg font-medium hover:bg-[#c82333] transition-colors text-sm"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {order.status === 'preparing' && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#FD7E14] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FD7E14] animate-pulse" />
                      Preparing
                    </span>
                    <button className="text-sm text-[#E85D04] font-medium">Mark Ready</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#F5F5F5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
              <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
              <path d="M12 11h4"/>
              <path d="M12 16h4"/>
              <path d="M8 11h2"/>
              <path d="M8 16h2"/>
            </svg>
            <span className="text-sm font-medium text-[#666666]">Add Item</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#F5F5F5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="text-sm font-medium text-[#666666]">Update Location</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#F5F5F5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"/>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
            </svg>
            <span className="text-sm font-medium text-[#666666]">Edit Menu</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#F5F5F5] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-3 3"/>
            </svg>
            <span className="text-sm font-medium text-[#666666]">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  )
}