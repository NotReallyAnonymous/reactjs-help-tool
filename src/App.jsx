import { useState } from 'react'
import Command from './components/Command'
import CommandTabs from './components/CommandTabs'
import FlagCheckBox from './components/FlagCheckBox'
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
  const [pingHost, setPingHost] = useState('127.0.0.1')
  const [isContinuousPing, setIsContinuousPing] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Command Component</h1>
        <p>Try inputs and dropdowns to see commands update automatically.</p>
      </header>

      <main className="app-content">
        <CommandTabs
          title="Example 0: Multi-platform commands"
          description="Pick an operating system to see the right install command."
        >
          <Command
            tabLabel="Windows"
            title="Windows Command"
            description="Use Winget to install the package."
            command="winget install BurntSushi.ripgrep"
          />
          <Command
            tabLabel="PowerShell"
            title="PowerShell Command"
            description="Install with PowerShellGet."
            command="Install-Module -Name ripgrep"
          />
          <Command
            tabLabel="Linux"
            title="Linux Command"
            description="Install via apt on Debian-based systems."
            command="sudo apt install ripgrep"
          />
        </CommandTabs>
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

        <Command
          title="Example 4: Optional command flags"
          description="Toggle a flag to add it to the command."
          command={`ping${isContinuousPing ? ' -t' : ''} ${
            pingHost || '<ip or hostname>'
          }`}
        >
          <div className="field-row">
            <TextBox
              id="ping-host"
              header="Ping target"
              value={pingHost}
              onChange={(event) => setPingHost(event.target.value)}
              placeholder="127.0.0.1"
            />
            <FlagCheckBox
              id="continuous-ping"
              header="Continuous ping"
              flag="-t"
              checked={isContinuousPing}
              onChange={(event) => setIsContinuousPing(event.target.checked)}
            />
          </div>
        </Command>
      </main>
    </div>
  )
}

export default App
