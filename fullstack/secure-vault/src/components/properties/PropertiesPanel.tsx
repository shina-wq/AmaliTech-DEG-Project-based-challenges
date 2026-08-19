import type { FileNode } from '../../types/tree'
import { getFileType } from '../../utils/file'

interface PropertiesPanelProps {
  selectedFile: FileNode | null
}

export function PropertiesPanel({ selectedFile }: PropertiesPanelProps) {
  return (
    <section aria-label="File properties" className="flex flex-1 flex-col overflow-y-auto p-4 md:p-6">
      <h2 className="mb-4 text-sm font-semibold text-text">Properties</h2>
      {selectedFile ? <PropertiesDetail file={selectedFile} /> : <EmptyState />}
    </section>
  )
}

function PropertiesDetail({ file }: { file: FileNode }) {
  const rows: [string, string][] = [
    ['Type', `${getFileType(file.name)} Document`],
    ['Size', file.size],
    ['ID', file.id],
  ]

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent-muted text-accent"
          aria-hidden="true"
        >
          <FileIcon />
        </div>
        <p className="truncate text-sm font-medium text-text" title={file.name}>
          {file.name}
        </p>
      </div>

      <dl className="flex flex-col gap-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <dt className="text-text-muted">{label}</dt>
            <dd className="truncate text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-border text-text-dim"
        aria-hidden="true"
      >
        <FileIcon />
      </div>
      <p className="text-sm font-medium text-text">No file selected</p>
      <p className="mt-1 max-w-56 text-xs leading-relaxed text-text-muted">
        Select a file from the explorer pane to view encrypted metadata, audits, and properties.
      </p>
    </div>
  )
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2h9l5 5v15H6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}