import { useState } from 'react'
import CopyButton from './components/CopyButton'
import './App.css'

function App() {
  const [text, setText] = useState('This is some text to copy')

  return (
    <div className="app">
      <header className="app-header">
        <h1>Copy Button Demo</h1>
        <p>Use the reusable component to copy any text value.</p>
      </header>

      <main className="app-content">
        <label className="text-label" htmlFor="copy-text">
          Text to copy
        </label>
        <textarea
          id="copy-text"
          className="text-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={4}
        />

        <div className="button-row">
          <CopyButton text={text} label="Copy text" />
          <span className="helper-text">Current length: {text.length} characters</span>
        </div>

        <section className="example">
          <h2>Usage</h2>
          <pre>
            <code>{'<CopyButton text="This is some text to copy" />'}</code>
          </pre>
        </section>
      </main>
    </div>
  )
}

export default App
