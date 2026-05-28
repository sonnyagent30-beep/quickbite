'use client'

interface OrderStatusStepperProps {
  status: 'pending' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled'
  orientation?: 'vertical' | 'horizontal'
}

const statusSteps = [
  { key: 'confirmed', label: 'Confirmed', description: 'Order confirmed by restaurant' },
  { key: 'preparing', label: 'Preparing', description: 'Your food is being prepared' },
  { key: 'dispatched', label: 'Dispatched', description: 'Rider is on the way' },
  { key: 'delivered', label: 'Delivered', description: 'Order delivered' },
]

const statusIndex: Record<string, number> = {
  pending: -1,
  confirmed: 0,
  preparing: 1,
  dispatched: 2,
  delivered: 3,
  cancelled: -1,
}

export default function OrderStatusStepper({ status, orientation = 'horizontal' }: OrderStatusStepperProps) {
  const currentIndex = statusIndex[status] ?? -1
  const isCancelled = status === 'cancelled'

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-0">
        {statusSteps.map((step, index) => {
          const isActive = index <= currentIndex
          const isCurrent = index === currentIndex
          return (
            <div key={step.key} className="flex gap-3">
              {/* Line connector */}
              {index !== 0 && (
                <div className={`w-0.5 h-8 ml-2.5 ${isActive ? 'bg-[#2D6A4F]' : 'bg-[#CCCCCC]'}`} />
              )}
              
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-[#2D6A4F]' : 'bg-[#CCCCCC]'
                }`}>
                  {isActive && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1 pb-6">
                <p className={`text-sm font-medium ${isActive ? 'text-[#1A1A1A]' : 'text-[#666666]'}`}>
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-[#666666]">{step.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal orientation
  return (
    <div className="flex items-center justify-between w-full">
      {statusSteps.map((step, index) => {
        const isActive = index <= currentIndex
        const isCurrent = index === currentIndex
        return (
          <div key={step.key} className="flex flex-col items-center flex-1">
            {/* Step indicator */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              isCancelled ? 'bg-[#DC3545]' : isActive ? 'bg-[#2D6A4F]' : 'bg-[#CCCCCC]'
            }`}>
              {isCancelled ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              ) : isActive ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : (
                <span className="text-white text-xs font-bold">{index + 1}</span>
              )}
            </div>
            <p className={`text-xs font-medium text-center ${isCancelled ? 'text-[#DC3545]' : isActive ? 'text-[#1A1A1A]' : 'text-[#666666]'}`}>
              {step.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}