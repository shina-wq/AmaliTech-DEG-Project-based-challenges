import { LuFileText } from 'react-icons/lu'
import type { ActivityEntry } from '../../hooks/useRecentActivity'
import { useNow } from '../../hooks/useNow'
import { formatRelativeTime } from '../../utils/time'

interface RecentActivityProps {
  entries: ActivityEntry[]
  activeId: string | null
  onSelect: (entry: ActivityEntry) => void
}

export function RecentActivity({ entries, activeId, onSelect }: RecentActivityProps) {
  const now = useNow()

  if (entries.length === 0) return null

  return (
    <div className="mt-6 border-t border-border pt-4">
      <h3 className="mb-2 text-xs font-semibold tracking-wide text-text-dim uppercase">Recent Activity</h3>
      <ul className="flex flex-col gap-1">
        {entries.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              onClick={() => onSelect(entry)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-inset ${
                entry.id === activeId ? 'text-text' : 'text-text hover:bg-surface-hover'
              }`}
            >
              <LuFileText
                size={14}
                className={`shrink-0 ${
                  entry.id === activeId ? 'text-accent' : 'text-text-muted'
                }`}
                aria-hidden="true"
              />
              <span className="flex-1 truncate">{entry.name}</span>
              <span className="shrink-0 font-mono text-[11px] text-text-dim">
                {formatRelativeTime(entry.timestamp, now)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}