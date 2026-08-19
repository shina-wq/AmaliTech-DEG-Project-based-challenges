import { LuFile, LuFileText } from 'react-icons/lu'
import type { FileNode } from '../../types/tree'
import type { ActivityEntry } from '../../hooks/useRecentActivity'
import { getFileType } from '../../utils/file'
import { RecentActivity } from './RecentActivity'

interface PropertiesPanelProps {
  selectedFile: FileNode | null
  recentActivity: ActivityEntry[]
  onSelectRecent: (file: FileNode) => void
}

export function PropertiesPanel({ selectedFile, recentActivity, onSelectRecent }: PropertiesPanelProps) {
  return (
    <section
      aria-label="File properties"
      className="hidden flex-1 flex-col overflow-y-auto p-4 md:flex md:p-6"
    >
      <h2 className="mb-4 text-sm font-semibold text-text">Properties</h2>
      {selectedFile ? <PropertiesDetail file={selectedFile} /> : <EmptyState />}

      <RecentActivity
        entries={recentActivity}
        activeId={selectedFile?.id ?? null}
        onSelect={(entry) => onSelectRecent({id: entry.id, name: entry.name, type: 'file', size: entry.size})}
      />
    </section>
  )
}

// Exported so the mobile bottom sheet (PropertiesDrawer) can reuse the same detail view.
export function PropertiesDetail({ file }: { file: FileNode }) {
  const rows: [string, string][] = [
    ['Type', `${getFileType(file.name)} Document`],
    ['Size', file.size],
    ['ID', file.id],
  ]

  return (
    <div>
      <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-accent"
          aria-hidden="true"
        >
          <LuFileText size={20} strokeWidth={2} />
        </div>
        <p className="truncate text-sm font-medium text-text" title={file.name}>
          {file.name}
        </p>
      </div>

      <dl className="flex flex-col gap-2.5">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 text-sm">
            <dt className="text-text-dim">{label}</dt>
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
        <LuFile size={20} strokeWidth={1.5} />
      </div>
      <p className="text-sm font-medium text-text">No file selected</p>
      <p className="mt-1 max-w-56 text-xs leading-relaxed text-text-dim">
        Select a file from the explorer pane to view encrypted metadata, audits, and properties.
      </p>
    </div>
  )
}