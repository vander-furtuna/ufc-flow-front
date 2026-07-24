'use server'

import { updateCourseLinkRequest } from '../requests/update-course-link-request'
import { UpdateCourseLinkDto } from '../../types'

export async function updateCourseLinkAction(
  id: string,
  dto: UpdateCourseLinkDto,
) {
  try {
    const res = await updateCourseLinkRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar link' }
  }
}
