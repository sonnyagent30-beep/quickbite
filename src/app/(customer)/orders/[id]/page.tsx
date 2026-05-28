'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import OrderStatusStepper from '@/components/OrderStatusStepper'

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface OrderItem {
  id: string
  name: string
  quantity: number
  unit_price: number
  subtotal: number
}

interface Order {
  id: string
  restaurant_name: string
  restaurant_address: string
  rider_name?: string
  rider_phone?: string
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'
  subtotal: number
  delivery_fee: number
  total: number
  delivery_address: string
  created_at: string
  estimated_delivery?: string
  items: OrderItem[]
  rider_lat?: number
  rider_lng?: number
  restaurant_lat?: number
  restaurant_lng?: number
}

export default function OrderTrackingPage() {
  const params = useParams()
  const orderId = params.id as string
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    fetchOrder()
  }, [orderId])

  useEffect(() => {
    setMapReady(true)
  }, [])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

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
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}>
        <span className={`w-2 h-2 rounded-full ${
          style.label === 'Delivered' ? 'bg-[#198754]' :
          style.label === 'On the way' ? 'bg-[#2D6A4F]' :
          style.label === 'Cancelled' ? 'bg-[#DC3545]' :
          'bg-[#FD7E14]'
        } animate-pulse`} />
        {style.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFEFE]">
        <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
          <div className="flex items-center h-14 px-4">
            <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]">Loading...</h1>
            <div className="w-10" />
          </div>
        </header>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FEFEFE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666666]">Order not found</p>
          <Link href="/orders" className="text-[#E85D04] font-medium mt-2 inline-block">
            View all orders
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE]">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-[#E5E5E5] z-50">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <h1 className="flex-1 text-center font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Track Order
          </h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-8">
        {/* Status Section */}
        <div className="p-4 bg-white border-b border-[#E5E5E5]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-[#666666]">Order #{order.id.slice(0, 8)}</p>
              <p className="text-xs text-[#999999] mt-1">
                Placed {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>
          <OrderStatusStepper status={order.status} orientation="horizontal" />
        </div>

        {/* Map Section (only when dispatched/delivered) */}
        {(order.status === 'dispatched' || order.status === 'delivered') && mapReady && (
          <div className="h-48 bg-[#E5E5E5] relative">
            <MapContainer
              center={[6.5994, 3.3419]}
              zoom={13}
              style={{ width: '100%', height: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              {order.restaurant_lat && order.restaurant_lng && (
                <Marker position={[order.restaurant_lat, order.restaurant_lng]}>
                  <Popup>Restaurant</Popup>
                </Marker>
              )}
              {order.rider_lat && order.rider_lng && (
                <Marker position={[order.rider_lat, order.rider_lng]}>
                  <Popup>Rider</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        )}

        {/* Delivery Info */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Delivery Info
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-sm">{order.delivery_address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rider Contact Card */}
        {order.rider_name && (order.status === 'dispatched' || order.status === 'delivered') && (
          <div className="p-4 border-b border-[#E5E5E5]">
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
              Your Rider
            </h3>
            <div className="bg-[#F8F9FA] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#E85D04] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {order.rider_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">{order.rider_name}</p>
                  <p className="text-xs text-[#666666]">Your delivery rider</p>
                </div>
              </div>
              <a
                href={`tel:${order.rider_phone}`}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </a>
            </div>
          </div>
        )}

        {/* Restaurant Info */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Restaurant
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <span className="text-2xl">🍽️</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#1A1A1A]">{order.restaurant_name}</p>
              <p className="text-xs text-[#666666]">{order.restaurant_address}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>
            Order Items
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#F5F5F5] rounded flex items-center justify-center text-xs font-medium text-[#666666]">
                    {item.quantity}x
                  </span>
                  <span className="text-sm text-[#1A1A1A]">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-[#1A1A1A]">
                  ₦{Number(item.subtotal).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="mt-4 pt-4 border-t border-[#E5E5E5] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#666666]">Subtotal</span>
              <span className="text-[#1A1A1A]">₦{Number(order.subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666666]">Delivery Fee</span>
              <span className="text-[#1A1A1A]">₦{Number(order.delivery_fee).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-2 border-t border-[#E5E5E5]">
              <span className="text-[#1A1A1A]">Total</span>
              <span className="text-[#E85D04]">₦{Number(order.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}