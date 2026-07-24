'use client'

import { useQuery } from '@tanstack/react-query'
import { getUsersAction } from '../services/actions'
import { USERS_QUERY_KEY } from '../constants/query-keys'

export function useUsers() {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: async () => {
      const res = await getUsersAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
