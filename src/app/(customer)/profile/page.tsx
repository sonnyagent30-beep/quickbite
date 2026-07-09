'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Demo user data
const DEMO_USER = {
  name: 'John Eze',
  phone: '+234 801 111 1111',
  email: 'john.eze@email.com'
}

export default function ProfilePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')

  // Menu items as specified
  const menuItems = [
    { 
      label: 'Edit Profile', 
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
    { 
      label: 'Addresses', 
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    { 
      label: 'Notifications', 
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
        </svg>
      )
    },
    { 
      label: 'Help', 
      href: '/help',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <path d="M12 17h.01"/>
        </svg>
      )
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
      } else {
        // Use demo user if not logged in
        setIsLoggedIn(true)
        setUserName(DEMO_USER.name)
        setUserPhone(DEMO_USER.phone)
      }
    } catch (e) {
      // Use demo user if localStorage fails
      setIsLoggedIn(true)
      setUserName(DEMO_USER.name)
      setUserPhone(DEMO_USER.phone)
    }
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        localStorage.removeItem('quickbite_user')
        localStorage.removeItem('quickbite_session')
        localStorage.removeItem('onboarding_complete')
      } catch (err) {
        console.warn('Failed to clear localStorage:', err)
      }
      // Redirect to home page
      window.location.href = '/'
    }
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
        {/* Profile Header with Avatar, Name, Phone */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-[#E85D04] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-[#1A1A1A] text-lg">{userName || 'User'}</h2>
            <p className="text-sm text-[#666666]">{userPhone || ''}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, index) => (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-3 p-4 ${
                index < menuItems.length - 1 ? 'border-b border-[#F5F5F5]' : ''
              }`}
            >
              <div className="text-[#666666]">{item.icon}</div>
              <span className="flex-1 text-[#1A1A1A]">{item.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </Link>
          ))}
          
          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 p-4 w-full text-left text-[#DC3545]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            <span className="flex-1">Logout</span>
          </button>
        </div>

        {/* App Version */}
        <p className="text-center text-xs text-[#999999]">
          QuickBite v1.0.0
        </p>
      </main>
    </div>
  )
}
