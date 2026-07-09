'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

// Floating food emoji component
function FloatingFood({ emoji, delay, left }: { emoji: string; delay: number; left: string }) {
  return (
    <div
      className="absolute text-4xl opacity-20 animate-float pointer-events-none"
      style={{
        left,
        animationDelay: `${delay}s`,
        top: `${20 + Math.random() * 60}%`,
      }}
    >
      {emoji}
    </div>
  )
}

// Counter animation hook
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return count
}

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const stats = [
    { value: 500, suffix: '+', label: 'Partner Kitchens' },
    { value: 10000, suffix: '+', label: 'Orders Placed' },
    { value: 50, suffix: '+', label: 'Neighborhoods' },
    { value: 4.8, suffix: '', label: 'Average Rating', decimal: true },
  ]

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF4500] flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-sm">QB</span>
            </div>
            <span className="font-bold text-gray-900 text-xl tracking-tight">QuickBite</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="px-5 py-2.5 text-gray-700 font-medium hover:text-gray-900 transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628]">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B00] rounded-full blur-[120px] opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FF4500] rounded-full blur-[150px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-500 rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating food */}
        {mounted && (
          <>
            <FloatingFood emoji="🍲" delay={0} left="5%" />
            <FloatingFood emoji="🍛" delay={0.5} left="15%" />
            <FloatingFood emoji="🌶️" delay={1} left="25%" />
            <FloatingFood emoji="🍗" delay={1.5} left="75%" />
            <FloatingFood emoji="🥘" delay={2} left="85%" />
            <FloatingFood emoji="🍳" delay={0.3} left="92%" />
          </>
        )}

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
            <span className="text-white/80 text-sm font-medium">Now serving across Lagos</span>
          </div>

          {/* Headline */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Your Favorite
            <br />
            <span className="bg-gradient-to-r from-[#FF6B00] via-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent">
              Local Bukas
            </span>
            <br />
            One Order Away
          </h1>

          {/* Subheadline */}
          <p className={`text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Authentic Nigerian cuisine from verified local kitchens,
            delivered fresh to your doorstep in minutes.
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link href="/register" className="group px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white font-bold rounded-full text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              <span>Order Food Now</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/login" className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-full text-lg hover:bg-white/20 transition-all hover:-translate-y-1">
              Sign In
            </Link>
          </div>

          {/* Trust indicators */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex -space-x-3">
              {['👨‍👩‍👧', '👨‍👦', '👩‍👩‍👧‍👦', '👨‍🏫'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 border-2 border-[#0a1628] flex items-center justify-center text-lg">
                  {emoji}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/40 text-sm">Trusted by <span className="text-white font-semibold">15,000+</span> customers</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#FF6B00] to-[#FF4500]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-1">
                  {stat.decimal ? stat.value : useCountUp(stat.value).toLocaleString()}
                  <span className="text-white/70">{stat.suffix}</span>
                </div>
                <div className="text-white/70 font-medium text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4 block">Simple Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">How QuickBite Works</h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto">Getting your favorite local food has never been easier</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse Local Kitchens', desc: 'Explore authentic Nigerian dishes from verified bukas in your area', icon: '🔍', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80' },
              { step: '02', title: 'Place Your Order', desc: 'Add your favorite dishes to cart and checkout in seconds', icon: '🛒', img: 'https://images.unsplash.com/photo-1606787366850-de6330128a71?w=600&q=80' },
              { step: '03', title: 'Collect Your Food', desc: 'Track your order in real-time and enjoy fresh, hot delivery', icon: '🍽️', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80' },
            ].map((item, i) => (
              <div key={i} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-4xl">{item.icon}</span>
                    <span className="text-5xl font-black text-gray-200">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular This Week */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4 block">What&apos;s Cooking</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Popular This Week</h2>
            <p className="text-gray-500 text-lg">Our most ordered dishes this week</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Jollof Rice & Chicken', price: '₦3,500', rating: '4.9', time: '20-30 min', img: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=600&q=80', badge: '🔥 Most Popular' },
              { name: 'Amala & Ewedu', price: '₦2,200', rating: '4.8', time: '15-25 min', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80', badge: '⭐ Customer Favorite' },
              { name: 'Suya Pizza', price: '₦5,500', rating: '4.7', time: '25-35 min', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', badge: '🆕 New' },
            ].map((dish, i) => (
              <div key={i} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dish.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-bold">{dish.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{dish.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#FF6B00] font-black text-xl">{dish.price}</span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {dish.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurant Owners Section */}
      <section className="py-24 bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0a1628] relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00] rounded-full blur-[200px] opacity-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF4500] rounded-full blur-[150px] opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4 block">For Restaurant Owners</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Grow Your<br />
                <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF8C00] bg-clip-text text-transparent">
                  Kitchen Reach
                </span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Join hundreds of local bukas already growing their business with QuickBite. 
                Zero monthly fees, direct payments, and WhatsApp notifications.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  '✅ Verified Status Badge',
                  '💬 WhatsApp Notifications',
                  '💰 Direct Daily Payments',
                  '📊 Zero Monthly Fees',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/80">
                    <div className="w-6 h-6 rounded-full bg-[#FF6B00]/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-[#FF6B00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
              <Link href="/register?role=restaurant" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5">
                Register Your Kitchen
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1a2744] to-[#0a1628] border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">👨‍🍳</div>
                  <div className="inline-block bg-gradient-to-r from-[#FF6B00] to-[#FF4500] text-white text-4xl font-black px-6 py-2 rounded-2xl">
                    +60%
                  </div>
                  <p className="text-white/60 mt-2 font-medium">More Orders</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-white/80">Today&apos;s Orders</span>
                    <span className="text-[#FF6B00] font-bold">24</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-white/80">Revenue</span>
                    <span className="text-green-400 font-bold">₦127,500</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-white/80">Rating</span>
                    <span className="text-yellow-400 font-bold">4.9 ⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#FF6B00] font-bold uppercase tracking-widest text-sm mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">What People Are Saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Chidinma O.', location: 'Victoria Island, Lagos', text: 'QuickBite has changed how I eat. The Jollof Rice tastes exactly like my grandmother makes it!', rating: 5, emoji: '👩‍💼' },
              { name: 'Emeka N.', location: 'Lekki Phase 1, Lagos', text: 'As a restaurant owner, QuickBite brought me 60% more orders. Best decision I made for my buka.', rating: 5, emoji: '👨‍🍳' },
              { name: 'Funke A.', location: 'Ikeja, Lagos', text: 'Fast delivery, hot food, and great prices. I use QuickBite at least 3 times a week now.', rating: 5, emoji: '👩‍🏫' },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-2xl">
                    {t.emoji}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-gray-400 text-sm">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#FF6B00] to-[#FF4500] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to Order?</h2>
          <p className="text-white/80 text-xl mb-10">Join thousands of Lagosians enjoying authentic local cuisine every day</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="px-8 py-4 bg-white text-[#FF4500] font-bold rounded-full text-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              Order Food Now
            </Link>
            <Link href="/register?role=restaurant" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all hover:-translate-y-1">
              Register My Kitchen
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1628] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B00] to-[#FF4500] flex items-center justify-center">
                  <span className="text-white font-black text-sm">QB</span>
                </div>
                <span className="font-bold text-white text-xl">QuickBite</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed">Your favorite local bukas, one order away. Authentic Nigerian cuisine delivered fresh.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                {['How It Works', 'Browse Kitchens', 'For Partners', 'About Us'].map(item => (
                  <li key={item}><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Restaurants</h4>
              <ul className="space-y-2">
                {['Register Kitchen', 'Partner Dashboard', 'Delivery Info', 'Pricing'].map(item => (
                  <li key={item}><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                {['Help Center', 'Contact Us', 'FAQs', 'Terms of Service'].map(item => (
                  <li key={item}><Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 QuickBite. All rights reserved.</p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'WhatsApp'].map(social => (
                <Link key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <span className="text-xs">{social[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
