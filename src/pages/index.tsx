import React from 'react'
import dynamic from 'next/dynamic'
import { useHotkeys } from 'react-hotkeys-hook'
import { selectedProgramAtom, selectedWindowAtom, stdoutAtom } from 'atoms'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

const Terminal = dynamic(() => import('components/Terminal'), { ssr: false })
const Program = dynamic(() => import('components/Program'), { ssr: false })

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
      <Program />
    </main>
  )
}
