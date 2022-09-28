import { useRouter } from 'next/router'
import useLobby from '../../hooks/useLobby'

export default function LobbyPage() {
  const { query } = useRouter()
  const lobbyId = query.id?.toString()

  const { lobby } = useLobby({ lobbyId })

  if (!lobby) return <div>No lobby found</div>

  return <div>got a lobby</div>
}
