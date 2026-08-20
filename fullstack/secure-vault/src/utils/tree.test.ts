import { describe, it, expect } from 'vitest'
import { getVisibleNodes, buildParentMap } from './tree'
import { mockTree } from '../test/fixtures'

describe('getVisibleNodes', () => {
  it('renders only top-level nodes when nothing expanded', () => {
    const visible = getVisibleNodes(mockTree, new Set())
    expect(visible.map((n) => n.id)).toEqual(['f1', 'f2', 'file3'])
  })

  it('recurses into nested expanded folders arbitrarily deep', () => {
    const visible = getVisibleNodes(mockTree, new Set(['f1', 'f1a']))
    expect(visible.map((n) => n.id)).toEqual(['f1', 'f1a', 'file1', 'file2', 'f2', 'file3'])
  })
})

describe('buildParentMap', () => {
  it('maps nested children to their immediate parent, roots to null', () => {
    const map = buildParentMap(mockTree)
    expect(map.get('file1')).toBe('f1a')
    expect(map.get('f1a')).toBe('f1')
    expect(map.get('f1')).toBeNull()
  })
})