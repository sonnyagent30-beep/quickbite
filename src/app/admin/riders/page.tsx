'use client'

import { useState } from 'react'

interface Rider {
  id: string
  name: string
  phone: string
  email: string
  vehicle_type: string
  license_plate: string
  total_deliveries: number
  rating: number
  status: 'pending' | 'online' | 'offline' | 'suspended'
  earnings: number
  joined_at: string
  verified: boolean
  completed_deliveries: number
  cancelled_deliveries: number
}

export default function AdminRidersPage() {
  const [riders, setRiders] = useState<Rider[]>([
    { id: '1', name: 'Chukwuma Okonkwo', phone: '+234 803 123 4567', email: 'chukwuma@email.com', vehicle_type: 'Motorcycle', license_plate: 'LAG-456-XY', total_deliveries: 342, rating: 4.8, status: 'online', earnings: 156000, joined_at: '2025-02-10', verified: true, completed_deliveries: 330, cancelled_deliveries: 12 },
    { id: '2', name: 'Adebayo Salisu', phone: '+234 804 234 5678', email: 'adebayo@email.com', vehicle_type: 'Motorcycle', license_plate: 'MUS-789-AB', total_deliveries: 289, rating: 4.6, status: 'online', earnings: 134000, joined_at: '2025-03-05', verified: true, completed_deliveries: 280, cancelled_deliveries: 9 },
    { id: '3', name: 'Emeka Nwosu', phone: '+234 805 345 6789', email: 'emeka@email.com', vehicle_type: 'Car', license_plate: 'VI-123-CD', total_deliveries: 256, rating: 4.5, status: 'offline', earnings: 118000, joined_at: '2025-01-15', verified: true, completed_deliveries: 248, cancelled_deliveries: 8 },
    { id: '4', name: 'Folake Adeyemi', phone: '+234 806 456 7890', email: 'folake@email.com', vehicle_type: 'Motorcycle', license_plate: 'IK-567-EF', total_deliveries: 198, rating: 4.7, status: 'online', earnings: 89000, joined_at: '2025-05-20', verified: true, completed_deliveries: 195, cancelled_deliveries: 3 },
    { id: '5', name: 'Ibrahim Musa', phone: '+234 807 567 8901', email: 'ibrahim@email.com', vehicle_type: 'Motorcycle', license_plate: 'SH-901-GH', total_deliveries: 167, rating: 4.4, status: 'offline', earnings: 76000, joined_at: '2025-06-01', verified: true, completed_deliveries: 160, cancelled_deliveries: 7 },
    { id: '6', name: 'Sunday Ogbonna', phone: '+234 808 678 9012', email: 'sunday@email.com', vehicle_type: 'Motorcycle', license_plate: 'OJ-234-IJ', total_deliveries: 0, rating: 0, status: 'pending', earnings: 0, joined_at: '2026-07-08', verified: false, completed_deliveries: 0, cancelled_deliveries: 0 },
    { id: '7', name: 'Grace Nnamdi', phone: '+234 809 789 0123', email: 'grace@email.com', vehicle_type: 'Bicycle', license_plate: 'N/A', total_deliveries: 0, rating: 0, status: 'pending', earnings: 0, joined_at: '2026-07-09', verified: false, completed_deliveries: 0, cancelled_deliveries: 0 },
    { id: '8', name: 'Tunde Williams', phone: '+234 810 890 1234', email: 'tunde@email.com', vehicle_type: 'Car', license_plate: 'LEK-111-KL', total_deliveries: 45, rating: 4.2, status: 'suspended', earnings: 21000, joined_at: '2026-05-01', verified: true, completed_deliveries: 40, cancelled_deliveries: 5 },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'online' | 'offline' | 'suspended'>('all')
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null)
  const [showModal, setShowModal] = useState(false)

  const verifyRider = (id: string) => {
    setRiders(prev => prev.map(r =>
      r.id === id ? { ...r, verified: true, status: 'online' } : r
    ))
  }

  const rejectRider = (id: string) => {
    setRiders(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'suspended' } : r
    ))
  }

  const toggleStatus = (id: string) => {
    setRiders(prev => prev.map(r =>
      r.id === id ? { ...r, status: r.status === 'online' ? 'offline' : 'online' } : r
    ))
  }

  const suspendRider = (id: string) => {
    setRiders(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'suspended' } : r
    ))
  }

  const filtered = riders.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.phone.includes(searchTerm) ||
                          r.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const pendingCount = riders.filter(r => r.status === 'pending').length
  const activeCount = riders.filter(r => r.status === 'online').length

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Riders
          </h1>
          <p className="text-sm text-[#666666]">Manage delivery riders, verify new applicants</p>
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
          <p className="text-2xl font-bold text-[#1A1A1A]">{riders.length}</p>
          <p className="text-sm text-[#666666]">Total Riders</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#FD7E14]">{pendingCount}</p>
          <p className="text-sm text-[#666666]">Pending Approval</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#2D6A4F]">{activeCount}</p>
          <p className="text-sm text-[#666666]">Online Now</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-[#E85D04]">₦{(riders.reduce((a, r) => a + r.earnings, 0) / 1000).toFixed(0)}k</p>
          <p className="text-sm text-[#666666]">Total Earnings</p>
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
            placeholder="Search by name, phone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#E5E5E5] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'pending', 'online', 'offline', 'suspended'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                filterStatus === s
                  ? s === 'pending' ? 'bg-[#FD7E14] text-white' : s === 'online' ? 'bg-[#2D6A4F] text-white' : s === 'offline' ? 'bg-[#666666] text-white' : s === 'suspended' ? 'bg-[#DC3545] text-white' : 'bg-[#E85D04] text-white'
                  : 'bg-white border border-[#E5E5E5] text-[#666666] hover:bg-[#F8F9FA]'
              }`}
            >
              {s === 'all' ? 'All' : s === 'pending' ? '⏳ Pending' : s === 'online' ? '🟢 Online' : s === 'offline' ? '⚪ Offline' : '🔴 Suspended'}
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
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rider</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Vehicle</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Deliveries</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Rating</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Earnings</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-sm">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{r.name}</p>
                        <p className="text-xs text-[#666666]">{r.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">
                    <p>{r.vehicle_type}</p>
                    <p className="text-xs font-mono">{r.license_plate}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="text-[#1A1A1A]">{r.total_deliveries}</p>
                    {r.total_deliveries > 0 && (
                      <p className="text-xs text-[#2D6A4F]">{((r.completed_deliveries / r.total_deliveries) * 100).toFixed(0)}% success</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.rating > 0 ? (
                      <span className="flex items-center gap-1 text-sm">
                        ⭐ {r.rating.toFixed(1)}
                      </span>
                    ) : <span className="text-[#999]">—</span>}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">
                    {r.earnings > 0 ? `₦${r.earnings.toLocaleString()}` : <span className="text-[#999]">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.status === 'pending' ? 'bg-[#FD7E14]/10 text-[#FD7E14]' :
                      r.status === 'online' ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' :
                      r.status === 'offline' ? 'bg-[#666666]/10 text-[#666666]' :
                      'bg-[#DC3545]/10 text-[#DC3545]'
                    }`}>
                      {r.status === 'pending' ? '⏳ Pending' : r.status === 'online' ? '🟢 Online' : r.status === 'offline' ? '⚪ Offline' : '🔴 Suspended'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => verifyRider(r.id)} className="px-3 py-1.5 bg-[#2D6A4F] text-white text-xs font-medium rounded-lg hover:bg-[#1B4332]">
                          Approve ✓
                        </button>
                        <button onClick={() => rejectRider(r.id)} className="px-3 py-1.5 bg-[#DC3545]/10 text-[#DC3545] text-xs font-medium rounded-lg hover:bg-[#DC3545]/20">
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setSelectedRider(r); setShowModal(true) }} className="px-3 py-1.5 text-xs font-medium text-[#0D6EFD] hover:bg-[#0D6EFD]/10 rounded-lg">
                          Details
                        </button>
                        {r.status === 'online' && (
                          <button onClick={() => suspendRider(r.id)} className="px-3 py-1.5 text-xs font-medium text-[#DC3545] hover:bg-[#DC3545]/10 rounded-lg">
                            Suspend
                          </button>
                        )}
                        {r.status === 'suspended' && (
                          <button onClick={() => verifyRider(r.id)} className="px-3 py-1.5 text-xs font-medium text-[#2D6A4F] hover:bg-[#2D6A4F]/10 rounded-lg">
                            Reinstate
                          </button>
                        )}
                        {r.status === 'offline' && (
                          <button onClick={() => toggleStatus(r.id)} className="px-3 py-1.5 text-xs font-medium text-[#2D6A4F] hover:bg-[#2D6A4F]/10 rounded-lg">
                            Set Online
                          </button>
                        )}
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
            <p className="text-4xl mb-3">🛵</p>
            <p className="text-[#666666]">No riders found</p>
          </div>
        )}
      </div>

      {/* Rider Detail Modal */}
      {showModal && selectedRider && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white font-bold">
                  {selectedRider.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A]">{selectedRider.name}</h3>
                  <p className="text-sm text-[#666666]">Joined {new Date(selectedRider.joined_at).toLocaleDateString('en-NG')}</p>
                </div>
              </div>
              <button onClick={() => setShowModal(false)} className="text-[#666666] hover:text-[#1A1A1A]">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#666666]">Phone</span><span className="font-medium">{selectedRider.phone}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Email</span><span className="font-medium">{selectedRider.email}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Vehicle</span><span className="font-medium">{selectedRider.vehicle_type}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">License Plate</span><span className="font-medium font-mono">{selectedRider.license_plate}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Total Deliveries</span><span className="font-medium">{selectedRider.total_deliveries}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Completed</span><span className="font-medium text-[#2D6A4F]">{selectedRider.completed_deliveries}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Cancelled</span><span className="font-medium text-[#DC3545]">{selectedRider.cancelled_deliveries}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Rating</span><span className="font-medium">⭐ {selectedRider.rating > 0 ? selectedRider.rating.toFixed(1) : 'N/A'}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Total Earnings</span><span className="font-medium text-[#E85D04]">₦{selectedRider.earnings.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-[#666666]">Verified</span><span className="font-medium">{selectedRider.verified ? '✓ Yes' : '✗ No'}</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
