'use client'

import { useState, useEffect } from 'react'

interface TopRestaurant {
  id: string
  name: string
  orders: number
  revenue: number
  rating: number
}

interface RecentOrder {
  id: string
  restaurant_name: string
  customer_name: string
  total: number
  status: string
  created_at: string
}

export default function AdminDashboardPage() {
  const [gmv, setGmv] = useState(4567800)
  const [totalOrders, setTotalOrders] = useState(1247)
  const [avgOrderValue, setAvgOrderValue] = useState(3660)
  const [activeRestaurants, setActiveRestaurants] = useState(28)
  const [topRestaurants, setTopRestaurants] = useState<TopRestaurant[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])

  useEffect(() => {
    setTopRestaurants([
      { id: '1', name: 'Chicken Republic', orders: 156, revenue: 456000, rating: 4.5 },
      { id: '2', name: 'Baba Jollof', orders: 142, revenue: 389000, rating: 4.7 },
      { id: '3', name: 'Amala Sky', orders: 98, revenue: 267000, rating: 4.6 },
      { id: '4', name: 'Taste of China', orders: 87, revenue: 245000, rating: 4.3 },
      { id: '5', name: 'The Burger Joint', orders: 76, revenue: 198000, rating: 4.4 },
    ])

    setRecentOrders([
      { id: '1', restaurant_name: 'Chicken Republic', customer_name: 'Tobi A.', total: 6500, status: 'delivered', created_at: new Date(Date.now() - 5 * 60000).toISOString() },
      { id: '2', restaurant_name: 'Baba Jollof', customer_name: 'Ada N.', total: 5200, status: 'dispatched', created_at: new Date(Date.now() - 12 * 60000).toISOString() },
      { id: '3', restaurant_name: 'Amala Sky', customer_name: 'Emeka O.', total: 3800, status: 'preparing', created_at: new Date(Date.now() - 18 * 60000).toISOString() },
      { id: '4', restaurant_name: 'Taste of China', customer_name: 'Fatima K.', total: 7800, status: 'confirmed', created_at: new Date(Date.now() - 25 * 60000).toISOString() },
      { id: '5', restaurant_name: 'The Burger Joint', customer_name: 'Chidi M.', total: 4100, status: 'pending', created_at: new Date(Date.now() - 30 * 60000).toISOString() },
    ])
  }, [])

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`
    if (amount >= 100000) return `₦${(amount / 1000).toFixed(0)}k`
    return `₦${amount.toLocaleString()}`
  }

  const formatTime = (dateString: string) => {
    const mins = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    return `${hours}h ago`
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'bg-[#FFF3CD]', text: 'text-[#1A1A1A]' },
      confirmed: { bg: 'bg-[#0D6EFD]/10', text: 'text-[#0D6EFD]' },
      preparing: { bg: 'bg-[#FD7E14]/10', text: 'text-[#FD7E14]' },
      dispatched: { bg: 'bg-[#2D6A4F]/10', text: 'text-[#2D6A4F]' },
      delivered: { bg: 'bg-[#198754]/10', text: 'text-[#198754]' },
    }
    const style = styles[status] || styles.pending
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Analytics Dashboard
          </h1>
          <p className="text-sm text-[#666666]">Overview of QuickBite platform performance</p>
        </div>
        <select className="px-4 py-2 bg-white rounded-xl border border-[#E5E5E5] text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="2" y2="22"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <span className="text-xs text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{formatCurrency(gmv)}</p>
          <p className="text-sm text-[#666666]">GMV</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <span className="text-xs text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{totalOrders.toLocaleString()}</p>
          <p className="text-sm text-[#666666]">Total Orders</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#FFB703]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 12 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span className="text-xs text-[#666666] bg-[#F5F5F5] px-2 py-1 rounded-full">avg</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">₦{avgOrderValue.toLocaleString()}</p>
          <p className="text-sm text-[#666666]">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#0D6EFD]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
              </svg>
            </div>
            <span className="text-xs text-[#2D6A4F] bg-[#2D6A4F]/10 px-2 py-1 rounded-full">+5</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{activeRestaurants}</p>
          <p className="text-sm text-[#666666]">Active Restaurants</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Orders This Week
          </h2>
          <div className="h-48 flex items-end justify-around gap-2">
            {[65, 85, 72, 90, 68, 78, 95].map((value, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-10 bg-gradient-to-t from-[#E85D04] to-[#FFB703] rounded-t-lg"
                  style={{ height: `${value}%` }}
                />
                <span className="text-xs text-[#666666]">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Restaurants */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Top Restaurants
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rank</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Restaurant</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Orders</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Revenue</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {topRestaurants.map((restaurant, i) => (
                  <tr key={restaurant.id}>
                    <td className="px-4 py-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        i === 0 ? 'bg-[#FFB703] text-[#1A1A1A]' :
                        i === 1 ? 'bg-[#CCCCCC] text-[#1A1A1A]' :
                        i === 2 ? 'bg-[#D45103] text-white' :
                        'bg-[#F5F5F5] text-[#666666]'
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{restaurant.name}</td>
                    <td className="px-4 py-3 text-sm text-[#666666]">{restaurant.orders}</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{formatCurrency(restaurant.revenue)}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        {restaurant.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Recent Orders
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Order ID</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Restaurant</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Customer</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Total</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-sm font-mono text-[#666666]">#{order.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{order.restaurant_name}</td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{order.customer_name}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#E85D04]">₦{order.total.toLocaleString()}</td>
                  <td className="px-4 py-3">{getStatusBadge(order.status)}</td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{formatTime(order.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}