import { User } from './user'

export interface SignInResponse {
  user: User
  accessToken: string
  refreshToken: string
}
