'use client'

import { useState } from 'react'

export default function RiderProfilePage() {
  const [notifications, setNotifications] = useState({
    push: true,
    sms: true,
    whatsapp: false,
  })
  const [vehicleType, setVehicleType] = useState('bike')

  const handleLogout = () => {
    localStorage.removeItem('quickbite_user')
    localStorage.removeItem('quickbite_session')
    window.location.href = '/'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Profile
        </h1>
        <p className="text-sm text-[#666666]">Manage your rider account</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#E85D04] flex items-center justify-center text-white text-xl font-bold">
          EN
        </div>
        <div>
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Emeka Nwosu</h2>
          <p className="text-sm text-[#666666]">+234 804 444 4444</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
            <span className="text-xs text-[#2D6A4F] font-medium">Online</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-bold text-[#E85D04]">127</p>
          <p className="text-xs text-[#666666]">Total Deliveries</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-bold text-[#1A1A1A]">4.8</p>
          <p className="text-xs text-[#666666]">Rating</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <p className="text-xl font-bold text-[#2D6A4F]">₦{((127 * 700)).toLocaleString()}</p>
          <p className="text-xs text-[#666666]">Total Earned</p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5]">
          <h3 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>Settings</h3>
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {/* Vehicle Type */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1A1A1A]">Vehicle Type</p>
              <p className="text-xs text-[#666666]">What you ride with</p>
            </div>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="px-3 py-2 bg-[#F5F5F5] rounded-lg text-sm border-0 outline-none"
            >
              <option value="bike">Motorcycle</option>
              <option value="car">Car</option>
              <option value="bicycle">Bicycle</option>
            </select>
          </div>

          {/* Push Notifications */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1A1A1A]">Push Notifications</p>
              <p className="text-xs text-[#666666]">New order alerts</p>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, push: !n.push }))}
              className={`relative w-12 h-7 rounded-full transition-colors ${notifications.push ? 'bg-[#2D6A4F]' : 'bg-[#E5E5E5]'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${notifications.push ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* SMS */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1A1A1A]">SMS Alerts</p>
              <p className="text-xs text-[#666666]">Order updates via SMS</p>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, sms: !n.sms }))}
              className={`relative w-12 h-7 rounded-full transition-colors ${notifications.sms ? 'bg-[#2D6A4F]' : 'bg-[#E5E5E5]'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${notifications.sms ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* WhatsApp */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-[#1A1A1A]">WhatsApp Updates</p>
              <p className="text-xs text-[#666666]">Delivery updates via WhatsApp</p>
            </div>
            <button
              onClick={() => setNotifications(n => ({ ...n, whatsapp: !n.whatsapp }))}
              className={`relative w-12 h-7 rounded-full transition-colors ${notifications.whatsapp ? 'bg-[#2D6A4F]' : 'bg-[#E5E5E5]'}`}
            >
              <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${notifications.whatsapp ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="divide-y divide-[#E5E5E5]">
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9FA] transition-colors">
            <span className="font-medium text-[#1A1A1A]">Help & Support</span>
            <span className="text-[#666666]">→</span>
          </button>
          <button className="w-full p-4 flex items-center justify-between text-left hover:bg-[#F8F9FA] transition-colors">
            <span className="font-medium text-[#1A1A1A]">About QuickBite</span>
            <span className="text-[#666666]">→</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full py-3 bg-[#DC3545] text-white font-semibold rounded-xl hover:bg-[#c82333] transition-colors"
      >
        Logout
      </button>
    </div>
  )
}
