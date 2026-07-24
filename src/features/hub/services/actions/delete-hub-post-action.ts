'use server'

import { deleteHubPostRequest } from '../requests/delete-hub-post-request'

export async function deleteHubPostAction(id: string) {
  try {
    await deleteHubPostRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return {
      success: false,
      error: err.message || 'Erro ao excluir publicação',
    }
  }
}
