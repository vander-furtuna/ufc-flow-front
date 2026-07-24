'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteHistoryEntryAction } from '../services/actions'
import { MY_PROGRESS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useDeleteHistoryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteHistoryEntryAction(id)
      if (res.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROGRESS_QUERY_KEY] })
      toast.success('Disciplina removida do histórico!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao remover disciplina.')
    },
  })
}
