'use server'

import { getCourseLinksRequest } from '../requests/get-course-links-request'

export async function getCourseLinksAction() {
  try {
    const data = await getCourseLinksRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar links de cursos',
    }
  }
}
