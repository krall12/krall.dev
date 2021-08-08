import React from 'react'
import Terminal from 'components/Terminal'
import Window from 'components/Window'

export default function Home() {
  return (
    <main className="relative h-screen">
      <Terminal />
      <Window />
    </main>
  )
}
