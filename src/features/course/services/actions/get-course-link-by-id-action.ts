'use server'

import { getCourseLinkByIdRequest } from '../requests/get-course-link-by-id-request'

export async function getCourseLinkByIdAction(id: string) {
  try {
    const data = await getCourseLinkByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Link não encontrado' }
  }
}
