import { HistoryStatus } from './history-status'

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
