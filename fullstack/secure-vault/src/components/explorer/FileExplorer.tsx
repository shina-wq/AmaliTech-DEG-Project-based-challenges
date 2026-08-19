import { useState } from 'react'
import data from '../../data/data.json'
import type { TreeNode as TreeNodeType, FileNode } from '../../types/tree'
import { TreeNode } from './TreeNode'

const treeData = data as TreeNodeType[]

function countFiles(nodes: TreeNodeType[]): number {
  return nodes.reduce((sum, node) => sum + (node.type === 'file' ? 1 : countFiles(node.children)), 0)
}

interface FileExplorerProps {
  selectedFile: FileNode | null
  onSelectFile: (file: FileNode) => void
}

export function FileExplorer({ selectedFile, onSelectFile }: FileExplorerProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <section
      aria-label="File explorer"
      className="flex w-full flex-col overflow-y-auto border-b border-border p-4 md:w-96 md:shrink-0 md:border-b-0 md:border-r"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text">Files</h2>
        <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-muted">
          {countFiles(treeData)} items
        </span>
      </div>

      <div className="flex flex-col">
        {treeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            expandedIds={expandedIds}
            selectedId={selectedFile?.id ?? null}
            onToggle={toggleExpanded}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </section>
  )
}