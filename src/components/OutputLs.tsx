import { selectedProgramAtom } from 'atoms'
import { useAtom } from 'jotai'
import files from 'utils/files'

const OutputLs = () => {
  const [, setSelectedProgram] = useAtom(selectedProgramAtom)

  return (
    <div className="grid gap-3 grid-cols-4 ml-4">
      {files.map((file) => (
        <button
          onClick={() => setSelectedProgram(file.filename)}
          className="text-left col-span-1 hover:underline cursor-pointer"
        >
          {file.filename}
        </button>
      ))}
    </div>
  )
}

export default OutputLs
