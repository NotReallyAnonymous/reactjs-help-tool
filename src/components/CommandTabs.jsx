import { Children, cloneElement, isValidElement, useId, useState } from 'react'

function CommandTabs({ title, description, children }) {
  const tabId = useId()
  const tabs = Children.toArray(children).filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTab = tabs[activeIndex]

  const getTabLabel = (child, index) => {
    if (isValidElement(child)) {
      return child.props.tabLabel || child.props.title || `Command ${index + 1}`
    }
    return `Command ${index + 1}`
  }

  const renderTabPanel = () => {
    if (isValidElement(activeTab)) {
      return cloneElement(activeTab, {
        layout: 'panel',
      })
    }
    return activeTab
  }

  return (
    <section className="example-card command-tabs">
      <div className="example-header command-tabs__header">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="command-tabs__list" role="tablist" aria-label={title}>
          {tabs.map((child, index) => {
            const label = getTabLabel(child, index)
            const isActive = index === activeIndex
            const tabButtonId = `${tabId}-tab-${index}`
            const panelId = `${tabId}-panel-${index}`

            return (
              <button
                key={tabButtonId}
                id={tabButtonId}
                type="button"
                className={`command-tabs__tab${isActive ? ' is-active' : ''}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveIndex(index)}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>
      <div
        id={`${tabId}-panel-${activeIndex}`}
        className="command-tabs__panel"
        role="tabpanel"
        aria-labelledby={`${tabId}-tab-${activeIndex}`}
      >
        {renderTabPanel()}
      </div>
    </section>
  )
}

export default CommandTabs
