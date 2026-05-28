import { NextResponse } from 'next/server'

const CATEGORIES = [
  { id: 'nigerian', name: 'Nigerian', icon: '🍛' },
  { id: 'chinese', name: 'Chinese', icon: '🥡' },
  { id: 'american', name: 'American', icon: '🍔' },
  { id: 'yoruba', name: 'Yoruba', icon: '🍲' },
  { id: 'indian', name: 'Indian', icon: '🍛' },
  { id: 'italian', name: 'Italian', icon: '🍕' },
]

const RESTAURANTS = [
  {
    id: '1',
    name: 'Amala Spot',
    description: 'Authentic Nigerian soul food. Amala, ewedu, and assorted protein in a warm Buka setting.',
    cuisine_type: 'Nigerian',
    address: '12 Owolabi St, Ikeja, Lagos',
    location_lat: 6.5994,
    location_lng: 3.3419,
    rating: 4.7,
    rating_count: 234,
    is_open: true,
    min_order: 1500,
    delivery_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=800&q=80',
    distance: 0.8,
  },
  {
    id: '2',
    name: 'Chicken Republic',
    description: 'Fast food Nigerian style. Fried chicken, chips, and peppered鱼.',
    cuisine_type: 'American',
    address: '45 CMD Rd, Ikeja, Lagos',
    location_lat: 6.6050,
    location_lng: 3.3450,
    rating: 4.3,
    rating_count: 567,
    is_open: true,
    min_order: 2000,
    delivery_fee: 400,
    image_url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&q=80',
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Terra Koko',
    description: 'Traditional Yoruba dishes made with fresh ingredients. Egusi, okra, and fresh fish.',
    cuisine_type: 'Yoruba',
    address: '78 Bahago St, Victoria Island, Lagos',
    location_lat: 6.4280,
    location_lng: 3.3900,
    rating: 4.8,
    rating_count: 189,
    is_open: true,
    min_order: 3000,
    delivery_fee: 800,
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80',
    distance: 2.5,
  },
  {
    id: '4',
    name: 'Mr. Biggs',
    description: 'Nigerian fast food chain. Puff puff, burgers, and rice dishes.',
    cuisine_type: 'Nigerian',
    address: '22 Allen Ave, Ikeja, Lagos',
    location_lat: 6.5950,
    location_lng: 3.3380,
    rating: 4.1,
    rating_count: 890,
    is_open: false,
    min_order: 1000,
    delivery_fee: 500,
    image_url: 'https://images.unsplash.com/photo-1561758033-d89a1702d1fd?w=800&q=80',
    distance: 1.8,
  },
  {
    id: '5',
    name: 'Taste of China',
    description: 'Chinese-Nigerian fusion. Fried rice with a local twist, chicken wings, and stir fry.',
    cuisine_type: 'Chinese',
    address: '9 Forces Rd, Victoria Island, Lagos',
    location_lat: 6.4320,
    location_lng: 3.3950,
    rating: 4.5,
    rating_count: 312,
    is_open: true,
    min_order: 4000,
    delivery_fee: 700,
    image_url: 'https://images.unsplash.com/photo-1563245372-f69e8c4d4893?w=800&q=80',
    distance: 3.1,
  },
  {
    id: '6',
    name: 'The Pizza Shop',
    description: 'Wood-fired pizza with Nigerian toppings. Suya chicken, jollof marinara.',
    cuisine_type: 'Italian',
    address: '15 Adeola Odeku St, Victoria Island, Lagos',
    location_lat: 6.4370,
    location_lng: 3.3870,
    rating: 4.6,
    rating_count: 445,
    is_open: true,
    min_order: 5000,
    delivery_fee: 600,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    distance: 2.8
  },
]

const MENUS: Record<string, Array<{
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  is_available: boolean
}>> = {
  '1': [
    { id: 'm1', name: 'Amala with Ewedu', description: 'Smooth egusi soup with fresh locust beans and assorted', price: 1800, category: 'Main', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', is_available: true },
    { id: 'm2', name: 'Fried Rice', description: 'Nigerian fried rice with mixed vegetables and protein', price: 2000, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm3', name: 'Assorted Pepper Soup', description: 'Goat meat and fish in spicy pepper broth', price: 2500, category: 'Soup', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', is_available: true },
    { id: 'm4', name: 'Small Chops', description: 'Assorted small chops platter for 3', price: 3500, category: 'Appetizer', image_url: 'https://images.unsplash.com/photo-156履 4671165093-20688ff1fffa?w=400&q=80', is_available: true },
  ],
  '2': [
    { id: 'm5', name: '2-Piece Chicken + Chips', description: 'Crispy fried chicken with seasoned fries', price: 2200, category: 'Main', image_url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80', is_available: true },
    { id: 'm6', name: 'Burger Meal', description: 'Beef patty with lettuce, tomato and chips', price: 2800, category: 'Main', image_url: 'https://images.unsplash.com/photo-1569726939636-f6d55d42d6c9?w=400&q=80', is_available: true },
    { id: 'm7', name: 'Peppered Fish', description: 'Grilled fish in spicy pepper sauce', price: 3000, category: 'Main', image_url: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80', is_available: true },
    { id: 'm8', name: 'Puff Puff', description: 'Sweet deep-fried dough balls', price: 500, category: 'Snack', image_url: 'https://images.unsplash.com/photo-1600271886742-e3a5b3427b47?w=400&q=80', is_available: true },
  ],
  '3': [
    { id: 'm9', name: 'Egusi Soup with Fufu', description: 'Melon seed soup with puffed fufu', price: 2500, category: 'Soup', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', is_available: true },
    { id: 'm10', name: 'Jollof Rice', description: 'Party-style jollof rice with grilled chicken', price: 3000, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm11', name: 'Ogbono Soup', description: 'Draw soup with fresh fish and stockfish', price: 2800, category: 'Soup', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', is_available: true },
  ],
  '4': [
    { id: 'm12', name: 'Rice and Stew', description: 'Nigerian rice with tomato stew and chicken', price: 1800, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm13', name: 'Swallow Combo', description: 'Semovita, egusi soup and assorted', price: 2200, category: 'Main', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', is_available: true },
  ],
  '5': [
    { id: 'm14', name: 'Fried Rice Special', description: 'Nigerian-style fried rice with chicken', price: 2500, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm15', name: 'Stir Fry Noodles', description: ' Vegetable stir fry with soy sauce', price: 2800, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1563245372-f69e8c4d4893?w=400&q=80', is_available: true },
    { id: 'm16', name: 'Suya Chicken', description: 'Spicy grilled chicken suya style', price: 2200, category: 'Grill', image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80', is_available: true },
  ],
  '6': [
    { id: 'm17', name: 'Suya Pizza', description: 'Wood-fired pizza with suya chicken toppings', price: 5500, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', is_available: true },
    { id: 'm18', name: 'Jollof Marinara', description: 'Nigerian jollof tomato base pizza', price: 4800, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', is_available: true },
    { id: 'm19', name: 'Garlic Pizza Bread', description: 'Crusty bread with garlic butter', price: 2000, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306e?w=400&q=80', is_available: true },
  ],
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat') || '6.5994')
  const lng = parseFloat(searchParams.get('lng') || '3.3419')
  const cuisine = searchParams.get('cuisine')
  const openOnly = searchParams.get('open') === 'true'
  const category = searchParams.get('category')

  if (searchParams.get('categories') !== null) {
    return NextResponse.json({ categories: CATEGORIES })
  }

  let results = [...RESTAURANTS]

  if (cuisine && cuisine !== 'All') {
    results = results.filter(r => r.cuisine_type === cuisine)
  }

  if (openOnly) {
    results = results.filter(r => r.is_open)
  }

  return NextResponse.json({ restaurants: results, count: results.length })
}
