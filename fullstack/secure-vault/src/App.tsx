import { useState } from 'react'
import { Header } from './components/layout/Header'
import { FileExplorer } from './components/explorer/FileExplorer'
import { PropertiesPanel } from './components/properties/PropertiesPanel'
import { PropertiesDrawer } from './components/properties/PropertiesDrawer'
import { useRecentActivity } from './hooks/useRecentActivity'
import type { FileNode } from './types/tree'

function App() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const { entries: recentActivity, recordAccess } = useRecentActivity()

  const handleSelectFile = (file: FileNode) => {
    setSelectedFile(file)
    recordAccess(file)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg text-text">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <FileExplorer searchQuery={searchQuery} selectedFile={selectedFile} onSelectFile={handleSelectFile} />
        <PropertiesPanel
          selectedFile={selectedFile}
          recentActivity={recentActivity}
          onSelectRecent={handleSelectFile}
        />
      </main>
      <PropertiesDrawer
        selectedFile={selectedFile}
        recentActivity={recentActivity}
        onSelectRecent={handleSelectFile}
      />
    </div>
  )
}

export default App