'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DEMO_ORDERS, DemoOrder } from '@/lib/demo-data'

export default function OrdersPage() {
  const [orders, setOrders] = useState<DemoOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = () => {
    try {
      // First try to get orders from localStorage (new orders from checkout)
      const localOrders = localStorage.getItem('quickbite_orders')
      if (localOrders) {
        const parsed = JSON.parse(localOrders)
        if (parsed.length > 0) {
          setOrders(parsed)
          setLoading(false)
          return
        }
      }
      // Fall back to demo data if no local orders
      setOrders(DEMO_ORDERS)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
      // Fall back to demo data
      setOrders(DEMO_ORDERS)
    } finally {
      setLoading(false)
    }
  }

  const activeOrders = orders.filter(o => 
    ['pending', 'confirmed', 'preparing', 'dispatched', 'ready'].includes(o.status)
  )
  const pastOrders = orders.filter(o => 
    ['delivered', 'cancelled'].includes(o.status)
  )

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending' },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Confirmed' },
      preparing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Preparing' },
      ready: { bg: 'bg-green-100', text: 'text-green-700', label: 'Ready' },
      dispatched: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'On the way' },
      delivered: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Delivered' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelled' },
    }
    const style = statusStyles[status] || statusStyles.pending
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <Link href="/" className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </Link>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            My Orders
          </h1>
          <div className="w-10" />
        </div>

        {/* Tabs */}
        <div className="flex px-4">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'active'
                ? 'border-[#E85D04] text-[#E85D04]'
                : 'border-transparent text-[#666666]'
            }`}
          >
            Active ({activeOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'past'
                ? 'border-[#E85D04] text-[#E85D04]'
                : 'border-transparent text-[#666666]'
            }`}
          >
            Past ({pastOrders.length})
          </button>
        </div>
      </header>

      {/* Orders List */}
      <main className="p-4 space-y-4 pb-20">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="h-4 bg-[#E5E5E5] rounded w-1/2 mb-3"/>
                <div className="h-3 bg-[#E5E5E5] rounded w-3/4 mb-2"/>
                <div className="h-3 bg-[#E5E5E5] rounded w-1/4"/>
              </div>
            ))}
          </div>
        ) : displayedOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">
              {activeTab === 'active' ? 'No active orders' : 'No past orders'}
            </h3>
            <p className="text-sm text-[#666666]">
              {activeTab === 'active' ? 'Your active orders will appear here' : 'Your order history will appear here'}
            </p>
            <Link 
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-[#E85D04] text-white font-medium rounded-full hover:bg-[#D45103] transition-colors"
            >
              Browse Restaurants
            </Link>
          </div>
        ) : (
          displayedOrders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#1A1A1A]">{order.restaurant_name}</h3>
                    <p className="text-xs text-[#666666] mt-1">{formatDate(order.created_at)}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="text-sm text-[#666666] mb-3">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.quantity}x {item.name}
                      {i < order.items.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E85D04]">₦{Number(order.total).toLocaleString()}</span>
                  {order.status === 'delivered' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        alert('Reorder feature - add items from ' + order.restaurant_name)
                      }}
                      className="px-4 py-2 text-sm font-medium text-[#E85D04] border border-[#E85D04] rounded-full hover:bg-[#E85D04] hover:text-white transition-colors"
                    >
                      Reorder
                    </button>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  )
}
