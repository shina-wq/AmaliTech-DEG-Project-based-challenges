export function FileExplorer() {
  return (
    <section
      aria-label="File explorer"
      className="flex w-full flex-col overflow-y-auto border-b border-border p-4 md:w-96 md:shrink-0 md:border-b-0 md:border-r"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text">Files</h2>
        <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-muted">
          24 items
        </span>
      </div>

      <p className="mb-3 font-mono text-xs text-text-dim">vlt / legal / contracts /</p>

      {/* TreeNode recursion goes here — step 5 */}
      <div className="text-sm text-text-dim">Tree renders next step…</div>
    </section>
  )
}