'use server'

import { getUserByIdRequest } from '../requests/get-user-by-id-request'

export async function getUserByIdAction(id: string) {
  try {
    const user = await getUserByIdRequest(id)
    return { data: user, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Usuário não encontrado' }
  }
}
