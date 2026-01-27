import { Children } from 'react'
import CopyButton from './CopyButton'

function Command({ children, command }) {
  const commandText =
    typeof command === 'string'
      ? command
      : Children.toArray(children)
          .map((child) => (typeof child === 'string' ? child : String(child)))
          .join('')

  return (
    <section className="command">
      <div className="command-header">
        <div>
          <h2>Command</h2>
          <p>Run this in your terminal.</p>
        </div>
        <CopyButton text={commandText} label="Copy command" />
      </div>
      <pre className="command-block">
        <code>{commandText}</code>
      </pre>
    </section>
  )
}

export default Command
