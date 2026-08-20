import type { HTMLAttributes } from 'react'

export function Badge({ className = '', ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={`rounded-sm bg-surface-hover px-2 py-0.5 text-xs text-text-muted ${className}`}
      {...props}
    />
  )
}