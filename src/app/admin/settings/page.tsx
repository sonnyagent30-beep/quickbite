'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [commissionRate, setCommissionRate] = useState(15)
  const [minOrderAmount, setMinOrderAmount] = useState(1000)
  const [deliveryFee, setDeliveryFee] = useState(300)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [orderAlerts, setOrderAlerts] = useState(true)
  const [promotionalAlerts, setPromotionalAlerts] = useState(false)

  const handleSavePlatform = () => {
    alert('Platform settings saved!')
  }

  const handleSaveNotifications = () => {
    alert('Notification settings saved!')
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Settings
        </h1>
        <p className="text-sm text-[#666666]">Manage your account and platform settings</p>
      </div>

      {/* Admin Profile Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Admin Profile
        </h2>
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-[#E85D04] flex items-center justify-center">
            <span className="text-white font-bold text-2xl">AD</span>
          </div>
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue="Daniel Ayo"
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="admin@quickbite.com"
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Phone</label>
                <input
                  type="tel"
                  defaultValue="+234 803 123 4567"
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Role</label>
                <input
                  type="text"
                  defaultValue="Super Admin"
                  disabled
                  className="w-full px-4 py-3 bg-[#E5E5E5] rounded-xl text-[#666666] text-sm"
                />
              </div>
            </div>
            <button className="px-6 py-2 bg-[#E85D04] text-white rounded-xl hover:bg-[#D45103] transition-colors text-sm font-medium">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Platform Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Platform Settings
        </h2>
        <p className="text-sm text-[#666666] mb-6">Configure platform-wide business parameters</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#666666] mb-2">Commission Rate (%)</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="5"
                max="30"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="flex-1 h-2 bg-[#E5E5E5] rounded-lg appearance-none cursor-pointer accent-[#E85D04]"
              />
              <span className="w-16 text-center px-3 py-2 bg-[#F5F5F5] rounded-xl text-sm font-medium text-[#1A1A1A]">
                {commissionRate}%
              </span>
            </div>
            <p className="text-xs text-[#999] mt-1">Platform fee charged to restaurants</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#666666] mb-2">Minimum Order (₦)</label>
            <input
              type="number"
              value={minOrderAmount}
              onChange={(e) => setMinOrderAmount(Number(e.target.value))}
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
            <p className="text-xs text-[#999] mt-1">Minimum cart value for orders</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#666666] mb-2">Base Delivery Fee (₦)</label>
            <input
              type="number"
              value={deliveryFee}
              onChange={(e) => setDeliveryFee(Number(e.target.value))}
              className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
            />
            <p className="text-xs text-[#999] mt-1">Base fee before distance adjustments</p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex justify-end">
          <button 
            onClick={handleSavePlatform}
            className="px-6 py-2 bg-[#E85D04] text-white rounded-xl hover:bg-[#D45103] transition-colors text-sm font-medium"
          >
            Save Platform Settings
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Notification Settings
        </h2>
        <p className="text-sm text-[#666666] mb-6">Configure how you receive alerts and updates</p>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0D6EFD]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Email Notifications</p>
                <p className="text-xs text-[#666666]">Receive updates via email</p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                emailNotifications ? 'bg-[#E85D04]' : 'bg-[#E5E5E5]'
              }`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
                emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">SMS Notifications</p>
                <p className="text-xs text-[#666666]">Receive alerts via SMS</p>
              </div>
            </div>
            <button
              onClick={() => setSmsNotifications(!smsNotifications)}
              className={`w-12 h-6 rounded-full transition-colors ${
                smsNotifications ? 'bg-[#E85D04]' : 'bg-[#E5E5E5]'
              }`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
                smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Order Alerts */}
          <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFB703]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Order Alerts</p>
                <p className="text-xs text-[#666666]">Get notified for new orders</p>
              </div>
            </div>
            <button
              onClick={() => setOrderAlerts(!orderAlerts)}
              className={`w-12 h-6 rounded-full transition-colors ${
                orderAlerts ? 'bg-[#E85D04]' : 'bg-[#E5E5E5]'
              }`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
                orderAlerts ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {/* Promotional Alerts */}
          <div className="flex items-center justify-between p-4 bg-[#F8F9FA] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">Promotional Alerts</p>
                <p className="text-xs text-[#666666]">Marketing and promotion notifications</p>
              </div>
            </div>
            <button
              onClick={() => setPromotionalAlerts(!promotionalAlerts)}
              className={`w-12 h-6 rounded-full transition-colors ${
                promotionalAlerts ? 'bg-[#E85D04]' : 'bg-[#E5E5E5]'
              }`}
            >
              <span className={`block w-5 h-5 bg-white rounded-full shadow transition-transform ${
                promotionalAlerts ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#E5E5E5] flex justify-end">
          <button 
            onClick={handleSaveNotifications}
            className="px-6 py-2 bg-[#E85D04] text-white rounded-xl hover:bg-[#D45103] transition-colors text-sm font-medium"
          >
            Save Notification Settings
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-[#DC3545]/20">
        <h2 className="font-semibold text-[#DC3545] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Danger Zone
        </h2>
        <p className="text-sm text-[#666666] mb-4">Irreversible actions - proceed with caution</p>
        
        <div className="flex items-center justify-between p-4 bg-[#DC3545]/5 rounded-xl">
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Delete All Data</p>
            <p className="text-xs text-[#666666]">Permanently delete all platform data</p>
          </div>
          <button className="px-4 py-2 bg-[#DC3545] text-white rounded-xl hover:bg-[#C82333] transition-colors text-sm font-medium">
            Delete Data
          </button>
        </div>
      </div>
    </div>
  )
}
