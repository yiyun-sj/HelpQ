import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    window?.analytics?.page('testing')
  }, [])

  const handleCreateLobby = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    router.push('/lobbies/abc')
  }

  return (
    <button type='button' onClick={handleCreateLobby}>
      Create lobby
    </button>
  )
}
