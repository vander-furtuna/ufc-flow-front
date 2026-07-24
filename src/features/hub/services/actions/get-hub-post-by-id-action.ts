'use server'

import { getHubPostByIdRequest } from '../requests/get-hub-post-by-id-request'

export async function getHubPostByIdAction(id: string) {
  try {
    const data = await getHubPostByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Publicação não encontrada' }
  }
}
