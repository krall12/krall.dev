import React from 'react'
import Terminal from 'components/Terminal'
import Window from 'components/Window'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAtom } from 'jotai'
import { stdoutAtom } from 'atoms'

export default function Home() {
  const [_, setStdout] = useAtom(stdoutAtom)

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
  })

  return (
    <main className="relative h-screen">
      <Terminal />
      <Window />
    </main>
  )
}
