import { useState } from 'react'
import Command from './components/Command'
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
        <section className="example-card">
          <div className="example-header">
            <div>
              <h2>Example 1: Package name input</h2>
              <p>Type a package name to update the command and copy button.</p>
            </div>
            <label className="field">
              <span>Package name</span>
              <input
                type="text"
                value={packageName}
                onChange={(event) => setPackageName(event.target.value)}
                placeholder="discord"
              />
            </label>
          </div>
          <Command command={`sudo pacman -S ${packageName || '<packageName>'}`} />
        </section>

        <section className="example-card">
          <div className="example-header">
            <div>
              <h2>Example 2: Package dropdown</h2>
              <p>Select an option to update the command and copy button.</p>
            </div>
            <label className="field">
              <span>Package</span>
              <select
                value={selectedPackage}
                onChange={(event) => setSelectedPackage(event.target.value)}
              >
                {packageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <Command command={`sudo pacman -S ${selectedPackage}`} />
        </section>

        <section className="example-card">
          <div className="example-header">
            <div>
              <h2>Example 3: Project bootstrap</h2>
              <p>Combine a runtime dropdown with a project name input.</p>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Project name</span>
                <input
                  type="text"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="my-app"
                />
              </label>
              <label className="field">
                <span>Runtime</span>
                <select value={runtime} onChange={(event) => setRuntime(event.target.value)}>
                  {runtimeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <Command
            command={`npx create-${runtime}-app ${projectName || '<projectName>'}`}
          />
        </section>
      </main>
    </div>
  )
}

export default App
