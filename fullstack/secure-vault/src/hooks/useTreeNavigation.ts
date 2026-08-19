import { useCallback, useEffect, useRef, useState } from 'react'
import type { FileNode, TreeNode } from '../types/tree'

interface UseTreeNavigationArgs {
  visibleNodes: TreeNode[]
  expandedIds: Set<string>
  onToggle: (id: string) => void
  onSelectFile: (file: FileNode) => void
  parentMap: Map<string, string | null>
}

export function useTreeNavigation({ visibleNodes, expandedIds, onToggle, onSelectFile, parentMap }: UseTreeNavigationArgs) {
  const [focusedId, setFocusedId] = useState<string | null>(visibleNodes[0]?.id ?? null)
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())

  // Arrow keys move focus programmatically, sync real DOM focus whenever focusedId changes.
  useEffect(() => {
    if (focusedId) itemRefs.current.get(focusedId)?.focus()
  }, [focusedId])

  // If the focused node disappears (its parent folder collapsed), fall back to the first visible item.
  useEffect(() => {
    if (focusedId && !visibleNodes.some((n) => n.id === focusedId)) {
      setFocusedId(visibleNodes[0]?.id ?? null)
    }
  }, [visibleNodes, focusedId])

  const registerRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) itemRefs.current.set(id, el)
    else itemRefs.current.delete(id)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!focusedId) return
      const index = visibleNodes.findIndex((n) => n.id === focusedId)
      const node = index === -1 ? undefined : visibleNodes[index]
      if (!node) return

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          const next = visibleNodes[index + 1]
          if (next) setFocusedId(next.id)
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prev = visibleNodes[index - 1]
          if (prev) setFocusedId(prev.id)
          break
        }
        case 'ArrowRight': {
          e.preventDefault()
          if (node.type !== 'folder') break
          if (!expandedIds.has(node.id)) {
            onToggle(node.id) // collapsed → expand, focus stays put (W3C pattern)
          } else {
            const firstChild = visibleNodes[index + 1]
            if (firstChild && parentMap.get(firstChild.id) === node.id) setFocusedId(firstChild.id)
          }
          break
        }
        case 'ArrowLeft': {
          e.preventDefault()
          if (node.type === 'folder' && expandedIds.has(node.id)) {
            onToggle(node.id) // expanded → collapse, focus stays put
          } else {
            const parentId = parentMap.get(node.id)
            if (parentId) setFocusedId(parentId)
          }
          break
        }
        case 'Enter': {
          e.preventDefault()
          if (node.type === 'file') onSelectFile(node)
          break
        }
        case 'Home': {
          e.preventDefault()
          if (visibleNodes[0]) setFocusedId(visibleNodes[0].id)
          break
        }
        case 'End': {
          e.preventDefault()
          const last = visibleNodes.at(-1)
          if (last) setFocusedId(last.id)
          break
        }
      }
    },
    [focusedId, visibleNodes, expandedIds, onToggle, onSelectFile, parentMap],
  )

  return { focusedId, registerRef, handleKeyDown, setFocusedId }
}