'use server'

import { getForumMessagesRequest } from '../requests/get-forum-messages-request'

export async function getForumMessagesAction() {
  try {
    const data = await getForumMessagesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return {
      data: null,
      error: err.message || 'Erro ao carregar mensagens do fórum',
    }
  }
}
