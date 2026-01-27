# Command Component Playground

Interactive examples for composing shell commands with reusable UI controls and a one-click copy action.

## Features

- **Command component**: Renders a titled example card, optional controls, and a command block with a copy button.
- **Form controls**: Reusable `TextBox` and `SelectBox` components that pair with the command output.
- **Live updates**: Inputs and dropdowns update the command preview and the copied value.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually `http://localhost:5173`).

## Component documentation

### `<Command />`

Wraps a command display with an example title/description and an optional slot for controls.

```jsx
import Command from './components/Command'

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
```

**Props**

- `title` (string): Heading for the example card.
- `description` (string): Short helper text.
- `command` (string): Full command text shown and copied.
- `children` (ReactNode, optional): Control elements rendered beside the heading.

### `<TextBox />`

Renders a labeled text input that matches the UI styling.

```jsx
import TextBox from './components/TextBox'

<TextBox
  id="project-name"
  header="Project name"
  value={projectName}
  onChange={(event) => setProjectName(event.target.value)}
  placeholder="my-app"
/>
```

**Props**

- `id` (string): Input id for label association.
- `header` (string): Label text.
- `value` (string): Current input value.
- `onChange` (function): Change handler.
- `placeholder` (string, optional): Placeholder text.

### `<SelectBox />`

Renders a labeled dropdown.

```jsx
import SelectBox from './components/SelectBox'

<SelectBox
  id="runtime-option"
  header="Runtime"
  value={runtime}
  onChange={(event) => setRuntime(event.target.value)}
  options={['node', 'python', 'deno']}
/>
```

**Props**

- `id` (string): Select id for label association.
- `header` (string): Label text.
- `value` (string): Current selection.
- `onChange` (function): Change handler.
- `options` (string[]): List of option strings.

## Example composition

Combining a dropdown and text input inside the `Command` component keeps the command output and copy action synchronized:

```jsx
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
      options={['node', 'python', 'deno']}
    />
  </div>
</Command>
```
