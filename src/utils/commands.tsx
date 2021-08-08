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
    storeOutput: (current) => [...current, '> help', { command: 'help' }],
    component: () => <OutputHelp />,
    helpLabel: 'help',
    helpDescription: 'Displays help',
  },
  ls: {
    storeOutput: (current) => [...current, '> ls', { command: 'ls' }],
    component: () => <OutputLs />,
    helpLabel: 'ls',
    helpDescription: 'Lists the current directories files',
  },
  whoami: {
    storeOutput: (current) => [...current, '> whoami', { command: 'whoami' }],
    component: () => <OutputWhoAmI />,
    helpLabel: 'whoami',
    helpDescription: 'Get to know me',
  },
  notFound: {
    storeOutput: (current) => [...current, { command: 'notFound' }],
    component: ({ command }) => <OutputNotFound command={command} />,
  },
}

export default commands
