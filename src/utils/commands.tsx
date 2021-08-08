import React from 'react'

import OutputLs from 'components/OutputLs'
import OutputClear from 'components/OutputClear'
import OutputWhoAmI from 'components/OutputWhoAmI'
import OutputNotFound from 'components/OutputNotFound'
import OutputHelp from 'components/OutputHelp'

export default {
  clear: {
    storeOutput: () => [{ command: 'clear' }],
    component: () => <OutputClear />,
  },
  help: {
    storeOutput: (current) => [...current, '> help', { command: 'help' }],
    component: () => <OutputHelp />,
  },
  ls: {
    storeOutput: (current) => [...current, '> ls', { command: 'ls' }],
    component: () => <OutputLs />,
  },
  whoami: {
    storeOutput: (current) => [...current, '> whoami', { command: 'whoami' }],
    component: () => <OutputWhoAmI />,
  },
  notFound: {
    storeOutout: (current) => [...current, { command: 'notFound' }],
    component: ({ command }) => <OutputNotFound command={command} />,
  },
}
