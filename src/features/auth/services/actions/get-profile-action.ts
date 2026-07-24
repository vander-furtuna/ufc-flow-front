'use server'

import { getProfileRequest } from '../requests/get-profile-request'
import { User } from '../../types'

export async function getProfileAction(): Promise<User | null> {
  try {
    return await getProfileRequest()
  } catch {
    return null
  }
}
