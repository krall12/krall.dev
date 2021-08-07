import React, { useRef } from 'react'
import { createMachine, assign } from 'xstate'
import { useMachine } from '@xstate/react'

export default function Terminal() {
  const inputRef = useRef(null)
  const [state, send] = useMachine(terminalMachine, {
    context: {
      inputRef,
      inputValue: '',
      currentDir: '~',
      stdout: [`Last login: ${new Date().toLocaleString()}`],
    },
  })

  const handleTerminalClick = () => {
    if (document.activeElement !== inputRef.current) inputRef.current?.focus()
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
        {state.context.stdout.map((line, key) => (
          <div key={key}>{line}</div>
        ))}
      </main>

      <div
        onClick={handleTerminalClick}
        className="flex items-center border-2 border-transparent p-3 focus-within:border-green-500 rounded-b-lg"
      >
        <span className="text-blue-300">{state.context.currentDir}</span>
        <input
          ref={inputRef}
          type="text"
          className="ml-2 flex-1 font-light bg-black block w-full"
          value={state.context.inputValue}
          onChange={(event) => send({ type: 'INPUT_CHANGE', payload: event.target.value })}
          onKeyUp={(event) => {
            if (event.key === 'Enter') send({ type: 'SUBMIT_INPUT' })
          }}
        />
      </div>
    </div>
  )
}

interface TerminalContext {
  inputRef: any
  inputValue: string
  currentDir: string
  stdout: React.ReactNode[]
}

const terminalMachine = createMachine<TerminalContext>(
  {
    id: 'terminal-machine',
    initial: 'input_focused',
    states: {
      input_focused: {
        on: {
          INPUT_CHANGE: {
            actions: ['handleInputChange'],
          },
          SUBMIT_INPUT: {
            actions: ['handleSubmitInput'],
          },
        },
      },
    },
  },
  {
    actions: {
      handleInputChange: assign((ctx, { payload }) => {
        return { inputValue: payload }
      }),
      handleSubmitInput: assign((ctx) => {
        const command = ctx.inputValue.split(' ')[0]

        switch (command) {
          case 'ls':
            return { stdout: [...ctx.stdout, ctx.inputValue], inputValue: '' }

          case 'whoami':
            return {
              stdout: [...ctx.stdout, `> ${ctx.inputValue}`, <CommandWhoAmI />],
              inputValue: '',
            }

          default:
            return {
              stdout: [...ctx.stdout, <CommandNotFound command={command} />],
              inputValue: '',
            }
        }
      }),
    },
  }
)

const CommandNotFound = ({ command }) => (
  <div className="text-red-500">krall.dev: command not found: ${command}</div>
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
