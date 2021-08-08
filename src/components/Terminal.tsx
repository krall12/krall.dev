import React, { useEffect, useRef } from 'react'
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
  const scrollRef = useRef(null)

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
        setStdout([{ component: 'CommandClear' }])
        break

      case 'help':
        setStdout([...stdout, '> help', { component: 'CommandHelp' }])
        break

      case 'ls':
        setStdout([...stdout, '> ls', { component: 'CommandLs' }])
        break

      case 'whoami':
        setStdout([...stdout, '> whoami', { component: 'CommandWhoAmI' }])
        break

      default:
        setStdout([...stdout, { component: 'CommandNotFound', props: { command } }])
        break
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
          <h1 className="text-xs text-gray-100">krall.dev -- Welcome</h1>
        </div>

        <div className="flex-1" />
      </header>

      <main
        ref={scrollRef}
        onClick={handleTerminalClick}
        className="flex-1 text-xs relative p-2 overflow-x-auto overscroll-contain space-y-1"
      >
        {stdout.map((line, key) => (
          <div key={key} className="animate-fade-in">
            {typeof line === 'string' ? line : <ParseComponentIntoCommand {...line} />}
          </div>
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
    case 'CommandClear':
      return <CommandClear />

    case 'CommandHelp':
      return <CommandHelp />

    case 'CommandLs':
      return <CommandLs />

    case 'CommandWhoAmI':
      return <CommandWhoAmI />

    case 'CommandNotFound':
      return <CommandNotFound {...props} />
    default:
      return null
  }
}

const CommandNotFound = ({ command }) => <div className="text-red-500">command not found: {command}</div>

const CommandClear = () => (
  <div className="italic text-gray-500">{'> '}Terminal cleared. Enter "help" to get started.</div>
)

const CommandWhoAmI = () => (
  <div className="flex items-center p-2 border-2 border-dashed border-blue-400 bg-blue-500 bg-opacity-10">
    <img
      src="https://avatars.githubusercontent.com/u/17836325?v=4"
      className="h-20 w-20 object-contain rounded-lg border-2 border-blue-400"
    />

    <div className="ml-3">
      <p className="text-base font-bold text-blue-500">Benjamin Krall</p>

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

const CommandHelp = () => (
  <div className="border-2 border-dashed border-yellow-300 bg-yellow-300 bg-opacity-10 p-2">
    <dl>
      <dt>Welcome to the krall.dev terminal. Run any of the following commands to find learn more.</dt>

      <dd className="mt-2 ml-4">
        <dl>
          <dt className="text-blue-400">cd {'<dir>'}</dt>
          <dd className="ml-4 mb-2">Open a directory.</dd>

          <dt className="text-blue-400">clear</dt>
          <dd className="ml-4 mb-2">Clear the terminal.</dd>

          <dt className="text-blue-400">ls</dt>
          <dd className="ml-4 mb-2">List files in the current directory.</dd>

          <dt className="text-blue-400">open {'<program>'}</dt>
          <dd className="ml-4 mb-2">
            If you're in a directory with programs, run this command to open the program.
          </dd>

          <dt className="text-blue-400">close</dt>
          <dd className="ml-4 mb-2">Closes whatever program is open.</dd>

          <dt className="text-blue-400">whoami</dt>
          <dd className="ml-4">Find out more about me.</dd>
        </dl>
      </dd>
    </dl>
  </div>
)

const CommandLs = () => (
  <div className="grid gap-5 grid-cols-4">
    <div className="col-span-1 hover:underline cursor-pointer">README.md</div>
    <div className="col-span-1 hover:underline cursor-pointer">stack.md</div>
  </div>
)
