'use client'

import { useState } from 'react'

interface Transaction {
  id: string
  amount: number
  type: 'payout' | 'earning'
  description: string
  date: string
  status: 'completed' | 'pending'
}

export default function RestaurantPayoutsPage() {
  const [balance, setBalance] = useState(284500)
  const [pendingBalance, setPendingBalance] = useState(24300)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')

  const transactions: Transaction[] = [
    { id: '1', amount: 45000, type: 'payout', description: 'Weekly payout - Week 21', date: '2026-05-21', status: 'completed' },
    { id: '2', amount: 12500, type: 'earning', description: 'Order #1234', date: '2026-05-27', status: 'completed' },
    { id: '3', amount: 8750, type: 'earning', description: 'Order #1235', date: '2026-05-27', status: 'completed' },
    { id: '4', amount: 15200, type: 'earning', description: 'Order #1236', date: '2026-05-28', status: 'pending' },
    { id: '5', amount: 9100, type: 'earning', description: 'Order #1237', date: '2026-05-28', status: 'pending' },
    { id: '6', amount: 38000, type: 'payout', description: 'Weekly payout - Week 20', date: '2026-05-14', status: 'completed' },
  ]

  const handleWithdraw = () => {
    const amount = Number(withdrawAmount)
    if (amount > balance) {
      alert('Amount exceeds available balance')
      return
    }
    if (amount < 10000) {
      alert('Minimum withdrawal is ₦10,000')
      return
    }
    alert(`Withdrawal of ₦${amount.toLocaleString()} initiated. You will receive it within 24 hours.`)
    setShowWithdrawModal(false)
    setWithdrawAmount('')
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Payouts
        </h1>
        <p className="text-sm text-[#666666]">Manage your earnings and withdrawals</p>

      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-white/80">Available Balance</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" x2="12" y1="2" y2="22"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
          </div>
          <p className="text-3xl font-bold mb-1">₦{balance.toLocaleString()}</p>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="mt-4 px-6 py-2 bg-white text-[#2D6A4F] rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Withdraw
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#666666]">Pending (clearing in 24h)</p>
            <div className="w-10 h-10 bg-[#FD7E14]/10 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FD7E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[#1A1A1A]">₦{pendingBalance.toLocaleString()}</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#E5E5E5]">
          <h2 className="font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Transaction History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Description</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Date</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Type</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-[#666666]">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-[#1A1A1A]">{tx.description}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666]">
                    {new Date(tx.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.type === 'payout'
                        ? 'bg-[#E85D04]/10 text-[#E85D04]'
                        : 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                    }`}>
                      {tx.type === 'payout' ? 'Payout' : 'Earning'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-bold ${
                      tx.type === 'payout' ? 'text-[#DC3545]' : 'text-[#2D6A4F]'
                    }`}>
                      {tx.type === 'payout' ? '-' : '+'}₦{tx.amount.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Info */}
      <div className="bg-[#FFF3CD] rounded-xl p-4">
        <div className="flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFB703" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <div>
            <p className="text-sm font-medium text-[#1A1A1A]">Payout Information</p>
            <ul className="text-xs text-[#666666] mt-1 space-y-1">
              <li>• Weekly auto-payout every Monday</li>
              <li>• Minimum withdrawal: ₦10,000</li>
              <li>• Payout to your registered bank account</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
                Withdraw Funds
              </h2>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            <div className="mb-4 p-4 bg-[#F8F9FA] rounded-xl">
              <p className="text-sm text-[#666666]">Available Balance</p>
              <p className="text-2xl font-bold text-[#1A1A1A]">₦{balance.toLocaleString()}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#666666] mb-1">Amount to Withdraw</label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
              />
              <p className="text-xs text-[#666666] mt-1">Minimum: ₦10,000</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#666666] mb-1">Payout Method</label>
              <div className="p-3 bg-[#F8F9FA] rounded-xl text-sm">
                <p className="font-medium text-[#1A1A1A]">Bank Transfer</p>
                <p className="text-[#666666]">WEMA Bank - 1234567890</p>
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              className="btn-primary w-full"
            >
              Withdraw Funds
            </button>
          </div>
        </div>
      )}
    </div>
  )
}