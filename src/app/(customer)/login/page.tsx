'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    const user = localStorage.getItem('quickbite_user')
    const onboardingComplete = localStorage.getItem('onboarding_complete')
    if (user) {
      // If onboarding is complete, go to /home, otherwise /onboarding
      if (onboardingComplete === 'true') {
        router.replace('/home')
      } else {
        router.replace('/onboarding')
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(false)

    // Mock authentication - in production, this would call an API
    // For demo, accept any phone with 10+ digits and password 6+ chars
    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      setLoading(false)
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock successful login - create user object if not exists
    const user = {
      name: 'Customer',
      phone: formData.phone,
      email: `${formData.phone}@quickbite.ng`
    }

    // Check if this is a returning user (was previously registered)
    const existingOnboardingComplete = localStorage.getItem('onboarding_complete')
    
    // Set auth state
    localStorage.setItem('quickbite_user', JSON.stringify(user))
    localStorage.setItem('is_logged_in', 'true')
    
    // If onboarding was already completed before, keep it that way
    // Otherwise, set to 'true' for returning users (they've seen it before)
    if (existingOnboardingComplete === 'true') {
      // Returning user - keep onboarding_complete as true
    } else {
      // New login that wasn't from register flow - set true for returning users
      // For completely new users coming from register, register sets it to false
      // This handles users who registered before this update
      localStorage.setItem('onboarding_complete', 'true')
    }

    setLoading(false)
    
    // Redirect based on onboarding status
    if (existingOnboardingComplete === 'true') {
      router.replace('/home')
    } else {
      router.replace('/onboarding')
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#1A1A1A] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          <span className="text-sm">Back</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-6 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-[#E85D04] flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">QB</span>
            </div>
            <h1
              className="text-2xl font-bold text-[#1A1A1A]"
              style={{ fontFamily: 'var(--font-poppins)' }}
            >
              Welcome Back
            </h1>
            <p className="text-[#666666] mt-2">Sign in to continue ordering</p>
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
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 803 456 7890"
                required
                className="w-full px-4 py-4 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full px-4 py-4 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] text-base outline-none focus:ring-2 focus:ring-[#E85D04] transition-all"
              />
            </div>

            <div className="text-right">
              <Link href="#" className="text-sm text-[#E85D04] font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#E5E5E5]" />
            <span className="text-sm text-[#999999]">or</span>
            <div className="flex-1 h-px bg-[#E5E5E5]" />
          </div>

          {/* Social Login (Mock) */}
          <button className="w-full py-4 bg-[#F5F5F5] text-[#1A1A1A] font-medium rounded-xl hover:bg-[#E5E5E5] transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-[#666666]">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#E85D04] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}