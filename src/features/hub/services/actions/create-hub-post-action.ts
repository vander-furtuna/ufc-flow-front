'use server'

import { createHubPostRequest } from '../requests/create-hub-post-request'
import { CreateHubPostDto } from '../../types'

export async function createHubPostAction(dto: CreateHubPostDto) {
  try {
    const data = await createHubPostRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar publicação' }
  }
}
