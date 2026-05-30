'use client'

import { useState } from 'react'

interface RatingStarsProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (rating: number) => void
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
}

const gapClasses = {
  sm: 'gap-0.5',
  md: 'gap-1',
  lg: 'gap-1.5',
}

export default function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onChange 
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0)
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null)

  const displayRating = hoverRating || rating

  const handleClick = (starValue: number) => {
    setAnimatingIndex(starValue - 1)
    setTimeout(() => setAnimatingIndex(null), 200)
    onChange?.(starValue)
  }

  return (
    <div className={`flex ${gapClasses[size]}`}>
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= displayRating
        const isHalfFilled = starValue - 0.5 <= displayRating && starValue > displayRating
        
        const isAnimating = animatingIndex === index

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && handleClick(starValue)}
            className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            style={{
              transform: isAnimating ? 'scale(1.2)' : 'scale(1)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`${sizeClasses[size]} ${
                isFilled ? 'text-[#FFB703]' : isHalfFilled ? 'text-[#FFB703]' : 'text-[#CCCCCC]'
              }`}
              fill={
                isFilled || isHalfFilled 
                  ? (isHalfFilled ? 'url(#half-fill)' : '#FFB703')
                  : 'none'
              }
              stroke={isFilled || isHalfFilled ? '#FFB703' : '#CCCCCC'}
              strokeWidth="2"
            >
              <defs>
                <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#FFB703" />
                  <stop offset="50%" stopColor="#CCCCCC" />
                </linearGradient>
              </defs>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        )
      })}
    </div>
  )
}