import { useEffect, useState } from 'react'
import { listenToLobby } from '../services/lobby'
import { Lobby } from '../types/lobby'

export default function useLobby({ lobbyId }: { lobbyId: string | undefined }) {
  const [lobby, setLobby] = useState<Lobby>()

  useEffect(() => {
    if (!lobbyId) return undefined
    return listenToLobby({ lobbyId, onLobbyChange: setLobby })
  }, [lobbyId])

  return { lobby }
}
