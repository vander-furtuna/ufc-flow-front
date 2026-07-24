'use client'

import { useQuery } from '@tanstack/react-query'
import { getHubPostsAction } from '../services/actions'
import { HUB_POSTS_QUERY_KEY } from '../constants/query-keys'

export function useHubPosts() {
  return useQuery({
    queryKey: [HUB_POSTS_QUERY_KEY],
    queryFn: async () => {
      const res = await getHubPostsAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
