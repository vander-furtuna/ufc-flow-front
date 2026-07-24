'use client'

import { useQuery } from '@tanstack/react-query'
import { getUserByIdAction } from '../services/actions'
import { USER_QUERY_KEY } from '../constants/query-keys'

export function useUser(id: string) {
  return useQuery({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: async () => {
      const res = await getUserByIdAction(id)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    enabled: Boolean(id),
  })
}
