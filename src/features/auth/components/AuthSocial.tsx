import { Button } from '@/components/ui'
import { useMutation } from '@tanstack/react-query'
import { FaGoogle, FaYandex } from 'react-icons/fa'
import { useNavigate } from 'react-router'
import { authservice } from '../services'

export const AuthSocial = () => {
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationKey: ['oauth by provider'],
    mutationFn: async (provider: 'google' | 'yandex') => await authservice.oauthByProider(provider),
  })

  const onClick = async (provider: 'google' | 'yandex') => {
    const response = await mutateAsync(provider)

    if (response) {
      navigate(response.url)
    }
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-6 space-y-4'>
        <Button onClick={() => onClick('google')} variant='outline'>
          <FaGoogle className='mr-2 size-4' />
          Google
        </Button>
        <Button onClick={() => onClick('yandex')}  variant='outline'>
          <FaYandex className='mr-2 size-4' />
          Yandex
        </Button>
      </div>
      <div className='relative mb-2'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>Или</span>
        </div>
      </div>
    </>
  )
}
