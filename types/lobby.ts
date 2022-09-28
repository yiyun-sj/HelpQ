import { Timestamp } from 'firebase/firestore'

export interface Lobby {
  id: string
  created: Timestamp
}
