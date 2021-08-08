import { useAtom } from 'jotai'
import { terminalValueAtom } from 'atoms'
import commands from 'utils/commands'

const OutputHelp = () => {
  const [_, setTerminalValue] = useAtom(terminalValueAtom)

  return (
    <div className="border-2 border-dashed border-yellow-300 bg-yellow-300 bg-opacity-10 p-2">
      <dl>
        <dt>Welcome to the krall.dev terminal. Run any of the following commands to find learn more.</dt>

        <dd className="mt-2 ml-4">
          <dl>
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
        </dd>
      </dl>
    </div>
  )
}

export default OutputHelp
