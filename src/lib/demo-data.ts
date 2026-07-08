import { Restaurant, MenuItem } from './types'

// Demo restaurants matching Restaurant type from types.ts
export const DEMO_RESTAURANTS: Restaurant[] = [
  {
    id: 'r1',
    owner_id: 'demo-restaurant-1',
    name: 'Bunche Kitchen',
    description: 'Nigerian cuisine, jollof rice, pounded yam, and more',
    cuisine_type: 'Nigerian',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    location_lat: 6.4281,
    location_lng: 3.4219,
    rating: 4.8,
    is_open: true,
    min_order: 1000,
    delivery_fee: 450,
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
  },
  {
    id: 'r2',
    owner_id: 'demo-restaurant-2',
    name: 'Chicken Republic',
    description: 'Fast food, grilled chicken, burgers and more',
    cuisine_type: 'Fast Food',
    address: '42 Adeola Odeku St, Victoria Island, Lagos',
    location_lat: 6.4281,
    location_lng: 3.4219,
    rating: 4.5,
    is_open: true,
    min_order: 1500,
    delivery_fee: 350,
    image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
  },
  {
    id: 'r3',
    owner_id: 'demo-restaurant-3',
    name: 'Taste of Lagos',
    description: 'Authentic Nigerian dishes and local delicacies',
    cuisine_type: 'Nigerian',
    address: '25 Ozumba Mbadiwe Rd, Victoria Island, Lagos',
    location_lat: 6.4281,
    location_lng: 3.4219,
    rating: 4.6,
    is_open: true,
    min_order: 2000,
    delivery_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  },
]

// Demo menu items matching MenuItem type
export const DEMO_MENU_ITEMS: MenuItem[] = [
  // Bunche Kitchen
  { id: 'm1', restaurant_id: 'r1', name: 'Jollof Rice & Chicken', description: 'Signature jollof with grilled chicken', price: 2500, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400' },
  { id: 'm2', restaurant_id: 'r1', name: 'Pounded Yam & Egusi', description: 'Smooth pounded yam with melon soup', price: 3000, category: 'Swallow', image_url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
  { id: 'm3', restaurant_id: 'r1', name: 'Fried Rice & Plantain', description: 'Nigerian fried rice with sweet plantain', price: 2200, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400' },
  { id: 'm4', restaurant_id: 'r1', name: 'Suya Wrap', description: 'Beef suya in fresh tomato wrap', price: 1500, category: 'Street Food', image_url: 'https://images.unsplash.com/photo-1568000685-4e5b64bf8e76?w=400' },
  { id: 'm5', restaurant_id: 'r1', name: 'Moi Moi', description: 'Steamed bean pudding', price: 800, category: 'Side', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400' },
  // Chicken Republic
  { id: 'm6', restaurant_id: 'r2', name: 'Grilled Chicken Box', description: 'Grilled chicken with chips and drink', price: 3500, category: 'Boxes', image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400' },
  { id: 'm7', restaurant_id: 'r2', name: 'Big Byte Burger', description: 'Double patty beef burger', price: 2800, category: 'Burgers', image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'm8', restaurant_id: 'r2', name: 'Fish Platform', description: 'Crispy fish with chips and slaw', price: 3200, category: 'Fish', image_url: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400' },
  // Taste of Lagos
  { id: 'm9', restaurant_id: 'r3', name: 'Abacha & Fish', description: 'African salad with smoked fish', price: 1800, category: 'Nigerian', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400' },
  { id: 'm10', restaurant_id: 'r3', name: 'Ogbono Soup', description: 'Draw soup with stockfish', price: 2500, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400' },
]

export interface DemoOrder {
  id: string
  customer_name: string
  customer_phone: string
  restaurant_name: string
  items: { name: string; quantity: number; price: number }[]
  subtotal: number
  delivery_fee: number
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'
  created_at: string
  delivery_address: string
}

export const DEMO_ORDERS: DemoOrder[] = [
  {
    id: 'order-001',
    customer_name: 'John Eze',
    customer_phone: '+234 801 111 1111',
    restaurant_name: 'Bunche Kitchen',
    items: [
      { name: 'Jollof Rice & Chicken', quantity: 2, price: 2500 },
      { name: 'Moi Moi', quantity: 1, price: 800 },
    ],
    subtotal: 5800,
    delivery_fee: 450,
    total: 6250,
    status: 'preparing',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    delivery_address: '15 Admiralty Way, Lekki Phase 1, Lagos',
  },
  {
    id: 'order-002',
    customer_name: 'Sarah Johnson',
    customer_phone: '+234 809 876 5432',
    restaurant_name: 'Chicken Republic',
    items: [
      { name: 'Grilled Chicken Box', quantity: 1, price: 3500 },
    ],
    subtotal: 3500,
    delivery_fee: 350,
    total: 3850,
    status: 'delivered',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    delivery_address: '42 Adeola Odeku St, Victoria Island, Lagos',
  },
  {
    id: 'order-003',
    customer_name: 'Emeka Obi',
    customer_phone: '+234 901 234 5678',
    restaurant_name: 'Bunche Kitchen',
    items: [
      { name: 'Pounded Yam & Egusi', quantity: 1, price: 3000 },
      { name: 'Suya Wrap', quantity: 2, price: 1500 },
    ],
    subtotal: 6000,
    delivery_fee: 450,
    total: 6450,
    status: 'pending',
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    delivery_address: '10 Banex Plaza, Wuse 2, Abuja',
  },
]
