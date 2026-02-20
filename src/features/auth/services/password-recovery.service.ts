import { api } from '@/shared/api'
import type { TypeNewPasswordSchema, TypeRegisterSchema } from '../schemes'
import type { IUser } from '../type'

class PasswordRecoveryService {
  public async reset(body: TypeRegisterSchema, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined
    const response = await api.post<IUser>('auth/password-recovery/reset', body, { headers })
    return response
  }

  public async new(body: TypeNewPasswordSchema, token: string | null, recaptcha?: string) {
    const headers = recaptcha ? { recaptcha } : undefined
    const response = await api.post<IUser>(`auth/password-recovery/new/${token}`, body, { headers })
    return response
  }
}

export const passwordRecoveryService = new PasswordRecoveryService()
