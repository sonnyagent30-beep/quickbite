'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import FoodItemCard from '@/components/FoodItemCard'
import { useCart, CartItem } from '@/lib/cart-context'
import { DEMO_RESTAURANTS, DEMO_MENU_ITEMS } from '@/lib/demo-data'
import Link from 'next/link'

import type { MenuItem, Restaurant } from '@/lib/types'

interface Category {
  id: string
  name: string
  sort_order?: number
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({})
  const { addItem, clearCart, totalItems, items: cartItems } = useCart()
  const [showCrossRestaurantModal, setShowCrossRestaurantModal] = useState(false)
  const [pendingItem, setPendingItem] = useState<MenuItem | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    // Load restaurant and menu from DEMO_RESTAURANTS
    const foundRestaurant = DEMO_RESTAURANTS.find(r => r.id === restaurantId)
    
    if (foundRestaurant) {
      setRestaurant(foundRestaurant as Restaurant)
      
      // Get menu items for this restaurant
      const restaurantMenu = DEMO_MENU_ITEMS.filter(item => item.restaurant_id === restaurantId)
      setMenuItems(restaurantMenu)
      
      // Extract unique categories
      const uniqueCategories = Array.from(new Set(restaurantMenu.filter((item: MenuItem) => item.category).map((item: MenuItem) => item.category!)))
      
      // Add "All" category at the beginning
      const categoryList: Category[] = [
        { id: 'all', name: 'All', sort_order: 0 },
        ...uniqueCategories.map((cat: string, index: number) => ({
          id: cat,
          name: cat,
          sort_order: index + 1,
        }))
      ]
      setCategories(categoryList)
      
      // Set "All" as default active category
      setActiveCategory('all')
    }
    
    setLoading(false)
  }, [restaurantId])

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId)
    const element = categoryRefs.current[categoryId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleAddToCart = (item: MenuItem) => {
    if (!restaurant) return
    addItem({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url || '',
      restaurant_id: restaurant.id,
      restaurant_name: restaurant.name,
    }, 1, () => {
      // This callback runs when adding from a different restaurant
      setPendingItem(item)
      setShowCrossRestaurantModal(true)
    })
    // Show toast notification
    setToastMessage(`${item.name} added to cart`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const confirmSwitchRestaurant = () => {
    if (!pendingItem || !restaurant) return
    // Clear cart first, then add the new item
    clearCart()
    addItem({
      menu_item_id: pendingItem.id,
      name: pendingItem.name,
      price: pendingItem.price,
      image_url: pendingItem.image_url || '',
      restaurant_id: restaurant.id,
      restaurant_name: restaurant.name,
    })
    setShowCrossRestaurantModal(false)
    setPendingItem(null)
    // Show toast
    setToastMessage(`${pendingItem.name} added to cart`)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000)
  }

  const cancelSwitchRestaurant = () => {
    setShowCrossRestaurantModal(false)
    setPendingItem(null)
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = cartItems.find((i: CartItem) => i.menu_item_id === itemId)
    return cartItem?.quantity ?? 0
  }

  // Get filtered items based on active category
  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return menuItems
    }
    return menuItems.filter((item: MenuItem) => item.category === activeCategory)
  }

  // Get category name for display
  const getActiveCategoryName = () => {
    if (activeCategory === 'all') return 'All Menu'
    return activeCategory || ''
  }

  const filteredItems = getFilteredItems()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <div className="h-64 bg-[#E5E5E5] animate-pulse" />
        <div className="p-4">
          <div className="h-8 bg-[#E5E5E5] rounded w-1/2 mb-4" />
          <div className="h-4 bg-[#E5E5E5] rounded w-3/4 mb-6" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-[#E5E5E5] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666666]">Restaurant not found</p>
          <Link href="/" className="text-[#FF7A00] font-medium mt-2 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Parallax Hero Header */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurant.image_url || 'https://via.placeholder.com/800x400?text=Food'}
          alt={restaurant.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Food'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </Link>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-poppins)' }}>
            {restaurant.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#FFC107" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <span className="opacity-80">{restaurant.cuisine_type}</span>
            <span className="opacity-80">•</span>
            <span className="opacity-80">30-45 min</span>
            <span className="opacity-80">•</span>
            <span className="opacity-80">₦{restaurant.delivery_fee} delivery</span>
          </div>
        </div>
      </div>

      {/* Sticky Category Tabs */}
      {categories.length > 0 && (
        <div className="sticky top-14 z-40 bg-white border-b border-[#F5F5F5] shadow-sm">
          <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
            {categories.map((category: Category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-[#FF7A00] text-white'
                    : 'bg-[#F5F5F5] text-[#333333] hover:bg-[#E5E5E5]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Menu Items - Filtered by Category */}
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold text-[#1F1F1F]" style={{ fontFamily: 'var(--font-poppins)' }}>
          {getActiveCategoryName()}
        </h2>
        <div className="space-y-3">
          {filteredItems.map((item: MenuItem) => (
            <FoodItemCard
              key={item.id}
              item={item}
              onAdd={handleAddToCart}
              quantity={getItemQuantity(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {totalItems > 0 && (
        <Link
          href="/cart"
          className="fixed bottom-20 left-4 right-4 bg-[#FF7A00] text-white p-4 rounded-xl shadow-lg flex items-center justify-between z-50 md:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="font-bold">{totalItems}</span>
            </div>
            <div>
              <p className="font-semibold text-white">View Cart</p>
              <p className="text-xs text-white/80">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <span className="font-bold">Checkout →</span>
        </Link>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#333333] text-white px-4 py-2 rounded-full shadow-lg z-[60] animate-fade-in">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Cross-Restaurant Warning Modal */}
      {showCrossRestaurantModal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-[#FFF3CD] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/><path d="M12 17h.01"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1F1F1F] mb-2">Different Restaurant</h3>
              <p className="text-sm text-[#666666]">
                Your cart has items from another restaurant. Do you want to clear it and add items from this restaurant instead?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelSwitchRestaurant}
                className="flex-1 py-3 px-4 rounded-xl border-2 border-[#E5E5E5] text-[#333333] font-medium hover:bg-[#F5F5F5] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSwitchRestaurant}
                className="flex-1 py-3 px-4 rounded-xl bg-[#FF7A00] text-white font-medium hover:bg-[#D35400] transition-colors"
              >
                Clear & Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
