import { api } from '@/lib/ky-api'
import { UpdateScheduleDto } from '../../types'

export async function updateScheduleRequest(
  id: string,
  dto: UpdateScheduleDto,
): Promise<{ message: string }> {
  return api.patch(`schedules/${id}`, { json: dto }).json<{ message: string }>()
}
