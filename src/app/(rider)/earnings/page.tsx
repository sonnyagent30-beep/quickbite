'use client'

import { useState } from 'react'

interface Payout {
  id: string
  amount: number
  bank: string
  account_number: string
  status: 'paid' | 'pending' | 'failed'
  date: string
}

export default function RiderEarningsPage() {
  const [payouts] = useState<Payout[]>([
    { id: 'PAY-001', amount: 28500, bank: 'GTBank', account_number: '0123456789', status: 'paid', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString() },
    { id: 'PAY-002', amount: 34200, bank: 'GTBank', account_number: '0123456789', status: 'paid', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
    { id: 'PAY-003', amount: 19800, bank: 'GTBank', account_number: '0123456789', status: 'pending', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 0).toISOString() },
    { id: 'PAY-004', amount: 25000, bank: 'GTBank', account_number: '0123456789', status: 'paid', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString() },
  ])

  const thisWeek = 15600
  const thisMonth = 68200
  const pendingPayout = payouts.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)

  const handleRequestPayout = () => {
    alert('Payout request submitted! You will receive your funds within 24 hours.')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Earnings
        </h1>
        <p className="text-sm text-[#666666]">Track your income and request payouts</p>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#2D6A4F] rounded-xl p-5 text-white">
          <p className="text-sm text-white/70">This Week</p>
          <p className="text-3xl font-bold mt-1">₦{thisWeek.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-[#666666]">This Month</p>
          <p className="text-3xl font-bold text-[#1A1A1A] mt-1">₦{thisMonth.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-[#666666]">Pending Payout</p>
          <p className="text-3xl font-bold text-[#FD7E14] mt-1">₦{pendingPayout.toLocaleString()}</p>
        </div>
      </div>

      {/* Request Payout */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-[#1A1A1A] mb-4" style={{ fontFamily: 'var(--font-poppins)' }}>
          Bank Details
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-[#666666] mb-1">Bank</p>
            <p className="font-medium text-[#1A1A1A]">GTBank</p>
          </div>
          <div>
            <p className="text-xs text-[#666666] mb-1">Account Number</p>
            <p className="font-medium text-[#1A1A1A]">0123456789</p>
          </div>
        </div>
        <button
          onClick={handleRequestPayout}
          className="w-full py-3 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors"
        >
          Request Payout
        </button>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Payout History
          </h2>
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {payouts.map((payout) => (
            <div key={payout.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1A1A1A]">{payout.id}</p>
                <p className="text-xs text-[#666666]">{payout.bank} • ••••{payout.account_number.slice(-4)}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#1A1A1A]">₦{payout.amount.toLocaleString()}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  payout.status === 'paid' ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]' :
                  payout.status === 'pending' ? 'bg-[#FD7E14]/10 text-[#FD7E14]' :
                  'bg-[#DC3545]/10 text-[#DC3545]'
                }`}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
