import type { ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid'
  'aria-label': string
}

const base =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer'

const variants = {
  ghost: 'text-text-muted hover:bg-surface-hover',
  solid: 'bg-accent text-bg hover:bg-accent-strong focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
}

export function IconButton({ variant = 'ghost', className = '', ...props }: IconButtonProps) {
  return <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props} />
}