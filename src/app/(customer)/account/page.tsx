'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Demo user data
const DEMO_USER = {
  name: 'John Eze',
  phone: '+234 801 111 1111',
  email: 'john.eze@email.com'
}

export default function SettingsPage() {
  const [user, setUser] = useState(DEMO_USER)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: false
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      // Load dark mode
      const savedDarkMode = localStorage.getItem('dark_mode')
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode))
      }

      // Load user
      const savedUser = localStorage.getItem('quickbite_user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }

      // Load notifications
      const savedNotifications = localStorage.getItem('notification_prefs')
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage:', e)
    }
  }, [])

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleDarkModeToggle = () => {
    const newValue = !darkMode
    setDarkMode(newValue)
    try {
      localStorage.setItem('dark_mode', JSON.stringify(newValue))
    } catch (err) {
      console.warn('Failed to save dark mode to localStorage:', err)
    }
  }

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] }
    setNotifications(updated)
    try {
      localStorage.setItem('notification_prefs', JSON.stringify(updated))
    } catch (err) {
      console.warn('Failed to save notification prefs to localStorage:', err)
    }
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      localStorage.setItem('quickbite_user', JSON.stringify(user))
      alert('Profile updated successfully!')
    } catch (err) {
      console.warn('Failed to save user to localStorage:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-[#E5E5E5] dark:border-gray-700 z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/profile" className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "#ffffff" : "#333333"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A] dark:text-white" style={{ fontFamily: 'var(--font-poppins)' }}>
            Settings
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4 pb-20 space-y-6">
        {/* Profile Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Profile
          </h3>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] dark:text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] dark:bg-gray-700 text-[#1A1A1A] dark:text-white text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#666666] dark:text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] dark:bg-gray-700 text-[#1A1A1A] dark:text-white text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#666666] dark:text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] dark:bg-gray-700 text-[#1A1A1A] dark:text-white text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
            >
              Save Changes
            </button>
          </form>
        </section>

        {/* Notification Toggles */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Notifications
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-[#1A1A1A] dark:text-white">Order Updates</p>
                <p className="text-xs text-[#666666] dark:text-gray-400">Get notified about order status changes</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('orderUpdates')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications.orderUpdates ? 'bg-[#E85D04]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.orderUpdates ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-[#1A1A1A] dark:text-white">Promotions</p>
                <p className="text-xs text-[#666666] dark:text-gray-400">Receive exclusive offers and discounts</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('promotions')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications.promotions ? 'bg-[#E85D04]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.promotions ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-medium text-[#1A1A1A] dark:text-white">Newsletter</p>
                <p className="text-xs text-[#666666] dark:text-gray-400">Weekly updates and news from QuickBite</p>
              </div>
              <button
                onClick={() => handleNotificationToggle('newsletter')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications.newsletter ? 'bg-[#E85D04]' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications.newsletter ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>
        </section>

        {/* Dark Mode Toggle */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            Appearance
          </h3>
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#666666] dark:text-gray-400">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
              <div>
                <p className="font-medium text-[#1A1A1A] dark:text-white">Dark Mode</p>
                <p className="text-xs text-[#666666] dark:text-gray-400">Enable dark theme for the app</p>
              </div>
            </div>
            <button
              onClick={handleDarkModeToggle}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                darkMode ? 'bg-[#E85D04]' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </section>

        {/* About Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <h3 className="text-base font-semibold text-[#1A1A1A] dark:text-white mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
            About
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-[#666666] dark:text-gray-400">App Version</span>
              <span className="text-[#1A1A1A] dark:text-white font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[#666666] dark:text-gray-400">Build</span>
              <span className="text-[#1A1A1A] dark:text-white font-medium">2024.07.01</span>
            </div>
            <div className="border-t border-[#F5F5F5] dark:border-gray-700 pt-3 mt-3">
              <Link 
                href="/help" 
                className="flex items-center justify-between py-2 text-[#E85D04] hover:text-[#D45103] transition-colors"
              >
                <span>Help & Support</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-between py-2">
              <Link 
                href="/help" 
                className="flex items-center justify-between w-full text-[#E85D04] hover:text-[#D45103] transition-colors"
              >
                <span>Privacy Policy</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-between py-2">
              <Link 
                href="/help" 
                className="flex items-center justify-between w-full text-[#E85D04] hover:text-[#D45103] transition-colors"
              >
                <span>Terms of Service</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
