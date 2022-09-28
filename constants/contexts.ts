import { createContext } from 'react'
import { User } from '../types/users'

// eslint-disable-next-line import/prefer-default-export
export const UserContext = createContext<User | undefined>(undefined)
