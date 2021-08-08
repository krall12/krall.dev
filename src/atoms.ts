import { atomWithStorage } from 'jotai/utils'

// the selected window can either be the terminal or the program which displays
// whatever file is selected. more things can be added in the future.
export const selectedWindowAtom = atomWithStorage<'terminal' | 'program'>(
  'krall.dev:selected-window',
  'terminal'
)

// holds a reference to the selected program. if there value is set to an empty
// string the program won't show.
export const selectedProgramAtom = atomWithStorage<string>('krall.dev:selected-program', '')

// holds the value to the terminals main input
export const terminalValueAtom = atomWithStorage<string>('krall.dev:terminal-value', '')

// the current dir of the terminal
export const currentDirAtom = atomWithStorage<string>('krall.dev:current-dir', '~')

// the output of the terminal. each commands output is stored in a seperate item
// in the array. if the value is cleared its set to a help message .
export const stdoutAtom = atomWithStorage<Array<string | { command: string; props?: any }>>(
  'krall.dev:stdout',
  [`Last login: ${new Date().toLocaleString()}`]
)
