'use server'

import { getCourseByIdentifierRequest } from '../requests/get-course-by-identifier-request'

export async function getCourseByIdentifierAction(identifier: string) {
  try {
    const data = await getCourseByIdentifierRequest(identifier)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Curso não encontrado' }
  }
}
