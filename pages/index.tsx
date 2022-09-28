import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../constants/contexts'
import { createLobby } from '../services/lobby'

export default function Home() {
  const user = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    window?.analytics?.page('testing')
  }, [])

  const handleCreateLobby = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const lobby = await createLobby()
    router.push(`/lobbies/${lobby.id}`)
  }

  if (!user) {
    return (
      <button type='button' onClick={handleCreateLobby}>
        Create lobby
      </button>
    )
  }

  return <div>Welcome!</div>
}
