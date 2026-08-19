import { useState } from 'react'
import { Header } from './components/layout/Header'
import { FileExplorer } from './components/explorer/FileExplorer'
import { PropertiesPanel } from './components/properties/PropertiesPanel'
import type { FileNode } from './types/tree'

function App() {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)

  return (
    <div className="flex h-screen flex-col bg-bg text-text">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <FileExplorer selectedFile={selectedFile} onSelectFile={setSelectedFile} />
        <PropertiesPanel selectedFile={selectedFile} />
      </main>
    </div>
  )
}

export default App