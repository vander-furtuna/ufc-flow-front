'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCourseAction } from '../services/actions'
import { COURSES_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useDeleteCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteCourseAction(id)
      if (res.error) throw new Error(res.error)
      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] })
      toast.success('Curso excluído com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao excluir curso.')
    },
  })
}
