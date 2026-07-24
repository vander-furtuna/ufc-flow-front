'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { linkCourseAction } from '../services/actions'
import { MY_PROGRESS_QUERY_KEY } from '../constants/query-keys'
import { AUTH_USER_QUERY_KEY } from '@/features/auth/constants/query-keys'
import { toast } from 'sonner'

export function useLinkCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await linkCourseAction(formData)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MY_PROGRESS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [AUTH_USER_QUERY_KEY] })
      toast.success('Curso vinculado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao vincular curso.')
    },
  })
}
