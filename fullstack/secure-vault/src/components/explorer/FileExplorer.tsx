import { useMemo, useState } from 'react'
import data from '../../data/data.json'
import type { TreeNode as TreeNodeType, FileNode } from '../../types/tree'
import { TreeNode } from './TreeNode'
import { buildParentMap, getVisibleNodes } from '../../utils/tree'
import { useTreeNavigation } from '../../hooks/useTreeNavigation'

const treeData = data as TreeNodeType[]
const parentMap = buildParentMap(treeData) // static data → build once, module scope

function countFiles(nodes: TreeNodeType[]): number {
  return nodes.reduce((sum, node) => sum + (node.type === 'file' ? 1 : countFiles(node.children)), 0)
}

interface FileExplorerProps {
  selectedFile: FileNode | null
  onSelectFile: (file: FileNode) => void
}

export function FileExplorer({ selectedFile, onSelectFile }: FileExplorerProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const visibleNodes = useMemo(() => getVisibleNodes(treeData, expandedIds), [expandedIds])

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const { focusedId, registerRef, handleKeyDown, setFocusedId } = useTreeNavigation({
    visibleNodes,
    expandedIds,
    onToggle: toggleExpanded,
    onSelectFile,
    parentMap,
  })

  return (
    <section
      aria-label="File explorer"
      className={`flex w-full flex-col overflow-y-auto border-b border-border p-4 md:w-72 md:border-b-0 md:border-r md:shrink-0 lg:w-96 ${
        selectedFile ? 'pb-20 md:pb-4' : ''
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text">Files</h2>
        <span className="rounded-full bg-surface-hover px-2 py-0.5 text-xs text-text-muted">
          {countFiles(treeData)} items
        </span>
      </div>

      <div role="tree" aria-label="Vault files" onKeyDown={handleKeyDown} className="flex flex-col">
        {treeData.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            depth={0}
            expandedIds={expandedIds}
            selectedId={selectedFile?.id ?? null}
            focusedId={focusedId}
            onToggle={toggleExpanded}
            onSelectFile={onSelectFile}
            onFocusNode={setFocusedId}
            registerRef={registerRef}
          />
        ))}
      </div>
    </section>
  )
}