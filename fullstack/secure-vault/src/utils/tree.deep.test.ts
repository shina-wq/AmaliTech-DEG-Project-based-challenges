import { it, expect } from 'vitest'
import { getVisibleNodes } from './tree'
import type { TreeNode } from '../types/tree'

function buildDeepTree(depth: number): TreeNode[] {
  let node: TreeNode = { id: `leaf`, name: 'leaf.txt', type: 'file', size: '1KB' }
  for (let i = depth; i > 0; i--) {
    node = { id: `d${i}`, name: `Level ${i}`, type: 'folder', children: [node] }
  }
  return [node]
}

it('handles 20 levels of nesting without stack overflow', () => {
  const tree = buildDeepTree(20)
  const allIds = new Set(Array.from({ length: 20 }, (_, i) => `d${i + 1}`))
  const visible = getVisibleNodes(tree, allIds)
  expect(visible).toHaveLength(21) // 20 folders + 1 leaf
  expect(visible.at(-1)?.id).toBe('leaf')
})