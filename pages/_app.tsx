/* eslint-disable react/jsx-props-no-spreading */
import * as snippet from '@segment/snippet'
import { CourierProvider } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'
import { Pane } from 'evergreen-ui'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import AdminBar from '../components/AdminBar'
import AnonSignIn from '../components/AnonSignIn'
import { UserContext } from '../constants/contexts'
import { listenToUser } from '../services/users'
import '../styles/globals.css'
import { User } from '../types/users'

const auth = getAuth()

function MyApp({ Component, pageProps }: AppProps) {
  const [authUserId, setAuthUserId] = useState('')
  const [user, setUser] = useState<User>()
  const [computedUserHmac, setComputedUserHmac] = useState('')

  onAuthStateChanged(auth, (authUser) => {
    if (authUser) {
      setAuthUserId(authUser.uid)
    } else {
      setAuthUserId('')
    }
  })
  useEffect(
    () => listenToUser({ userId: authUserId, cb: setUser }),
    [authUserId]
  )

  useEffect(() => {
    if (!authUserId) return
    fetch('/api/courierAuth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ authUserId }),
    })
      .then((res) => res.json())
      .then((res) => setComputedUserHmac(res.computedUserHmac))
  }, [authUserId])

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

      <UserContext.Provider value={user}>
        <CourierProvider
          userId={authUserId}
          userSignature={computedUserHmac}
          clientKey={process.env.COURIER_CLIENT_KEY}
        >
          <Toast />
          <Pane
            display='flex'
            flexDirection='column'
            width='100%'
            minHeight='100vh'
          >
            <AdminBar />
            <Pane
              flex={1}
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              gap={16}
            >
              {user ? <Component {...pageProps} /> : <AnonSignIn />}
            </Pane>
          </Pane>
        </CourierProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
