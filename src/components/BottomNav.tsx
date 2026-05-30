'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

export default function BottomNav() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  // Public routes where BottomNav should NOT show
  const publicRoutes = ['/', '/login', '/register', '/onboarding']
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(pathname)
  
  // Don't render BottomNav on public routes
  if (isPublicRoute) {
    return null
  }

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  const navItems = [
    {
      path: '/home',
      label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isActive('/home') ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      path: '/search',
      label: 'Search',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      ),
    },
    {
      path: '/cart',
      label: 'Cart',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1"/>
          <circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
      ),
      badge: totalItems,
    },
    {
      path: '/orders',
      label: 'Orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="5"/>
          <path d="M20 21a8 8 0 1 0-16 0"/>
        </svg>
      ),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] pb-safe z-50 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`relative flex flex-col items-center gap-1 ${
              isActive(item.path) ? 'text-[#E85D04]' : 'text-[#666666]'
            }`}
          >
            {item.icon}
            <span className="text-[12px] font-medium">{item.label}</span>
            {isActive(item.path) && (
              <span className="absolute -bottom-1 w-1 h-1 bg-[#E85D04] rounded-full" />
            )}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#E85D04] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  )
}