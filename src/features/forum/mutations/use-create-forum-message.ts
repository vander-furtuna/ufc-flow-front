'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createForumMessageAction } from '../services/actions'
import { CreateForumMessageDto } from '../types'
import { FORUM_MESSAGES_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useCreateForumMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: CreateForumMessageDto) => {
      const res = await createForumMessageAction(dto)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [FORUM_MESSAGES_QUERY_KEY] })
      toast.success('Mensagem enviada no fórum!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao enviar mensagem.')
    },
  })
}
