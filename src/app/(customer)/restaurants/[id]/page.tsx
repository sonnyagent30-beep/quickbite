'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  is_available?: boolean
}

interface Restaurant {
  id: string
  name: string
  description: string
  cuisine_type: string
  address: string
  rating: number
  rating_count: number
  is_open: boolean
  min_order: number
  delivery_fee: number
  image_url: string
  distance?: string
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id as string

  const { addItem, clearCart, totalItems, items: cartItems, restaurantId: cartRestaurantId, restaurantName: cartRestaurantName } = useCart()
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [toast, setToast] = useState<string | null>(null)
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false)
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!restaurantId) return
    setLoading(true)

    Promise.all([
      fetch(`/api/restaurants/${restaurantId}`).then(r => r.json()),
      fetch(`/api/restaurants/${restaurantId}/menu`).then(r => r.json()),
    ]).then(([rest, menuData]) => {
      setRestaurant(rest.restaurant || rest)
      setMenu(menuData.menu || menuData)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [restaurantId])

  const showToast = (msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = setTimeout(() => setToast(null), 2000)
  }

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return
    const cartRestaurant = cartRestaurantId
    if (cartRestaurant && cartRestaurant !== restaurantId) {
      setPendingItem(item)
      setShowSwitchConfirm(true)
      return
    }
    addItem({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      restaurant_id: restaurantId,
      restaurant_name: restaurant.name,
    })
    showToast(`${item.name} added to cart!`)
  }

  const confirmSwitch = () => {
    if (!restaurant || !pendingItem) return
    clearCart()
    addItem({
      menu_item_id: pendingItem.id,
      name: pendingItem.name,
      price: pendingItem.price,
      image_url: pendingItem.image_url,
      restaurant_id: restaurantId,
      restaurant_name: restaurant.name,
    })
    showToast(`${pendingItem.name} added to cart!`)
    setShowSwitchConfirm(false)
    setPendingItem(null)
  }

  const categories = ['All', ...Array.from(new Set(menu.map(i => i.category)))]

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(i => i.category === selectedCategory)

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E85D04] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-[#666666]">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-xl font-bold text-[#1A1A1A]">Restaurant not found</h2>
          <p className="text-sm text-[#666666] mt-1">This restaurant may have been removed.</p>
          <Link href="/home" className="mt-4 inline-block px-6 py-3 bg-[#E85D04] text-white rounded-xl font-medium">
            Browse Restaurants
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-28">
      {/* Back button */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-[#E5E5E5] px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-[#F5F5F5] rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <p className="font-semibold text-[#1A1A1A] truncate">{restaurant.name}</p>
      </div>

      {/* Hero */}
      <div className="relative h-52">
        <img src={restaurant.image_url} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white text-xl font-bold">{restaurant.name}</h1>
          <p className="text-white/80 text-sm">{restaurant.cuisine_type} • {restaurant.address}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-sm text-white">
              ⭐ {restaurant.rating} <span className="text-white/60">({restaurant.rating_count})</span>
            </span>
            <span className="text-white/80 text-sm">• {restaurant.distance || '1.2 km'} away</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${restaurant.is_open ? 'bg-[#2D6A4F] text-white' : 'bg-[#DC3545] text-white'}`}>
              {restaurant.is_open ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      {/* Info chips */}
      <div className="flex items-center gap-4 px-4 py-3 bg-white border-b border-[#E5E5E5]">
        <div className="flex items-center gap-1.5 text-sm text-[#666666]">
          <span>🕐</span>
          <span>30-45 min</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[#666666]">
          <span>🚴</span>
          <span>₦{restaurant.delivery_fee} delivery</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[#666666]">
          <span>📦</span>
          <span>Min ₦{restaurant.min_order.toLocaleString()}</span>
        </div>
      </div>

      {/* Category filters */}
      <div className="px-4 py-3 bg-white border-b border-[#E5E5E5] overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#E85D04] text-white'
                  : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-4 py-4 space-y-3">
        {filteredMenu.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-[#666666]">No items in this category</p>
          </div>
        ) : (
          filteredMenu.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden flex">
              <div className="w-28 h-28 flex-shrink-0">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-[#1A1A1A] text-sm">{item.name}</h3>
                  <p className="text-xs text-[#666666] mt-0.5 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-[#E85D04]">₦{item.price.toLocaleString()}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-3 py-1.5 bg-[#E85D04] text-white text-xs font-semibold rounded-lg hover:bg-[#D45103] transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-20 left-0 right-0 px-4 pb-4 z-30">
          <Link
            href="/cart"
            className="flex items-center justify-between bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[#E85D04] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </div>
              <span className="text-sm font-medium">{cartRestaurantName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">₦{cartTotal.toLocaleString()}</span>
              <span className="text-xs opacity-70">View Cart →</span>
            </div>
          </Link>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#1A1A1A] text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg z-50 animate-[fadeIn_0.2s]">
          ✓ {toast}
        </div>
      )}

      {/* Cross-restaurant confirm */}
      {showSwitchConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={() => setShowSwitchConfirm(false)}>
          <div className="bg-white rounded-t-2xl w-full max-w-md p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-[#1A1A1A]">Start new order?</h3>
            <p className="text-sm text-[#666666]">
              Your cart has items from <strong>{cartRestaurantName}</strong>. Starting a new order will clear your current cart.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowSwitchConfirm(false)} className="flex-1 py-3 bg-[#F5F5F5] text-[#1A1A1A] font-semibold rounded-xl">Cancel</button>
              <button onClick={confirmSwitch} className="flex-1 py-3 bg-[#E85D04] text-white font-semibold rounded-xl">Yes, Continue</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
