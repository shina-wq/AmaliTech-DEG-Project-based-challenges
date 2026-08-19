import { Header } from './components/layout/Header'
import { FileExplorer } from './components/explorer/FileExplorer'
import { PropertiesPanel } from './components/properties/PropertiesPanel'

function App() {
  return (
    <div className="flex h-screen flex-col bg-bg text-text">
      <Header />
      <main className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <FileExplorer />
        <PropertiesPanel />
      </main>
    </div>
  )
}

export default App