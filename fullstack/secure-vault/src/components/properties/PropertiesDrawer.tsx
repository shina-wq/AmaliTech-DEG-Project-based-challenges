import { useEffect, useState } from 'react'
import type { FileNode } from '../../types/tree'
import type { ActivityEntry } from '../../hooks/useRecentActivity'
import { PropertiesDetail } from './PropertiesPanel'
import { RecentActivity } from './RecentActivity'

interface PropertiesDrawerProps {
  selectedFile: FileNode | null
  recentActivity: ActivityEntry[]
  onSelectRecent: (file: FileNode) => void
}

export function PropertiesDrawer({ selectedFile, recentActivity, onSelectRecent }: PropertiesDrawerProps) {
  const [expanded, setExpanded] = useState(false)

  // Reset to the collapsed "peek" state whenever the selection changes.
  useEffect(() => {
    setExpanded(false)
  }, [selectedFile?.id])

  // Nothing to show if there's no selection AND no history to browse.
  if (!selectedFile && recentActivity.length === 0) return null

  const handleSelectRecent = (entry: ActivityEntry) => {
    onSelectRecent({ id: entry.id, name: entry.name, type: 'file', size: entry.size })
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-20 flex flex-col rounded-t-xl border-t border-border bg-surface shadow-lg transition-[max-height] duration-200 md:hidden"
      style={{ maxHeight: expanded ? '70vh' : '104px' }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Collapse properties' : 'Expand properties'}
        className="flex min-h-11 w-full flex-col items-center gap-2 px-4 pt-2 pb-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <span className="h-1 w-9 rounded-full bg-border" aria-hidden="true" />
        <span className="flex w-full items-center justify-between text-sm">
          <span className="font-semibold text-text">Properties</span>
          <span className="truncate pl-4 text-text-dim">{selectedFile?.name ?? 'No file selected'}</span>
        </span>
      </button>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {selectedFile && <PropertiesDetail file={selectedFile} />}
        <RecentActivity entries={recentActivity} activeId={selectedFile?.id ?? null} onSelect={handleSelectRecent} />
      </div>
    </div>
  )
}