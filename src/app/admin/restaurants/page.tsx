'use client'

import { useState } from 'react'

interface Restaurant {
  id: string
  name: string
  cuisine: string
  address: string
  rating: number
  status: 'active' | 'inactive'
  orders: number
  revenue: number
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: '1', name: 'Chicken Republic', cuisine: 'Fast Food', address: '123 Lagos Island, Lagos', rating: 4.5, status: 'active', orders: 156, revenue: 456000 },
    { id: '2', name: 'Baba Jollof', cuisine: 'Local', address: '45 Ikeja GRA, Lagos', rating: 4.7, status: 'active', orders: 142, revenue: 389000 },
    { id: '3', name: 'Amala Sky', cuisine: 'Local', address: '78 Yaba, Lagos', rating: 4.6, status: 'active', orders: 98, revenue: 267000 },
    { id: '4', name: 'Taste of China', cuisine: 'Chinese', address: '15 Victoria Island, Lagos', rating: 4.3, status: 'active', orders: 87, revenue: 245000 },
    { id: '5', name: 'The Burger Joint', cuisine: 'Fast Food', address: '32 Lekki Phase 1, Lagos', rating: 4.4, status: 'active', orders: 76, revenue: 198000 },
    { id: '6', name: 'Pizza Palace', cuisine: 'Italian', address: '88 Ajah, Lagos', rating: 4.2, status: 'inactive', orders: 45, revenue: 123000 },
    { id: '7', name: 'Suya Spot', cuisine: 'Local', address: '67 Surulere, Lagos', rating: 4.8, status: 'active', orders: 112, revenue: 312000 },
    { id: '8', name: 'Sushi Master', cuisine: 'Japanese', address: '10 Ikoyi, Lagos', rating: 4.6, status: 'active', orders: 64, revenue: 287000 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const toggleStatus = (id: string) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
    ))
  }

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Restaurants Management
          </h1>
          <p className="text-sm text-[#666666]">Manage partner restaurants on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#E85D04] text-white rounded-xl hover:bg-[#D45103] transition-colors text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Add Restaurant
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
          className="px-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#1A1A1A]">{restaurants.length}</p>
          <p className="text-sm text-[#666666]">Total Restaurants</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#2D6A4F]">{restaurants.filter(r => r.status === 'active').length}</p>
          <p className="text-sm text-[#666666]">Active</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#DC3545]">{restaurants.filter(r => r.status === 'inactive').length}</p>
          <p className="text-sm text-[#666666]">Inactive</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#E85D04]">₦{(restaurants.reduce((a, r) => a + r.revenue, 0) / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#666666]">Total Revenue</p>
        </div>
      </div>

      {/* Restaurants Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Restaurant</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Cuisine</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Address</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Orders</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Revenue</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E85D04]/10 flex items-center justify-center">
                        <span className="text-[#E85D04] font-bold text-sm">{restaurant.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-[#1A1A1A]">{restaurant.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{restaurant.cuisine}</td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{restaurant.address}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      {restaurant.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{restaurant.orders}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{formatCurrency(restaurant.revenue)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      restaurant.status === 'active' 
                        ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' 
                        : 'bg-[#DC3545]/10 text-[#DC3545]'
                    }`}>
                      {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-xs font-medium text-[#0D6EFD] hover:bg-[#0D6EFD]/10 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button 
                        onClick={() => toggleStatus(restaurant.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          restaurant.status === 'active'
                            ? 'text-[#DC3545] hover:bg-[#DC3545]/10'
                            : 'text-[#2D6A4F] hover:bg-[#2D6A4F]/10'
                        }`}
                      >
                        {restaurant.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRestaurants.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-[#666666]">No restaurants found</p>
          </div>
        )}
      </div>
    </div>
  )
}
