import React, { useRef } from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const terminalValueAtom = atomWithStorage('krall.dev:terminalValue', '')
export const currentDirAtom = atomWithStorage('krall.dev:currentDir', '')
export const stdoutAtom = atomWithStorage<Array<string | { component: string; props?: any }>>(
  'krall.dev:stdout',
  [`Last login: ${new Date().toLocaleString()}`]
)

export default function Terminal() {
  const inputRef = useRef(null)

  const [terminalValue, setTerminalValue] = useAtom(terminalValueAtom)
  const [currentDir, setCurrentDir] = useAtom(currentDirAtom)
  const [stdout, setStdout] = useAtom(stdoutAtom)

  const handleTerminalClick = () => {
    if (document.activeElement !== inputRef.current) inputRef.current?.focus()
  }

  const handleTerminalSubmit = () => {
    const command = terminalValue.split(' ')[0]
    setTerminalValue('')

    switch (command) {
      case 'clear':
        setStdout([])
        break

      case 'whoami':
        setStdout([...stdout, '> whoami', { component: 'CommandWhoAmI' }])
        break

      default:
        setStdout([...stdout, { component: 'CommandNotFound', props: { command } }])
        break
    }
  }

  return (
    <div className="bg-black bg-opacity-90 w-[600px] rounded-lg shadow-lg fixed flex flex-col top-5 left-5 bottom-5 hover:cursor-text">
      <header className="flex items-center justify-between p-2 bg-gray-700 rounded-t-lg">
        <div className="flex flex-1 items-center space-x-2">
          <button className="bg-red-500 hover:bg-red-400 h-3 w-3 block rounded-full" />
          <button className="bg-yellow-500 hover:bg-yellow-400 h-3 w-3 block rounded-full" />
          <button className="bg-green-500 hover:bg-green-400 h-3 w-3 block rounded-full" />
        </div>

        <div>
          <h1 className="text-xs text-gray-100">krall.dev -- Welcome</h1>
        </div>

        <div className="flex-1" />
      </header>

      <main
        onClick={handleTerminalClick}
        className="flex-1 text-xs relative p-2 overflow-x-auto overscroll-contain space-y-1"
      >
        {stdout.map((line, key) => (
          <div key={key}>{typeof line === 'string' ? line : <ParseComponentIntoCommand {...line} />}</div>
        ))}
      </main>

      <div
        onClick={handleTerminalClick}
        className="flex items-center border-2 border-transparent p-3 focus-within:border-green-500 rounded-b-lg"
      >
        <span className="text-blue-300">{currentDir}</span>
        <input
          ref={inputRef}
          type="text"
          className="ml-2 flex-1 font-light bg-black block w-full"
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

const ParseComponentIntoCommand = ({ component, props }: { component: string; props?: any }) => {
  switch (component) {
    case 'CommandWhoAmI':
      return <CommandWhoAmI />

    case 'CommandNotFound':
      return <CommandNotFound {...props} />
    default:
      return null
  }
}

const CommandNotFound = ({ command }) => (
  <div className="text-red-500">krall.dev: command not found: {command}</div>
)

const CommandWhoAmI = () => (
  <div className="flex items-center p-2 mt-2 border-2 border-dashed border-red-400">
    <img
      src="https://avatars.githubusercontent.com/u/17836325?v=4"
      className="h-20 w-20 object-contain rounded-lg border-2 border-blue-400"
    />

    <div className="ml-3">
      <p className="text-base font-bold text-purple-400">Benjamin Krall</p>

      <p className="text-gray-300">
        I build apps with JavaScript. Sometimes I put them on the internet and other times I put them on an
        App Store. If you're interested in working with me or learning more about the cool shit I build you
        can reach out to anytime at{' '}
        <a target="_blank" href="mailto:benjaminkrall@gmail.com" className="underline">
          benjaminkrall@gmail.com
        </a>
      </p>
    </div>
  </div>
)
