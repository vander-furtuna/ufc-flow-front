'use server'

import { deleteUserRequest } from '../requests/delete-user-request'

export async function deleteUserAction(id: string) {
  try {
    await deleteUserRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao deletar usuário' }
  }
}
