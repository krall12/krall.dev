import cn from 'classnames'
import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'

import {
  currentDirAtom,
  stdoutAtom,
  terminalArg0Atom,
  terminalArg1Atom,
  terminalValueAtom,
  selectedWindowAtom,
} from 'atoms'
import commands from 'utils/commands'
import files from 'utils/files'

export default function Terminal() {
  const scrollRef = useRef(null)

  const [selectedWindow] = useAtom(selectedWindowAtom)
  const [currentDir] = useAtom(currentDirAtom)
  const [terminalValue, setTerminalValue] = useAtom(terminalValueAtom)
  const [terminalArg0] = useAtom(terminalArg0Atom)
  const [terminalArg1] = useAtom(terminalArg1Atom)
  const [stdout, setStdout] = useAtom(stdoutAtom)

  const handleTerminalClick = () => {
    document.getElementById('terminal-input').focus()
  }

  const handleTerminalSubmit = () => {
    setTerminalValue('')

    try {
      setStdout(commands[terminalArg0].storeOutput)
    } catch {
      setStdout([...stdout, { command: 'notFound', props: { command: terminalArg0 } }])
    }
  }

  const handleTerminalTab = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    if (terminalArg0 !== 'open') return

    const found = files.find((file) => file.filename.toLowerCase().startsWith(terminalArg1?.toLowerCase()))
    if (found) setTerminalValue(`open ${found.filename}`)
  }

  // maintain bottom scroll position whenever the output updates
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [stdout])

  return (
    <div
      className={cn(
        'bg-black bg-opacity-90 w-[600px] rounded-lg shadow-lg fixed flex flex-col top-5 left-5 h-5/6 hover:cursor-text animate-fade-in',
        selectedWindow === 'terminal' ? 'relative z-10' : 'opacity-10'
      )}
    >
      <header className="flex items-center justify-between p-2 bg-gray-700 rounded-t-lg">
        <div className="flex flex-1 items-center space-x-2">
          <button className="bg-red-500 hover:bg-red-400 h-3 w-3 block rounded-full" />
          <button className="bg-yellow-500 hover:bg-yellow-400 h-3 w-3 block rounded-full" />
          <button className="bg-green-500 hover:bg-green-400 h-3 w-3 block rounded-full" />
        </div>

        <div>
          <h1 className="text-xs text-gray-100">Terminal -- krall.dev</h1>
        </div>

        <div className="flex-1" />
      </header>

      <main
        ref={scrollRef}
        className="flex-1 text-xs relative p-2 overflow-x-auto overscroll-contain space-y-2"
      >
        {stdout.map((line, key) => (
          <div key={key} className={cn('animate-fade-in', key !== 0 && 'border-t border-gray-800 pt-2')}>
            {typeof line === 'string' ? line : commands[line.command].component(line.props)}
          </div>
        ))}
      </main>

      <div
        onClick={handleTerminalClick}
        className="flex items-center border-2 p-3 border-green-900 rounded-b-lg focus-within:border-green-300 focus-within:bg-green-300 focus-within:bg-opacity-20 transition-colors hover:bg-opacity-25"
      >
        <span className="text-blue-300">{currentDir}</span>
        <input
          type="text"
          id="terminal-input"
          className="ml-2 flex-1 font-light bg-transparent block w-full outline-none"
          placeholder="/ to focus"
          value={terminalValue}
          onChange={(event) => setTerminalValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Tab') handleTerminalTab(event)
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') handleTerminalSubmit()
          }}
        />
      </div>
    </div>
  )
}
