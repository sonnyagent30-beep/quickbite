'use client'
import { getSession, clearSession } from '@/lib/demo-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DemoBanner() {
  const [session, setSession] = useState<ReturnType<typeof getSession>>(null)
  const router = useRouter()

  useEffect(() => {
    setSession(getSession())
  }, [])

  if (!session) return null

  const roleLabel = {
    customer: 'Customer View',
    restaurant: 'Restaurant Owner View',
    admin: 'Admin View',
    rider: 'Rider View',
  }[session.user.role]

  const handleLogout = () => {
    clearSession()
    router.replace('/login')
  }

  return (
    <div className="bg-[#1A1A1A] text-white px-4 py-2 flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse" />
        <span><strong>DEMO MODE</strong> — {roleLabel} as {session.user.name}</span>
      </div>
      <button
        onClick={handleLogout}
        className="text-[#E85D04] hover:underline"
      >
        Exit Demo
      </button>
    </div>
  )
}
