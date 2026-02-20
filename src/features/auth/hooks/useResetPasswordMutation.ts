import { useMutation } from '@tanstack/react-query'
import type { TypeResetPasswordSchema } from '../schemes/reset-password.schemes'
import { passwordRecoveryService } from '../services';
import { toastMessageHandler } from '@/shared/utils';
import { toast } from 'sonner';

export function useResetPasswordMutation() {
  const { mutate: reset, isPending: isLoadingReset } = useMutation({
    mutationKey: ['reset password'],
    mutationFn: ({ values, recaptcha }: { values: TypeResetPasswordSchema; recaptcha: string }) =>
      passwordRecoveryService.reset(values, recaptcha),
    onSuccess() {
      toast.success('Подтвердите почту', {description: 'На почту отправлена ссылка на подтверждение'})
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { reset, isLoadingReset }
}
