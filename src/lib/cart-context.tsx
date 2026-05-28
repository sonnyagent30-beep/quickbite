'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  menu_item_id: string
  name: string
  price: number
  quantity: number
  image_url: string
  restaurant_id: string
  restaurant_name: string
}

interface CartContextType {
  items: CartItem[]
  restaurantId: string | null
  restaurantName: string | null
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number, showCrossRestaurantWarning?: () => void) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

const CART_STORAGE_KEY = 'quickbite_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [restaurantId, setRestaurantId] = useState<string | null>(null)
  const [restaurantName, setRestaurantName] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setItems(parsed.items || [])
        setRestaurantId(parsed.restaurantId || null)
        setRestaurantName(parsed.restaurantName || null)
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items, restaurantId, restaurantName }))
    }
  }, [items, restaurantId, restaurantName, isHydrated])

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'>, quantity = 1, showCrossRestaurantWarning?: () => void) => {
    setItems(prev => {
      // Check if adding from a different restaurant
      if (restaurantId && restaurantId !== item.restaurant_id) {
        // Show warning instead of silently clearing
        if (showCrossRestaurantWarning) {
          showCrossRestaurantWarning()
          return prev
        }
        // Clear cart and start fresh
        setRestaurantId(item.restaurant_id)
        setRestaurantName(item.restaurant_name)
        const newItem: CartItem = {
          ...item,
          id: `${item.menu_item_id}-${Date.now()}`,
          quantity,
        }
        return [newItem]
      }

      // Check if item already exists
      const existingIndex = prev.findIndex(i => i.menu_item_id === item.menu_item_id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      // Add new item
      const newItem: CartItem = {
        ...item,
        id: `${item.menu_item_id}-${Date.now()}`,
        quantity,
      }
      return [...prev, newItem]
    })

    // Set restaurant if not set
    if (!restaurantId) {
      setRestaurantId(item.restaurant_id)
      setRestaurantName(item.restaurant_name)
    }
  }

  const removeItem = (id: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id)
      if (filtered.length === 0) {
        setRestaurantId(null)
        setRestaurantName(null)
      }
      return filtered
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setItems([])
    setRestaurantId(null)
    setRestaurantName(null)
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}