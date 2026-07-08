'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DemoBanner from '@/components/DemoBanner'

export default function RestaurantLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="7" height="9" x="3" y="3" rx="1"/>
          <rect width="7" height="5" x="14" y="3" rx="1"/>
          <rect width="7" height="9" x="14" y="12" rx="1"/>
          <rect width="7" height="5" x="3" y="16" rx="1"/>
        </svg>
      ),
    },
    {
      path: '/restaurant-orders',
      label: 'Orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      ),
    },
    {
      path: '/menu',
      label: 'Menu',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/>
          <path d="M12 11h4"/>
          <path d="M12 16h4"/>
          <path d="M8 11h2"/>
          <path d="M8 16h2"/>
        </svg>
      ),
    },
    {
      path: '/payouts',
      label: 'Payouts',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" x2="12" y1="2" y2="22"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      <DemoBanner />
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E5E5E5] fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E85D04] flex items-center justify-center">
              <span className="text-white font-bold text-sm">QB</span>
            </div>
            <div>
              <span className="font-semibold text-[#1A1A1A]">QuickBite</span>
              <p className="text-xs text-[#666666]">Partner Portal</p>
            </div>
          </div>
        </div>

        {/* Restaurant info */}
        <div className="p-4 border-b border-[#E5E5E5]">
          <p className="text-sm font-medium text-[#1A1A1A]">Chicken Republic</p>
          <p className="text-xs text-[#2D6A4F] flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
            Online
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#E85D04] text-white'
                    : 'text-[#666666] hover:bg-[#F5F5F5]'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#E5E5E5]">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-[#666666] hover:bg-[#F5F5F5] rounded-xl transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E5E5E5] h-14 flex items-center px-4 md:px-6 sticky top-0 z-40">
          {/* Mobile menu button */}
          <button className="md:hidden mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>

          <h1 className="font-semibold text-[#1A1A1A] md:hidden" style={{ fontFamily: 'var(--font-poppins)' }}>
            Partner Portal
          </h1>

          {/* Online/Offline Toggle */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#666666]">Status:</span>
              <span className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
              <span className="text-sm font-medium text-[#2D6A4F]">Online</span>
            </div>
            <div className="w-px h-6 bg-[#E5E5E5]" />
            <div className="text-sm text-[#666666]">
              <span className="font-medium text-[#1A1A1A]">May 28, 2026</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 ${
                  isActive ? 'text-[#E85D04]' : 'text-[#666666]'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}