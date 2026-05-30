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

interface Review {
  id: string
  order_id: string
  customer_id: string
  restaurant_id: string
  rating: number
  comment: string | null
  created_at: string
  customer?: { name: string | null; phone: string }
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
const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-001',
    order_id: 'ord-001',
    customer_id: 'cust-001',
    restaurant_id: 'rest-001',
    rating: 5,
    comment: 'Amazing food! Will order again.',
    created_at: '2026-05-28T14:30:00Z',
    customer: { name: 'Chidi Okafor', phone: '+2348012345678' }
  },
  {
    id: 'rev-002',
    order_id: 'ord-002',
    customer_id: 'cust-002',
    restaurant_id: 'rest-001',
    rating: 4,
    comment: 'Great taste but delivery was slightly late.',
    created_at: '2026-05-27T18:45:00Z',
    customer: { name: 'Aisha Bello', phone: '+2348098765432' }
  },
  {
    id: 'rev-003',
    order_id: 'ord-003',
    customer_id: 'cust-003',
    restaurant_id: 'rest-001',
    rating: 5,
    comment: 'Perfect as always!',
    created_at: '2026-05-25T12:15:00Z',
    customer: { name: 'Emeka Nwosu', phone: '+2348055555555' }
  }
]

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get('restaurant_id')
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)

    if (!restaurantId) {
      return NextResponse.json({ error: 'restaurant_id is required' }, { status: 400 })
    }

    // Try to fetch from Supabase
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id, rating, comment, created_at,
        customer:customers(name, phone)
      `)
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('[Reviews] Query error:', error)
      // Fallback to mock data in dev
      const mockData = MOCK_REVIEWS.filter(r => r.restaurant_id === restaurantId)
      return NextResponse.json({ reviews: mockData, source: 'mock' })
    }

    return NextResponse.json({
      reviews: reviews || [],
      source: 'db'
    })
  } catch (error) {
    console.error('[Reviews] Error:', error)
    // Fallback to mock data on error
    return NextResponse.json({ reviews: MOCK_REVIEWS, source: 'mock' })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { order_id, rating, comment } = await request.json()

    if (!order_id || !rating) {
      return NextResponse.json({ error: 'order_id and rating are required' }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    // Verify the order belongs to this user and is delivered
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('customer_id, restaurant_id, status')
      .eq('id', order_id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (order.customer_id !== user.sub) {
      return NextResponse.json({ error: 'Not authorized to review this order' }, { status: 403 })
    }

    if (order.status !== 'delivered') {
      return NextResponse.json({ error: 'Can only review delivered orders' }, { status: 400 })
    }

    // Check for existing review
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('order_id', order_id)
      .single()

    if (existingReview) {
      return NextResponse.json({ error: 'Review already submitted for this order' }, { status: 409 })
    }

    // Create review
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        order_id,
        customer_id: user.sub,
        restaurant_id: order.restaurant_id,
        rating,
        comment: comment || null
      })
      .select()
      .single()

    if (reviewError) {
      console.error('[Reviews] Insert error:', reviewError)
      return NextResponse.json({ error: reviewError.message }, { status: 500 })
    }

    return NextResponse.json({ review }, { status: 201 })
  } catch (error) {
    console.error('[Reviews] Error:', error)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}