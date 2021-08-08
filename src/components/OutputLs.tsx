import { selectedProgramAtom } from 'atoms'
import { useAtom } from 'jotai'

const OutputLs = () => {
  const [, setSelectedProgram] = useAtom(selectedProgramAtom)

  return (
    <div className="grid gap-5 grid-cols-4">
      <button
        onClick={() => setSelectedProgram('README.md')}
        className="col-span-1 hover:underline cursor-pointer"
      >
        README.md
      </button>
      <button
        onClick={() => setSelectedProgram('stack.md')}
        className="col-span-1 hover:underline cursor-pointer"
      >
        stack.md
      </button>
    </div>
  )
}

export default OutputLs
