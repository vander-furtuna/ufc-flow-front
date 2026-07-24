'use server'

import { getHubPostsRequest } from '../requests/get-hub-posts-request'

export async function getHubPostsAction() {
  try {
    const data = await getHubPostsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar publicações do hub',
    }
  }
}
