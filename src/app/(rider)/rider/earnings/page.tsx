'use client'

import { useState } from 'react'

export default function EarningsPage() {
  const [showPayoutModal, setShowPayoutModal] = useState(false)

  const weeklyEarnings = [
    { day: 'Mon', amount: 4500, deliveries: 5 },
    { day: 'Tue', amount: 6200, deliveries: 7 },
    { day: 'Wed', amount: 3800, deliveries: 4 },
    { day: 'Thu', amount: 7100, deliveries: 8 },
    { day: 'Fri', amount: 5500, deliveries: 6 },
    { day: 'Sat', amount: 8900, deliveries: 10 },
    { day: 'Sun', amount: 3200, deliveries: 4 },
  ]

  const transactions = [
    { id: 'TXN001', date: 'Jul 8', amount: 4500, type: 'credit', desc: '3 deliveries' },
    { id: 'TXN002', date: 'Jul 8', amount: 1200, type: 'payout', desc: 'Payout to bank' },
    { id: 'TXN003', date: 'Jul 7', amount: 6200, type: 'credit', desc: '4 deliveries' },
    { id: 'TXN004', date: 'Jul 6', amount: 3800, type: 'credit', desc: '3 deliveries' },
    { id: 'TXN005', date: 'Jul 6', amount: 1200, type: 'payout', desc: 'Payout to bank' },
    { id: 'TXN006', date: 'Jul 5', amount: 7100, type: 'credit', desc: '5 deliveries' },
    { id: 'TXN007', date: 'Jul 4', amount: 5500, type: 'credit', desc: '4 deliveries' },
  ]

  const maxEarning = Math.max(...weeklyEarnings.map(d => d.amount))

  return (
    <div className="p-4 md:p-6 pb-24">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Earnings</h1>
        <p className="text-sm text-[#666666]">Track your income and request payouts</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] rounded-2xl p-6 text-white">
          <p className="text-sm text-white/70 mb-1">Available Balance</p>
          <p className="text-4xl font-bold mb-1">₦45,200</p>
          <p className="text-xs text-white/60">Minimum payout: ₦5,000</p>
          <button
            onClick={() => setShowPayoutModal(true)}
            className="mt-4 w-full bg-white text-[#2D6A4F] font-semibold py-3 rounded-xl hover:bg-white/90 transition-colors"
          >
            Request Payout
          </button>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5]">
          <p className="text-sm text-[#666666] mb-1">Pending (3 deliveries)</p>
          <p className="text-4xl font-bold text-[#1A1A1A] mb-3">₦2,850</p>
          <p className="text-xs text-[#666666]">Will be added to balance after delivery confirmation</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] text-center">
          <p className="text-xs text-[#666666] mb-1">This Week</p>
          <p className="text-lg font-bold text-[#2D6A4F]">₦39,200</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] text-center">
          <p className="text-xs text-[#666666] mb-1">This Month</p>
          <p className="text-lg font-bold text-[#1A1A1A]">₦124,500</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E5E5E5] text-center">
          <p className="text-xs text-[#666666] mb-1">Total</p>
          <p className="text-lg font-bold text-[#1A1A1A]">₦594,000</p>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#E5E5E5] mb-6">
        <h2 className="text-base font-semibold text-[#1A1A1A] mb-4">This Week</h2>
        <div className="flex items-end justify-between gap-2 h-32">
          {weeklyEarnings.map((day) => (
            <div key={day.day} className="flex flex-col items-center flex-1">
              <p className="text-xs text-[#666666] mb-1">₦{(day.amount / 1000).toFixed(1)}k</p>
              <div
                className="w-full bg-[#E85D04] rounded-t-lg transition-all"
                style={{ height: `${(day.amount / maxEarning) * 80}px` }}
              />
              <p className="text-xs text-[#666666] mt-1">{day.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden">
        <div className="p-4 md:p-6 border-b border-[#E5E5E5]">
          <h2 className="text-base font-semibold text-[#1A1A1A]">Transaction History</h2>
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  txn.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {txn.type === 'credit' ? '↑' : '↓'}
                </div>
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A]">
                    {txn.type === 'credit' ? 'Delivery Earnings' : 'Payout'}
                  </p>
                  <p className="text-xs text-[#666666]">{txn.date} · {txn.desc}</p>
                </div>
              </div>
              <p className={`font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-[#1A1A1A]'}`}>
                {txn.type === 'credit' ? '+' : '-'}{`₦${txn.amount.toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1A1A1A]">Request Payout</h3>
              <button onClick={() => setShowPayoutModal(false)} className="text-2xl text-[#666666]">×</button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#666666] mb-1">Amount</p>
                <p className="text-2xl font-bold text-[#2D6A4F]">₦45,200</p>
              </div>
              <div>
                <p className="text-sm text-[#666666] mb-1">Bank</p>
                <p className="text-sm font-medium text-[#1A1A1A]">Access Bank ····4567</p>
              </div>
              <div>
                <p className="text-sm text-[#666666] mb-1">Account Name</p>
                <p className="text-sm font-medium text-[#1A1A1A]">Emeka Nwosu</p>
              </div>
              <p className="text-xs text-[#666666]">Payouts are processed within 24 hours</p>
              <button
                onClick={() => {
                  setShowPayoutModal(false)
                }}
                className="w-full bg-[#2D6A4F] text-white font-semibold py-4 rounded-xl hover:bg-[#1B4332] transition-colors"
              >
                Confirm Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
