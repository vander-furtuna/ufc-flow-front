'use server'

import {
  getUsersRequest,
  getUserByIdRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
} from './index'
import { CreateUserDto, UpdateUserDto } from '../types'

export async function getUsersAction() {
  try {
    const users = await getUsersRequest()
    return { data: users, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar usuários' }
  }
}

export async function getUserByIdAction(id: string) {
  try {
    const user = await getUserByIdRequest(id)
    return { data: user, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Usuário não encontrado' }
  }
}

export async function createUserAction(dto: CreateUserDto) {
  try {
    const user = await createUserRequest(dto)
    return { data: user, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar usuário' }
  }
}

export async function updateUserAction(id: string, dto: UpdateUserDto) {
  try {
    const res = await updateUserRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar usuário' }
  }
}

export async function deleteUserAction(id: string) {
  try {
    await deleteUserRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao deletar usuário' }
  }
}
