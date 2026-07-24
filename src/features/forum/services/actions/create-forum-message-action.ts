'use server'

import { createForumMessageRequest } from '../requests/create-forum-message-request'
import { CreateForumMessageDto } from '../../types'

export async function createForumMessageAction(dto: CreateForumMessageDto) {
  try {
    const data = await createForumMessageRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao enviar mensagem' }
  }
}
