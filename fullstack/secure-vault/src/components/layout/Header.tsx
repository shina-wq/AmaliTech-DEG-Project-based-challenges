import { LuSearch, LuShield, LuUpload } from 'react-icons/lu'

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-surface px-3 sm:gap-4 sm:px-4">
      <div className="flex shrink-0 items-center gap-2 text-sm font-semibold">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent text-accent"
          aria-hidden="true"
        >
          <LuShield size={12} />
        </span>
        <span className="hidden md:inline">SecureVault</span>
        <span className="md:hidden">SV</span>
      </div>

      {/* Full search input from tablet up */}
      <div className="hidden max-w-md flex-1 md:block">
        <input
          type="search"
          placeholder="Search files and folders…"
          className="w-full rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-text placeholder:text-text-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>

      {/* Phone-only search trigger */}
      <button
        type="button"
        aria-label="Search"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-text-muted hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:hidden"
      >
        <LuSearch size={18} aria-hidden="true" />
      </button>

      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Icon-only upload below desktop */}
        <button
          type="button"
          aria-label="Upload file"
          className="flex h-11 w-11 items-center justify-center rounded-md bg-accent text-bg transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:hidden"
        >
          <LuUpload size={18} aria-hidden="true" />
        </button>
        {/* Full label from desktop up */}
        <button
          type="button"
          className="hidden rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg lg:block"
        >
          Upload File
        </button>
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