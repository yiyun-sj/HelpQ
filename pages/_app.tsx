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

  // const [computedUserHmac, setComputedUserHmac] = useState('')
  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch('/api/courierAuth')
  //     .then((res) => res.json())
  //     .then(setComputedUserHmac)
  //     .finally(() => setIsLoading(false))
  // }, [])

  return (
    <>
      <Script
        dangerouslySetInnerHTML={{ __html: loadSegment() }}
        id='segmentScript'
      />

      {/* <CourierProvider
      userId={props.userId}
      userSignature={computedUserHmac}
      clientKey={process.env.COURIER_CLIENT_KEY}
    >
      <Toast /> */}
      <Component {...pageProps} />
      {/* </CourierProvider> */}
    </>
  )
}

export default MyApp
