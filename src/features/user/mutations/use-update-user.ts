'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserAction } from '../services/actions'
import { UpdateUserDto } from '../types'
import { USERS_QUERY_KEY, USER_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateUserDto }) => {
      const res = await updateUserAction(id, data)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY, id] })
      toast.success('Usuário atualizado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao atualizar usuário.')
    },
  })
}
