import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const RESTAURANTS: Record<string, {
  id: string
  name: string
  description: string
  cuisine_type: string
  address: string
  location_lat: number
  location_lng: number
  rating: number
  rating_count: number
  is_open: boolean
  min_order: number
  delivery_fee: number
  image_url: string
}> = {
  '1': { id: '1', name: 'Amala Spot', description: 'Authentic Nigerian soul food. Amala, ewedu, and assorted protein in a warm Buka setting.', cuisine_type: 'Nigerian', address: '12 Owolabi St, Ikeja, Lagos', location_lat: 6.5994, location_lng: 3.3419, rating: 4.7, rating_count: 234, is_open: true, min_order: 1500, delivery_fee: 500, image_url: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=800&q=80' },
  '2': { id: '2', name: 'Chicken Republic', description: 'Fast food Nigerian style. Fried chicken, chips, and peppered fish.', cuisine_type: 'American', address: '45 CMD Rd, Ikeja, Lagos', location_lat: 6.6050, location_lng: 3.3450, rating: 4.3, rating_count: 567, is_open: true, min_order: 2000, delivery_fee: 400, image_url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80' },
  '3': { id: '3', name: 'Terra Koko', description: 'Traditional Yoruba dishes made with fresh ingredients. Egusi, okra, and fresh fish.', cuisine_type: 'Yoruba', address: '78 Bahago St, Victoria Island, Lagos', location_lat: 6.4280, location_lng: 3.3900, rating: 4.8, rating_count: 189, is_open: true, min_order: 3000, delivery_fee: 800, image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80' },
  '4': { id: '4', name: 'Mr. Biggs', description: 'Nigerian fast food chain. Puff puff, burgers, and rice dishes.', cuisine_type: 'Nigerian', address: '22 Allen Ave, Ikeja, Lagos', location_lat: 6.5950, location_lng: 3.3380, rating: 4.1, rating_count: 890, is_open: false, min_order: 1000, delivery_fee: 500, image_url: 'https://images.unsplash.com/photo-1569728739636-f6d55d42d6c9?w=800&q=80' },
  '5': { id: '5', name: 'Taste of China', description: 'Chinese-Nigerian fusion. Fried rice with a local twist, chicken wings, and stir fry.', cuisine_type: 'Chinese', address: '9 Forces Rd, Victoria Island, Lagos', location_lat: 6.4320, location_lng: 3.3950, rating: 4.5, rating_count: 312, is_open: true, min_order: 4000, delivery_fee: 700, image_url: 'https://images.unsplash.com/photo-1563245372-f69e8c4d4893?w=800&q=80' },
  '6': { id: '6', name: 'The Pizza Shop', description: 'Wood-fired pizza with Nigerian toppings. Suya chicken, jollof marinara.', cuisine_type: 'Italian', address: '15 Adeola Odeku St, Victoria Island, Lagos', location_lat: 6.4370, location_lng: 3.3870, rating: 4.6, rating_count: 445, is_open: true, min_order: 5000, delivery_fee: 600, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80' },
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const restaurant = RESTAURANTS[id]
  if (!restaurant) {
    return NextResponse.json({ error: 'Restaurant not found' }, { status: 404 })
  }
  return NextResponse.json({ restaurant })
}
