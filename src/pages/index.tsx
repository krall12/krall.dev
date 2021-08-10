import React from 'react'
import Terminal from 'components/Terminal'
import Window from 'components/Window'
import { useHotkeys } from 'react-hotkeys-hook'
import { selectedProgramAtom, selectedWindowAtom, stdoutAtom } from 'atoms'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

export default function Home() {
  const setSelectedWindow = useUpdateAtom(selectedWindowAtom)
  const selectedProgram = useAtomValue(selectedProgramAtom)
  const setStdout = useUpdateAtom(stdoutAtom)

  // clear the terminal on command+k
  useHotkeys('command+k', (e) => {
    e.preventDefault()
    setStdout([{ command: 'clear' }])
    return false
  })

  // focus the terminal input on '/'
  useHotkeys('/', (e) => {
    e.preventDefault()
    document.getElementById('terminal-input').focus()
    setSelectedWindow('terminal')
  })

  return (
    <main className="relative h-screen">
      <Terminal />

      {selectedProgram ? (
        <Window type="program" title={selectedProgram} className="left-64">
          lorem
        </Window>
      ) : null}
    </main>
  )
}
