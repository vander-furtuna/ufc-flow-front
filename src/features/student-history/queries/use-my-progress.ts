'use client'

import { useQuery } from '@tanstack/react-query'
import { getMyProgressAction } from '../services/actions'
import { MY_PROGRESS_QUERY_KEY } from '../constants/query-keys'

export function useMyProgress() {
  return useQuery({
    queryKey: [MY_PROGRESS_QUERY_KEY],
    queryFn: async () => {
      const res = await getMyProgressAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
