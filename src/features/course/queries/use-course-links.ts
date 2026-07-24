'use client'

import { useQuery } from '@tanstack/react-query'
import { getCourseLinksAction } from '../services/actions'
import { COURSE_LINKS_QUERY_KEY } from '../constants/query-keys'

export function useCourseLinks() {
  return useQuery({
    queryKey: [COURSE_LINKS_QUERY_KEY],
    queryFn: async () => {
      const res = await getCourseLinksAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
