import { getAuth, signInAnonymously } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../constants/contexts'
import { createLobby } from '../services/lobby'
import { createUser } from '../services/users'

export default function Home() {
  const user = useContext(UserContext)
  const router = useRouter()
  const auth = getAuth()

  const [name, setName] = useState('')

  useEffect(() => {
    window?.analytics?.page('testing')
  }, [])

  const handleCreateLobby = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const lobby = await createLobby()
    router.push(`/lobbies/${lobby.id}`)
  }

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
        <button type='button' onClick={handleCreateLobby}>
          Create lobby
        </button>
      </>
    )
  }

  return <div>Welcome!</div>
}
