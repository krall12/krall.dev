import React from 'react'

import OutputLs from 'components/OutputLs'
import OutputClear from 'components/OutputClear'
import OutputWhoAmI from 'components/OutputWhoAmI'
import OutputNotFound from 'components/OutputNotFound'
import OutputHelp from 'components/OutputHelp'

type Command = {
  storeOutput: (current: any) => any
  component: (props: any) => React.ReactNode
  helpLabel?: string
  helpDescription?: string
}

const commands: Record<string, Command> = {
  clear: {
    storeOutput: () => [{ command: 'clear' }],
    component: () => <OutputClear />,
    helpLabel: 'clear',
    helpDescription: 'Clears the terminals output',
  },
  help: {
    storeOutput: (current) => [...current, { command: 'help' }],
    component: () => (
      <div>
        <p className="mb-1">{'>'} help</p>
        <OutputHelp />
      </div>
    ),
    helpLabel: 'help',
    helpDescription: "What you're looking at",
  },
  ls: {
    storeOutput: (current) => [...current, { command: 'ls' }],
    component: () => (
      <div>
        <p className="mb-1">{'>'} ls</p>
        <OutputLs />
      </div>
    ),
    helpLabel: 'ls',
    helpDescription: 'Lists the current directories files',
  },
  whoami: {
    storeOutput: (current) => [...current, { command: 'whoami' }],
    component: () => (
      <div>
        <p className="mb-1">{'>'} whoami</p>
        <OutputWhoAmI />
      </div>
    ),
    helpLabel: 'whoami',
    helpDescription: 'Get to know me',
  },
  notFound: {
    storeOutput: (current) => [...current, { command: 'notFound' }],
    component: ({ command }) => <OutputNotFound command={command} />,
  },
}

export default commands
