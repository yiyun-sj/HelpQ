import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
import db from '../constants/firebase'
import { User } from '../types/users'

export const createUser = ({
  userId,
  name,
  isAdmin,
}: {
  userId: string
  name: string
  isAdmin: boolean
}) =>
  setDoc(doc(db, 'users', userId), {
    name,
    isAdmin,
  })

export const updateUserName = ({
  userId,
  name,
}: {
  userId: string
  name: string
}) =>
  updateDoc(doc(db, 'user', userId), {
    name,
  })

export const listenToUser = ({
  userId,
  cb,
}: {
  userId: string | undefined
  cb: Dispatch<SetStateAction<User | undefined>>
}) => {
  if (!userId) {
    cb(undefined)
    return
  }
  onSnapshot(doc(db, 'users', userId), (docRes) => {
    if (docRes.exists()) {
      cb({ id: docRes.id, ...docRes.data() } as User)
    } else {
      cb(undefined)
    }
  })
}
