import CopyButton from './CopyButton'

function Command({ title, description, command, children }) {
  const commandText = command ? String(command) : ''

  return (
    <section className="example-card">
      <div className="example-header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {children ? <div className="example-controls">{children}</div> : null}
      </div>
      <div className="command">
        <div className="command-header">
          <div>
            <h3>Command</h3>
            <p>Run this in your terminal.</p>
          </div>
          <CopyButton text={commandText} label="Copy command" />
        </div>
        <pre className="command-block">
          <code>{commandText}</code>
        </pre>
      </div>
    </section>
  )
}

export default Command
