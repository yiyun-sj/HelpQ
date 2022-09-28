/* eslint-disable react/jsx-props-no-spreading */
import * as snippet from '@segment/snippet'
import { CourierProvider } from '@trycourier/react-provider'
import { Toast } from '@trycourier/react-toast'
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { UserContext } from '../constants/contexts'
import { createUser, listenToUser } from '../services/users'
import '../styles/globals.css'
import { User } from '../types/users'

const auth = getAuth()
const provider = new GoogleAuthProvider()

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

  const signIn = () => {
    signOut(auth)
    signInWithPopup(auth, provider)
      .then((authUser) =>
        createUser({
          userId: authUser.user.uid,
          name: authUser.user.displayName ?? authUser.user.email ?? '',
          isAdmin: true,
        })
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

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
          <button type='submit' onClick={() => signIn()}>
            Sign In as Admin
          </button>
          <Toast />
          <Component {...pageProps} />
        </CourierProvider>
      </UserContext.Provider>
    </>
  )
}

export default MyApp
