import { api } from '@/lib/ky-api'
import { Schedule } from '../../types'

export async function getSchedulesRequest(): Promise<Schedule[]> {
  return api.get('schedules').json<Schedule[]>()
}
