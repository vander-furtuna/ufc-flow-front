'use server'

import { associateSubjectRequest } from '../requests/associate-subject-request'
import { AssociateSubjectDto } from '../../types'

export async function associateSubjectAction(
  id: string,
  dto: AssociateSubjectDto,
) {
  try {
    const res = await associateSubjectRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao associar disciplina' }
  }
}
