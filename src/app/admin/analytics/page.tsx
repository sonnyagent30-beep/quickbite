'use client'

import { useState, ReactNode } from 'react'

interface TopRestaurant {
  id: string
  name: string
  orders: number
  revenue: number
}

interface TopRider {
  id: string
  name: string
  deliveries: number
  rating: number
}

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7')

  // Mock data for GMV over time
  const gmvData = [
    { day: 'Mon', value: 125000 },
    { day: 'Tue', value: 148000 },
    { day: 'Wed', value: 132000 },
    { day: 'Thu', value: 156000 },
    { day: 'Fri', value: 189000 },
    { day: 'Sat', value: 210000 },
    { day: 'Sun', value: 178000 },
  ]

  // Orders by status
  const ordersByStatus = [
    { status: 'Delivered', count: 847, color: '#2D6A4F' },
    { status: 'In Progress', count: 234, color: '#0D6EFD' },
    { status: 'Pending', count: 156, color: '#FFB703' },
    { status: 'Cancelled', count: 45, color: '#DC3545' },
  ]

  const topRestaurants: TopRestaurant[] = [
    { id: '1', name: 'Chicken Republic', orders: 156, revenue: 456000 },
    { id: '2', name: 'Baba Jollof', orders: 142, revenue: 389000 },
    { id: '3', name: 'Amala Sky', orders: 98, revenue: 267000 },
    { id: '4', name: 'Taste of China', orders: 87, revenue: 245000 },
    { id: '5', name: 'The Burger Joint', orders: 76, revenue: 198000 },
  ]

  const topRiders: TopRider[] = [
    { id: '1', name: 'Chukwuma Okonkwo', deliveries: 342, rating: 4.8 },
    { id: '2', name: 'Adebayo Salisu', deliveries: 289, rating: 4.6 },
    { id: '3', name: 'Emeka Nwosu', deliveries: 256, rating: 4.5 },
    { id: '4', name: 'Folake Adeyemi', deliveries: 198, rating: 4.7 },
    { id: '5', name: 'Ibrahim Musa', deliveries: 167, rating: 4.4 },
  ]

  const maxGmv = Math.max(...gmvData.map(d => d.value))

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}k`
    return `₦${amount}`
  }

  const totalGmv = gmvData.reduce((a, b) => a + b.value, 0)
  const totalOrders = ordersByStatus.reduce((a, b) => a + b.count, 0)

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Analytics
          </h1>
          <p className="text-sm text-[#666666]">Platform performance and insights</p>
        </div>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-white rounded-xl border border-[#E5E5E5] text-sm"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Revenue Metrics */}
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
          <p className="text-2xl font-bold text-[#1A1A1A]">{formatCurrency(totalGmv)}</p>
          <p className="text-sm text-[#666666]">Total GMV</p>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20V10"/>
                <path d="M18 20V4"/>
                <path d="M6 20v-4"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">₦{Math.round(totalGmv / totalOrders).toLocaleString()}</p>
          <p className="text-sm text-[#666666]">Avg Order Value</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-[#0D6EFD]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">28 min</p>
          <p className="text-sm text-[#666666]">Avg Delivery Time</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GMV Over Time - Bar Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            GMV Over Time
          </h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {gmvData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex justify-center">
                  <div
                    className="w-8 lg:w-12 bg-gradient-to-t from-[#E85D04] to-[#FFB703] rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${(item.value / maxGmv) * 200}px` }}
                    title={formatCurrency(item.value)}
                  />
                </div>
                <span className="text-xs text-[#666666]">{item.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
            <p className="text-sm text-[#666666]">
              Total: <span className="font-semibold text-[#1A1A1A]">{formatCurrency(totalGmv)}</span>
            </p>
          </div>
        </div>

        {/* Orders by Status - Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Orders by Status
          </h2>
          <div className="flex items-center justify-center">
            {/* Simple pie chart visualization */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {ordersByStatus.reduce((acc, item, i) => {
                  const percent = (item.count / totalOrders) * 100
                  const dashArray = `${percent} ${100 - percent}`
                  const offset = ordersByStatus.slice(0, i).reduce((a, b) => a + (b.count / totalOrders) * 100, 0)
                  acc.push(
                    <circle
                      key={i}
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="transparent"
                      stroke={item.color}
                      strokeWidth="4"
                      strokeDasharray={dashArray}
                      strokeDashoffset={-offset}
                      className="transition-all hover:opacity-80 cursor-pointer"
                    />
                  )
                  return acc
                }, [] as ReactNode[])}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#1A1A1A]">{totalOrders}</span>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {ordersByStatus.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[#666666]">{item.status}</span>
                <span className="text-xs font-medium text-[#1A1A1A] ml-auto">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {topRestaurants.map((restaurant, i) => (
                  <tr key={restaurant.id} className="hover:bg-[#F8F9FA] transition-colors">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Riders */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#E5E5E5]">
            <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Top Riders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rank</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rider</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Deliveries</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {topRiders.map((rider, i) => (
                  <tr key={rider.id} className="hover:bg-[#F8F9FA] transition-colors">
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
                    <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{rider.name}</td>
                    <td className="px-4 py-3 text-sm text-[#666666]">{rider.deliveries}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        {rider.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
