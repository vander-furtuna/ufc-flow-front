'use server'

import { updateForumMessageRequest } from '../requests/update-forum-message-request'
import { UpdateForumMessageDto } from '../../types'

export async function updateForumMessageAction(
  id: string,
  dto: UpdateForumMessageDto,
) {
  try {
    const res = await updateForumMessageRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar mensagem' }
  }
}
