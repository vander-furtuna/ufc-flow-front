'use server'

import { createSubjectRequest } from '../requests/create-subject-request'
import { CreateSubjectDto } from '../../types'

export async function createSubjectAction(dto: CreateSubjectDto) {
  try {
    const data = await createSubjectRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar disciplina' }
  }
}
