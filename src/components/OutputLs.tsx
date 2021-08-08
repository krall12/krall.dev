import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectedProgramAtom } from 'atoms'
import { useAtom } from 'jotai'
import files from 'utils/files'

const OutputLs = () => {
  const [, setSelectedProgram] = useAtom(selectedProgramAtom)

  return (
    <div className="grid gap-3 grid-cols-4 ml-4">
      {files.map((file) =>
        file.externalLink ? (
          <a
            target="_blank"
            href={file.externalLink}
            className="flex items-center text-left col-span-1 hover:underline"
          >
            {file.filename}
            {file.icon && <FontAwesomeIcon icon={file.icon} className="ml-1" size="xs" />}
          </a>
        ) : (
          <button
            onClick={() => setSelectedProgram(file.filename)}
            className="flex items-center text-left col-span-1 hover:underline"
          >
            {file.filename}
            {file.icon && <FontAwesomeIcon icon={file.icon} className="ml-1" size="xs" />}
          </button>
        )
      )}
    </div>
  )
}

export default OutputLs
