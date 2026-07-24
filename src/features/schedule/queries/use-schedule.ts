'use client'

import { useQuery } from '@tanstack/react-query'
import { getScheduleByIdAction } from '../services/actions'
import { SCHEDULE_QUERY_KEY } from '../constants/query-keys'

export function useSchedule(id: string) {
  return useQuery({
    queryKey: [SCHEDULE_QUERY_KEY, id],
    queryFn: async () => {
      const res = await getScheduleByIdAction(id)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    enabled: Boolean(id),
  })
}
