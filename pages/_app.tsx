/* eslint-disable react/jsx-props-no-spreading */
import * as snippet from '@segment/snippet'
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100vh',
          }}
        >
          <AdminBar />
          <div style={{ flex: 1 }}>
            {user ? <Component {...pageProps} /> : <AnonSignIn />}
          </div>
        </div>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
