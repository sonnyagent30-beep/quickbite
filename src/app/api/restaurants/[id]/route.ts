import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: restaurant, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .eq('is_verified', true)
    .single()

  if (error || !restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
  }

  const { data: menu } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', id)
    .eq('is_available', true)
    .order('category')

  return NextResponse.json({ restaurant, menu: menu || [] })
}