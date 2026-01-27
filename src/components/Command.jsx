import CopyButton from './CopyButton'

function Command({
  title,
  description,
  command,
  children,
  tabLabel,
  className,
  layout = 'card',
}) {
  const commandText = command ? String(command) : ''
  const containerClassName = [
    layout === 'card' ? 'example-card' : 'command-panel',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const Container = layout === 'card' ? 'section' : 'div'

  return (
    <Container className={containerClassName} data-tab-label={tabLabel}>
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
    </Container>
  )
}

export default Command
