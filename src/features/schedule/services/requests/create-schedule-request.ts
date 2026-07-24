import { api } from '@/lib/ky-api'
import { Schedule, CreateScheduleDto } from '../../types'

export async function createScheduleRequest(
  dto: CreateScheduleDto,
): Promise<Schedule> {
  return api.post('schedules', { json: dto }).json<Schedule>()
}
