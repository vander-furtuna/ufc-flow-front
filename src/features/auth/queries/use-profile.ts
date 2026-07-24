'use client'

import { useQuery } from '@tanstack/react-query'
import { getProfileAction } from '../services/actions'
import { AUTH_PROFILE_QUERY_KEY } from '../constants/query-keys'

export function useProfile() {
  return useQuery({
    queryKey: [AUTH_PROFILE_QUERY_KEY],
    queryFn: async () => {
      return getProfileAction()
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}
