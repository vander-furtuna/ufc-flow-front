import { Role } from '@/features/auth/types'

export interface CreateUserDto {
  name: string
  email: string
  password: string
  roles?: Role[]
  courseId?: string
  registrationNumber?: string
}
