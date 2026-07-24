import { api } from '@/lib/ky-api'
import {
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
  AssociateSubjectDto,
} from '../types'

export async function getSchedulesRequest(): Promise<Schedule[]> {
  return api.get('schedules').json<Schedule[]>()
}

export async function getScheduleByIdRequest(id: string): Promise<Schedule> {
  return api.get(`schedules/${id}`).json<Schedule>()
}

export async function createScheduleRequest(dto: CreateScheduleDto): Promise<Schedule> {
  return api.post('schedules', { json: dto }).json<Schedule>()
}

export async function updateScheduleRequest(
  id: string,
  dto: UpdateScheduleDto,
): Promise<{ message: string }> {
  return api.patch(`schedules/${id}`, { json: dto }).json<{ message: string }>()
}

export async function deleteScheduleRequest(id: string): Promise<void> {
  await api.delete(`schedules/${id}`)
}

export async function associateSubjectRequest(
  id: string,
  dto: AssociateSubjectDto,
): Promise<{ message: string }> {
  return api
    .post(`schedules/${id}/subjects`, { json: dto })
    .json<{ message: string }>()
}

export async function disassociateSubjectRequest(
  id: string,
  subjectId: string,
): Promise<void> {
  await api.delete(`schedules/${id}/subjects/${subjectId}`)
}
