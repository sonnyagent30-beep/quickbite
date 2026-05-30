'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function LandingPage() {
  useEffect(() => {
    // If already logged in with onboarding complete, redirect to /home
    try {
      const user = localStorage.getItem('quickbite_user')
      const onboardingComplete = localStorage.getItem('onboarding_complete')
      if (user && onboardingComplete === 'true') {
        window.location.href = '/home'
      }
    } catch (e) {
      // localStorage not available or corrupted data
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#E85D04] to-[#D45103] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          {/* Hero Content */}
          <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
              Your Favorite Local Food,<br/>Delivered Fast
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Discover authentic Nigerian cuisine from bukas and kitchens in your neighborhood. From Jollof rice to Amala, we have it all!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register"
                className="bg-white text-[#E85D04] font-semibold px-8 py-4 rounded-full hover:bg-[#FFF3CD] transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/>
                  <line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                Sign Up
              </Link>
              <Link 
                href="/login"
                className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" x2="3" y1="12" y2="12"/>
                </svg>
                Sign In
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-sm opacity-80">Partner Restaurants</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">30min</div>
              <div className="text-sm opacity-80">Average Delivery</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">4.8</div>
              <div className="text-sm opacity-80">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,90 1200,60 L1200,120 L0,120 Z" fill="#FEFEFE"/>
          </svg>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-[#FEFEFE]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              How QuickBite Works
            </h2>
            <p className="text-[#666666] max-w-md mx-auto">
              Get your favorite food delivered in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFF3CD] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              <div className="text-[#E85D04] font-bold text-lg mb-2">1</div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Browse</h3>
              <p className="text-sm text-[#666666]">Explore restaurants and cuisines near you</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E85D04]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E85D04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <div className="text-[#E85D04] font-bold text-lg mb-2">2</div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Order</h3>
              <p className="text-sm text-[#666666]">Browse menu and add items to your cart</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D6A4F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"/>
                  <line x1="2" x2="22" y1="10" y2="10"/>
                </svg>
              </div>
              <div className="text-[#E85D04] font-bold text-lg mb-2">3</div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Pay</h3>
              <p className="text-sm text-[#666666]">Secure payment with card, USSD, or transfer</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2D6A4F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="text-[#E85D04] font-bold text-lg mb-2">4</div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Track & Enjoy</h3>
              <p className="text-sm text-[#666666]">Real-time tracking until delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why QuickBite Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              Why QuickBite?
            </h2>
            <p className="text-[#666666] max-w-md mx-auto">
              We're not just another food delivery app. We're your neighborhood connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E85D04] rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11 19 19"/>
                  <path d="m3 19 4-4"/>
                  <path d="M11 3h8"/>
                  <path d="M11 19h8"/>
                  <path d="m15 15 4 4"/>
                  <path d="m19 19-4-4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Wide Variety</h3>
              <p className="text-sm text-[#666666]">From Nigerian classics to international cuisines, we have something for everyone.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E85D04] rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Fast Delivery</h3>
              <p className="text-sm text-[#666666]">Average 30 minutes or less. Your food arrives hot and fresh.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E85D04] rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-[#666666]">Watch your order journey from kitchen to doorstep.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E85D04] rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-[#1A1A1A] mb-2">Secure Payments</h3>
              <p className="text-sm text-[#666666]">Pay safely with card, USSD, bank transfer, or cash on delivery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"QuickBite has changed the way I get my Nigerian food. The Jollof rice from Auntie B's kitchen is always spot on!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E85D04] rounded-full flex items-center justify-center text-white font-semibold">AA</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Adaobi Anunobi</div>
                  <div className="text-sm text-[#999999]">Ikeja, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"Finally, a food app that delivers Amala and Ewedu the way I like it! The tracking feature is super helpful."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D6A4F] rounded-full flex items-center justify-center text-white font-semibold">KO</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Kemi Okonkwo</div>
                  <div className="text-sm text-[#999999]">Victoria Island, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"I love that I can order from local bukas I couldn't find elsewhere. Supporting local businesses has never been easier!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFB703] rounded-full flex items-center justify-center text-white font-semibold">TE</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Tunde Emmanuel</div>
                  <div className="text-sm text-[#999999]">Surulere, Lagos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-16 bg-[#1B4332] text-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
                Get the QuickBite App
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Order food faster, get exclusive deals, and track your deliveries in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#1A1A1A] hover:bg-[#333333] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">Download on</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                <button className="bg-[#1A1A1A] hover:bg-[#333333] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a.996.996 0 0 1 .609-.92zm10.89 10.893l2.877 2.868-2.877 2.868-2.877-2.868 2.877-2.868zm3.15 3.15l2.906 2.904-2.906 2.905-2.906-2.905 2.906-2.904zM5.864 5.864l2.877 2.877-2.877 2.877-2.877-2.877 2.877-2.877z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] opacity-80">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] rounded-[3rem] border-4 border-[#333333] overflow-hidden shadow-2xl">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1A1A1A] rounded-b-2xl"/>
                  {/* Screen content - placeholder */}
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-20 h-20 bg-[#E85D04] rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">QB</span>
                      </div>
                      <p className="text-sm opacity-70">App Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">QB</span>
                </div>
                <span className="font-semibold text-lg" style={{ fontFamily: 'var(--font-poppins)' }}>
                  QuickBite
                </span>
              </div>
              <p className="text-sm text-[#999999] mb-4">
                Your local food, delivered fast. Serving Ikeja and Victoria Island, Lagos.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-[#333333] rounded-full flex items-center justify-center hover:bg-[#E85D04] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#333333] rounded-full flex items-center justify-center hover:bg-[#E85D04] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-[#333333] rounded-full flex items-center justify-center hover:bg-[#E85D04] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.372.195 1.872.216.571-.018 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-[#999999]">
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-[#999999]">
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#999999]">
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#E85D04] transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#333333] pt-8 text-center text-sm text-[#666666]">
            <p>&copy; 2026 QuickBite. All rights reserved. Made with ❤️ in Lagos, Nigeria.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}