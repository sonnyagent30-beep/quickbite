'use client'

import { useState } from 'react'

interface Restaurant {
  id: string
  name: string
  owner_name: string
  owner_email: string
  phone: string
  cuisine: string
  address: string
  rating: number
  status: 'pending' | 'active' | 'suspended'
  orders: number
  revenue: number
  joined_at: string
  verified: boolean
}

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { id: '1', name: 'Bunche Kitchen', owner_name: 'Tunde Bakare', owner_email: 'tunde@bunche.com', phone: '+234 801 111 1111', cuisine: 'Nigerian', address: '15 Admiralty Way, Lekki Phase 1', rating: 4.8, status: 'active', orders: 234, revenue: 890000, joined_at: '2025-03-15', verified: true },
    { id: '2', name: 'Chicken Republic', owner_name: 'Chinedu Okafor', owner_email: 'chinedu@chickenrep.com', phone: '+234 802 222 2222', cuisine: 'Fast Food', address: '42 Adeola Odeku St, Victoria Island', rating: 4.5, status: 'active', orders: 156, revenue: 456000, joined_at: '2025-01-20', verified: true },
    { id: '3', name: 'Taste of Lagos', owner_name: 'Ada Nwankwo', owner_email: 'ada@tasteoflagos.com', phone: '+234 803 333 3333', cuisine: 'Nigerian', address: '25 Ozumba Mbadiwe Rd, VI', rating: 4.6, status: 'active', orders: 98, revenue: 267000, joined_at: '2025-04-01', verified: true },
    { id: '4', name: 'Mama Put Express', owner_name: 'Ngozi Eze', owner_email: 'ngozi@mamaput.com', phone: '+234 804 444 4444', cuisine: 'Nigerian', address: '10 Allen Avenue, Ikeja', rating: 4.2, status: 'pending', orders: 0, revenue: 0, joined_at: '2026-07-08', verified: false },
    { id: '5', name: 'Suya Galaxy', owner_name: 'Ibrahim Musa', owner_email: 'ibrahim@suya.com', phone: '+234 805 555 5555', cuisine: 'Street Food', address: '67 Bode Thomas St, Surulere', rating: 4.7, status: 'pending', orders: 0, revenue: 0, joined_at: '2026-07-07', verified: false },
    { id: '6', name: 'Pizza Hub', owner_name: 'Oluwaseun Adeyemi', owner_email: 'seun@pizzahub.com', phone: '+234 806 666 6666', cuisine: 'Italian', address: '88 Lekki Phase 1, Lagos', rating: 4.3, status: 'active', orders: 76, revenue: 198000, joined_at: '2024-11-10', verified: true },
    { id: '7', name: 'Sushi Lagos', owner_name: 'Kenji Tanaka', owner_email: 'kenji@sushilagos.com', phone: '+234 807 777 7777', cuisine: 'Japanese', address: '10 Ikoyi, Lagos', rating: 4.6, status: 'suspended', orders: 64, revenue: 287000, joined_at: '2024-08-22', verified: true },
    { id: '8', name: 'Baba Jollof', owner_name: 'Emeka Obi', owner_email: 'emeka@babajollof.com', phone: '+234 808 888 8888', cuisine: 'Nigerian', address: '45 Ikeja GRA, Lagos', rating: 4.9, status: 'pending', orders: 0, revenue: 0, joined_at: '2026-07-09', verified: false },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'suspended'>('all')
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [showModal, setShowModal] = useState(false)

  const toggleStatus = (id: string) => {
    setRestaurants(prev => prev.map(r => {
      if (r.id !== id) return r
      const newStatus = r.status === 'active' ? 'suspended' : r.status === 'suspended' ? 'active' : r.status
      return { ...r, status: newStatus }
    }))
  }

  const verifyRestaurant = (id: string) => {
    setRestaurants(prev => prev.map(r =>
      r.id === id ? { ...r, verified: true, status: 'active' } : r
    ))
  }

  const rejectRestaurant = (id: string) => {
    setRestaurants(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'suspended' } : r
    ))
  }

  const filtered = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatCurrency = (n: number) => `₦${n.toLocaleString()}`

  const pendingCount = restaurants.filter(r => r.status === 'pending').length
  const activeCount = restaurants.filter(r => r.status === 'active').length

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Restaurants
          </h1>
          <p className="text-sm text-[#666666]">Manage partner restaurants, verify new applicants</p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-[#FD7E14]/10 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-[#FD7E14] animate-pulse" />
            <span className="text-sm font-medium text-[#FD7E14]">{pendingCount} pending approval</span>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#1A1A1A]">{restaurants.length}</p>
          <p className="text-sm text-[#666666]">Total</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#FD7E14]">{pendingCount}</p>
          <p className="text-sm text-[#666666]">Pending Approval</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#2D6A4F]">{activeCount}</p>
          <p className="text-sm text-[#666666]">Active</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#E85D04]">₦{(restaurants.reduce((a, r) => a + r.revenue, 0) / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#666666]">Total Revenue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, owner, cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'active', 'suspended'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filterStatus === s
                  ? s === 'pending' ? 'bg-[#FD7E14] text-white' : s === 'active' ? 'bg-[#2D6A4F] text-white' : s === 'suspended' ? 'bg-[#DC3545] text-white' : 'bg-[#E85D04] text-white'
                  : 'bg-white border border-[#E5E5E5] text-[#666666] hover:bg-[#F8F9FA]'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Restaurant</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Owner</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Cuisine</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Revenue</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{r.name}</p>
                      <p className="text-xs text-[#666666]">{r.address}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">
                    <p>{r.owner_name}</p>
                    <p className="text-xs">{r.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">{r.cuisine}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm">
                      ⭐ {r.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                    {r.revenue > 0 ? formatCurrency(r.revenue) : <span className="text-[#999]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === 'pending' ? 'bg-[#FD7E14]/10 text-[#FD7E14]' :
                      r.status === 'active' ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' :
                      'bg-[#DC3545]/10 text-[#DC3545]'
                    }`}>
                      {r.status === 'pending' ? '⏳ Pending' : r.status === 'active' ? '✓ Active' : '✕ Suspended'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => verifyRestaurant(r.id)}
                          className="px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#1B4332]"
                        >
                          Approve ✓
                        </button>
                        <button
                          onClick={() => rejectRestaurant(r.id)}
                          className="px-3 py-1.5 bg-[#DC3545]/10 text-[#DC3545] text-xs font-medium rounded-lg hover:bg-[#DC3545]/20"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setSelectedRestaurant(r); setShowModal(true) }}
                          className="px-3 py-1.5 text-xs font-medium text-[#0D6EFD] hover:bg-[#0D6EFD]/10 rounded-lg"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => toggleStatus(r.id)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                            r.status === 'active'
                              ? 'text-[#DC3545] hover:bg-[#DC3545]/10'
                              : 'text-[#2D6A4F] hover:bg-[#2D6A4F]/10'
                          }`}
                        >
                          {r.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-[#666666]">No restaurants found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedRestaurant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1A1A1A]">{selectedRestaurant.name}</h3>
              <button onClick={() => setShowModal(false)} className="text-[#666666] hover:text-[#1A1A1A]">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#666666]">Owner</span><span className="font-medium">{selectedRestaurant.owner_name}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Email</span><span className="font-medium">{selectedRestaurant.owner_email}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Phone</span><span className="font-medium">{selectedRestaurant.phone}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Cuisine</span><span className="font-medium">{selectedRestaurant.cuisine}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Address</span><span className="font-medium text-right max-w-[200px]">{selectedRestaurant.address}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Rating</span><span className="font-medium">⭐ {selectedRestaurant.rating}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Orders</span><span className="font-medium">{selectedRestaurant.orders}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Revenue</span><span className="font-medium text-[#E85D04]">{formatCurrency(selectedRestaurant.revenue)}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Joined</span><span className="font-medium">{new Date(selectedRestaurant.joined_at).toLocaleDateString('en-NG')}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Verified</span><span className="font-medium">{selectedRestaurant.verified ? '✓ Yes' : '✗ No'}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
