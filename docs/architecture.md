# QuickBite Technical Architecture Document

**Version:** 1.0 MVP  
**Target Market:** Ikeja/Victoria Island, Lagos, Nigeria  
**Last Updated:** May 2026

---

## 1. Tech Stack Recommendation

### Overview

| Layer | Technology | Free Tier | Notes |
|-------|-----------|-----------|-------|
| Frontend | Next.js 14 (App Router) | Netlify (unlimited requests) | SSR/SSG for SEO, fast initial load |
| Backend | Supabase | 50K monthly users, 1GB DB | Edge Functions for API routes |
| Database | PostgreSQL (via Supabase) | Included | Row-level security, real-time |
| Auth | Supabase Auth | 30K monthly users | Phone OTP for Nigerian market |
| Storage | Supabase Storage | 1GB | Menu images, restaurant photos |
| Payments | Flutterwave Standard API | No fees on test | Card, USSD, Transfer, Voucher |
| Maps | Leaflet + OpenStreetMap | Free, no API key | No usage limits |
| SMS/OTP | WhatsApp OTP (skip SMS) | Free | Termii optional for SMS fallback |
| Hosting | Netlify | Unlimited static, 100GB bandwidth | Already configured |

### Rationale

**Next.js over plain React:** SSR enables restaurant listing SEO. App Router simplifies API route management. Netlify adapter is production-ready.

**Supabase over Firebase:** True PostgreSQL (not Firestore). Easier complex queries for food delivery logic. Generous free tier for MVP.

**Flutterwave over Paystack:** Wider Nigerian payment method coverage (USSD is critical for feature phones). Same pricing for small MVPs.

**Leaflet + OSM over Google Maps:** No API key required. No usage limits. Google Maps API would require credit card and has stricter quotas on free tier.

**WhatsApp OTP over SMS:** Nigerian telecom SMS delivery rates are ~70%. WhatsApp penetration in Lagos is >85%. Termii SMS is fallback.

---

## 2. Database Schema

### SQL Migration (Supabase/PostgreSQL)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & AUTH
-- ============================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT NOT NULL CHECK (role IN ('customer', 'restaurant', 'admin', 'rider')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RESTAURANTS
-- ============================================
CREATE TABLE public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    cuisine_type TEXT,
    address TEXT NOT NULL,
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    is_open BOOLEAN DEFAULT true,
    min_order DECIMAL(10, 2) DEFAULT 0.00,
    delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MENU CATEGORIES
-- ============================================
CREATE TABLE public.menu_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MENU ITEMS
-- ============================================
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id UUID REFERENCES public.menu_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RIDERS
-- ============================================
CREATE TABLE public.riders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    vehicle_type TEXT CHECK (vehicle_type IN ('bicycle', 'motorcycle', 'car')),
    is_available BOOLEAN DEFAULT true,
    current_location_lat DECIMAL(10, 8),
    current_location_lng DECIMAL(11, 8),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled'
);

CREATE TYPE payment_method AS ENUM (
    'card', 'ussd', 'transfer', 'wallet', 'voucher'
);

CREATE TYPE payment_status AS ENUM (
    'pending', 'paid', 'failed', 'refunded'
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES public.users(id),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id),
    rider_id UUID REFERENCES public.riders(id),
    status order_status DEFAULT 'pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    delivery_lat DECIMAL(10, 8),
    delivery_lng DECIMAL(11, 8),
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    flutterwave_tx_ref TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    preparing_at TIMESTAMPTZ,
    dispatched_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ
);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    menu_item_id UUID NOT NULL REFERENCES public.menu_items(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    notes TEXT
);

-- ============================================
-- REVIEWS
-- ============================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id),
    customer_id UUID NOT NULL REFERENCES public.users(id),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(order_id) -- One review per order
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_restaurants_location ON public.restaurants(location_lat, location_lng);
CREATE INDEX idx_restaurants_owner ON public.restaurants(owner_id);
CREATE INDEX idx_menu_items_restaurant ON public.menu_items(restaurant_id);
CREATE INDEX idx_menu_items_category ON public.menu_items(category_id);
CREATE INDEX idx_orders_customer ON public.orders(customer_id);
CREATE INDEX idx_orders_restaurant ON public.orders(restaurant_id);
CREATE INDEX idx_orders_rider ON public.orders(rider_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_riders_available ON public.riders(is_available);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;

-- Users: users can read their own data
CREATE POLICY "Users read own" ON public.users FOR SELECT USING (auth.uid() = id);

-- Restaurants: public read, restaurant owners write
CREATE POLICY "Restaurants public read" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Restaurant owners update own" ON public.restaurants FOR UPDATE USING (auth.uid() = owner_id);

-- Menu items: public read
CREATE POLICY "Menu items public read" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Restaurant owners manage menu" ON public.menu_items FOR ALL USING (
    EXISTS (SELECT 1 FROM public.restaurants WHERE id = menu_items.restaurant_id AND owner_id = auth.uid())
);

-- Orders: customers see own, restaurants see theirs
CREATE POLICY "Customers see own orders" ON public.orders FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Restaurants see their orders" ON public.orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.restaurants WHERE id = orders.restaurant_id AND owner_id = auth.uid())
);

-- Reviews: public read, customers create own
CREATE POLICY "Reviews public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Customers create own review" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = customer_id);
```

---

## 3. API Routes

### Next.js App Router Structure

All routes under `/app/api/`. Authentication via Supabase JWT in `Authorization: Bearer <token>` header.

### Authentication

#### POST /api/auth/otp-request
Request OTP for phone login.

```typescript
// Request
{ "phone": "+2348012345678" }

// Response 200
{ "message": "OTP sent", "attempt": 1 }

// Response 429 (rate limited)
{ "error": "Too many requests. Try again in 2 minutes." }
```

**Implementation:**
```typescript
// app/api/auth/otp-request/route.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const { phone } = await request.json()
  
  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
  
  // Store OTP in Supabase
  const { error } = await supabase.from('otp_tokens').insert({
    phone,
    token: otp,
    expires_at: expiresAt.toISOString(),
    attempts: 0
  })
  
  if (error) {
    // For MVP: log OTP to console if DB insert fails
    console.log(`[DEV] OTP for ${phone}: ${otp}`)
  }
  
  // In production: integrate with WhatsApp Business API or Termii
  // For MVP: log to server console
  console.log(`[OTP] ${phone} -> ${otp}`)
  
  return Response.json({ message: 'OTP sent', attempt: 1 })
}
```

#### POST /api/auth/otp-verify
Verify OTP and return JWT.

```typescript
// Request
{ "phone": "+2348012345678", "otp": "123456" }

// Response 200
{
  "access_token": "<jwt>",
  "refresh_token": "<refresh>",
  "user": { "id": "uuid", "phone": "...", "role": "customer" }
}

// Response 401
{ "error": "Invalid or expired OTP" }
```

```typescript
// app/api/auth/otp-verify/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const { phone, otp } = await request.json()
  
  // Verify OTP
  const { data: otpRecord, error: otpError } = await supabase
    .from('otp_tokens')
    .select('*')
    .eq('phone', phone)
    .eq('token', otp)
    .eq('used', false)
    .gte('expires_at', new Date().toISOString())
    .single()
  
  if (!otpRecord) {
    return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 })
  }
  
  // Mark OTP as used
  await supabase.from('otp_tokens').update({ used: true }).eq('id', otpRecord.id)
  
  // Create or get user
  let { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('phone', phone)
    .single()
  
  if (!user) {
    const { data: newUser } = await supabase
      .from('users')
      .insert({ phone, role: 'customer' })
      .select()
      .single()
    user = newUser
  }
  
  // Generate Supabase JWT
  const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: `${phone}@quickbite.app` // Virtual email for Supabase auth
  })
  
  // Fallback: create custom JWT
  const token = Buffer.from(JSON.stringify({
    sub: user.id,
    phone: user.phone,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
  })).toString('base64')
  
  return NextResponse.json({
    access_token: token,
    user: { id: user.id, phone: user.phone, role: user.role, name: user.name }
  })
}
```

### Restaurants

#### GET /api/restaurants
List restaurants with optional filtering.

```typescript
// Query params
// ?lat=6.5244&lng=3.3792&radius=5&cuisine=chinese&open=true

// Response 200
{
  "restaurants": [
    {
      "id": "uuid",
      "name": "Chicken Republic",
      "cuisine_type": "Nigerian",
      "address": "Victoria Island, Lagos",
      "location_lat": 6.4281,
      "location_lng": 3.4219,
      "rating": 4.2,
      "rating_count": 128,
      "is_open": true,
      "min_order": 2000,
      "delivery_fee": 500,
      "image_url": "https://..."
    }
  ],
  "count": 24
}
```

```typescript
// app/api/restaurants/route.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '6.5244')
  const lng = parseFloat(searchParams.get('lng') || '3.3792')
  const radius = parseFloat(searchParams.get('radius') || '10') // km
  const cuisine = searchParams.get('cuisine')
  const openOnly = searchParams.get('open') === 'true'
  
  // Haversine formula for distance filtering
  // 6371 = Earth's radius in km
  const latDelta = radius / 111.0
  const lngDelta = radius / (111.0 * Math.cos(lat * Math.PI / 180))
  
  let query = supabase
    .from('restaurants')
    .select('id, name, description, cuisine_type, address, location_lat, location_lng, rating, rating_count, is_open, min_order, delivery_fee, image_url')
    .gte('location_lat', lat - latDelta)
    .lte('location_lat', lat + latDelta)
    .gte('location_lng', lng - lngDelta)
    .lte('location_lng', lng + lngDelta)
    .gte('rating', 0) // Ensure rated restaurants first
  
  if (cuisine) {
    query = query.eq('cuisine_type', cuisine)
  }
  
  if (openOnly) {
    query = query.eq('is_open', true)
  }
  
  query = query.order('rating', { ascending: false }).limit(50)
  
  const { data: restaurants, error } = await query
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
  
  // Filter by exact distance (circular boundary)
  const filtered = restaurants.filter(r => {
    const distance = haversineDistance(lat, lng, r.location_lat, r.location_lng)
    return distance <= radius
  })
  
  return Response.json({ restaurants: filtered, count: filtered.length })
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
```

#### GET /api/restaurants/[id]
Get restaurant details with menu.

```typescript
// Response 200
{
  "restaurant": {
    "id": "uuid",
    "name": "Chicken Republic",
    "description": "Nigerian fast food chain",
    "cuisine_type": "Nigerian",
    "address": "15 Adeyemo Alakija, Victoria Island",
    "location_lat": 6.4281,
    "location_lng": 3.4219,
    "rating": 4.2,
    "rating_count": 128,
    "is_open": true,
    "min_order": 2000,
    "delivery_fee": 500,
    "image_url": "https://...",
    "categories": [
      {
        "id": "uuid",
        "name": "Proteins",
        "sort_order": 1,
        "items": [
          { "id": "uuid", "name": "Fried Chicken", "price": 2500, "is_available": true, ... }
        ]
      }
    ]
  }
}
```

#### GET /api/restaurants/[id]/menu
Get menu items for a restaurant.

```typescript
// Response 200
{
  "categories": [
    {
      "id": "uuid",
      "name": "Starters",
      "items": [...]
    },
    {
      "id": "uuid",
      "name": "Main Course",
      "items": [...]
    }
  ]
}
```

### Orders

#### POST /api/orders
Create a new order.

```typescript
// Request
{
  "restaurant_id": "uuid",
  "items": [
    { "menu_item_id": "uuid", "quantity": 2, "notes": "Extra spicy" },
    { "menu_item_id": "uuid", "quantity": 1, "notes": null }
  ],
  "delivery_address": "10 Adminstration Road, Victoria Island",
  "delivery_lat": 6.4281,
  "delivery_lng": 3.4219,
  "payment_method": "card",
  "notes": "Ring bell twice"
}

// Response 201
{
  "order": {
    "id": "uuid",
    "status": "pending",
    "subtotal": 5000,
    "delivery_fee": 500,
    "total": 5500,
    "flutterwave_tx_ref": "FLW-xxx"
  }
}
```

```typescript
// app/api/orders/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  // Get user from auth header
  const authHeader = request.headers.get('Authorization')
  const token = authHeader?.replace('Bearer ', '')
  const user = token ? JSON.parse(Buffer.from(token, 'base64').toString()) : null
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const { restaurant_id, items, delivery_address, delivery_lat, delivery_lng, payment_method, notes } = await request.json()
  
  // Get restaurant delivery fee
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('delivery_fee, min_order')
    .eq('id', restaurant_id)
    .single()
  
  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
  }
  
  // Get menu items and calculate totals
  const itemIds = items.map((i: any) => i.menu_item_id)
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('id, name, price')
    .in('id', itemIds)
  
  const menuMap = new Map(menuItems.map(item => [item.id, item]))
  
  let subtotal = 0
  const orderItems = items.map((item: any) => {
    const menuItem = menuMap.get(item.menu_item_id)
    if (!menuItem) throw new Error(`Menu item ${item.menu_item_id} not found`)
    const itemSubtotal = menuItem.price * item.quantity
    subtotal += itemSubtotal
    return {
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: menuItem.price,
      subtotal: itemSubtotal,
      notes: item.notes
    }
  })
  
  if (subtotal < restaurant.min_order) {
    return NextResponse.json({ 
      error: `Minimum order is ₦${restaurant.min_order}` 
    }, { status: 400 })
  }
  
  const delivery_fee = restaurant.delivery_fee
  const total = subtotal + delivery_fee
  const txRef = `FLW-${uuidv4()}`
  
  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: user.sub,
      restaurant_id,
      subtotal,
      delivery_fee,
      total,
      delivery_address,
      delivery_lat,
      delivery_lng,
      payment_method,
      payment_status: 'pending',
      flutterwave_tx_ref: txRef,
      notes
    })
    .select()
    .single()
  
  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 })
  }
  
  // Insert order items
  const orderItemsWithId = orderItems.map(item => ({
    ...item,
    order_id: order.id
  }))
  await supabase.from('order_items').insert(orderItemsWithId)
  
  return NextResponse.json({ 
    order: {
      id: order.id,
      status: order.status,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
      flutterwave_tx_ref: txRef
    }
  }, { status: 201 })
}
```

#### GET /api/orders
Get customer's orders.

```typescript
// Response 200
{
  "orders": [
    {
      "id": "uuid",
      "restaurant": { "id": "uuid", "name": "Chicken Republic" },
      "status": "delivered",
      "total": 5500,
      "created_at": "2026-05-28T10:00:00Z"
    }
  ]
}
```

#### GET /api/orders/[id]
Get order details with tracking info.

```typescript
// Response 200
{
  "order": {
    "id": "uuid",
    "status": "dispatched",
    "restaurant": { "id": "uuid", "name": "Chicken Republic", "address": "..." },
    "rider": { "id": "uuid", "name": "Chidi", "phone": "+234...", "current_location_lat": 6.42, "current_location_lng": 3.42 },
    "items": [...],
    "delivery_address": "...",
    "timeline": [
      { "status": "pending", "timestamp": "..." },
      { "status": "confirmed", "timestamp": "..." },
      { "status": "preparing", "timestamp": "..." },
      { "status": "dispatched", "timestamp": "..." }
    ]
  }
}
```

#### PUT /api/orders/[id]/status
Update order status (restaurant/admin).

```typescript
// Request
{ "status": "confirmed" | "preparing" | "dispatched" | "delivered" | "cancelled" }

// Response 200
{ "order": { "id": "uuid", "status": "confirmed", ... } }
```

### Reviews

#### POST /api/reviews
Submit a review after order delivery.

```typescript
// Request
{ "order_id": "uuid", "rating": 5, "comment": "Great food!" }

// Response 201
{ "review": { "id": "uuid", "rating": 5, ... } }
```

### Admin

#### GET /api/admin/orders
Get all orders (admin only).

```typescript
// Query params: ?status=pending&page=1&limit=20

// Response 200
{
  "orders": [...],
  "total": 150,
  "page": 1,
  "totalPages": 8
}
```

#### POST /api/admin/riders
Add a new rider.

```typescript
// Request
{ "user_id": "uuid", "name": "Chidi Okonkwo", "phone": "+234...", "vehicle_type": "motorcycle" }

// Response 201
{ "rider": { "id": "uuid", ... } }
```

---

## 4. Flutterwave Integration

### Payment Flow

1. Customer completes checkout → Order created with `payment_status: 'pending'`
2. Frontend calls Flutterwave to get payment page URL
3. Customer completes payment on Flutterwave
4. Flutterwave redirects back with status
5. Flutterwave sends webhook to our endpoint
6. We update `payment_status` to `'paid'` and trigger rider dispatch

### Create Payment Session

```typescript
// lib/flutterwave.ts
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY!
const FLUTTERWAVE_PUBLIC_KEY = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY!

interface CreatePaymentParams {
  amount: number
  currency: string
  txRef: string
  customerEmail: string
  customerPhone: string
  customerName: string
  redirectUrl: string
  meta: {
    orderId: string
    customerId: string
  }
}

export async function createFlutterwavePayment(params: CreatePaymentParams) {
  const response = await fetch('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency, // "NGN"
      tx_ref: params.txRef,
      customer: {
        email: params.customerEmail,
        phone_number: params.customerPhone,
        name: params.customerName
      },
      redirect_url: params.redirectUrl,
      meta: params.meta,
      payment_options: 'card,ussd,transfer,voucher',
      customization: {
        title: 'QuickBite Food Delivery',
        description: 'Food order payment'
      }
    })
  })
  
  return response.json()
}
```

### Payment Page Component (Frontend)

```tsx
// components/FlutterwavePayment.tsx
'use client'
import { loadFlutterwave } from 'flutterwave-typescript'

interface Props {
  amount: number
  txRef: string
  email: string
  phone: string
  name: string
  orderId: string
  onSuccess: () => void
  onClose: () => void
}

export default function FlutterwavePayment({
  amount, txRef, email, phone, name, orderId, onSuccess, onClose
}: Props) {
  const handlePayment = () => {
    loadFlutterwave({
      tx_ref: txRef,
      amount,
      currency: 'NGN',
      payment_options: 'card,ussd,transfer,voucher',
      customer: { email, phone, name },
      customizations: {
        title: 'QuickBite',
        description: 'Food order payment',
        logo: '/logo.png'
      },
      callback: (response) => {
        if (response.status === 'successful') {
          onSuccess()
        }
      },
      onclose: onClose
    })
  }
  
  return <button onClick={handlePayment}>Pay ₦{amount.toLocaleString()}</button>
}
```

### Webhook Handler

```typescript
// app/api/webhooks/flutterwave/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const FLUTTERWAVE_WEBHOOK_SECRET = process.env.FLUTTERWAVE_WEBHOOK_SECRET!

// Verify Flutterwave signature
function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac('sha256', FLUTTERWAVE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')
  return hash === signature
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('flutterwave-webhook-signature') || ''
  
  if (!verifySignature(body, signature)) {
    console.log('[Webhook] Invalid signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  
  const payload = JSON.parse(body)
  const { event, data } = payload
  
  console.log(`[Webhook] Event: ${event}, TxRef: ${data.tx_ref}`)
  
  if (event === 'charge.completed' || event === 'transfer.completed') {
    if (data.status === 'successful') {
      const txRef = data.tx_ref
      
      // Update order payment status
      const { error } = await supabase
        .from('orders')
        .update({ 
          payment_status: 'paid',
          confirmed_at: new Date().toISOString()
        })
        .eq('flutterwave_tx_ref', txRef)
      
      if (error) {
        console.log('[Webhook] Error updating order:', error)
        return NextResponse.json({ error: 'DB error' }, { status: 500 })
      }
      
      console.log(`[Webhook] Payment confirmed for ${txRef}`)
      
      // Trigger rider dispatch via Edge Function
      // This is handled by a separate process or queue
    }
  }
  
  if (event === 'charge.failed' || event === 'transfer.failed') {
    await supabase
      .from('orders')
      .update({ payment_status: 'failed' })
      .eq('flutterwave_tx_ref', data.tx_ref)
    
    console.log(`[Webhook] Payment failed for ${data.tx_ref}`)
  }
  
  return NextResponse.json({ received: true })
}
```

---

## 5. Folder Structure

```
quickbite/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── otp/
│   │       └── page.tsx
│   ├── (customer)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Home (restaurant list)
│   │   ├── restaurants/
│   │   │   ├── page.tsx                # Restaurant search
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Restaurant detail + menu
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx                # Order history
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Order tracking
│   │   └── profile/
│   │       └── page.tsx
│   ├── (restaurant)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Restaurant dashboard
│   │   ├── menu/
│   │   │   ├── page.tsx                # Menu management
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   └── orders/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── restaurants/
│   │   │   └── page.tsx
│   │   ├── riders/
│   │   │   └── page.tsx
│   │   └── orders/
│   │       └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── otp-request/
│   │   │   │   └── route.ts
│   │   │   └── otp-verify/
│   │   │       └── route.ts
│   │   ├── restaurants/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── menu/
│   │   │           └── route.ts
│   │   ├── orders/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       └── status/
│   │   │           └── route.ts
│   │   ├── reviews/
│   │   │   └── route.ts
│   │   ├── admin/
│   │   │   ├── orders/
│   │   │   │   └── route.ts
│   │   │   └── riders/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── flutterwave/
│   │           └── route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── restaurants/
│   │   ├── RestaurantCard.tsx
│   │   ├── RestaurantList.tsx
│   │   └── MenuItem.tsx
│   ├── cart/
│   │   ├── CartButton.tsx
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   ├── orders/
│   │   ├── OrderStatusBadge.tsx
│   │   ├── OrderTimeline.tsx
│   │   └── MapTracker.tsx
│   └── maps/
│       ├── LeafletMap.tsx
│       └── RiderMarker.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── flutterwave.ts
│   ├── auth.ts
│   ├── utils.ts
│   └── constants.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useRestaurants.ts
│   └── useOrders.ts
├── types/
│   └── index.ts
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   └── placeholder/
│   └── icons/
├── .env.local
├── .env.example
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── seed.sql
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── README.md
```

### Key Architectural Decisions

- **Route Groups `(auth)`, `(customer)`, etc.** for layout sharing without URL impact
- **Server Components** by default in App Router; Client Components only where needed (`'use client'`)
- **API Routes** as Route Handlers in `app/api/` using native `Request`/`Response`
- **Supabase client** instantiated per-request on server, reused on client
- **Edge Functions** for webhook handlers (lower latency, better for high-frequency endpoints)

---

## 6. Rider Dispatch Logic

### Algorithm Overview

When an order is confirmed (payment received):

1. Query all available riders within a radius
2. Calculate distance from each rider to the restaurant
3. Sort by distance, assign nearest rider
4. Update order with rider_id, set status to `confirmed`

### Edge Function Implementation

```typescript
// supabase/functions/dispatch-rider/index.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

interface Rider {
  id: string
  user_id: string
  current_location_lat: number
  current_location_lng: number
  vehicle_type: string
}

interface Restaurant {
  location_lat: number
  location_lng: number
}

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

Deno.serve(async (request) => {
  const { order_id } = await request.json()
  
  // Get order with restaurant location
  const { data: order } = await supabase
    .from('orders')
    .select('*, restaurants!inner(location_lat, location_lng)')
    .eq('id', order_id)
    .single()
  
  if (!order) {
    return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 })
  }
  
  const restaurant: Restaurant = order.restaurants
  const MAX_RADIUS_KM = 15 // Search radius for riders
  
  // Get available riders
  const { data: riders } = await supabase
    .from('riders')
    .select('*')
    .eq('is_available', true)
    .not('current_location_lat', 'is', null)
    .not('current_location_lng', 'is', null)
  
  if (!riders || riders.length === 0) {
    console.log(`[Dispatch] No available riders for order ${order_id}`)
    return new Response(JSON.stringify({ error: 'No riders available' }), { status: 404 })
  }
  
  // Filter and sort by distance to restaurant
  const eligibleRiders: Array<{ rider: Rider; distance: number }> = riders
    .map((rider: Rider) => ({
      rider,
      distance: haversineDistance(
        restaurant.location_lat,
        restaurant.location_lng,
        rider.current_location_lat,
        rider.current_location_lng
      )
    }))
    .filter(r => r.distance <= MAX_RADIUS_KM)
    .sort((a, b) => a.distance - b.distance)
  
  if (eligibleRiders.length === 0) {
    console.log(`[Dispatch] No riders within ${MAX_RADIUS_KM}km for order ${order_id}`)
    return new Response(JSON.stringify({ error: 'No riders in range' }), { status: 404 })
  }
  
  // Assign nearest rider
  const assignedRider = eligibleRiders[0].rider
  
  const { error: updateError } = await supabase
    .from('orders')
    .update({ 
      rider_id: assignedRider.user_id,
      status: 'confirmed',
      confirmed_at: new Date().toISOString()
    })
    .eq('id', order_id)
  
  if (updateError) {
    console.log(`[Dispatch] Failed to assign rider:`, updateError)
    return new Response(JSON.stringify({ error: 'Failed to assign rider' }), { status: 500 })
  }
  
  // Mark rider as unavailable
  await supabase
    .from('riders')
    .update({ is_available: false })
    .eq('id', assignedRider.id)
  
  console.log(`[Dispatch] Order ${order_id} assigned to rider ${assignedRider.user_id} (${eligibleRiders[0].distance.toFixed(2)}km)`)
  
  return new Response(JSON.stringify({ 
    success: true, 
    rider_id: assignedRider.user_id,
    distance_km: eligibleRiders[0].distance
  }))
})
```

### SQL Trigger (Alternative Simpler Approach)

For a simpler MVP without Edge Functions, use a PostgreSQL function triggered on order update:

```sql
-- Function to auto-assign rider on order confirmation
CREATE OR REPLACE FUNCTION assign_nearest_rider()
RETURNS TRIGGER AS $$
DECLARE
  assigned_rider_id UUID;
  restaurant_lat DECIMAL;
  restaurant_lng DECIMAL;
  min_distance_km DECIMAL := 999;
  rider_distance_km DECIMAL;
BEGIN
  -- Only trigger on status change to 'confirmed'
  IF NEW.status = 'confirmed' AND OLD.status = 'pending' THEN
    -- Get restaurant location
    SELECT location_lat, location_lng INTO restaurant_lat, restaurant_lng
    FROM restaurants WHERE id = NEW.restaurant_id;
    
    -- Find nearest available rider (within 15km)
    SELECT id, 
           (6371 * acos(cos(radians(restaurant_lat)) * cos(radians(current_location_lat)) 
            * cos(radians(current_location_lng) - radians(restaurant_lng)) + sin(radians(restaurant_lat)) 
            * sin(radians(current_location_lat)))) AS distance_km
    INTO assigned_rider_id, rider_distance_km
    FROM riders
    WHERE is_available = true 
      AND current_location_lat IS NOT NULL
      AND current_location_lng IS NOT NULL
    ORDER BY distance_km ASC
    LIMIT 1;
    
    IF assigned_rider_id IS NOT NULL THEN
      NEW.rider_id := assigned_rider_id;
      UPDATE riders SET is_available = false WHERE id = assigned_rider_id;
      RAISE NOTICE 'Assigned rider % to order % (distance: % km)', assigned_rider_id, NEW.id, rider_distance_km;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_assign_rider
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION assign_nearest_rider();
```

---

## Appendix: Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK-xxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK-xxxxx
FLUTTERWAVE_WEBHOOK_SECRET=xxxxx

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Appendix: Deployment Checklist

1. [ ] Create Supabase project
2. [ ] Run migrations in `supabase/migrations/`
3. [ ] Configure Supabase Auth (Phone OTP)
4. [ ] Create Flutterwave sandbox account
5. [ ] Set up Netlify with Next.js adapter
6. [ ] Configure environment variables in Netlify dashboard
7. [ ] Test webhook endpoint with Flutterwave test mode
8. [ ] Deploy Edge Function for rider dispatch
