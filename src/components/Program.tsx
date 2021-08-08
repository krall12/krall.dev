import React from 'react'
import { useAtom } from 'jotai'
import { selectedProgramAtom } from 'atoms'

export default function Program() {
  const [selectedProgram, setSelectedProgram] = useAtom(selectedProgramAtom)

  if (!selectedProgram) {
    return null
  }

  return (
    <div className="bg-gray-800 bg-opacity-90 w-[600px] rounded-lg shadow-lg fixed flex flex-col top-8 right-5 hover:cursor-text animate-fade-in">
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

      <div className="p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat delectus eligendi maxime nisi
        laboriosam! Harum laboriosam illum debitis reprehenderit! Ea fugit itaque, porro repellendus sit hic
        quia laudantium pariatur ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
        delectus eligendi maxime nisi laboriosam! Harum laboriosam illum debitis reprehenderit! Ea fugit
        itaque, porro repellendus sit hic quia laudantium pariatur ullam? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Fugiat delectus eligendi maxime nisi laboriosam! Harum laboriosam illum
        debitis reprehenderit! Ea fugit itaque, porro repellendus sit hic quia laudantium pariatur ullam?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat delectus eligendi maxime nisi
        laboriosam! Harum laboriosam illum debitis reprehenderit! Ea fugit itaque, porro repellendus sit hic
        quia laudantium pariatur ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
        delectus eligendi maxime nisi laboriosam! Harum laboriosam illum debitis reprehenderit! Ea fugit
        itaque, porro repellendus sit hic quia laudantium pariatur ullam? Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Fugiat delectus eligendi maxime nisi laboriosam! Harum laboriosam illum
        debitis reprehenderit! Ea fugit itaque, porro repellendus sit hic quia laudantium pariatur ullam?
      </div>
    </div>
  )
}
