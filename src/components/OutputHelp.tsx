import { useAtom } from 'jotai'
import { terminalValueAtom } from 'atoms'
import commands from 'utils/commands'

const OutputHelp = () => {
  const [_, setTerminalValue] = useAtom(terminalValueAtom)

  return (
    <div className="bg-yellow-300 bg-opacity-10 p-2">
      <p>Hey there. Welcome.</p>

      <dl className="ml-4 mt-2">
        {Object.entries(commands).map(([key, command]) =>
          command.helpLabel ? (
            <>
              <dt className="text-blue-400">
                <button onClick={() => setTerminalValue(key)} className="hover:underline">
                  {command.helpLabel}
                </button>
              </dt>
              <dd className="ml-4 mb-2">{command.helpDescription}</dd>
            </>
          ) : null
        )}
      </dl>
    </div>
  )
}

export default OutputHelp
