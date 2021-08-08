const OutputHelp = () => (
  <div className="border-2 border-dashed border-yellow-300 bg-yellow-300 bg-opacity-10 p-2">
    <dl>
      <dt>Welcome to the krall.dev terminal. Run any of the following commands to find learn more.</dt>

      <dd className="mt-2 ml-4">
        <dl>
          <dt className="text-blue-400">cd {'<dir>'}</dt>
          <dd className="ml-4 mb-2">Open a directory.</dd>

          <dt className="text-blue-400">clear</dt>
          <dd className="ml-4 mb-2">Clear the terminal.</dd>

          <dt className="text-blue-400">ls</dt>
          <dd className="ml-4 mb-2">List files in the current directory.</dd>

          <dt className="text-blue-400">open {'<program>'}</dt>
          <dd className="ml-4 mb-2">
            If you're in a directory with programs, run this command to open the program.
          </dd>

          <dt className="text-blue-400">close</dt>
          <dd className="ml-4 mb-2">Closes whatever program is open.</dd>

          <dt className="text-blue-400">whoami</dt>
          <dd className="ml-4">Find out more about me.</dd>
        </dl>
      </dd>
    </dl>
  </div>
)

export default OutputHelp
