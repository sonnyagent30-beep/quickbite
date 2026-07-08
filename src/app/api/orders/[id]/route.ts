import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get('id')

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 })
  }

  // In production, fetch from Supabase
  return NextResponse.json({
    id: orderId,
    status: 'pending',
    estimated_delivery: '30-45 mins',
  })
}