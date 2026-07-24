import { api } from '@/lib/ky-api'
import { UserResponse, CreateUserDto, UpdateUserDto } from '../types'

export async function getUsersRequest(): Promise<UserResponse[]> {
  return api.get('users').json<UserResponse[]>()
}

export async function getUserByIdRequest(id: string): Promise<UserResponse> {
  return api.get(`users/${id}`).json<UserResponse>()
}

export async function createUserRequest(data: CreateUserDto): Promise<UserResponse> {
  return api.post('users', { json: data }).json<UserResponse>()
}

export async function updateUserRequest(
  id: string,
  data: UpdateUserDto,
): Promise<{ message: string }> {
  return api.patch(`users/${id}`, { json: data }).json<{ message: string }>()
}

export async function deleteUserRequest(id: string): Promise<void> {
  await api.delete(`users/${id}`)
}
