import type { TreeNode } from '../types/tree'
import { matchesGlob } from './search'

/** Flattens the tree into the nodes currently visible given expansion state. Order matches render order, so index arithmetic = Up/Down navigation. */
export function getVisibleNodes(nodes: TreeNode[], expandedIds: Set<string>): TreeNode[] {
  const result: TreeNode[] = []
  for (const node of nodes) {
    result.push(node)
    if (node.type === 'folder' && expandedIds.has(node.id)) {
      result.push(...getVisibleNodes(node.children, expandedIds))
    }
  }
  return result
}

/** Maps every node id to its parent id (null for roots). Used for ArrowLeft "focus parent" and ArrowRight "focus first child". */
export function buildParentMap(nodes: TreeNode[], parentId: string | null = null): Map<string, string | null> {
  const map = new Map<string, string | null>()
  for (const node of nodes) {
    map.set(node.id, parentId)
    if (node.type === 'folder') {
      for (const [id, pid] of buildParentMap(node.children, node.id)) map.set(id, pid)
    }
  }
  return map
}

/** Filters the tree to matching files only, keeping ancestor folders that contain a match.
 *  Returns the pruned tree plus the folder ids that must be force-expanded to reveal results. */
export function filterTree(nodes: TreeNode[], query: string): { nodes: TreeNode[]; expandIds: Set<string> } {
  const expandIds = new Set<string>()

  function walk(level: TreeNode[]): TreeNode[] {
    const kept: TreeNode[] = []
    for (const node of level) {
      if (node.type === 'file') {
        if (matchesGlob(node.name, query)) kept.push(node)
        continue
      }
      const children = walk(node.children)
      if (children.length > 0) {
        expandIds.add(node.id)
        kept.push({ ...node, children })
      }
    }
    return kept
  }

  return { nodes: walk(nodes), expandIds }
}