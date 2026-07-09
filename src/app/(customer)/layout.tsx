'use client'

import AppShell from '@/components/AppShell'
import { CartProvider } from '@/lib/cart-context'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AppShell>{children}</AppShell>
    </CartProvider>
  )
}
