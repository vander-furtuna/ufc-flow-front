'use server'

import {
  getSchedulesRequest,
  getScheduleByIdRequest,
  createScheduleRequest,
  updateScheduleRequest,
  deleteScheduleRequest,
  associateSubjectRequest,
  disassociateSubjectRequest,
} from './index'
import { CreateScheduleDto, UpdateScheduleDto, AssociateSubjectDto } from '../types'

export async function getSchedulesAction() {
  try {
    const data = await getSchedulesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar simulações de grade' }
  }
}

export async function getScheduleByIdAction(id: string) {
  try {
    const data = await getScheduleByIdRequest(id)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Simulação não encontrada' }
  }
}

export async function createScheduleAction(dto: CreateScheduleDto) {
  try {
    const data = await createScheduleRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar simulação' }
  }
}

export async function updateScheduleAction(id: string, dto: UpdateScheduleDto) {
  try {
    const res = await updateScheduleRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar simulação' }
  }
}

export async function deleteScheduleAction(id: string) {
  try {
    await deleteScheduleRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir simulação' }
  }
}

export async function associateSubjectAction(id: string, dto: AssociateSubjectDto) {
  try {
    const res = await associateSubjectRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao associar disciplina' }
  }
}

export async function disassociateSubjectAction(id: string, subjectId: string) {
  try {
    await disassociateSubjectRequest(id, subjectId)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao remover disciplina da simulação' }
  }
}
