'use client'

import { useState } from 'react'

interface Order {
  id: string
  customer_name: string
  items: Array<{ name: string; quantity: number }>
  total: number
  created_at: string
  status: string
}

type FilterTab = 'new' | 'preparing' | 'dispatched' | 'completed'

export default function RestaurantOrdersPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('new')
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'order-1',
      customer_name: 'Tobi A.',
      items: [{ name: 'Jollof Rice', quantity: 2 }, { name: 'Grilled Chicken', quantity: 1 }],
      total: 6500,
      created_at: new Date(Date.now() - 5 * 60000).toISOString(),
      status: 'new',
    },
    {
      id: 'order-2',
      customer_name: 'Ada N.',
      items: [{ name: 'Coconut Rice', quantity: 1 }],
      total: 2200,
      created_at: new Date(Date.now() - 15 * 60000).toISOString(),
      status: 'preparing',
    },
    {
      id: 'order-3',
      customer_name: 'Emeka O.',
      items: [{ name: 'Peppered Goat', quantity: 1 }, { name: 'Amala', quantity: 2 }],
      total: 6000,
      created_at: new Date(Date.now() - 25 * 60000).toISOString(),
      status: 'dispatched',
    },
    {
      id: 'order-4',
      customer_name: 'Chidi M.',
      items: [{ name: 'Fried Rice', quantity: 1 }, { name: 'Chapman', quantity: 2 }],
      total: 2800,
      created_at: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      status: 'completed',
    },
    {
      id: 'order-5',
      customer_name: 'Fatima K.',
      items: [{ name: 'Party Jollof', quantity: 1 }],
      total: 2500,
      created_at: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      status: 'completed',
    },
  ])

  const tabs: { key: FilterTab; label: string; count: number }[] = [
    { key: 'new', label: 'New', count: orders.filter(o => o.status === 'new').length },
    { key: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { key: 'dispatched', label: 'Dispatched', count: orders.filter(o => o.status === 'dispatched').length },
    { key: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
  ]

  const filteredOrders = orders.filter(o => o.status === activeTab)

  const formatTimeElapsed = (dateString: string) => {
    const mins = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    return `${hours}h ${mins % 60}m ago`
  }

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Orders
        </h1>
        <p className="text-sm text-[#666666]">Manage and track all your orders</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-[#E5E5E5]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-[#E85D04] text-[#E85D04]'
                  : 'border-transparent text-[#666666]'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key
                    ? 'bg-[#E85D04] text-white'
                    : 'bg-[#F5F5F5] text-[#666666]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="divide-y divide-[#E5E5E5]">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-[#666666]">
              No {activeTab} orders
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className={`p-4 ${order.status === 'new' ? 'bg-[#FFF3CD]/30' : ''}`}>
                {/* Order Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Order #{order.id.slice(-4)}</p>
                    <p className="text-sm text-[#666666]">{order.customer_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#E85D04]">₦{order.total.toLocaleString()}</p>
                    <p className="text-xs text-[#999999]">{formatTimeElapsed(order.created_at)}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-3 p-3 bg-[#F8F9FA] rounded-lg">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-[#666666]">{item.quantity}x {item.name}</span>
                    </div>
                  ))}
                </div>

                {/* Actions based on status */}
                <div className="flex gap-2">
                  {order.status === 'new' && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(order.id, 'preparing')}
                        className="flex-1 py-2 bg-[#2D6A4F] text-white rounded-lg font-medium hover:bg-[#1B4332] transition-colors text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
                        className="flex-1 py-2 bg-[#DC3545] text-white rounded-lg font-medium hover:bg-[#c82333] transition-colors text-sm"
                      >
                        Decline
                      </button>
                    </>
                  )}
                  {order.status === 'preparing' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'dispatched')}
                      className="w-full py-2 bg-[#E85D04] text-white rounded-lg font-medium hover:bg-[#D45103] transition-colors text-sm"
                    >
                      Mark Ready for Pickup
                    </button>
                  )}
                  {order.status === 'dispatched' && (
                    <div className="w-full flex items-center justify-center py-2 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-lg text-sm font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse mr-2" />
                      Awaiting Delivery
                    </div>
                  )}
                  {order.status === 'completed' && (
                    <div className="w-full flex items-center justify-center py-2 bg-[#198754]/10 text-[#198754] rounded-lg text-sm font-medium">
                      Completed ✓
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}