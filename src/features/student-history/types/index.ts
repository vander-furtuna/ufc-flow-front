import { Role } from '@/features/auth/types'

export type HistoryStatus = 'CONCLUIDA' | 'REPROVADA' | 'TRANCADA' | 'APROVEITADA'

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

export interface StudentHistoryProgressResponse {
  id: string
  status: HistoryStatus
  finalGrade?: number | null
  periodDone: string
  userCourseId: string
  structureSubjectId: string
  subjectCode: string
  subjectName: string
}

export interface AddHistoryEntryDto {
  userCourseId: string
  structureSubjectId: string
  status: HistoryStatus
  finalGrade?: number
  periodDone: string
}

export interface UpdateHistoryEntryDto {
  status?: HistoryStatus
  finalGrade?: number
  periodDone?: string
}
