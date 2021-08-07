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

      <main onClick={handleTerminalClick} className="flex-1 relative p-2 overflow-x-auto overscroll-contain">
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
  stdout: string[]
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
      handleSubmitInput: assign((ctx, { payload }) => {
        return { stdout: [...ctx.stdout, ctx.inputValue], inputValue: '' }
      }),
    },
  }
)
