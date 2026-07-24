'use server'

import { deleteCourseLinkRequest } from '../requests/delete-course-link-request'

export async function deleteCourseLinkAction(id: string) {
  try {
    await deleteCourseLinkRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir link' }
  }
}
