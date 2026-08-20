import type { TreeNode } from '../types/tree'

export const mockTree: TreeNode[] = [
  {
    id: 'f1', name: 'Documents', type: 'folder', children: [
      { id: 'f1a', name: 'Nested', type: 'folder', children: [
        { id: 'file1', name: 'deep.pdf', type: 'file', size: '1KB' },
      ]},
      { id: 'file2', name: 'top.docx', type: 'file', size: '2KB' },
    ],
  },
  { id: 'f2', name: 'Empty', type: 'folder', children: [] },
  { id: 'file3', name: 'root.txt', type: 'file', size: '1KB' },
]