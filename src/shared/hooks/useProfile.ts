import { userService } from '@/features/user/services/user.services'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.findProfile(),
  })
  return { user, isLoading }
}
