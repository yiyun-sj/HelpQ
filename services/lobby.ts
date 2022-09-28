import { addDoc, collection, Timestamp } from 'firebase/firestore'
import db from '../constants/firebase'

export async function createLobby() {
  const docRef = await addDoc(collection(db, 'lobbies'), {
    created: Timestamp.now(),
  })

  return docRef
}

export function listenToLobby() {
  return undefined
}
