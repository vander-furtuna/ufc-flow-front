'use server'

import { registerFullCourseRequest } from '../requests/register-full-course-request'
import { RegisterCoursePayloadDto } from '../../types'

export async function registerFullCourseAction(
  payload: RegisterCoursePayloadDto,
) {
  try {
    const res = await registerFullCourseRequest(payload)
    return { data: res, error: null }
  } catch (error) {
    const err = error as Error
    return { data: null, error: err.message || 'Erro ao cadastrar curso' }
  }
}
