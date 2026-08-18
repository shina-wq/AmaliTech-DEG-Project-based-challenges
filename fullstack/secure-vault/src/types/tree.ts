// A leaf node in the file tree
export interface FileNode {
  id: string
  name: string
  type: 'file'
  size: string
}

// A branch node that can contain files or further folders
export interface FolderNode {
  id: string
  name: string
  type: 'folder'
  children: TreeNode[]
}

// Discriminated union, the `type` field lets TS narrow automatically
export type TreeNode = FileNode | FolderNode