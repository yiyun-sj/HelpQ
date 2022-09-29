import { Card, Pane, Text } from 'evergreen-ui'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../constants/contexts'
import { listenToLobbies } from '../services/lobby'
import { Lobby } from '../types/lobby'

export default function Admin() {
  const user = useContext(UserContext)

  const [lobbies, setLobbies] = useState<Lobby[]>([])

  useEffect(() => listenToLobbies({ cb: setLobbies }), [])

  if (!user?.isAdmin)
    return (
      <div>
        Not admin. Please sign in as admin or go <Link href='/'>Home</Link>
      </div>
    )

  return (
    <Pane
      flex={1}
      width='100%'
      padding={16}
      display='flex'
      flexWrap='wrap'
      gap={16}
    >
      {lobbies.map((lobby, index) => (
        <Link key={lobby.id} href={`/lobbies/${lobby.id}`}>
          <Card
            background='white'
            width={400}
            height={300}
            hoverElevation={2}
            cursor='pointer'
            display='grid'
            placeItems='center'
          >
            <Text>Lobby {index}</Text>
          </Card>
        </Link>
      ))}
    </Pane>
  )
}
