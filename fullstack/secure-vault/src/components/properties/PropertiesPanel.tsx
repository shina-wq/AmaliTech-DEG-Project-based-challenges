export function PropertiesPanel() {
  return (
    <section
      aria-label="File properties"
      className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6"
    >
      <h2 className="mb-4 text-sm font-semibold text-text">Properties</h2>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-dim"
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2h9l5 5v15H6z" />
            <path d="M15 2v5h5" />
          </svg>
        </div>
        <p className="text-sm font-medium text-text">No file selected</p>
        <p className="mt-1 max-w-56 text-xs leading-relaxed text-text-dim">
          Select a file from the explorer pane to view encrypted metadata, audits, and properties.
        </p>
      </div>
    </section>
  )
}