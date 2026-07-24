'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { registerFullCourseAction } from '../services/actions'
import { RegisterCoursePayloadDto } from '../types'
import { COURSES_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useRegisterFullCourse() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: RegisterCoursePayloadDto) => {
      const res = await registerFullCourseAction(payload)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COURSES_QUERY_KEY] })
      toast.success('Curso cadastrado com sucesso com todas as relações!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao cadastrar curso.')
    },
  })
}
