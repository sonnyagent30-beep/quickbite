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

interface RiderStats {
  id: string
  name: string | null
  phone: string
  is_available: boolean
  total_deliveries: number
  completed_deliveries: number
  cancelled_deliveries: number
  avg_rating: number | null
  created_at: string
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
const MOCK_RIDERS: RiderStats[] = [
  {
    id: 'rider-001',
    name: 'Tunde Bakare',
    phone: '+2348011223344',
    is_available: true,
    total_deliveries: 156,
    completed_deliveries: 148,
    cancelled_deliveries: 8,
    avg_rating: 4.7,
    created_at: '2025-11-15T10:00:00Z'
  },
  {
    id: 'rider-002',
    name: 'Kemi Oladipo',
    phone: '+2348099887766',
    is_available: true,
    total_deliveries: 203,
    completed_deliveries: 195,
    cancelled_deliveries: 8,
    avg_rating: 4.9,
    created_at: '2025-09-20T10:00:00Z'
  },
  {
    id: 'rider-003',
    name: 'Segun Adebayo',
    phone: '+2348055667788',
    is_available: false,
    total_deliveries: 89,
    completed_deliveries: 82,
    cancelled_deliveries: 7,
    avg_rating: 4.5,
    created_at: '2026-01-10T10:00:00Z'
  },
  {
    id: 'rider-004',
    name: 'Blessing Eze',
    phone: '+2348090001111',
    is_available: true,
    total_deliveries: 45,
    completed_deliveries: 43,
    cancelled_deliveries: 2,
    avg_rating: 4.6,
    created_at: '2026-03-05T10:00:00Z'
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
    const available = searchParams.get('available')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    // Try to fetch riders with computed stats
    let query = supabase
      .from('riders')
      .select(`
        id, name, phone, is_available, created_at
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (available === 'true') {
      query = query.eq('is_available', true)
    }

    const { data: riders, error } = await query

    if (error) {
      console.error('[AdminRiders] Query error:', error)
      // Fallback to mock data
      return NextResponse.json({
        riders: available === 'true' ? MOCK_RIDERS.filter(r => r.is_available) : MOCK_RIDERS,
        total: MOCK_RIDERS.length,
        page,
        totalPages: 1,
        source: 'mock'
      })
    }

    // Calculate stats for each rider from orders
    const ridersWithStats = await Promise.all(
      (riders || []).map(async (rider) => {
        // Get order stats for this rider
        const { count: totalDeliveries } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('rider_id', rider.id)

        const { count: completedDeliveries } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('rider_id', rider.id)
          .eq('status', 'delivered')

        const { count: cancelledDeliveries } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('rider_id', rider.id)
          .eq('status', 'cancelled')

        // Get average rating from reviews
        const { data: ratingData } = await supabase
          .from('reviews')
          .select('rating')
          .eq('rider_id', rider.id)

        const avgRating = ratingData && ratingData.length > 0
          ? ratingData.reduce((sum, r) => sum + r.rating, 0) / ratingData.length
          : null

        return {
          ...rider,
          total_deliveries: totalDeliveries || 0,
          completed_deliveries: completedDeliveries || 0,
          cancelled_deliveries: cancelledDeliveries || 0,
          avg_rating: avgRating ? Math.round(avgRating * 10) / 10 : null
        }
      })
    )

    return NextResponse.json({
      riders: ridersWithStats,
      total: riders?.length || 0,
      page,
      totalPages: 1,
      source: 'db'
    })
  } catch (error) {
    console.error('[AdminRiders] Error:', error)
    return NextResponse.json({ riders: MOCK_RIDERS, total: MOCK_RIDERS.length, source: 'mock' })
  }
}