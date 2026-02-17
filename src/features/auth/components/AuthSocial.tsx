import { Button } from '@/components/ui'
import { FaGoogle, FaYandex } from 'react-icons/fa'

interface AuthSocialProps {}

export const AuthSocial = ({}: AuthSocialProps) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-6 space-y-4'>
        <Button variant='outline'>
          <FaGoogle className='mr-2 size-4' />
          Google
        </Button>
        <Button variant='outline'>
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
