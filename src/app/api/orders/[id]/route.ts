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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get order with restaurant and rider info
    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        restaurant:restaurants(id, name, address, image_url, phone),
        rider:riders(id, name, phone, current_location_lat, current_location_lng, vehicle_type)
      `)
      .eq('id', id)
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Check authorization - user must be customer, restaurant owner, or rider
    const isCustomer = order.customer_id === user.sub
    const isRestaurantOwner = false // Would need to check restaurant ownership
    const isRider = order.rider_id && order.rider_id.includes(user.sub) // Simplified check

    if (!isCustomer && !isRestaurantOwner && !isRider && user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get order items
    const { data: orderItems } = await supabase
      .from('order_items')
      .select(`
        id, quantity, unit_price, subtotal, notes,
        menu_item:menu_items(id, name, image_url)
      `)
      .eq('order_id', id)

    // Build timeline
    const timeline = [
      { status: 'pending', timestamp: order.created_at },
    ]
    
    if (order.confirmed_at) {
      timeline.push({ status: 'confirmed', timestamp: order.confirmed_at })
    }
    if (order.preparing_at) {
      timeline.push({ status: 'preparing', timestamp: order.preparing_at })
    }
    if (order.dispatched_at) {
      timeline.push({ status: 'dispatched', timestamp: order.dispatched_at })
    }
    if (order.delivered_at) {
      timeline.push({ status: 'delivered', timestamp: order.delivered_at })
    }
    if (order.cancelled_at) {
      timeline.push({ status: 'cancelled', timestamp: order.cancelled_at })
    }

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        subtotal: order.subtotal,
        delivery_fee: order.delivery_fee,
        total: order.total,
        delivery_address: order.delivery_address,
        delivery_lat: order.delivery_lat,
        delivery_lng: order.delivery_lng,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        flutterwave_tx_ref: order.flutterwave_tx_ref,
        notes: order.notes,
        created_at: order.created_at,
        restaurant: order.restaurant,
        rider: order.rider,
        items: orderItems || [],
        timeline
      }
    })
  } catch (error) {
    console.error('[Order Detail] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}