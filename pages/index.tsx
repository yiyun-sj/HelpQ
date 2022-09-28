import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { UserContext } from '../constants/contexts'
import SegmentEvents from '../constants/segments'
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

    window.analytics?.track(SegmentEvents.LOBBY_CREATED)

    router.push(`/lobbies/${lobby.id}`)
  }

  if (!user) {
    return <div>Not a user!</div>
  }

  return (
    <button type='button' onClick={handleCreateLobby}>
      Create lobby
    </button>
  )
}
