import { Role } from '@/features/auth/types'

export interface UserResponse {
  id: string
  name: string
  email: string
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
  roles?: Role[]
  courseId?: string
  registrationNumber?: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
  password?: string
}
