import type { TreeNode as TreeNodeType, FileNode } from '../../types/tree'

interface TreeNodeProps {
  node: TreeNodeType
  depth: number
  expandedIds: Set<string>
  selectedId: string | null
  onToggle: (id: string) => void
  onSelectFile: (file: FileNode) => void
}

const INDENT_PX = 16

export function TreeNode({ node, depth, expandedIds, selectedId, onToggle, onSelectFile }: TreeNodeProps) {
  const isFolder = node.type === 'folder'
  const isExpanded = isFolder && expandedIds.has(node.id)
  const isSelected = !isFolder && node.id === selectedId

  const handleClick = () => (isFolder ? onToggle(node.id) : onSelectFile(node))

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        style={{ paddingLeft: depth * INDENT_PX + 8 }}
        className={`flex w-full items-center gap-2 rounded-md border-l-2 py-1.5 pr-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-inset ${
          isSelected
            ? 'border-accent bg-accent-muted text-accent'
            : 'border-transparent text-text hover:bg-surface-hover'
        }`}
      >
        {isFolder ? <ChevronIcon expanded={isExpanded} /> : <span className="w-3.5 shrink-0" aria-hidden="true" />}
        {isFolder ? <FolderIcon /> : <FileIcon />}
        <span className="truncate">{node.name}</span>
      </button>

      {isFolder &&
        isExpanded &&
        (node.children.length > 0 ? (
          node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              onToggle={onToggle}
              onSelectFile={onSelectFile}
            />
          ))
        ) : (
          <p
            style={{ paddingLeft: (depth + 1) * INDENT_PX + 8 }}
            className="py-1 text-xs italic text-text-dim"
          >
            Empty folder
          </p>
        ))}
    </div>
  )
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`shrink-0 text-text-dim transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`}
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-text-muted" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="shrink-0 text-text-muted" aria-hidden="true">
      <path d="M6 2h9l5 5v15H6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 2v5h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}