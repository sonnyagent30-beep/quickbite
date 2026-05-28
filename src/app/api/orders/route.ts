import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface UserPayload {
  sub: string
  phone: string
  role: string
}

interface OrderItem {
  menu_item_id: string
  quantity: number
  notes?: string
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

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = (page - 1) * limit

    let query = supabase
      .from('orders')
      .select(`
        id, status, subtotal, delivery_fee, total, payment_method, payment_status,
        delivery_address, created_at,
        restaurant:restaurants(id, name, image_url)
      `)
      .eq('customer_id', user.sub)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('[Orders] Query error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Get total count
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('customer_id', user.sub)

    return NextResponse.json({
      orders: orders || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error) {
    console.error('[Orders] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization')
    const user = decodeAuthToken(authHeader)

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { restaurant_id, items, delivery_address, delivery_lat, delivery_lng, payment_method, notes } = await request.json()

    if (!restaurant_id || !items || !delivery_address || !payment_method) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get restaurant info
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('delivery_fee, min_order, name')
      .eq('id', restaurant_id)
      .single()

    if (restaurantError || !restaurant) {
      return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
    }

    // Validate items
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Order must have at least one item' }, { status: 400 })
    }

    // Get menu items and calculate totals
    const itemIds = items.map((item: OrderItem) => item.menu_item_id)
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('id, name, price, is_available')
      .in('id', itemIds)

    if (menuError) {
      console.error('[Orders] Menu items error:', menuError)
      return NextResponse.json({ error: 'Failed to fetch menu items' }, { status: 500 })
    }

    const menuMap = new Map(menuItems.map(item => [item.id, item]))

    // Check for unavailable items
    const unavailableItems = items.filter((item: OrderItem) => {
      const menuItem = menuMap.get(item.menu_item_id)
      return !menuItem || !menuItem.is_available
    })

    if (unavailableItems.length > 0) {
      return NextResponse.json({ 
        error: 'Some items are unavailable' 
      }, { status: 400 })
    }

    let subtotal = 0
    const orderItems: Array<{
      menu_item_id: string
      quantity: number
      unit_price: number
      subtotal: number
      notes: string | null
    }> = items.map((item: OrderItem) => {
      const menuItem = menuMap.get(item.menu_item_id)
      if (!menuItem) {
        throw new Error(`Menu item ${item.menu_item_id} not found`)
      }
      const itemSubtotal = Number(menuItem.price) * item.quantity
      subtotal += itemSubtotal
      return {
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        unit_price: menuItem.price,
        subtotal: itemSubtotal,
        notes: item.notes || null
      }
    })

    // Check minimum order
    if (subtotal < Number(restaurant.min_order)) {
      return NextResponse.json({ 
        error: `Minimum order is ₦${Number(restaurant.min_order).toLocaleString()}` 
      }, { status: 400 })
    }

    const delivery_fee = Number(restaurant.delivery_fee)
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
        delivery_lat: delivery_lat || null,
        delivery_lng: delivery_lng || null,
        payment_method,
        payment_status: 'pending',
        flutterwave_tx_ref: txRef,
        notes: notes || null
      })
      .select()
      .single()

    if (orderError) {
      console.error('[Orders] Create error:', orderError)
      return NextResponse.json({ error: orderError.message }, { status: 500 })
    }

    // Insert order items
    const orderItemsWithId = orderItems.map(item => ({
      ...item,
      order_id: order.id
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItemsWithId)

    if (itemsError) {
      console.error('[Orders] Items insert error:', itemsError)
      // Rollback order
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 })
    }

    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        subtotal: order.subtotal,
        delivery_fee: order.delivery_fee,
        total: order.total,
        flutterwave_tx_ref: txRef,
        restaurant_name: restaurant.name
      }
    }, { status: 201 })
  } catch (error) {
    console.error('[Orders] Error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}