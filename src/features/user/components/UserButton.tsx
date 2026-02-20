import { useLogautMutation } from '../hooks/useLogautMutation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LucideLogOut } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { IUser } from '@/features/auth/type'

interface UserButtonProps {
  user: IUser
}

export const UserButton = ({ user }: UserButtonProps) => {
  const { logout, isLoudingLogaut } = useLogautMutation()

  if (!user) {
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user.picture} />
          <AvatarFallback>{user.displayName.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40' align='end'>
        <DropdownMenuItem disabled={isLoudingLogaut} onClick={() => logout()}>
          <LucideLogOut className='mr-2 size-4 ' />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const useButtonLoading = () => {
  return <Skeleton className='h-10 w-10 rounded-full' />
}
