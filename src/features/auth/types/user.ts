import { UserCourseRole } from './user-course-role'

export interface User {
  id: string
  name: string
  email: string
  courseRoles?: UserCourseRole[]
}
