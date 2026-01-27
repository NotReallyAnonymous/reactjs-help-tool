import Command from './components/Command'
import './App.css'

const packageName = 'discord'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Command Component</h1>
        <p>Use the command component with dynamic package values.</p>
      </header>

      <main className="app-content">
        <Command command={`sudo pacman -S ${packageName}`} />

        <section className="example">
          <h2>Usage</h2>
          <pre>
            <code>{'<Command command={`sudo pacman -S ${packageName}`} />'}</code>
          </pre>
        </section>
      </main>
    </div>
  )
}

export default App
