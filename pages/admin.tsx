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
    <div>
      {lobbies.map((lobby, index) => (
        <Link key={lobby.id} href={`/lobbies/${lobby.id}`}>
          <div>Lobby {index}</div>
        </Link>
      ))}
    </div>
  )
}
