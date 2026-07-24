'use server'

import {
  getHubPostsRequest,
  getHubPostByIdRequest,
  createHubPostRequest,
  updateHubPostRequest,
  deleteHubPostRequest,
} from './index'
import { CreateHubPostDto, UpdateHubPostDto } from '../types'

export async function getHubPostsAction() {
  try {
    const data = await getHubPostsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar publicações do hub' }
  }
}

export async function getHubPostByIdAction(id: string) {
  try {
    const data = await getHubPostByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Publicação não encontrada' }
  }
}

export async function createHubPostAction(dto: CreateHubPostDto) {
  try {
    const data = await createHubPostRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar publicação' }
  }
}

export async function updateHubPostAction(id: string, dto: UpdateHubPostDto) {
  try {
    const res = await updateHubPostRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar publicação' }
  }
}

export async function deleteHubPostAction(id: string) {
  try {
    await deleteHubPostRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir publicação' }
  }
}
