import type { TreeNode } from '../types/tree'

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