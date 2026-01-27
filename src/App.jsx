import { useState } from 'react'
import Command from './components/Command'
import SelectBox from './components/SelectBox'
import TextBox from './components/TextBox'
import './App.css'

const packageOptions = ['discord', 'firefox', 'neovim', 'ripgrep']
const runtimeOptions = ['node', 'python', 'deno']

function App() {
  const [packageName, setPackageName] = useState('discord')
  const [selectedPackage, setSelectedPackage] = useState('firefox')
  const [projectName, setProjectName] = useState('my-app')
  const [runtime, setRuntime] = useState('node')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Command Component</h1>
        <p>Try inputs and dropdowns to see commands update automatically.</p>
      </header>

      <main className="app-content">
        <Command
          title="Example 1: Package name input"
          description="Type a package name to update the command and copy button."
          command={`sudo pacman -S ${packageName || '<packageName>'}`}
        >
          <TextBox
            id="package-name"
            header="Package name"
            value={packageName}
            onChange={(event) => setPackageName(event.target.value)}
            placeholder="discord"
          />
        </Command>

        <Command
          title="Example 2: Package dropdown"
          description="Select an option to update the command and copy button."
          command={`sudo pacman -S ${selectedPackage}`}
        >
          <SelectBox
            id="package-option"
            header="Package"
            value={selectedPackage}
            onChange={(event) => setSelectedPackage(event.target.value)}
            options={packageOptions}
          />
        </Command>

        <Command
          title="Example 3: Project bootstrap"
          description="Combine a runtime dropdown with a project name input."
          command={`npx create-${runtime}-app ${projectName || '<projectName>'}`}
        >
          <div className="field-row">
            <TextBox
              id="project-name"
              header="Project name"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="my-app"
            />
            <SelectBox
              id="runtime-option"
              header="Runtime"
              value={runtime}
              onChange={(event) => setRuntime(event.target.value)}
              options={runtimeOptions}
            />
          </div>
        </Command>
      </main>
    </div>
  )
}

export default App
