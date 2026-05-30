'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Address {
  id: string
  label: 'Home' | 'Work' | 'Other'
  street: string
  city: string
  area: string
  instructions: string
  is_default: boolean
}

interface UserProfile {
  name: string
  email: string
  phone: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile>({
    name: '',
    email: '',
    phone: ''
  })
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [newAddress, setNewAddress] = useState<Address>({
    id: '',
    label: 'Home',
    street: '',
    city: 'Lagos',
    area: '',
    instructions: '',
    is_default: false
  })
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: false
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const areas = [
    'Ikeja', 'Victoria Island', 'Lekki', 'Ajah', 'Surulere',
    'Yaba', 'Apapa', 'Oshodi', 'Mushin', 'Somolu',
    ' Ikoyi', 'Lagos Island', 'Banana Island', 'Eti Osa'
  ]

  useEffect(() => {
    // Load user from localStorage
    try {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      } else {
        // Default user for demo
        setUser({ name: 'Tobi Okafor', email: 'tobi.okafor@email.com', phone: '+234 803 456 7890' })
      }
    } catch (e) {
      // Default user for demo if localStorage fails
      setUser({ name: 'Tobi Okafor', email: 'tobi.okafor@email.com', phone: '+234 803 456 7890' })
    }

    // Load addresses from localStorage
    try {
      const savedAddresses = localStorage.getItem('addresses')
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses))
      } else {
        // Default addresses for demo
        setAddresses([
          {
            id: '1',
            label: 'Home',
            street: 'Donum House, Plot 45 Primeva Life Boulevard',
            city: 'Lagos',
            area: 'Ikoyi',
            instructions: 'Gate code: 4521',
            is_default: true
          },
          {
            id: '2',
            label: 'Work',
            street: '3rd Floor, Legal Aids Council Building',
            city: 'Lagos',
            area: 'Victoria Island',
            instructions: 'Ask for QuickBite reception',
            is_default: false
          }
        ])
      }
    } catch (e) {
      // Default addresses for demo if localStorage fails
      setAddresses([
        {
          id: '1',
          label: 'Home',
          street: 'Donum House, Plot 45 Primeva Life Boulevard',
          city: 'Lagos',
          area: 'Ikoyi',
          instructions: 'Gate code: 4521',
          is_default: true
        },
        {
          id: '2',
          label: 'Work',
          street: '3rd Floor, Legal Aids Council Building',
          city: 'Lagos',
          area: 'Victoria Island',
          instructions: 'Ask for QuickBite reception',
          is_default: false
        }
      ])
    }
  }, [])

  const saveUser = (updatedUser: UserProfile) => {
    setUser(updatedUser)
    try {
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (err) {
      console.warn('Failed to save user to localStorage:', err)
    }
  }

  const saveAddresses = (updatedAddresses: Address[]) => {
    setAddresses(updatedAddresses)
    try {
      localStorage.setItem('addresses', JSON.stringify(updatedAddresses))
    } catch (err) {
      console.warn('Failed to save addresses to localStorage:', err)
    }
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    saveUser(user)
    alert('Profile updated successfully!')
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match')
      return
    }
    if (passwords.new.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    alert('Password changed successfully!')
    setPasswords({ current: '', new: '', confirm: '' })
  }

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAddress.street || !newAddress.area) {
      alert('Please fill in required fields')
      return
    }

    const addressToSave = editingAddress
      ? { ...newAddress, id: editingAddress.id }
      : { ...newAddress, id: Date.now().toString() }

    if (editingAddress) {
      // Update existing
      const updated = addresses.map(a => a.id === editingAddress.id ? addressToSave : a)
      saveAddresses(updated)
    } else {
      // Add new
      const updated = [...addresses, addressToSave]
      saveAddresses(updated)
    }

    // Reset form
    setNewAddress({
      id: '',
      label: 'Home',
      street: '',
      city: 'Lagos',
      area: '',
      instructions: '',
      is_default: addresses.length === 0
    })
    setShowAddressForm(false)
    setEditingAddress(null)
  }

  const handleDeleteAddress = (id: string) => {
    const updated = addresses.filter(a => a.id !== id)
    saveAddresses(updated)
    setShowDeleteConfirm(false)
  }

  const handleSetDefault = (id: string) => {
    const updated = addresses.map(a => ({ ...a, is_default: a.id === id }))
    saveAddresses(updated)
  }

  const handleDeleteAccount = () => {
    try {
      localStorage.clear()
    } catch (err) {
      console.warn('Failed to clear localStorage:', err)
    }
    alert('Account deleted. Redirecting...')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] pb-20">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/profile" className="p-2 -ml-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Account Settings
          </h1>
          <div className="w-10" />
        </div>
      </header>

      <main className="p-4">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
          {['profile', 'password', 'notifications', 'addresses', 'danger'].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeSection === section
                  ? 'bg-[#E85D04] text-white'
                  : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
              }`}
            >
              {section === 'danger' ? 'Delete Account' : section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {/* Edit Profile Section */}
        {activeSection === 'profile' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Personal Information
            </h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {/* Change Password Section */}
        {activeSection === 'password' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Change Password
            </h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Order Updates</p>
                  <p className="text-xs text-[#666666]">Get notified about order status changes</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderUpdates}
                  onChange={(e) => {
                    const updated = { ...notifications, orderUpdates: e.target.checked }
                    setNotifications(updated)
                    try {
                      localStorage.setItem('notification_prefs', JSON.stringify(updated))
                    } catch (err) {
                      console.warn('Failed to save notification prefs:', err)
                    }
                  }}
                  className="w-5 h-5 accent-[#E85D04]"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Promotions & Deals</p>
                  <p className="text-xs text-[#666666]">Receive exclusive offers and discounts</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.promotions}
                  onChange={(e) => {
                    const updated = { ...notifications, promotions: e.target.checked }
                    setNotifications(updated)
                    try {
                      localStorage.setItem('notification_prefs', JSON.stringify(updated))
                    } catch (err) {
                      console.warn('Failed to save notification prefs:', err)
                    }
                  }}
                  className="w-5 h-5 accent-[#E85D04]"
                />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#1A1A1A]">Newsletter</p>
                  <p className="text-xs text-[#666666]">Weekly updates and news from QuickBite</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.newsletter}
                  onChange={(e) => {
                    const updated = { ...notifications, newsletter: e.target.checked }
                    setNotifications(updated)
                    try {
                      localStorage.setItem('notification_prefs', JSON.stringify(updated))
                    } catch (err) {
                      console.warn('Failed to save notification prefs:', err)
                    }
                  }}
                  className="w-5 h-5 accent-[#E85D04]"
                />
              </label>
            </div>
          </div>
        )}

        {/* Addresses Section */}
        {activeSection === 'addresses' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Saved Addresses
              </h3>
              <button
                onClick={() => {
                  setShowAddressForm(true)
                  setEditingAddress(null)
                  setNewAddress({
                    id: '',
                    label: 'Home',
                    street: '',
                    city: 'Lagos',
                    area: '',
                    instructions: '',
                    is_default: addresses.length === 0
                  })
                }}
                className="px-4 py-2 bg-[#E85D04] text-white text-sm font-medium rounded-lg hover:bg-[#D45103] transition-colors"
              >
                Add New
              </button>
            </div>

            {showAddressForm ? (
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <h4 className="text-base font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h4>
                <form onSubmit={handleAddAddress} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-1">Label</label>
                    <div className="flex gap-2">
                      {['Home', 'Work', 'Other'].map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setNewAddress({ ...newAddress, label: label as Address['label'] })}
                          className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                            newAddress.label === label
                              ? 'bg-[#E85D04] text-white'
                              : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      required
                      placeholder="House/Building number and street"
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-1">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      readOnly
                      className="w-full px-4 py-3 rounded-xl bg-[#E5E5E5] text-[#666666] text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-1">Area *</label>
                    <select
                      value={newAddress.area}
                      onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                      required
                      className="w-full px-4 py-4 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
                    >
                      <option value="">Select area</option>
                      {areas.map((area) => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#666666] mb-1">Delivery Instructions</label>
                    <textarea
                      value={newAddress.instructions}
                      onChange={(e) => setNewAddress({ ...newAddress, instructions: e.target.value })}
                      placeholder="Gate code, landmark, building description..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all resize-none"
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newAddress.is_default}
                      onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
                      className="w-4 h-4 accent-[#E85D04]"
                    />
                    <span className="text-sm text-[#1A1A1A]">Set as default address</span>
                  </label>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false)
                        setEditingAddress(null)
                      }}
                      className="flex-1 py-4 text-[#666666] font-medium border border-[#E5E5E5] rounded-xl hover:bg-[#F5F5F5] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            <div className="space-y-3">
              {addresses.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <p className="text-[#666666] mb-4">No saved addresses yet</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="px-6 py-3 bg-[#E85D04] text-white font-medium rounded-xl hover:bg-[#D45103] transition-colors"
                  >
                    Add Your First Address
                  </button>
                </div>
              ) : (
                addresses.map((addr) => (
                  <div key={addr.id} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#E85D04]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        {addr.label === 'Home' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                          </svg>
                        )}
                        {addr.label === 'Work' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                          </svg>
                        )}
                        {addr.label === 'Other' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 8-8"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#1A1A1A]">{addr.label}</p>
                          {addr.is_default && (
                            <span className="px-2 py-0.5 bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-medium rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#666666]">{addr.street}</p>
                        <p className="text-sm text-[#666666]">{addr.area}, {addr.city}</p>
                        {addr.instructions && (
                          <p className="text-xs text-[#999999] mt-1">📝 {addr.instructions}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F5F5F5]">
                      {!addr.is_default && (
                        <button
                          onClick={() => handleSetDefault(addr.id)}
                          className="flex-1 py-2 text-[#E85D04] text-sm font-medium hover:bg-[#E85D04]/5 rounded-lg transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setEditingAddress(addr)
                          setNewAddress({ ...addr })
                          setShowAddressForm(true)
                        }}
                        className="flex-1 py-2 text-[#666666] text-sm font-medium hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="flex-1 py-2 text-[#DC3545] text-sm font-medium hover:bg-[#DC3545]/5 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Delete Account Section */}
        {activeSection === 'danger' && (
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="text-base font-semibold text-[#DC3545] mb-2" style={{ fontFamily: 'var(--font-poppins)' }}>
              Delete Account
            </h3>
            <p className="text-sm text-[#666666] mb-4">
              Once you delete your account, there is no going back. All your data including orders, addresses, and preferences will be permanently removed.
            </p>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-4 text-[#DC3545] font-semibold border border-[#DC3545] rounded-xl hover:bg-[#DC3545] hover:text-white transition-colors"
            >
              Delete My Account
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
              <div className="w-16 h-16 bg-[#DC3545]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <line x1="12" x2="12" y1="9" y2="13"/>
                  <line x1="12" x2="12.01" y1="17" y2="17"/>
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-[#1A1A1A] text-center mb-4">Are you absolutely sure?</h4>
              <p className="text-sm text-[#666666] text-center mb-6">
                This action cannot be undone. Your account and all data will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-4 text-[#666666] font-medium border border-[#E5E5E5] rounded-xl hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 py-4 bg-[#DC3545] text-white font-semibold rounded-xl hover:bg-[#C82333] transition-colors"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}