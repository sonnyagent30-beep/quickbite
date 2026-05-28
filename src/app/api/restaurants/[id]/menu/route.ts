import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const RESTAURANT_MENU: Record<string, Array<{
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  is_available: boolean
}>> = {
  '1': [
    { id: 'm1', name: 'Amala with Ewedu', description: 'Smooth egusi soup with fresh locust beans and assorted', price: 1800, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', is_available: true },
    { id: 'm2', name: 'Fried Rice', description: 'Nigerian fried rice with mixed vegetables and protein', price: 2000, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm3', name: 'Assorted Pepper Soup', description: 'Goat meat and fish in spicy pepper broth', price: 2500, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', is_available: true },
    { id: 'm4', name: 'Small Chops Platter', description: 'Assorted small chops for 3 people', price: 3500, category: 'Appetizers', image_url: 'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=400&q=80', is_available: true },
    { id: 'm5', name: 'Boli and Groundnut', description: 'Roasted plantain with spicy groundnut paste', price: 800, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1600271886742-e3a5b3427b47?w=400&q=80', is_available: true },
  ],
  '2': [
    { id: 'm6', name: '2-Piece Chicken + Chips', description: 'Crispy fried chicken with seasoned fries', price: 2200, category: 'Meals', image_url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80', is_available: true },
    { id: 'm7', name: 'Burger Meal', description: 'Beef patty with lettuce, tomato and chips', price: 2800, category: 'Meals', image_url: 'https://images.unsplash.com/photo-1569726939636-f6d55d42d6c9?w=400&q=80', is_available: true },
    { id: 'm8', name: 'Peppered Fish', description: 'Grilled fish in spicy pepper sauce', price: 3000, category: 'Grill', image_url: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=400&q=80', is_available: true },
    { id: 'm9', name: 'Peppered Chicken', description: 'Deep-fried chicken in pepper sauce', price: 2500, category: 'Grill', image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80', is_available: true },
    { id: 'm10', name: 'Puff Puff', description: 'Sweet deep-fried dough balls', price: 500, category: 'Snacks', image_url: 'https://images.unsplash.com/photo-1600271886742-e3a5b3427b47?w=400&q=80', is_available: true },
  ],
  '3': [
    { id: 'm11', name: 'Egusi Soup with Fufu', description: 'Melon seed soup with puffed fufu', price: 2500, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', is_available: true },
    { id: 'm12', name: 'Jollof Rice', description: 'Party-style jollof rice with grilled chicken', price: 3000, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm13', name: 'Ogbono Soup', description: 'Draw soup with fresh fish and stockfish', price: 2800, category: 'Soups', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', is_available: true },
    { id: 'm14', name: 'Porridge Yam', description: 'Boiled yam porridge with uziza leaves', price: 2000, category: 'Meals', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
  ],
  '5': [
    { id: 'm15', name: 'Fried Rice Special', description: 'Nigerian-style fried rice with chicken', price: 2500, category: 'Rice', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80', is_available: true },
    { id: 'm16', name: 'Stir Fry Noodles', description: 'Vegetable stir fry with soy sauce', price: 2800, category: 'Noodles', image_url: 'https://images.unsplash.com/photo-1563245372-f69e8c4d4893?w=400&q=80', is_available: true },
    { id: 'm17', name: 'Suya Chicken', description: 'Spicy grilled chicken suya style', price: 2200, category: 'Grill', image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80', is_available: true },
  ],
  '6': [
    { id: 'm18', name: 'Suya Pizza', description: 'Wood-fired pizza with suya chicken toppings', price: 5500, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', is_available: true },
    { id: 'm19', name: 'Jollof Marinara', description: 'Nigerian jollof tomato base pizza', price: 4800, category: 'Pizza', image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', is_available: true },
    { id: 'm20', name: 'Garlic Pizza Bread', description: 'Crusty bread with garlic butter', price: 2000, category: 'Sides', image_url: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306e?w=400&q=80', is_available: true },
  ],
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const menu = RESTAURANT_MENU[id] || []
  const categories = [...new Set(menu.map(item => item.category))]
  return NextResponse.json({ menu, categories })
}
