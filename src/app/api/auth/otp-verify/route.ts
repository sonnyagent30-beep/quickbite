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
  name?: string
  exp: number
}

export async function POST(request: Request) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 })
    }

    // Verify OTP
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_tokens')
      .select('*')
      .eq('phone', phone)
      .eq('token', otp)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .single()

    if (!otpRecord || otpError) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 })
    }

    // Mark OTP as used
    await supabase
      .from('otp_tokens')
      .update({ used: true })
      .eq('id', otpRecord.id)

    // Create or get user
    let { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('phone', phone)
      .single()

    if (!user) {
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({ phone, role: 'customer' })
        .select()
        .single()
      
      if (createError) {
        console.error('[OTP Verify] User creation error:', createError)
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
      }
      user = newUser
    }

    // Create custom JWT token
    const payload: UserPayload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 // 7 days
    }

    const token = Buffer.from(JSON.stringify(payload)).toString('base64')

    return NextResponse.json({
      access_token: token,
      user: { 
        id: user.id, 
        phone: user.phone, 
        role: user.role, 
        name: user.name 
      }
    })
  } catch (error) {
    console.error('[OTP Verify] Error:', error)
    return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
  }
}