import { Card, Pane, Text, TextInput } from 'evergreen-ui'
import { useRouter } from 'next/router'
import useLobby from '../../hooks/useLobby'

export default function LobbyPage() {
  const { query } = useRouter()
  const lobbyId = query.id?.toString()

  const { lobby } = useLobby({ lobbyId })

  if (!lobby) return <Text>No lobby found</Text>

  return (
    <Card
      background='white'
      flex={1}
      margin={32}
      width='80%'
      padding={16}
      display='flex'
      flexDirection='column'
      gap={16}
    >
      <Text>Lobby Id: {lobby.id}</Text>
      <Pane borderBottom='1px solid gray' />
      <Pane flex={1} />
      <TextInput placeholder='Enter Message' width='100%' />
    </Card>
  )
}
