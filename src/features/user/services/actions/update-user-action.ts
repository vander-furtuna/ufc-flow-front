'use server'

import { updateUserRequest } from '../requests/update-user-request'
import { UpdateUserDto } from '../../types'

export async function updateUserAction(id: string, dto: UpdateUserDto) {
  try {
    const res = await updateUserRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar usuário' }
  }
}
