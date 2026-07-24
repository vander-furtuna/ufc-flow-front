'use client'

import { useQuery } from '@tanstack/react-query'
import { getSubjectsAction } from '../services/actions'
import { SUBJECTS_QUERY_KEY } from '../constants/query-keys'

export function useSubjects() {
  return useQuery({
    queryKey: [SUBJECTS_QUERY_KEY],
    queryFn: async () => {
      const res = await getSubjectsAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
