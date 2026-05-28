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

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'

const VALID_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'dispatched', 'delivered', 'cancelled']

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

export async function PUT(
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

    const { status } = await request.json()

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ 
        error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` 
      }, { status: 400 })
    }

    // Get current order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Build update object with timestamp
    const updateData: Record<string, unknown> = { status }

    switch (status) {
      case 'confirmed':
        updateData.confirmed_at = new Date().toISOString()
        break
      case 'preparing':
        updateData.preparing_at = new Date().toISOString()
        break
      case 'dispatched':
        if (!order.rider_id) {
          return NextResponse.json({ error: 'No rider assigned to this order' }, { status: 400 })
        }
        updateData.dispatched_at = new Date().toISOString()
        break
      case 'delivered':
        updateData.delivered_at = new Date().toISOString()
        break
      case 'cancelled':
        updateData.cancelled_at = new Date().toISOString()
        break
    }

    // Update order status
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('[Order Status] Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
    }

    return NextResponse.json({
      order: {
        id: updatedOrder.id,
        status: updatedOrder.status,
        updated_at: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('[Order Status] Error:', error)
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }
}