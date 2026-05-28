'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'

// Routes that need the Header component
const authenticatedRoutes = ['/home', '/search', '/cart', '/orders', '/profile']

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Check if current route needs Header
  const needsHeader = authenticatedRoutes.some(route => pathname.startsWith(route))
  
  return (
    <>
      {needsHeader && <Header />}
      {children}
    </>
  )
}