'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Address {
  id: string
  label: string
  address: string
  is_default: boolean
}

export default function ProfilePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: false,
  })

  const savedAddresses: Address[] = [
    {
      id: '1',
      label: 'Home',
      address: '15 Adeyemo Alakija Street, Victoria Island, Lagos',
      is_default: true,
    },
    {
      id: '2',
      label: 'Work',
      address: '10B Trans Amadi Road, Ikeja, Lagos',
      is_default: false,
    },
  ]

  // Check login status from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('quickbite_user')
      if (savedUser) {
        const user = JSON.parse(savedUser)
        setIsLoggedIn(true)
        setUserName(user.name || '')
        setUserPhone(user.phone || '')
      }
    } catch (e) {
      // localStorage not available or corrupted data
    }
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        localStorage.removeItem('quickbite_user')
        localStorage.removeItem('onboarding_complete')
      } catch (err) {
        console.warn('Failed to clear localStorage:', err)
      }
      router.push('/login')
    }
  }

  const handleLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Profile
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Profile Header - Show Login if not logged in */}
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-4 mb-6 p-6 bg-white rounded-xl shadow-sm">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="5"/>
                <path d="M20 21a8 8 0 1 0-16 0"/>
              </svg>
            </div>
            <p className="text-[#666666] text-sm">Sign in to view your profile</p>
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
            >
              Sign In / Create Account
            </button>
          </div>
        ) : (
        <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-[#E85D04] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{userName ? userName.charAt(0).toUpperCase() : 'U'}</span>
          </div>
          <div>
            <h2 className="font-semibold text-[#1A1A1A] text-lg">{userName || 'User'}</h2>
            <p className="text-sm text-[#666666]">{userPhone || ''}</p>
          </div>
          <Link href="/settings" className="ml-auto text-[#E85D04]">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.75.75 0 0 0 1.23.243l4.014-3.931a2 2 0 0 0 .72-1.441l3.188-3.773a2 2 0 0 0-3.187-2.216L5.758 13.108a2 2 0 0 0-1.04.163L2.18 15.558a.75.75 0 0 0 1.137.972l3.561-2.39a2 2 0 0 0 1.274-.444l4.788-4.788a.75.75 0 0 1 1.095.309l-2.19 2.19a1 1 0 0 0-.221.316l-3.188 3.773a2 2 0 0 0 .72 3.224l3.188 3.773a.75.75 0 0 0-.472 1.103l3.561 2.39a.75.75 0 0 0 .973-1.112l-2.19-4.537a2 2 0 0 0-.721-1.014z"/>
            </svg>
          </Link>
        </div>
        )}

        {/* Saved Addresses - only show when logged in */}
        {isLoggedIn && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              Saved Addresses
            </h3>
            <Link href="/settings" className="text-sm text-[#E85D04] font-medium">Add New</Link>
          </div>
          <div className="space-y-3">
            {savedAddresses.map((addr) => (
              <div key={addr.id} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-10 h-10 bg-[#F5F5F5] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#1A1A1A]">{addr.label}</p>
                  <p className="text-sm text-[#666666]">{addr.address}</p>
                </div>
                {addr.is_default && (
                  <span className="px-2 py-1 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-medium rounded-full">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Quick Links
          </h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Link href="/orders" className="flex items-center gap-3 p-4 border-b border-[#F5F5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="flex-1 text-[#1A1A1A]">Order History</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 p-4 border-b border-[#F5F5F5]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="flex-1 text-[#1A1A1A]">Account Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
            <Link href="/help" className="flex items-center gap-3 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
              <span className="flex-1 text-[#1A1A1A]">Help & Support</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Notifications Settings - only show when logged in */}
        {isLoggedIn && (
        <div className="mb-6">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Notifications
          </h3>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1A1A1A]">Order Updates</p>
                <p className="text-xs text-[#666666]">Get notified about order status</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.orderUpdates}
                onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                className="w-5 h-5 accent-[#E85D04]"
              />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1A1A1A]">Promotions</p>
                <p className="text-xs text-[#666666]">Receive deals and discounts</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.promotions}
                onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                className="w-5 h-5 accent-[#E85D04]"
              />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1A1A1A]">Newsletter</p>
                <p className="text-xs text-[#666666]">Weekly updates and news</p>
              </div>
              <input
                type="checkbox"
                checked={notifications.newsletter}
                onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
                className="w-5 h-5 accent-[#E85D04]"
              />
            </label>
          </div>
        </div>
        )}

        {/* Logout Button - only show when logged in */}
        {isLoggedIn && (
        <button
          onClick={handleLogout}
          className="w-full py-4 text-[#DC3545] font-medium border border-[#DC3545] rounded-xl hover:bg-[#DC3545] hover:text-white transition-colors"
        >
          Logout
        </button>
        )}

        {/* App Version */}
        <p className="text-center text-xs text-[#999999] mt-6">
          QuickBite v1.0.0
        </p>
      </main>
    </div>
  )
}