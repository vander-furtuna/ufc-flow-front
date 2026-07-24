'use server'

import { linkCourseRequest } from '../requests/link-course-request'

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
