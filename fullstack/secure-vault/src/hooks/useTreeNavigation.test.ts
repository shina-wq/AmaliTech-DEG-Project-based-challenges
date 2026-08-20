import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTreeNavigation } from './useTreeNavigation'
import { buildParentMap, getVisibleNodes } from '../utils/tree'
import { mockTree } from '../test/fixtures'

function setup(expandedIds: Set<string>) {
  const visibleNodes = getVisibleNodes(mockTree, expandedIds)
  const parentMap = buildParentMap(mockTree)
  const onToggle = vi.fn()
  const onSelectFile = vi.fn()
  const { result } = renderHook(() =>
    useTreeNavigation({ visibleNodes, expandedIds, onToggle, onSelectFile, parentMap }),
  )
  return { result, visibleNodes, onToggle, onSelectFile }
}

function press(key: string) {
  return { key, preventDefault: vi.fn() } as unknown as React.KeyboardEvent
}

describe('useTreeNavigation', () => {
  it('ArrowDown moves focus to the next visible node', () => {
    const { result } = setup(new Set())
    act(() => result.current.handleKeyDown(press('ArrowDown')))
    expect(result.current.focusedId).toBe('f2') // after f1 (Documents collapsed, so f2 is next sibling)
  })

  it('ArrowRight on collapsed folder expands without moving focus', () => {
    const { result, onToggle } = setup(new Set())
    act(() => result.current.handleKeyDown(press('ArrowRight')))
    expect(onToggle).toHaveBeenCalledWith('f1')
    expect(result.current.focusedId).toBe('f1') // unchanged, per W3C pattern
  })

  it('ArrowLeft on a file focuses its parent folder', () => {
    const { result } = setup(new Set(['f1']))
    // Visible order with f1 expanded: f1 -> f1a (collapsed folder) -> file2 -> f2 -> file3
    act(() => result.current.handleKeyDown(press('ArrowDown'))) // f1 -> f1a
    act(() => result.current.handleKeyDown(press('ArrowDown'))) // f1a -> file2
    expect(result.current.focusedId).toBe('file2')

    act(() => result.current.handleKeyDown(press('ArrowLeft')))
    expect(result.current.focusedId).toBe('f1')
  })

  it('ArrowLeft on a collapsed folder focuses its parent, not its own state', () => {
    const { result } = setup(new Set(['f1']))
    act(() => result.current.handleKeyDown(press('ArrowDown'))) // f1 -> f1a (collapsed)
    expect(result.current.focusedId).toBe('f1a')

    act(() => result.current.handleKeyDown(press('ArrowLeft')))
    expect(result.current.focusedId).toBe('f1') // f1a has no children shown, so it falls to parent
  })

  it('Enter selects a focused file', () => {
    const { result, onSelectFile } = setup(new Set(['f1']))
    act(() => result.current.handleKeyDown(press('ArrowDown'))) // f1 -> f1a
    act(() => result.current.handleKeyDown(press('ArrowDown'))) // f1a -> file2
    act(() => result.current.handleKeyDown(press('Enter')))
    expect(onSelectFile).toHaveBeenCalledWith(expect.objectContaining({ id: 'file2' }))
  })

  it('Enter on a focused folder does not call onSelectFile', () => {
    const { result, onSelectFile } = setup(new Set())
    act(() => result.current.handleKeyDown(press('Enter'))) // f1 is a folder
    expect(onSelectFile).not.toHaveBeenCalled()
  })

  it('Home focuses the first visible node, End focuses the last', () => {
    const { result } = setup(new Set(['f1']))
    act(() => result.current.handleKeyDown(press('ArrowDown')))
    act(() => result.current.handleKeyDown(press('End')))
    expect(result.current.focusedId).toBe('file3')

    act(() => result.current.handleKeyDown(press('Home')))
    expect(result.current.focusedId).toBe('f1')
  })
})