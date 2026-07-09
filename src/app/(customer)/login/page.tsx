'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { DEMO_USERS, loginWithDemo, getSession } from '@/lib/demo-auth'

export default function LoginPage() {
  const [selectedDemo, setSelectedDemo] = useState<typeof DEMO_USERS[number] | null>(null)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDemoLogin = (user: typeof DEMO_USERS[number]) => {
    setSelectedDemo(user)
    setPhone(user.phone)
    setPassword(user.password)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = loginWithDemo(phone, password)
    if (!user) {
      setError('Invalid credentials. Try a demo account below.')
      setLoading(false)
      return
    }

    // Redirect based on role
    if (user.role === 'restaurant') router.replace('/dashboard')
    else if (user.role === 'admin') router.replace('/admin/admin-dashboard')
    else if (user.role === 'rider') router.replace('/rider')
    else router.replace('/home')
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="text-sm">Back</span>
        </Link>
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#E85D04] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">QB</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
              QuickBite
            </h1>
            <p className="text-[#666666] mt-1">Sign in to explore the app</p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6">
            <p className="text-xs text-[#999] mb-3 text-center uppercase tracking-wider">Try a demo account</p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleDemoLogin(user)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedDemo?.id === user.id
                      ? 'border-[#E85D04] bg-[#E85D04]/5'
                      : 'border-[#E5E5E5] bg-white hover:border-[#E85D04]/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">{user.avatar}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#1A1A1A] leading-tight">{user.name}</p>
                  <p className="text-[10px] text-[#999] capitalize">{user.role}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-sm text-[#999999]">or sign in manually</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#DC3545]/10 border border-[#DC3545]/20 rounded-xl">
                <p className="text-sm text-[#DC3545]">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 803 123 4567"
                required
                className="w-full px-4 py-4 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-4 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-[#666666]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-[#E85D04] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
