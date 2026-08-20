import {it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TreeNode } from './TreeNode'
import { mockTree } from '../../test/fixtures'

const folder = mockTree[0]

function setup(expandedIds = new Set<string>()) {
  const onToggle = vi.fn()
  render(
    <TreeNode
      node={folder!}
      depth={0}
      expandedIds={expandedIds}
      selectedId={null}
      focusedId={null}
      onToggle={onToggle}
      onSelectFile={vi.fn()}
      onFocusNode={vi.fn()}
      registerRef={vi.fn()}
    />,
  )
  return { onToggle }
}

it('collapsed folder hides children and calls onToggle when clicked', async () => {
  const { onToggle } = setup()
  expect(screen.queryByText('top.docx')).not.toBeInTheDocument()
  await userEvent.click(screen.getByText('Documents'))
  expect(onToggle).toHaveBeenCalledWith('f1')
})

it('expanded folder shows immediate children', () => {
  setup(new Set(['f1']))
  expect(screen.getByText('top.docx')).toBeInTheDocument()
  expect(screen.getByText('Nested')).toBeInTheDocument()
  expect(screen.queryByText('deep.pdf')).not.toBeInTheDocument() // f1a not expanded
})

it('renders "Empty folder" placeholder for a folder with no children', () => {
  render(
    <TreeNode
      node={{ id: 'f2', name: 'Empty', type: 'folder', children: [] }}
      depth={0}
      expandedIds={new Set(['f2'])}
      selectedId={null}
      focusedId={null}
      onToggle={vi.fn()}
      onSelectFile={vi.fn()}
      onFocusNode={vi.fn()}
      registerRef={vi.fn()}
    />,
  )
  expect(screen.getByText('Empty folder')).toBeInTheDocument()
})