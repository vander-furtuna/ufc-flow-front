'use client'

import { useQuery } from '@tanstack/react-query'
import { getForumMessagesAction } from '../services/actions'
import { FORUM_MESSAGES_QUERY_KEY } from '../constants/query-keys'

export function useForumMessages() {
  return useQuery({
    queryKey: [FORUM_MESSAGES_QUERY_KEY],
    queryFn: async () => {
      const res = await getForumMessagesAction()
      if (res.error) throw new Error(res.error)
      return res.data
    },
  })
}
