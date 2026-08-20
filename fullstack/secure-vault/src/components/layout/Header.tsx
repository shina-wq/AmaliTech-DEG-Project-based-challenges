import { useState } from 'react'
import { LuSearch, LuShield, LuUpload, LuX } from 'react-icons/lu'
import { Button } from '../ui/Button'
import { IconButton } from '../ui/IconButton'
import { SearchInput } from '../ui/SearchInput'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="relative flex h-14 shrink-0 items-center border-b border-border bg-surface px-4">
      {/* Logo */}
      <div className="flex shrink-0 items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/20 text-accent">
          <LuShield size={16} strokeWidth={2.5} aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="text-sm font-semibold text-text">SecureVault</span>
          <span className="font-mono text-[10px] tracking-wide text-text-dim">
            ENTERPRISE CLOUD EXPLORER
          </span>
        </div>
      </div>

      {/* Search bar (desktop) */}
      <SearchInput
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search files and folders..."
        containerClassName="absolute left-1/2 hidden w-full max-w-sm -translate-x-1/2 md:flex"
      />

      {/* Right-side actions */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {/* Mobile: standalone icon-only search trigger */}
        <IconButton
          aria-label={searchOpen ? 'Close search' : 'Search'}
          onClick={() => setSearchOpen((open) => !open)}
          className="md:hidden"
        >
          {searchOpen ? <LuX size={18} aria-hidden="true" /> : <LuSearch size={18} aria-hidden="true" />}
        </IconButton>

        {searchOpen && (
          <SearchInput
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
            placeholder="Search files and folders..."
            containerClassName="absolute inset-x-4 top-full z-10 mt-2 shadow-lg md:hidden"
          />
        )}

        {/* Mobile: standalone icon-only upload trigger */}
        <IconButton variant="solid" aria-label="Upload file" className="md:hidden">
          <LuUpload size={18} strokeWidth={2.5} aria-hidden="true" />
        </IconButton>

        {/* Desktop */}
        <Button aria-label="Upload file" className="hidden md:flex">
          <LuUpload size={14} strokeWidth={2.5} aria-hidden="true" />
          <span>Upload file</span>
        </Button>

        {/* Avatar */}
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-hover text-xs font-medium text-text"
          aria-label="Jane Doe"
        >
          JD
        </div>
      </div>
    </header>
  )
}