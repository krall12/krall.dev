import React from 'react'
import cn from 'classnames'
import { useAtom } from 'jotai'
import { selectedProgramAtom, selectedWindowAtom } from 'atoms'
import { useUpdateAtom } from 'jotai/utils'

interface WindowProps {
  title: string
  type: 'terminal' | 'program'
  className?: string
  children: React.ReactNode
}

export default function Window(props: WindowProps) {
  const [selectedWindow, setSelectedWindow] = useAtom(selectedWindowAtom)
  const setSelectedProgram = useUpdateAtom(selectedProgramAtom)

  const closeWindow = (event: { stopPropagation: () => void }) => {
    event.stopPropagation()
    setSelectedWindow('terminal')
    setSelectedProgram('')
  }

  return (
    <div
      onClick={() => setSelectedWindow(props.type)}
      className={cn(
        'bg-black bg-opacity-90 w-[600px] rounded-lg fixed flex flex-col top-5 left-5 h-5/6 hover:cursor-text transition-opacity',
        selectedWindow === props.type ? 'relative z-10 shadow-lg ' : 'opacity-50',
        props.className
      )}
    >
      <header className="flex items-center justify-between p-2 bg-gray-700 rounded-t-lg">
        <div className="flex flex-1 items-center space-x-2">
          <button onClick={closeWindow} className="bg-red-500 hover:bg-red-400 h-3 w-3 block rounded-full" />
          <button className="bg-yellow-500 hover:bg-yellow-400 h-3 w-3 block rounded-full" />
          <button className="bg-green-500 hover:bg-green-400 h-3 w-3 block rounded-full" />
        </div>

        <div>
          <h1 className="text-xs text-gray-100">{props.title}</h1>
        </div>

        <div className="flex-1" />
      </header>

      {props.children}
    </div>
  )
}
