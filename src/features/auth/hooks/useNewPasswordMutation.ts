import { useMutation } from '@tanstack/react-query'
import type { TypeResetPasswordSchema } from '../schemes/reset-password.schemes'
import { passwordRecoveryService } from '../services'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'
import { useLocation, useNavigate, useSearchParams } from 'react-router'

export function useNewPasswordMutation() {
  const navigate = useNavigate()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const token = searchParams.get('token')

  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ['new password'],
    mutationFn: ({ values, recaptcha }: { values: TypeResetPasswordSchema; recaptcha: string }) =>
      passwordRecoveryService.new(values, token, recaptcha),
    onSuccess() {
      toast.success('Пароль успешно изменен', {
        description: 'Теперь вы можете войти в аккаунт',
      })
      navigate('/dashboard/settings')
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { newPassword, isLoadingNew }
}
