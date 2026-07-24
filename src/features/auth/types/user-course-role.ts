import { Role } from './role'

export interface UserCourseRole {
  id: string
  registrationNumber: string | null
  roles: Role[]
  isCurrent: boolean
  declarationUrl: string | null
  isVerified: boolean
  userId: string
  courseId: string
}
