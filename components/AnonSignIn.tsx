import { Button, Text, TextInput } from 'evergreen-ui'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { ChangeEvent, useState } from 'react'
import { createUser } from '../services/users'

export default function AnonSignIn() {
  const auth = getAuth()

  const [name, setName] = useState('')

  const signIn = () => {
    signInAnonymously(auth).then((authUser) =>
      createUser({ userId: authUser.user.uid, name, isAdmin: false })
    )
  }

  return (
    <>
      <Text size={600} fontWeight='bold'>
        Get Started with HelpQ!
      </Text>
      <TextInput
        placeholder='Enter your name'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setName(e.currentTarget.value)
        }
        value={name}
      />
      <Button appearance='primary' onClick={() => signIn()}>
        Confirm
      </Button>
    </>
  )
}
