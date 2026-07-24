import { api } from '@/lib/ky-api'
import { Schedule } from '../../types'

export async function getScheduleByIdRequest(id: string): Promise<Schedule> {
  return api.get(`schedules/${id}`).json<Schedule>()
}
