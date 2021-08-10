import React from 'react'
import Window from 'components/Window'
import { useAtomValue } from 'jotai/utils'
import { selectedProgramAtom } from 'atoms'
import files from 'utils/files'

export default function Program() {
  const selectedProgram = useAtomValue(selectedProgramAtom)

  if (!selectedProgram) {
    return null
  }

  const content = files.find((file) => file.filename === selectedProgram).windowComponent

  return <Window title={selectedProgram} type="program" className="left-36 top-12" children={content()} />
}
