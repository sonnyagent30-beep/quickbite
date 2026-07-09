'use client'

import { useState } from 'react'

interface Rider {
  id: string
  name: string
  phone: string
  totalDeliveries: number
  rating: number
  status: 'online' | 'offline'
  earnings: number
  vehicle: string
}

export default function RidersPage() {
  const [riders, setRiders] = useState<Rider[]>([
    { id: '1', name: 'Chukwuma Okonkwo', phone: '+234 803 123 4567', totalDeliveries: 342, rating: 4.8, status: 'online', earnings: 156000, vehicle: 'Motorcycle' },
    { id: '2', name: 'Adebayo Salisu', phone: '+234 804 234 5678', totalDeliveries: 289, rating: 4.6, status: 'online', earnings: 134000, vehicle: 'Motorcycle' },
    { id: '3', name: 'Emeka Nwosu', phone: '+234 805 345 6789', totalDeliveries: 256, rating: 4.5, status: 'offline', earnings: 118000, vehicle: 'Car' },
    { id: '4', name: 'Folake Adeyemi', phone: '+234 806 456 7890', totalDeliveries: 198, rating: 4.7, status: 'online', earnings: 89000, vehicle: 'Motorcycle' },
    { id: '5', name: 'Ibrahim Musa', phone: '+234 807 567 8901', totalDeliveries: 167, rating: 4.4, status: 'offline', earnings: 76000, vehicle: 'Motorcycle' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'offline'>('all')

  const filteredRiders = riders.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.phone.includes(searchTerm)
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
            Riders Management
          </h1>
          <p className="text-sm text-[#666666]">Manage delivery riders on the platform</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#E85D04] text-white rounded-xl hover:bg-[#D45103] transition-colors text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" x2="12" y1="5" y2="19"/>
            <line x1="5" x2="19" y1="12" y2="12"/>
          </svg>
          Add Rider
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
            placeholder="Search riders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'online' | 'offline')}
          className="px-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#1A1A1A]">{riders.length}</p>
          <p className="text-sm text-[#666666]">Total Riders</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#2D6A4F]">{riders.filter(r => r.status === 'online').length}</p>
          <p className="text-sm text-[#666666]">Online</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#666666]">{riders.filter(r => r.status === 'offline').length}</p>
          <p className="text-sm text-[#666666]">Offline</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#E85D04]">{riders.reduce((a, r) => a + r.totalDeliveries, 0)}</p>
          <p className="text-sm text-[#666666]">Total Deliveries</p>
        </div>
      </div>

      {/* Riders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rider</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Phone</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Vehicle</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Deliveries</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Earnings</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredRiders.map((rider) => (
                <tr key={rider.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center">
                        <span className="text-[#2D6A4F] font-bold text-sm">{rider.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-[#1A1A1A]">{rider.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{rider.phone}</td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{rider.vehicle}</td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{rider.totalDeliveries}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      {rider.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">{formatCurrency(rider.earnings)}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                      rider.status === 'online' 
                        ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' 
                        : 'bg-[#666666]/10 text-[#666666]'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${rider.status === 'online' ? 'bg-[#2D6A4F]' : 'bg-[#666666]'}`} />
                      {rider.status.charAt(0).toUpperCase() + rider.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-3 py-1.5 text-xs font-medium text-[#0D6EFD] hover:bg-[#0D6EFD]/10 rounded-lg transition-colors">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRiders.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-[#666666]">No riders found</p>
          </div>
        )}
      </div>
    </div>
  )
}
