import Head from 'next/head'
import React from 'react'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>krall.dev</title>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack-subset.css" />
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  )
}

export default MyApp
