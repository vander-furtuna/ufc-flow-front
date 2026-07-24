import { Role } from '@/features/auth/types'

export interface UserCourseRoleResponse {
  id: string
  registrationNumber: string
  isCurrent: boolean
  isVerified: boolean
  declarationUrl: string
  userId: string
  courseId: string
  roles: Role[]
}
