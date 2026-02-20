import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { useProfile } from '@/shared/hooks/useProfile'
import { UserButton, UserButtonLoading } from './UserButton'

export const SettingsForms = () => {
  const { user, isLoading } = useProfile()

  if (!user) {
    return null
  }
  return (
    <Card className='w-100'>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Настройки профиля</CardTitle>
        {isLoading ? <UserButtonLoading /> : <UserButton user={user} />}
      </CardHeader>
    </Card>
  )
}
