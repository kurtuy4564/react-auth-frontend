import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { TypeLoginSchema } from '../schemes'
import { toastMessageHandler } from '@/shared/utils'
import { authservice } from '../services'

export function useLoginMutation(
  setIsShowTwoFactor: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ['login user'],
    mutationFn: ({ values, recaptcha }: { values: TypeLoginSchema; recaptcha: string }) =>
      authservice.login(values, recaptcha),
    onSuccess(data: any) {
      if (data.message) {
        toastMessageHandler(data)
        setIsShowTwoFactor(true)
      } else {
        toast.success('Успешная авторизация')
        navigate('/dashboard/settings')
      }
    },
    onError(error) {
      toastMessageHandler(error)
    },
  })

  return { login, isLoadingLogin }
}
