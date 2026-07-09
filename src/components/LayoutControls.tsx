'use client'

import { usePathname } from 'next/navigation'
import DemoBanner from '@/components/DemoBanner'
import BottomNav from '@/components/BottomNav'

export default function LayoutControls({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'

  return (
    <>
      {!isLandingPage && <DemoBanner />}
      {children}
      {!isLandingPage && <BottomNav />}
    </>
  )
}
