'use server'

import { updateHubPostRequest } from '../requests/update-hub-post-request'
import { UpdateHubPostDto } from '../../types'

export async function updateHubPostAction(id: string, dto: UpdateHubPostDto) {
  try {
    const res = await updateHubPostRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar publicação' }
  }
}
