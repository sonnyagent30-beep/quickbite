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

interface RestaurantAdmin {
  id: string
  name: string
  description: string
  cuisine_type: string
  address: string
  is_open: boolean
  rating: number
  min_order: number
  delivery_fee: number
  image_url: string | null
  owner_id: string
  created_at: string
  owner?: { name: string | null; phone: string }
  stats?: {
    total_orders: number
    total_revenue: number
    avg_rating: number | null
    reviews_count: number
  }
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
const MOCK_RESTAURANTS: RestaurantAdmin[] = [
  {
    id: 'rest-001',
    name: 'Chicken Republic',
    description: 'Fast food chain specializing in fried chicken and Nigerian staples',
    cuisine_type: 'Fast Food',
    address: '15 Admiralty Way, Lekki Phase 1, Lagos',
    is_open: true,
    rating: 4.5,
    min_order: 2000,
    delivery_fee: 500,
    image_url: null,
    owner_id: 'owner-001',
    created_at: '2025-06-01T10:00:00Z',
    owner: { name: 'Ebere Okonkwo', phone: '+2348022334455' },
    stats: { total_orders: 1247, total_revenue: 45670000, avg_rating: 4.3, reviews_count: 89 }
  },
  {
    id: 'rest-002',
    name: 'Taste of Africa',
    description: 'Authentic Nigerian cuisine with a modern twist',
    cuisine_type: 'Nigerian',
    address: '42 Ozumba Mbadiwe Ave, Victoria Island, Lagos',
    is_open: true,
    rating: 4.7,
    min_order: 3000,
    delivery_fee: 400,
    image_url: null,
    owner_id: 'owner-002',
    created_at: '2025-08-15T10:00:00Z',
    owner: { name: 'Folake Adeyemi', phone: '+2348033445566' },
    stats: { total_orders: 892, total_revenue: 38750000, avg_rating: 4.6, reviews_count: 67 }
  },
  {
    id: 'rest-003',
    name: 'Baba Jollof',
    description: 'The king of jollof rice and party supplies',
    cuisine_type: 'Nigerian',
    address: '78 Awolowo Road, Ikoyi, Lagos',
    is_open: false,
    rating: 4.2,
    min_order: 2500,
    delivery_fee: 600,
    image_url: null,
    owner_id: 'owner-003',
    created_at: '2025-10-20T10:00:00Z',
    owner: { name: 'Kolade Balogun', phone: '+2348044556677' },
    stats: { total_orders: 456, total_revenue: 19820000, avg_rating: 4.1, reviews_count: 34 }
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
    const isOpen = searchParams.get('is_open')
    const cuisine = searchParams.get('cuisine')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    let query = supabase
      .from('restaurants')
      .select(`
        id, name, description, cuisine_type, address, is_open, rating,
        min_order, delivery_fee, image_url, owner_id, created_at,
        owner:users(name, phone)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Apply filters
    if (isOpen === 'true') {
      query = query.eq('is_open', true)
    } else if (isOpen === 'false') {
      query = query.eq('is_open', false)
    }
    if (cuisine) {
      query = query.eq('cuisine_type', cuisine)
    }

    const { data: restaurants, error, count } = await query

    if (error) {
      console.error('[AdminRestaurants] Query error:', error)
      // Fallback to mock data
      return NextResponse.json({
        restaurants: MOCK_RESTAURANTS,
        total: MOCK_RESTAURANTS.length,
        page,
        totalPages: 1,
        source: 'mock'
      })
    }

    // Get stats for each restaurant
    const restaurantsWithStats = await Promise.all(
      (restaurants || []).map(async (restaurant) => {
        // Get order stats
        const { count: totalOrders } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('restaurant_id', restaurant.id)

        const { data: revenueData } = await supabase
          .from('orders')
          .select('total')
          .eq('restaurant_id', restaurant.id)
          .eq('payment_status', 'paid')

        const totalRevenue = revenueData
          ? revenueData.reduce((sum, o) => sum + Number(o.total), 0)
          : 0

        // Get review stats
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select('rating')
          .eq('restaurant_id', restaurant.id)

        const reviewsCount = reviewsData?.length || 0
        const avgRating = reviewsData && reviewsData.length > 0
          ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
          : null

        return {
          ...restaurant,
          stats: {
            total_orders: totalOrders || 0,
            total_revenue: totalRevenue,
            avg_rating: avgRating ? Math.round(avgRating * 10) / 10 : null,
            reviews_count: reviewsCount
          }
        }
      })
    )

    return NextResponse.json({
      restaurants: restaurantsWithStats,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
      source: 'db'
    })
  } catch (error) {
    console.error('[AdminRestaurants] Error:', error)
    return NextResponse.json({ restaurants: MOCK_RESTAURANTS, total: MOCK_RESTAURANTS.length, source: 'mock' })
  }
}