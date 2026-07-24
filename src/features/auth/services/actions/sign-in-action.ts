'use server'

import { cookies } from 'next/headers'
import { signInRequest } from '../requests/sign-in-request'
import { SignInSchema } from '../../schemas/auth.schema'

const isProd = process.env.NODE_ENV === 'production'

export async function signInAction(dto: SignInSchema) {
  try {
    const response = await signInRequest(dto)
    const cookieStore = await cookies()

    cookieStore.set('accessToken', response.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 15 * 60,
    })

    cookieStore.set('refreshToken', response.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    cookieStore.set('userSession', JSON.stringify(response.user), {
      httpOnly: false,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })

    return { data: response.user, error: null }
  } catch (error) {
    const err = error as {
      json?: () => Promise<{ message?: string }>
      message?: string
    }
    let errorMessage = 'Erro ao realizar login. Verifique suas credenciais.'
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
