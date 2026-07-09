import { Suspense } from 'react'
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import AppShell from '@/components/AppShell'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'QuickBite - Your Local Food, Delivered Fast',
  description: 'Discover authentic Nigerian cuisine from bukas and kitchens in your neighborhood. Order food online with real-time tracking.',
  keywords: ['food delivery', 'Nigeria', 'Lagos', 'Nigerian food', 'quickbite', 'online ordering'],
  authors: [{ name: 'QuickBite Team' }],
  openGraph: {
    title: 'QuickBite - Your Local Food, Delivered Fast',
    description: 'Discover authentic Nigerian cuisine from bukas and kitchens in your neighborhood.',
    type: 'website',
    locale: 'en_NG',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#E85D04',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#FEFEFE] antialiased font-sans">
        <Suspense fallback={<div className="min-h-screen bg-[#FEFEFE]" />}>
          <CartProvider>
            <AppShell>
              {children}
            </AppShell>
          </CartProvider>
        </Suspense>
      </body>
    </html>
  )
}