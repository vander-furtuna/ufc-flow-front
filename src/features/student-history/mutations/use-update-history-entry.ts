'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateHistoryEntryAction } from '../services/actions'
import { UpdateHistoryEntryDto } from '../types'
import { MY_PROGRESS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useUpdateHistoryEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateHistoryEntryDto }) => {
      const res = await updateHistoryEntryAction(id, data)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROGRESS_QUERY_KEY] })
      toast.success('Histórico atualizado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao atualizar histórico.')
    },
  })
}
