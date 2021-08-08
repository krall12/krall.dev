import Head from 'next/head'
import React from 'react'
import { config, dom } from '@fortawesome/fontawesome-svg-core'
import 'tailwindcss/tailwind.css'

config.autoAddCss = false

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>krall.dev</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css" />
        <style>{dom.css()}</style>
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
