'use server'

import {
  getForumMessagesRequest,
  getForumMessageByIdRequest,
  createForumMessageRequest,
  updateForumMessageRequest,
  deleteForumMessageRequest,
} from './index'
import { CreateForumMessageDto, UpdateForumMessageDto } from '../types'

export async function getForumMessagesAction() {
  try {
    const data = await getForumMessagesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar mensagens do fórum' }
  }
}

export async function getForumMessageByIdAction(id: string) {
  try {
    const data = await getForumMessageByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Mensagem não encontrada' }
  }
}

export async function createForumMessageAction(dto: CreateForumMessageDto) {
  try {
    const data = await createForumMessageRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao enviar mensagem' }
  }
}

export async function updateForumMessageAction(id: string, dto: UpdateForumMessageDto) {
  try {
    const res = await updateForumMessageRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar mensagem' }
  }
}

export async function deleteForumMessageAction(id: string) {
  try {
    await deleteForumMessageRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir mensagem' }
  }
}
