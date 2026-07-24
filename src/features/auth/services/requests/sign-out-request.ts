import { api } from '@/lib/ky-api'

export async function signOutRequest(): Promise<void> {
  await api.post('auth/sign-out')
}
