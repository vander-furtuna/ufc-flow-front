'use server'

import { getUsersRequest } from '../requests/get-users-request'

export async function getUsersAction() {
  try {
    const users = await getUsersRequest()
    return { data: users, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar usuários' }
  }
}
