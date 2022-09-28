import { getAuth, signInAnonymously } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../constants/contexts'
import { createUser } from '../services/users'

const auth = getAuth()

export default function Home() {
  const user = useContext(UserContext)

  const [name, setName] = useState('')

  useEffect(() => {
    // @ts-ignore
    window?.analytics?.page('testing')
  }, [])

  const signIn = () => {
    signInAnonymously(auth).then((authUser) =>
      createUser({ userId: authUser.user.uid, name, isAdmin: false })
    )
  }

  if (!user) {
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

  return <div>Welcome!</div>
}
