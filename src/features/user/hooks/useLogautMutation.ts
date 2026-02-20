import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { authservice } from '@/features/auth/services'
import { toastMessageHandler } from '@/shared/utils'
import { toast } from 'sonner'

export function useLogautMutation() {
  const navigate = useNavigate()
  const { mutate: logout, isPending: isLoudingLogaut } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authservice.logout(),
    onError(error) {
      toastMessageHandler(error)
    },
    onSuccess() {
      toast.success('Вы успешно вышли')
      navigate('/auth/login')
    },
  })

  return { logout, isLoudingLogaut }
}
