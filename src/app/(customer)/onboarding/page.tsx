'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    title: 'Discover Local Food',
    description: 'Explore authentic Nigerian cuisine from the best bukas and kitchens in your neighborhood. From Jollof rice to Amala, we have it all!',
    emoji: '🍽️',
    bgColor: 'from-[#E85D04] to-[#D45103]'
  },
  {
    id: 2,
    title: 'Order in Seconds',
    description: 'Quick and easy ordering with just a few taps. Your favorite meals delivered to your doorstep in minutes.',
    emoji: '⚡',
    bgColor: 'from-[#2D6A4F] to-[#1B4332]'
  },
  {
    id: 3,
    title: 'Track Real-Time',
    description: 'Watch your order progress from kitchen to doorstep. Real-time tracking keeps you informed every step of the way.',
    emoji: '🚴‍♂️',
    bgColor: 'from-[#FFB703] to-[#E8A200]'
  }
]

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in first - if not, redirect to login
    const user = localStorage.getItem('quickbite_user')
    if (!user) {
      router.replace('/login')
      return
    }
    
    // Check if already completed onboarding
    const onboardingComplete = localStorage.getItem('onboarding_complete')
    if (onboardingComplete === 'true') {
      router.replace('/home')
    }
  }, [router])

  const handleComplete = () => {
    localStorage.setItem('onboarding_complete', 'true')
    router.replace('/home')
  }

  const handleSkip = () => {
    localStorage.setItem('onboarding_complete', 'true')
    router.replace('/home')
  }

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      handleComplete()
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col">
      {/* Skip Button */}
      <div className="p-4 text-right">
        <button
          onClick={handleSkip}
          className="px-4 py-2 text-sm font-medium text-[#666666] hover:text-[#1A1A1A] transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Slide Content */}
        <div className="text-center mb-12">
          <div
            className={`w-40 h-40 rounded-full bg-gradient-to-br ${slides[currentSlide].bgColor} flex items-center justify-center mx-auto mb-8 shadow-2xl`}
          >
            <span className="text-7xl">{slides[currentSlide].emoji}</span>
          </div>
          <h1
            className="text-3xl font-bold text-[#1A1A1A] mb-4"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-[#666666] max-w-sm mx-auto leading-relaxed">
            {slides[currentSlide].description}
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2 mb-12">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentSlide
                  ? 'w-8 h-3 bg-[#E85D04]'
                  : 'w-3 h-3 bg-[#E5E5E5]'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full max-w-sm py-4 bg-[#E85D04] text-white font-semibold rounded-xl hover:bg-[#D45103] transition-colors shadow-lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </button>

        {/* Login Link for existing users */}
        <p className="mt-6 text-sm text-[#666666]">
          Already know how it works?{' '}
          <Link href="/home" className="text-[#E85D04] font-medium hover:underline">
            Go to App
          </Link>
        </p>
      </main>
    </div>
  )
}