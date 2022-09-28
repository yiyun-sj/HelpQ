import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { Dispatch, SetStateAction } from 'react'
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

export function listenToLobbies({
  cb,
}: {
  cb: Dispatch<SetStateAction<Lobby[]>>
}) {
  return onSnapshot(collection(db, 'lobbies'), (query) => {
    cb(query.docs.map((docu) => ({ id: docu.id, ...docu.data() } as Lobby)))
  })
}
