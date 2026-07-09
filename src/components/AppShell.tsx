'use client'

import { usePathname } from 'next/navigation'
import DemoBanner from '@/components/DemoBanner'
import BottomNav from '@/components/BottomNav'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Routes that need DemoBanner + BottomNav
  const shellRoutes = ['/home', '/search', '/cart', '/orders', '/profile', '/restaurants', '/checkout', '/onboarding', '/account']
  const showShell = shellRoutes.some(route => pathname.startsWith(route))

  return (
    <>
      {showShell && <DemoBanner />}
      {children}
      {showShell && <BottomNav />}
    </>
  )
}
