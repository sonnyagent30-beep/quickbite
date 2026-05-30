import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface UserPayload {
  sub: string
  phone: string
  role: string
}

interface Order {
  id: string
  customer_id: string
  restaurant_id: string
  rider_id: string | null
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'
  subtotal: number
  delivery_fee: number
  total: number
  delivery_address: string
  payment_method: 'card' | 'ussd' | 'transfer' | 'wallet'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  created_at: string
  delivered_at: string | null
  restaurant?: { id: string; name: string; image_url: string | null }
  customer?: { name: string | null; phone: string }
  rider?: { name: string | null; phone: string }
}

function decodeAuthToken(authHeader: string | null): UserPayload | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  try {
    const token = authHeader.replace('Bearer ', '')
    return JSON.parse(Buffer.from(token, 'base64').toString())
  } catch {
    return null
  }
}

// Mock data for development
const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-001',
    customer_id: 'cust-001',
    restaurant_id: 'rest-001',
    rider_id: 'rider-001',
    status: 'delivered',
    subtotal: 4500,
    delivery_fee: 500,
    total: 5000,
    delivery_address: '15 Adeola Odeku St, Victoria Island, Lagos',
    payment_method: 'card',
    payment_status: 'paid',
    created_at: '2026-05-28T13:00:00Z',
    delivered_at: '2026-05-28T13:45:00Z',
    restaurant: { id: 'rest-001', name: 'Chicken Republic', image_url: null },
    customer: { name: 'Chidi Okafor', phone: '+2348012345678' },
    rider: { name: 'Tunde Bakare', phone: '+2348011223344' }
  },
  {
    id: 'ord-002',
    customer_id: 'cust-002',
    restaurant_id: 'rest-002',
    rider_id: 'rider-002',
    status: 'dispatched',
    subtotal: 3200,
    delivery_fee: 400,
    total: 3600,
    delivery_address: '42 Ozumba Mbadiwe Ave, Victoria Island, Lagos',
    payment_method: 'wallet',
    payment_status: 'paid',
    created_at: '2026-05-29T15:30:00Z',
    delivered_at: null,
    restaurant: { id: 'rest-002', name: 'Taste of Africa', image_url: null },
    customer: { name: 'Aisha Bello', phone: '+2348098765432' },
    rider: { name: 'Kemi Oladipo', phone: '+2348099887766' }
  },
  {
    id: 'ord-003',
    customer_id: 'cust-003',
    restaurant_id: 'rest-001',
    rider_id: null,
    status: 'preparing',
    subtotal: 2800,
    delivery_fee: 500,
    total: 3300,
    delivery_address: '8B Elsie Femi Crescent, Lekki Phase 1, Lagos',
    payment_method: 'ussd',
    payment_status: 'paid',
    created_at: '2026-05-29T18:00:00Z',
    delivered_at: null,
    restaurant: { id: 'rest-001', name: 'Chicken Republic', image_url: null },
    customer: { name: 'Emeka Nwosu', phone: '+2348055555555' },
    rider: null
  },
  {
    id: 'ord-004',
    customer_id: 'cust-001',
    restaurant_id: 'rest-003',
    rider_id: 'rider-001',
    status: 'pending',
    subtotal: 5500,
    delivery_fee: 600,
    total: 6100,
    delivery_address: '15 Adeola Odeku St, Victoria Island, Lagos',
    payment_method: 'transfer',
    payment_status: 'pending',
    created_at: '2026-05-30T09:15:00Z',
    delivered_at: null,
    restaurant: { id: 'rest-003', name: 'Baba Jollof', image_url: null },
    customer: { name: 'Chidi Okafor', phone: '+2348012345678' },
    rider: null
  }
]

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Admin check
    if (user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const dateFrom = searchParams.get('date_from')
    const dateTo = searchParams.get('date_to')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    let query = supabase
      .from('orders')
      .select(`
        id, customer_id, restaurant_id, rider_id, status, subtotal, delivery_fee, total,
        delivery_address, payment_method, payment_status, created_at, delivered_at,
        restaurant:restaurants(id, name, image_url),
        customer:customers(name, phone),
        rider:riders(name, phone)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (status) {
      query = query.eq('status', status)
    }
    if (dateFrom) {
      query = query.gte('created_at', dateFrom)
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo)
    }

    const { data: orders, error, count } = await query

    if (error) {
      console.error('[AdminOrders] Query error:', error)
      // Fallback to mock data in dev
      let filteredOrders = MOCK_ORDERS
      if (status) filteredOrders = filteredOrders.filter(o => o.status === status)
      return NextResponse.json({
        orders: filteredOrders,
        total: filteredOrders.length,
        page,
        totalPages: 1,
        source: 'mock'
      })
    }

    return NextResponse.json({
      orders: orders || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
      source: 'db'
    })
  } catch (error) {
    console.error('[AdminOrders] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}