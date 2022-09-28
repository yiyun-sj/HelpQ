import { Button, Pane, TextInput } from 'evergreen-ui'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import Link from 'next/link'
import { ChangeEvent, useContext, useState } from 'react'
import { UserContext } from '../constants/contexts'
import { createUser, updateUserName } from '../services/users'

const auth = getAuth()
const provider = new GoogleAuthProvider()

export default function AdminBar() {
  const user = useContext(UserContext)
  const [name, setName] = useState('')
  const signIn = () => {
    signOut(auth)
    signInWithPopup(auth, provider)
      .then((authUser) =>
        createUser({
          userId: authUser.user.uid,
          name: authUser.user.displayName ?? authUser.user.email ?? '',
          isAdmin: true,
        })
      )
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }
  return (
    <Pane display='flex' width='100%' position='sticky' padding={8} gap={8}>
      {user?.isAdmin ? (
        <>
          <Link href='/admin'>
            <Button>{user.name ? `${user.name}'s ` : ''}Admin Dashboard</Button>
          </Link>
          <Pane style={{ flex: 1 }} />
          <TextInput
            placeholder='Enter name'
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.currentTarget.value)
            }
            value={name}
          />
          <Button onClick={() => updateUserName({ userId: user.id, name })}>
            Update Name
          </Button>
          <Pane borderRight='1px solid gray' />
          <Button onClick={() => signOut(auth)}>Sign Out</Button>
        </>
      ) : (
        <>
          <Pane style={{ flex: 1 }} />
          <Button onClick={() => signIn()}>Sign In as Admin</Button>
        </>
      )}
    </Pane>
  )
}
