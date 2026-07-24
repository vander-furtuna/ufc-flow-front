'use client'

import { useQuery } from '@tanstack/react-query'
import { getSchedulesAction } from '../services/actions'
import { SCHEDULES_QUERY_KEY } from '../constants/query-keys'

export function useSchedules() {
  return useQuery({
    queryKey: [SCHEDULES_QUERY_KEY],
    queryFn: async () => {
      const res = await getSchedulesAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
