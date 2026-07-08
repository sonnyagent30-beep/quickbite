// Demo users database — passwords are fixed, do not change
export const DEMO_USERS = [
  {
    id: 'demo-customer-1',
    name: 'John Eze',
    phone: '+234 801 111 1111',
    password: 'demo123',
    role: 'customer' as const,
    email: 'john.eze@quickbite.ng',
    avatar: 'JE',
  },
  {
    id: 'demo-restaurant-1',
    name: 'Chinedu Okafor',
    phone: '+234 802 222 2222',
    password: 'demo123',
    role: 'restaurant' as const,
    email: 'chinedu@bunche.ng',
    restaurantName: 'Bunche Kitchen',
    avatar: 'CO',
  },
  {
    id: 'demo-admin-1',
    name: 'Admin User',
    phone: '+234 803 333 3333',
    password: 'demo123',
    role: 'admin' as const,
    email: 'admin@quickbite.ng',
    avatar: 'AU',
  },
  {
    id: 'demo-rider-1',
    name: 'Emeka Nwosu',
    phone: '+234 804 444 4444',
    password: 'demo123',
    role: 'rider' as const,
    email: 'emeka@quickbite.ng',
    avatar: 'EN',
  },
] as const

export type DemoUser = typeof DEMO_USERS[number]
export type UserRole = DemoUser['role']

// Session key — data persists in localStorage until tab closes
const SESSION_KEY = 'quickbite_demo_session'

export interface DemoSession {
  user: DemoUser
  loggedInAt: number // timestamp
}

export function saveSession(user: DemoUser): void {
  if (typeof window === 'undefined') return
  const session: DemoSession = { user, loggedInAt: Date.now() }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  // Also set individual auth flags for compatibility
  localStorage.setItem('quickbite_user', JSON.stringify({
    name: user.name,
    phone: user.phone,
    email: user.email,
    role: user.role,
    id: user.id,
  }))
  localStorage.setItem('is_logged_in', 'true')
  localStorage.setItem('onboarding_complete', 'true')
  if (user.role === 'restaurant') {
    localStorage.setItem('restaurant_id', 'demo-restaurant-1')
  }
}

export function getSession(): DemoSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoSession
  } catch {
    return null
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem('quickbite_user')
  localStorage.removeItem('is_logged_in')
  localStorage.removeItem('onboarding_complete')
  localStorage.removeItem('restaurant_id')
}

export function loginWithDemo(phone: string, password: string): DemoUser | null {
  const user = DEMO_USERS.find(
    (u) => u.phone === phone && u.password === password
  )
  if (user) {
    saveSession(user)
    return user
  }
  return null
}
