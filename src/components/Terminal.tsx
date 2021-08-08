import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai'

import { currentDirAtom, selectedProgramAtom, stdoutAtom, terminalValueAtom } from 'atoms'
import commands from 'utils/commands'

export default function Terminal() {
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const [selectedProgram, setSelectedProgram] = useAtom(selectedProgramAtom)

  const [terminalValue, setTerminalValue] = useAtom(terminalValueAtom)
  const [currentDir, setCurrentDir] = useAtom(currentDirAtom)
  const [stdout, setStdout] = useAtom(stdoutAtom)

  const handleTerminalClick = () => {
    if (document.activeElement !== inputRef.current) inputRef.current?.focus()
  }

  const handleTerminalSubmit = () => {
    const terminalCommand = terminalValue.split(' ')[0]
    setTerminalValue('')

    try {
      setStdout(commands[terminalCommand].storeOutput)
    } catch {
      setStdout([...stdout, { command: 'notFound', props: { command: terminalCommand } }])
    }
  }

  // maintain bottom scroll position whenever the output updates
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [stdout])

  return (
    <div className="bg-black bg-opacity-90 w-[600px] rounded-lg shadow-lg fixed flex flex-col top-5 left-5 bottom-5 hover:cursor-text animate-fade-in">
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
        className="flex-1 text-xs relative p-2 overflow-x-auto overscroll-contain space-y-1"
      >
        {stdout.map((line, key) => (
          <div key={key} className="animate-fade-in">
            {typeof line === 'string' ? line : commands[line.command].component(line.props)}
          </div>
        ))}
      </main>

      <div
        onClick={handleTerminalClick}
        className="flex items-center border-2 p-3 border-green-800 rounded-b-lg focus-within:border-green-300 focus-within:bg-green-300 focus-within:bg-opacity-20 transition-colors hover:bg-opacity-25"
      >
        <span className="text-blue-300">{currentDir}</span>
        <input
          ref={inputRef}
          type="text"
          className="ml-2 flex-1 font-light bg-transparent block w-full outline-none"
          placeholder="/ to focus"
          value={terminalValue}
          onChange={(event) => setTerminalValue(event.target.value)}
          onKeyUp={(event) => {
            if (event.key === 'Enter') handleTerminalSubmit()
          }}
        />
      </div>
    </div>
  )
}
