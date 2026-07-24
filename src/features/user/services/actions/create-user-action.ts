'use server'

import { createUserRequest } from '../requests/create-user-request'
import { CreateUserDto } from '../../types'

export async function createUserAction(dto: CreateUserDto) {
  try {
    const user = await createUserRequest(dto)
    return { data: user, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar usuário' }
  }
}
