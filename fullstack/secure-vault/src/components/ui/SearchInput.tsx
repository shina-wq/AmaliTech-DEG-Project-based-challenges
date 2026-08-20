import { LuSearch } from 'react-icons/lu'
import type { InputHTMLAttributes } from 'react'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  containerClassName?: string
}

export function SearchInput({ containerClassName = '', className = '', ...props }: SearchInputProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5 transition-colors focus-within:border-accent/60 ${containerClassName}`}
    >
      <LuSearch size={14} className="shrink-0 text-text-dim" aria-hidden="true" />
      <input
        type="search"
        className={`w-full bg-transparent text-sm text-text placeholder:text-text-dim focus-visible:outline-none ${className}`}
        {...props}
      />
    </div>
  )
}