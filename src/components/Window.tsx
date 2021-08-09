import React from 'react'
import { useAtom } from 'jotai'
import { selectedProgramAtom } from 'atoms'
import files from 'utils/files'

export default function Window() {
  const [selectedProgram, setSelectedProgram] = useAtom(selectedProgramAtom)

  if (!selectedProgram) {
    return null
  }

  const WindowComponent = files.find((file) => file.filename === selectedProgram).windowComponent

  if (!WindowComponent) {
    return null
  }

  return (
    <div className="bg-gray-800 mx-auto bg-opacity-90 w-[600px] rounded-lg shadow-lg fixed flex flex-col top-8 left-1/4 overflow-hidden hover:cursor-text animate-fade-in">
      <header className="flex items-center justify-between p-2 bg-gray-700 rounded-t-lg">
        <div className="flex flex-1 items-center space-x-2">
          <button
            onClick={() => setSelectedProgram('')}
            className="bg-red-500 hover:bg-red-400 h-3 w-3 block rounded-full"
          />
          <button className="bg-yellow-500 hover:bg-yellow-400 h-3 w-3 block rounded-full" />
          <button className="bg-green-500 hover:bg-green-400 h-3 w-3 block rounded-full" />
        </div>

        <div>
          <h1 className="text-xs text-gray-100">{selectedProgram}</h1>
        </div>

        <div className="flex-1" />
      </header>

      <section>
        <WindowComponent />
      </section>
    </div>
  )
}
