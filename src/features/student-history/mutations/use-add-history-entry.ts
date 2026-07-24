'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addHistoryEntryAction } from '../services/actions'
import { AddHistoryEntryDto } from '../types'
import { MY_PROGRESS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useAddHistoryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: AddHistoryEntryDto) => {
      const res = await addHistoryEntryAction(dto)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROGRESS_QUERY_KEY] })
      toast.success('Disciplina adicionada ao histórico!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao adicionar disciplina.')
    },
  })
}
