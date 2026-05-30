'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'fab'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  children?: ReactNode
}

const variantClasses = {
  primary: `
    bg-[#E85D04] text-white 
    hover:bg-[#D45103] 
    active:bg-[#9D3C02]
    disabled:bg-[#CCCCCC] disabled:text-[#888888]
  `,
  secondary: `
    bg-white text-[#E85D04] border-2 border-[#E85D04]
    hover:bg-[#FFF5EE]
    active:bg-[#FFE4D6]
    disabled:border-[#CCCCCC] disabled:text-[#888888]
  `,
  ghost: `
    bg-transparent text-[#666666]
    hover:bg-[#F5F5F5]
    active:bg-[#E5E5E5]
    disabled:text-[#CCCCCC]
  `,
  icon: `
    bg-transparent text-[#666666] rounded-full
    hover:bg-[#F5F5F5]
    active:bg-[#E5E5E5]
    disabled:text-[#CCCCCC]
  `,
  fab: `
    bg-[#E85D04] text-white rounded-full shadow-lg
    hover:bg-[#D45103] hover:shadow-xl
    active:bg-[#9D3C02] active:shadow-lg
    disabled:bg-[#CCCCCC] disabled:shadow-none
  `,
}

const sizeClasses = {
  sm: `
    px-3 py-1.5 text-sm
    ${variantClasses.sm ?? ''}
  `,
  md: `
    px-4 py-2 text-base
  `,
  lg: `
    px-6 py-3 text-lg
  `,
}

const getSizeClasses = (size: ButtonSize, variant: ButtonVariant) => {
  if (variant === 'icon') {
    return {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    }[size]
  }
  
  if (variant === 'fab') {
    return {
      sm: 'w-10 h-10',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    }[size]
  }

  return {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-6 py-3 text-lg rounded-xl',
  }[size]
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium transition-all duration-200
    cursor-pointer disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-[#E85D04] focus:ring-offset-2
  `

  const variantClass = variantClasses[variant]
  const sizeClass = getSizeClasses(size, variant)

  return (
    <button
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
}

export type { ButtonProps, ButtonVariant, ButtonSize }

export default Button