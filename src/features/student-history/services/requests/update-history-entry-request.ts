import { api } from '@/lib/ky-api'
import { UpdateHistoryEntryDto } from '../../types'

export async function updateHistoryEntryRequest(
  id: string,
  dto: UpdateHistoryEntryDto,
): Promise<{ message: string }> {
  return api
    .patch(`student-histories/progress/${id}`, { json: dto })
    .json<{ message: string }>()
}
