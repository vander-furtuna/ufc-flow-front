'use server'

import { cookies } from 'next/headers'
import { User } from '../../types'

export async function getCurrentUserAction(): Promise<User | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get('userSession')?.value

  if (!session) return null

  try {
    return JSON.parse(session) as User
  } catch {
    return null
  }
}
