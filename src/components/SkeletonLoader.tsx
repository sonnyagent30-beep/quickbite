'use client'

interface SkeletonLoaderProps {
  variant?: 'card' | 'text-line' | 'avatar' | 'restaurant-card'
  className?: string
}

const shimmerKeyframes = `
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
`

export const SkeletonLoader = ({ 
  variant = 'card', 
  className = '' 
}: SkeletonLoaderProps) => {
  const baseClass = "bg-gradient-to-r from-[#F5F5F5] via-[#E5E5E5] to-[#F5F5F5] bg-[length:200%_100%] animate-shimmer rounded"

  const variants = {
    'card': 'h-32 w-full rounded-xl',
    'text-line': 'h-4 w-3/4 rounded',
    'avatar': 'w-12 h-12 rounded-full',
    'restaurant-card': 'h-40 w-full rounded-2xl',
  }

  return (
    <>
      <style jsx global>{`
        ${shimmerKeyframes}
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
      <div className={`${baseClass} ${variants[variant]} ${className}`} />
    </>
  )
}

// Preset skeleton components
export const RestaurantCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    <SkeletonLoader variant="restaurant-card" />
    <div className="p-4 space-y-3">
      <div className="flex justify-between">
        <SkeletonLoader variant="text-line" className="w-1/2" />
        <SkeletonLoader variant="card" className="w-16 h-8" />
      </div>
      <div className="flex gap-3">
        <SkeletonLoader variant="text-line" className="w-24" />
        <SkeletonLoader variant="text-line" className="w-16" />
      </div>
    </div>
  </div>
)

export const TextLineSkeleton = ({ width = 'w-full' }: { width?: string }) => (
  <SkeletonLoader variant="text-line" className={width} />
)

export const AvatarSkeleton = () => (
  <SkeletonLoader variant="avatar" />
)

export default SkeletonLoader