import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { TypeRegisterSchema } from '../schemes'
import { toastMessageHandler } from '@/shared/utils'
import { authservice } from '../services'

export function useRegisterMutation() {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ['register user'],
    mutationFn: ({ values, recaptcha }: { values: TypeRegisterSchema; recaptcha: string }) =>
      authservice.register(values, recaptcha),
    onSuccess(data: any) {
      toastMessageHandler(data)
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { register, isLoadingRegister }
}
