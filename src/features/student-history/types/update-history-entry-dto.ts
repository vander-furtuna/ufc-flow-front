import { HistoryStatus } from './history-status'

export interface UpdateHistoryEntryDto {
  status?: HistoryStatus
  finalGrade?: number
  periodDone?: string
}
