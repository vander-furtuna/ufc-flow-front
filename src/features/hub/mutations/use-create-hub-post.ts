'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createHubPostAction } from '../services/actions'
import { CreateHubPostDto } from '../types'
import { HUB_POSTS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useCreateHubPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: CreateHubPostDto) => {
      const res = await createHubPostAction(dto)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [HUB_POSTS_QUERY_KEY] })
      toast.success('Publicação criada no Hub!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar publicação.')
    },
  })
}
