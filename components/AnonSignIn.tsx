import { getAuth, signInAnonymously } from 'firebase/auth'
import { useState } from 'react'
import { createUser } from '../services/users'

export default function AnonSignIn() {
  const auth = getAuth()

  const [name, setName] = useState('')

  const signIn = () => {
    signInAnonymously(auth).then((authUser) =>
      createUser({ userId: authUser.user.uid, name, isAdmin: false })
    )
  }

  return (
    <>
      <input
        placeholder='Enter your name'
        onChange={(e) => setName(e.currentTarget.value)}
        value={name}
      />
      <button type='submit' onClick={() => signIn()}>
        Confirm
      </button>
    </>
  )
}
