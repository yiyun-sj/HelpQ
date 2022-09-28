/* eslint-disable react/jsx-props-no-spreading */
import * as snippet from '@segment/snippet'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const loadSegment = () => {
    const options = {
      apiKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY,
    }
    if (process.env.NEXT_PUBLIC_NODE_ENV) {
      return snippet.max(options)
    }
    return snippet.min(options)
  }
  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id='segmentScript'
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
