import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import db from '../constants/firebase'
import { Lobby } from '../types/lobby'

export async function createLobby() {
  const docRef = await addDoc(collection(db, 'lobbies'), {
    created: Timestamp.now(),
  })

  return docRef
}

export function listenToLobby({
  lobbyId,
  onLobbyChange,
}: {
  lobbyId: string
  onLobbyChange: (updatedLobby: Lobby | undefined) => void
}) {
  return onSnapshot(doc(db, 'lobbies', lobbyId), (docSnapshot) => {
    if (!docSnapshot.data()) {
      onLobbyChange(undefined)
    } else {
      onLobbyChange({
        id: docSnapshot.id,
        ...docSnapshot.data(),
      } as unknown as Lobby)
    }
  })
}
