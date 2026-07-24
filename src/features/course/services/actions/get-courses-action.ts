'use server'

import { getCoursesRequest } from '../requests/get-courses-request'

export async function getCoursesAction() {
  try {
    const data = await getCoursesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar cursos' }
  }
}
