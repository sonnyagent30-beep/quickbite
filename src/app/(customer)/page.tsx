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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1B4332]/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#E85D04] flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <span className="font-semibold text-white text-lg" style={{ fontFamily: 'var(--font-poppins)' }}>
              QuickBite
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white/80 hover:text-white text-sm font-medium transition-colors">
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-[#E85D04] hover:bg-[#D45103] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#1B4332] text-white overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80" 
            alt="Nigerian food spread"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/80 to-[#1B4332]/60" />
        </div>

        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-poppins)' }}>
              Your Favorite Local <span className="text-[#E85D04]">Bukas</span>,<br/>One Order Away
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Discover authentic Nigerian cuisine from trusted local kitchens in your neighborhood. From smoky Jollof to delicious Amala — taste the magic of local flavors, delivered fresh to your door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/register"
                className="bg-[#E85D04] hover:bg-[#D45103] text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <line x1="19" x2="19" y1="8" y2="14"/>
                  <line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                Get Started
              </Link>
              <Link 
                href="/login"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full transition-colors inline-flex items-center justify-center gap-2"
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

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E85D04] mb-1">500+</div>
              <div className="text-sm text-white/70">Partner Kitchens</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E85D04] mb-1">10,000+</div>
              <div className="text-sm text-white/70">Orders Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E85D04] mb-1">50+</div>
              <div className="text-sm text-white/70">Neighborhoods</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#E85D04] mb-1">4.8</div>
              <div className="text-sm text-white/70">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,90 1200,60 L1200,120 L0,120 Z" fill="#FEFEFE"/>
          </svg>
        </div>
      </section>

      {/* How QuickBite Works Section */}
      <section className="py-20 bg-[#FEFEFE]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              How QuickBite Works
            </h2>
            <p className="text-[#666666] max-w-md mx-auto">
              Getting your favorite local food has never been easier
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80" 
                  alt="Browse Local Kitchens"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#1B4332] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2 text-lg">Browse Local Kitchens</h3>
                <p className="text-sm text-[#666666]">Explore authentic Nigerian dishes from verified bukas and kitchens in your area</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" 
                  alt="Place Your Order"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#E85D04] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2 text-lg">Place Your Order</h3>
                <p className="text-sm text-[#666666]">Add your favorite dishes to cart and pay securely online or on delivery</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" 
                  alt="Collect Your Food"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="w-12 h-12 bg-[#1B4332] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-[#1A1A1A] mb-2 text-lg">Collect Your Food</h3>
                <p className="text-sm text-[#666666]">Track your order in real-time and enjoy hot, fresh Nigerian cuisine at home</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular This Week Section */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              Popular This Week
            </h2>
            <p className="text-[#666666] max-w-md mx-auto">
              Top-rated dishes our customers love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Jollof Rice */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80" 
                  alt="Jollof Rice and Chicken"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span className="text-sm font-medium text-[#1A1A1A]">4.9</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Jollof Rice and Chicken</h3>
                <p className="text-sm text-[#666666] mb-3">Smoky, flavorful jollof with succulent grilled chicken</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#E85D04]">₦3,500</span>
                  <button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Amala */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80" 
                  alt="Amala and Ewedu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span className="text-sm font-medium text-[#1A1A1A]">4.8</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Amala and Ewedu</h3>
                <p className="text-sm text-[#666666] mb-3">Traditional amala with fresh ewedu and spicy goat meat</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#E85D04]">₦2,200</span>
                  <button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Suya Pizza */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80" 
                  alt="Suya Pizza"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span className="text-sm font-medium text-[#1A1A1A]">4.7</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#1A1A1A] mb-1">Suya Pizza</h3>
                <p className="text-sm text-[#666666] mb-3">Nigerian-style pizza topped with spicy suya beef</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#E85D04]">₦5,500</span>
                  <button className="bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Restaurant Owners Section */}
      <section className="py-20 bg-[#1B4332] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Grow Your Kitchen Reach
            </h2>
            <p className="text-white/80 text-lg">
              Join hundreds of local bukas already growing their business with QuickBite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">WhatsApp Notifications</h3>
              <p className="text-white/70 text-sm">Receive instant order alerts directly on WhatsApp — never miss a customer</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" x2="12" y1="2" y2="22"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Zero Monthly Fees</h3>
              <p className="text-white/70 text-sm">Only pay when you make money — no subscription or listing fees ever</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-[#E85D04] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Badge</h3>
              <p className="text-white/70 text-sm">Stand out with a trusted badge and build customer confidence in your kitchen</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/register" 
              className="bg-[#E85D04] hover:bg-[#D45103] text-white font-semibold px-8 py-4 rounded-full transition-colors shadow-lg inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3z"/>
                <path d="M12 8v8"/>
                <path d="M8 12h8"/>
              </svg>
              Register Your Buka
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-[#FEFEFE]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B4332] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#F5F5F5]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"QuickBite has made it so easy to get my favorite Amala and Ewedu from Tasty Buka. The delivery is always fast and the food arrives hot!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1B4332] rounded-full flex items-center justify-center text-white font-semibold">CO</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Chidinma O.</div>
                  <div className="text-sm text-[#999999]">VI, Lagos</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#F5F5F5]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"Since joining QuickBite, my orders have tripled! The WhatsApp notifications are a game-changer — I never miss an order anymore."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#E85D04] rounded-full flex items-center justify-center text-white font-semibold">EN</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Emeka N.</div>
                  <div className="text-sm text-[#999999]">Restaurant Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#F5F5F5]">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB703" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-[#666666] mb-4">"I love that I can support local businesses while enjoying authentic Nigerian food. The Jollof from Queen's Kitchen is unmatched!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2D6A4F] rounded-full flex items-center justify-center text-white font-semibold">FA</div>
                <div>
                  <div className="font-semibold text-[#1A1A1A]">Funke A.</div>
                  <div className="text-sm text-[#999999]">Ikeja, Lagos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#E85D04] text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
              Ready to Taste the Difference?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of Lagosians already enjoying authentic local cuisine delivered to their doorstep
            </p>
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
                Create Account
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
                Your local food, delivered fast. Serving neighborhoods across Lagos.
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
