'use client'

import { useQuery } from '@tanstack/react-query'
import { getCourseByIdentifierAction } from '../services/actions'
import { COURSE_QUERY_KEY } from '../constants/query-keys'

export function useCourse(identifier: string) {
  return useQuery({
    queryKey: [COURSE_QUERY_KEY, identifier],
    queryFn: async () => {
      const res = await getCourseByIdentifierAction(identifier)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    enabled: Boolean(identifier),
  })
}
