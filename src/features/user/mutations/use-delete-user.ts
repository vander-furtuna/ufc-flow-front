'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUserAction } from '../services/actions'
import { USERS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteUserAction(id)
      if (res.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      toast.success('Usuário excluído com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao excluir usuário.')
    },
  })
}
