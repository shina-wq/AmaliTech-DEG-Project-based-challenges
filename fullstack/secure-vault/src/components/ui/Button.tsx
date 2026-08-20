import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  primary:
    'h-9 px-3 bg-accent text-bg hover:bg-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
  ghost: 'h-9 px-3 text-text-muted hover:bg-surface-hover',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props} />
}