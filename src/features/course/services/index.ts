import { api } from '@/lib/ky-api'
import {
  SimplifiedCourse,
  RegisterCoursePayloadDto,
  CourseLink,
  CreateCourseLinkDto,
  UpdateCourseLinkDto,
  CurricularStructure,
  Branch,
  Subject,
  CreateSubjectDto,
  StructureSubject,
} from '../types'

// COURSES
export async function getCoursesRequest(): Promise<SimplifiedCourse[]> {
  return api.get('courses').json<SimplifiedCourse[]>()
}

export async function getCourseByIdentifierRequest(identifier: string): Promise<any> {
  return api.get(`courses/${identifier}`).json<any>()
}

export async function registerFullCourseRequest(
  payload: RegisterCoursePayloadDto,
): Promise<{ message: string }> {
  return api.post('courses/register-full', { json: payload }).json<{ message: string }>()
}

export async function deleteCourseRequest(id: string): Promise<void> {
  await api.delete(`courses/${id}`)
}

// COURSE LINKS
export async function getCourseLinksRequest(): Promise<CourseLink[]> {
  return api.get('course-links').json<CourseLink[]>()
}

export async function getCourseLinkByIdRequest(id: string): Promise<CourseLink> {
  return api.get(`course-links/${id}`).json<CourseLink>()
}

export async function createCourseLinkRequest(
  dto: CreateCourseLinkDto,
): Promise<CourseLink> {
  return api.post('course-links', { json: dto }).json<CourseLink>()
}

export async function updateCourseLinkRequest(
  id: string,
  dto: UpdateCourseLinkDto,
): Promise<{ message: string }> {
  return api.patch(`course-links/${id}`, { json: dto }).json<{ message: string }>()
}

export async function deleteCourseLinkRequest(id: string): Promise<void> {
  await api.delete(`course-links/${id}`)
}

// CURRICULAR STRUCTURES
export async function getCurricularStructuresRequest(): Promise<CurricularStructure[]> {
  return api.get('curricular-structures').json<CurricularStructure[]>()
}

export async function getCurricularStructureByIdRequest(
  id: string,
): Promise<CurricularStructure> {
  return api.get(`curricular-structures/${id}`).json<CurricularStructure>()
}

export async function deleteCurricularStructureRequest(id: string): Promise<void> {
  await api.delete(`curricular-structures/${id}`)
}

// BRANCHES
export async function getBranchesRequest(): Promise<Branch[]> {
  return api.get('branches').json<Branch[]>()
}

export async function getBranchByIdRequest(id: string): Promise<Branch> {
  return api.get(`branches/${id}`).json<Branch>()
}

export async function deleteBranchRequest(id: string): Promise<void> {
  await api.delete(`branches/${id}`)
}

// SUBJECTS
export async function getSubjectsRequest(): Promise<Subject[]> {
  return api.get('subjects').json<Subject[]>()
}

export async function getSubjectByIdRequest(id: string): Promise<Subject> {
  return api.get(`subjects/${id}`).json<Subject>()
}

export async function createSubjectRequest(dto: CreateSubjectDto): Promise<Subject> {
  return api.post('subjects', { json: dto }).json<Subject>()
}

export async function deleteSubjectRequest(id: string): Promise<void> {
  await api.delete(`subjects/${id}`)
}

// STRUCTURE SUBJECTS
export async function getStructureSubjectsRequest(): Promise<StructureSubject[]> {
  return api.get('structure-subjects').json<StructureSubject[]>()
}

export async function getStructureSubjectByIdRequest(
  id: string,
): Promise<StructureSubject> {
  return api.get(`structure-subjects/${id}`).json<StructureSubject>()
}

export async function deleteStructureSubjectRequest(id: string): Promise<void> {
  await api.delete(`structure-subjects/${id}`)
}
