'use server'

import {
  getCoursesRequest,
  getCourseByIdentifierRequest,
  registerFullCourseRequest,
  deleteCourseRequest,
  getCourseLinksRequest,
  getCourseLinkByIdRequest,
  createCourseLinkRequest,
  updateCourseLinkRequest,
  deleteCourseLinkRequest,
  getCurricularStructuresRequest,
  getCurricularStructureByIdRequest,
  deleteCurricularStructureRequest,
  getBranchesRequest,
  getBranchByIdRequest,
  deleteBranchRequest,
  getSubjectsRequest,
  getSubjectByIdRequest,
  createSubjectRequest,
  deleteSubjectRequest,
  getStructureSubjectsRequest,
  getStructureSubjectByIdRequest,
  deleteStructureSubjectRequest,
} from './index'
import {
  RegisterCoursePayloadDto,
  CreateCourseLinkDto,
  UpdateCourseLinkDto,
  CreateSubjectDto,
} from '../types'

// COURSES
export async function getCoursesAction() {
  try {
    const data = await getCoursesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar cursos' }
  }
}

export async function getCourseByIdentifierAction(identifier: string) {
  try {
    const data = await getCourseByIdentifierRequest(identifier)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Curso não encontrado' }
  }
}

export async function registerFullCourseAction(payload: RegisterCoursePayloadDto) {
  try {
    const res = await registerFullCourseRequest(payload)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao cadastrar curso' }
  }
}

export async function deleteCourseAction(id: string) {
  try {
    await deleteCourseRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir curso' }
  }
}

// COURSE LINKS
export async function getCourseLinksAction() {
  try {
    const data = await getCourseLinksRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar links de cursos' }
  }
}

export async function createCourseLinkAction(dto: CreateCourseLinkDto) {
  try {
    const data = await createCourseLinkRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar link' }
  }
}

export async function updateCourseLinkAction(id: string, dto: UpdateCourseLinkDto) {
  try {
    const res = await updateCourseLinkRequest(id, dto)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao atualizar link' }
  }
}

export async function deleteCourseLinkAction(id: string) {
  try {
    await deleteCourseLinkRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir link' }
  }
}

// CURRICULAR STRUCTURES
export async function getCurricularStructuresAction() {
  try {
    const data = await getCurricularStructuresRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar estruturas curriculares' }
  }
}

// BRANCHES
export async function getBranchesAction() {
  try {
    const data = await getBranchesRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar vertentes' }
  }
}

// SUBJECTS
export async function getSubjectsAction() {
  try {
    const data = await getSubjectsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar disciplinas' }
  }
}

export async function createSubjectAction(dto: CreateSubjectDto) {
  try {
    const data = await createSubjectRequest(dto)
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao criar disciplina' }
  }
}

export async function deleteSubjectAction(id: string) {
  try {
    await deleteSubjectRequest(id)
    return { success: true, error: null }
  } catch (error) {
    const err = error as Error
    return { success: false, error: err.message || 'Erro ao excluir disciplina' }
  }
}

// STRUCTURE SUBJECTS
export async function getStructureSubjectsAction() {
  try {
    const data = await getStructureSubjectsRequest()
    return { data, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao carregar mapeamentos de disciplinas' }
  }
}
