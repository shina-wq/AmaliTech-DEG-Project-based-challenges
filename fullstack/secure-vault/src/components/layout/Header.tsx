import { useState } from 'react'
import { LuSearch, LuShield, LuUpload, LuX } from 'react-icons/lu'

export function Header() {
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

      {/* Search bar */}
      <div className="absolute left-1/2 hidden w-full max-w-sm -translate-x-1/2 items-center gap-2 rounded-md border border-border bg-bg px-3 py-1.5 transition-colors focus-within:border-accent/60 md:flex">
        <LuSearch
          size={14}
          className="shrink-0 text-text-dim"
          aria-hidden="true"
        />

        <input
          type="search"
          placeholder="Search files and folders..."
          className="w-full bg-transparent text-sm text-text placeholder:text-text-dim focus-visible:outline-none"
        />
      </div>

      {/* Right-side actions */}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {/* Mobile: standalone icon-only search trigger */}
        <button
          type="button"
          aria-label={searchOpen ? 'Close search' : 'Search'}
          onClick={() => setSearchOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-text-muted hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:hidden cursor-pointer"
        >
          {searchOpen ? (
            <LuX size={18} aria-hidden="true" />
          ) : (
            <LuSearch size={18} aria-hidden="true" />
          )}
        </button>

        {searchOpen && (
          <div className="absolute inset-x-4 top-full z-10 mt-2 flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 shadow-lg transition-colors focus-within:border-accent/60 md:hidden">
            <LuSearch size={14} className="shrink-0 text-text-dim" aria-hidden="true" />

            <input
              type="search"
              autoFocus
              placeholder="Search files and folders..."
              className="w-full bg-transparent text-sm text-text placeholder:text-text-dim focus:outline-none"
            />
          </div>
        )}

        {/* Mobile: standalone icon-only upload trigger */}
        <button
          type="button"
          aria-label="Upload file"
          className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-bg transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden cursor-pointer"
        >
          <LuUpload size={18} strokeWidth={2.5} aria-hidden="true" />
        </button>

        {/* Desktop */}
        <button
          type="button"
          aria-label="Upload file"
          className="hidden h-9 items-center gap-2 px-3 text-sm font-medium justify-center rounded-md bg-accent text-bg transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:flex cursor-pointer"
        >
          <LuUpload size={14} strokeWidth={2.5} aria-hidden="true" />
          <span>Upload file</span>
        </button>

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