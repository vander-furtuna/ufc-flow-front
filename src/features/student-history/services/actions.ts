'use server'

import {
  linkCourseRequest,
  getMyProgressRequest,
  addHistoryEntryRequest,
  updateHistoryEntryRequest,
  deleteHistoryEntryRequest,
} from './index'
import { AddHistoryEntryDto, UpdateHistoryEntryDto } from '../types'

export async function linkCourseAction(formData: FormData) {
  try {
    const data = await linkCourseRequest(formData)
    return { data, error: null }
  } catch (error) {
    const err = error as {
      json?: () => Promise<{ message?: string }>
      message?: string
    }
    let errorMessage = 'Erro ao vincular curso. Verifique o documento enviado.'
    if (err && typeof err.json === 'function') {
      try {
        const errBody = await err.json()
        errorMessage = errBody.message || errorMessage
      } catch {}
    } else if (err && err.message) {
      errorMessage = err.message
    }
    return { data: null, error: errorMessage }
  }
}

export async function getMyProgressAction() {
  try {
    const data = await getMyProgressRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar histórico acadêmico' }
  }
}

export async function addHistoryEntryAction(dto: AddHistoryEntryDto) {
  try {
    const data = await addHistoryEntryRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao adicionar disciplina ao histórico' }
  }
}

export async function updateHistoryEntryAction(id: string, dto: UpdateHistoryEntryDto) {
  try {
    const res = await updateHistoryEntryRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar histórico' }
  }
}

export async function deleteHistoryEntryAction(id: string) {
  try {
    await deleteHistoryEntryRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao remover disciplina do histórico' }
  }
}
