'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

interface Order {
  id: string
  restaurant_name: string
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'
  total: number
  created_at: string
  items: Array<{
    name: string
    quantity: number
  }>
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active')
  const { addItem } = useCart()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const activeOrders = orders.filter(o => 
    ['pending', 'confirmed', 'preparing', 'dispatched'].includes(o.status)
  )
  const pastOrders = orders.filter(o => 
    ['delivered', 'cancelled'].includes(o.status)
  )

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders

  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, { bg: string; text: string; label: string }> = {
      pending: { bg: 'bg-[#FFF3CD]', text: 'text-[#1A1A1A]', label: 'Pending' },
      confirmed: { bg: 'bg-[#0D6EFD]/10', text: 'text-[#0D6EFD]', label: 'Confirmed' },
      preparing: { bg: 'bg-[#FD7E14]/10', text: 'text-[#FD7E14]', label: 'Preparing' },
      dispatched: { bg: 'bg-[#2D6A4F]/10', text: 'text-[#2D6A4F]', label: 'On the way' },
      delivered: { bg: 'bg-[#198754]/10', text: 'text-[#198754]', label: 'Delivered' },
      cancelled: { bg: 'bg-[#DC3545]/10', text: 'text-[#DC3545]', label: 'Cancelled' },
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

  const handleReorder = (order: Order) => {
    // This would need to fetch the original items
    // For now, just navigate to the restaurant
    alert('Reorder feature would add items from ' + order.restaurant_name)
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
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">No orders yet</h3>
            <p className="text-sm text-[#666666]">Your orders will appear here</p>
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
                        handleReorder(order)
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