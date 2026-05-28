import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const FLUTTERWAVE_WEBHOOK_SECRET = process.env.FLUTTERWAVE_WEBHOOK_SECRET || ''

// Verify Flutterwave webhook signature
function verifySignature(body: string, signature: string): boolean {
  if (!FLUTTERWAVE_WEBHOOK_SECRET) {
    console.warn('[Webhook] FLUTTERWAVE_WEBHOOK_SECRET not set, skipping verification')
    return true
  }
  const hash = crypto
    .createHmac('sha256', FLUTTERWAVE_WEBHOOK_SECRET)
    .update(body)
    .digest('hex')
  return hash === signature
}

interface FlutterwaveWebhookPayload {
  event: string
  data: {
    id: number
    tx_ref: string
    amount: number
    currency: string
    status: string
    customer: {
      email: string
      phone: string
      name: string
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('flutterwave-webhook-signature') || ''

    // Verify signature in production
    if (process.env.NODE_ENV === 'production' && !verifySignature(body, signature)) {
      console.log('[Webhook] Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload: FlutterwaveWebhookPayload = JSON.parse(body)
    const { event, data } = payload

    console.log(`[Webhook] Event: ${event}, TxRef: ${data.tx_ref}, Status: ${data.status}`)

    // Handle successful payment
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
          console.error('[Webhook] Error updating order:', error)
          return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }

        console.log(`[Webhook] Payment confirmed for ${txRef}`)

        // TODO: Trigger rider dispatch via Edge Function or queue
        // This could send a notification to restaurant and assign a rider
      }
    }

    // Handle failed payment
    if (event === 'charge.failed' || event === 'transfer.failed') {
      await supabase
        .from('orders')
        .update({ payment_status: 'failed' })
        .eq('flutterwave_tx_ref', data.tx_ref)

      console.log(`[Webhook] Payment failed for ${data.tx_ref}`)
    }

    // Handle refund
    if (event === 'refund.processed') {
      await supabase
        .from('orders')
        .update({ payment_status: 'refunded' })
        .eq('flutterwave_tx_ref', data.tx_ref)

      console.log(`[Webhook] Refund processed for ${data.tx_ref}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}