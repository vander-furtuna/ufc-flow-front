'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUserAction } from '../services/actions'
import { CreateUserDto } from '../types'
import { USERS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUserDto) => {
      const res = await createUserAction(data)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_QUERY_KEY] })
      toast.success('Usuário criado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar usuário.')
    },
  })
}
