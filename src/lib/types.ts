// Shared types for QuickBite

export interface MenuItem {
  id: string;
  restaurant_id?: string;
  category_id?: string;
  category?: string; // category name (e.g. "Soups", "Rice")
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  is_available?: boolean;
  created_at?: string;
  category_name?: string; // used in restaurant portal
}

export interface Restaurant {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  cuisine_type: string;
  address: string;
  location_lat: number;
  location_lng: number;
  rating: number;
  is_open: boolean;
  min_order: number;
  delivery_fee: number;
  image_url?: string;
  created_at?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  customer_id: string;
  restaurant_id: string;
  rider_id?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled';
  subtotal: number;
  delivery_fee: number;
  total: number;
  delivery_address: string;
  delivery_lat?: number;
  delivery_lng?: number;
  payment_method: 'card' | 'ussd' | 'transfer' | 'wallet';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  created_at: string;
  delivered_at?: string;
  restaurant?: Restaurant;
}

export interface User {
  id: string;
  phone: string;
  name?: string;
  role: 'customer' | 'restaurant' | 'admin' | 'rider';
}
