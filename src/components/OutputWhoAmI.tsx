const OutputWhoAmI = () => (
  <div className="flex items-center p-2 border-2 border-dashed border-blue-400 bg-blue-500 bg-opacity-10">
    <img
      src="https://avatars.githubusercontent.com/u/17836325?v=4"
      className="h-20 w-20 object-contain rounded-lg border-2 border-blue-400"
    />

    <div className="ml-3">
      <p className="text-base font-bold text-blue-500">Benjamin Krall</p>

      <p className="text-gray-300">
        I build apps with JavaScript. Sometimes I put them on the internet and other times I put them on an
        App Store. If you're interested in working with me or learning more about the cool shit I build you
        can reach out to anytime at{' '}
        <a target="_blank" href="mailto:benjaminkrall@gmail.com" className="underline">
          benjaminkrall@gmail.com
        </a>
      </p>
    </div>
  </div>
)

export default OutputWhoAmI
