import Image from 'next/image'

const OutputWhoAmI = () => (
  <div className="flex items-start p-3 border-2 border-dashed border-blue-400 bg-blue-500 bg-opacity-10">
    <div className="rounded-lg border border-blue-400 overflow-hidden flex items-center justify-center">
      <Image
        height={280}
        width={280}
        alt="Picture of myself in a monochromatic filter"
        src="https://avatars.githubusercontent.com/u/17836325?v=4"
      />
    </div>

    <div className="ml-3">
      <p className="text-base font-bold text-blue-500 mb-2">Hi, I am Benjamin Krall</p>

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
