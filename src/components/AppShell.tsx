'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import DemoBanner from '@/components/DemoBanner'
import BottomNav from '@/components/BottomNav'

// Routes that need the Header + Demo components
const authenticatedRoutes = ['/home', '/search', '/cart', '/orders', '/profile', '/restaurants', '/checkout', '/settings', '/onboarding']

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Check if current route needs authenticated shell
  const isAuthenticatedRoute = authenticatedRoutes.some(route => pathname.startsWith(route))

  return (
    <>
      {isAuthenticatedRoute && <DemoBanner />}
      {isAuthenticatedRoute && <Header />}
      {children}
      {isAuthenticatedRoute && <BottomNav />}
    </>
  )
}
