export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border bg-surface px-4">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent text-accent"
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 3 6v6c0 5.25 3.75 9.75 9 11 5.25-1.25 9-5.75 9-11V6z" />
          </svg>
        </span>
        SecureVault
      </div>

      <div className="max-w-md flex-1">
        <input
          type="search"
          placeholder="Search files and folders…"
          className="w-full rounded-md border border-border bg-bg px-3 py-1.5 text-sm text-text placeholder:text-text-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Upload File
        </button>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-hover text-xs font-medium text-text"
          aria-label="Jane Doe"
        >
          JD
        </div>
      </div>
    </header>
  )
}