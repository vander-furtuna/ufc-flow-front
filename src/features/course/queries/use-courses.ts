'use client'

import { useQuery } from '@tanstack/react-query'
import { getCoursesAction } from '../services/actions'
import { COURSES_QUERY_KEY } from '../constants/query-keys'

export function useCourses() {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY],
    queryFn: async () => {
      const res = await getCoursesAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
