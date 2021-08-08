import { atomWithStorage } from 'jotai/utils'

// holds a reference to the selected program. if there value is set to an empty
// string the program won't show.
export const selectedProgramAtom = atomWithStorage('krall.dev:selected-program', '')

// holds the value to the terminals main input
export const terminalValueAtom = atomWithStorage('krall.dev:terminal-value', '')

// the current dir of the terminal
export const currentDirAtom = atomWithStorage('krall.dev:current-dir', '~')

// the output of the terminal. each commands output is stored in a seperate item
// in the array. if the value is cleared its set to a help message .
export const stdoutAtom = atomWithStorage<Array<string | { command: string; props?: any }>>(
  'krall.dev:stdout',
  [`Last login: ${new Date().toLocaleString()}`]
)
