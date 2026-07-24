'use server'

import { createCourseLinkRequest } from '../requests/create-course-link-request'
import { CreateCourseLinkDto } from '../../types'

export async function createCourseLinkAction(dto: CreateCourseLinkDto) {
  try {
    const data = await createCourseLinkRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar link' }
  }
}
