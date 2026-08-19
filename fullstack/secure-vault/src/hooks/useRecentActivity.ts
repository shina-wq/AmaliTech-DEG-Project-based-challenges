import { useCallback, useEffect, useState } from 'react'
import type { FileNode } from '../types/tree'

const STORAGE_KEY = 'securevault:recent-activity'
const MAX_ENTRIES = 5

export interface ActivityEntry {
  id: string
  name: string
  size: string
  timestamp: number
}

function loadFromStorage(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ActivityEntry[]) : []
  } catch {
    // Corrupt or inaccessible storage shouldn't crash the app.
    return []
  }
}

export function useRecentActivity() {
  const [entries, setEntries] = useState<ActivityEntry[]>(loadFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const recordAccess = useCallback((file: FileNode) => {
    setEntries((prev) => {
      const deduped = prev.filter((e) => e.id !== file.id)
      const next: ActivityEntry = { id: file.id, name: file.name, size: file.size, timestamp: Date.now() }
      return [next, ...deduped].slice(0, MAX_ENTRIES)
    })
  }, [])

  return { entries, recordAccess }
}