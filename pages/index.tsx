import { IconButton, SmallPlusIcon, Text, toaster, Tooltip } from 'evergreen-ui'
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
    toaster.success('Lobby created')
    router.push(`/lobbies/${lobby.id}`)
  }

  if (!user) {
    return <Text>Not a user!</Text>
  }

  return (
    <Tooltip content='Create lobby'>
      <IconButton
        icon={SmallPlusIcon}
        iconSize={100}
        onClick={handleCreateLobby}
        width={400}
        height={300}
      />
    </Tooltip>
  )
}
