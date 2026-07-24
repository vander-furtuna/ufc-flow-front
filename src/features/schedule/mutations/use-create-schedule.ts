'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createScheduleAction } from '../services/actions'
import { CreateScheduleDto } from '../types'
import { SCHEDULES_QUERY_KEY } from '../constants/query-keys'
import { toast } from 'sonner'

export function useCreateSchedule() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (dto: CreateScheduleDto) => {
      const res = await createScheduleAction(dto)
      if (res.error) throw new Error(res.error)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SCHEDULES_QUERY_KEY] })
      toast.success('Simulação criada com sucesso!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Falha ao criar simulação.')
    },
  })
}
