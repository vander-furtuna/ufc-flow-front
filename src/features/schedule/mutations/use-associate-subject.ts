'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { associateSubjectAction } from '../services/actions'
import { AssociateSubjectDto } from '../types'
import {
  SCHEDULE_QUERY_KEY,
  SCHEDULES_QUERY_KEY,
} from '../constants/query-keys'
import { toast } from 'sonner'

export function useAssociateSubject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string
      data: AssociateSubjectDto
    }) => {
      const res = await associateSubjectAction(id, data)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: [SCHEDULES_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [SCHEDULE_QUERY_KEY, id] })
      toast.success('Disciplina associada à simulação!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao associar disciplina.')
    },
  })
}
