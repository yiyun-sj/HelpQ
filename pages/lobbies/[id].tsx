import { useEffect, useState } from 'react'
import { listenToLobby } from '../../services/lobby'
import { Lobby } from '../../types/lobby'

export default function LobbyPage() {
  const [currentLobby, setCurrentLobby] = useState<Lobby>()

  const lobbyId = '123'

  useEffect(() => {
    if (!lobbyId) return undefined
    return listenToLobby({ lobbyId, onLobbyChange: setCurrentLobby })
  }, [lobbyId])

  if (!currentLobby) return <div>No lobby found</div>

  return <div>got a lobby</div>
}
