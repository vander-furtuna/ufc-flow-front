import { HistoryStatus } from './history-status'

export interface AddHistoryEntryDto {
  userCourseId: string
  structureSubjectId: string
  status: HistoryStatus
  finalGrade?: number
  periodDone: string
}
