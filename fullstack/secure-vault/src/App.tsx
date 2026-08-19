import { useState } from 'react'
import { Header } from './components/layout/Header'
import { FileExplorer } from './components/explorer/FileExplorer'
import { PropertiesPanel } from './components/properties/PropertiesPanel'
import { PropertiesDrawer } from './components/properties/PropertiesDrawer'
import type { FileNode } from './types/tree'
import { useRecentActivity } from './hooks/useRecentActivity'

function App() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const {entries: recentActivity, recordAccess} = useRecentActivity()

  const handleSelectFile = (file: FileNode) => {
    setSelectedFile(file)
    recordAccess(file)
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg text-text">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <FileExplorer searchQuery={searchQuery} selectedFile={selectedFile} onSelectFile={setSelectedFile} />
        <PropertiesPanel
          selectedFile={selectedFile}
          recentActivity={recentActivity}
          onSelectRecent={handleSelectFile}
        />
      </main>
      <PropertiesDrawer selectedFile={selectedFile} />
    </div>
  )
}

export default App