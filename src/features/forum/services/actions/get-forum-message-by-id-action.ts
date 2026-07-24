'use server'

import { getForumMessageByIdRequest } from '../requests/get-forum-message-by-id-request'

export async function getForumMessageByIdAction(id: string) {
  try {
    const data = await getForumMessageByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Mensagem não encontrada' }
  }
}
