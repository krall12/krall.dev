import cn from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectedProgramAtom } from 'atoms'
import { useAtom } from 'jotai'
import files from 'utils/files'

const OutputLs = () => {
  const [selectedProgram, setSelectedProgram] = useAtom(selectedProgramAtom)

  return (
    <div className="grid gap-2 grid-cols-4 ml-4">
      {files.map((file) =>
        file.externalLink ? (
          <a
            key={file.filename}
            target="_blank"
            href={file.externalLink}
            className="flex items-center p-1 text-left col-span-1 hover:underline"
          >
            {file.filename}
            {file.icon && <FontAwesomeIcon icon={file.icon} className="ml-1" size="xs" />}
          </a>
        ) : (
          <button
            key={file.filename}
            onClick={() => setSelectedProgram(file.filename)}
            className={cn(
              'flex items-center p-1 text-left col-span-1 hover:underline',
              selectedProgram === file.filename && 'bg-green-800'
            )}
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
