'use server'

import { cookies } from 'next/headers'
import { signOutRequest } from '../requests/sign-out-request'

export async function signOutAction() {
  const cookieStore = await cookies()

  try {
    await signOutRequest()
  } catch {}

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  cookieStore.delete('userSession')

  return { success: true }
}
