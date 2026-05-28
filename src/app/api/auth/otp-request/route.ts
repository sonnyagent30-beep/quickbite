import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }

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
      console.error('[OTP Request] DB Error:', error)
    }

    // In production: integrate with WhatsApp Business API or Termii
    // For MVP: log to server console
    console.log(`[OTP] ${phone} -> ${otp}`)

    return NextResponse.json({ 
      message: 'OTP sent successfully', 
      attempt: 1,
      // Include OTP in response for MVP debugging - remove in production
      debug_otp: process.env.NODE_ENV === 'development' ? otp : undefined
    })
  } catch (error) {
    console.error('[OTP Request] Error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}