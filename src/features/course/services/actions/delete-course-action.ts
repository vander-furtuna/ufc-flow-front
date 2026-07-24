'use server'

import { deleteCourseRequest } from '../requests/delete-course-request'

export async function deleteCourseAction(id: string) {
  try {
    await deleteCourseRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir curso' }
  }
}
