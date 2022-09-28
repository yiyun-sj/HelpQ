import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useContext, useState } from 'react'
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
    <div style={{ display: 'flex', width: '100%', position: 'sticky' }}>
      {user?.isAdmin ? (
        <>
          <input
            placeholder='Enter name'
            onChange={(e) => setName(e.currentTarget.value)}
            value={name}
          />
          <button
            type='submit'
            onClick={() => updateUserName({ userId: user.id, name })}
          >
            Update Name
          </button>
          <div style={{ flex: 1 }} />
          <button type='submit' onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <div style={{ flex: 1 }} />
          <button type='submit' onClick={() => signIn()}>
            Sign In as Admin
          </button>
        </>
      )}
    </div>
  )
}
