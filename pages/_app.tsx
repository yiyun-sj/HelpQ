/* eslint-disable react/jsx-props-no-spreading */
import * as snippet from '@segment/snippet'
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
import { createUser, listentoUser } from '../services/users'
import '../styles/globals.css'
import { User } from '../types/users'

const auth = getAuth()
const provider = new GoogleAuthProvider()

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
    () => listentoUser({ userId: authUserId, cb: setUser }),
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

      <UserContext.Provider value={user}>
        <button type='submit' onClick={() => signIn()}>
          Sign In as Admin
        </button>
        {/* <CourierProvider
      userId={props.userId}
      userSignature={computedUserHmac}
      clientKey={process.env.COURIER_CLIENT_KEY}
    >
      <Toast /> */}
        <Component {...pageProps} />
        {/* </CourierProvider> */}
      </UserContext.Provider>
    </>
  )
}

export default MyApp
