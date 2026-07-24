'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCourseLinkAction } from '../services/actions'
import { CreateCourseLinkDto } from '../types'
import { COURSE_LINKS_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useCreateCourseLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: CreateCourseLinkDto) => {
      const res = await createCourseLinkAction(dto)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSE_LINKS_QUERY_KEY] })
      toast.success('Link criado com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar link.')
    },
  })
}
