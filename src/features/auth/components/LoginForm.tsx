import { AuthWrapper } from './AuthWrapper'
import { useForm } from 'react-hook-form'
import { LoginSchema, type TypeLoginSchema } from '../schemes'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components/ui'
import { useTheme } from '@/app/providers'
import { useState } from 'react'
import { toast } from 'sonner'
import ReCAPTCHA from 'react-google-recaptcha'

export const LoginForm = () => {
  const { theme } = useTheme()
  const [recap, setRecap] = useState<string | null>(null)

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: TypeLoginSchema) => {
    if (recap) {
      console.log(values)
    } else {
      toast.error('Пожалуйта, завершите reCAPTCHA')
    }
  }

  return (
    <>
      <AuthWrapper
        heading='Войти'
        description='Чтобы войти на сайт введите ваш email и пароль'
        backButtonLabel='Еще нет аккаунта? Регистрация'
        backButtonHref='/auth/register'
        isShowSocial>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input placeholder='Иван' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input placeholder='ivan@example.com' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder='******' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-center'>
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY as string}
                onChange={setRecap}
                theme={theme === 'light' ? 'light' : 'dark'}
              />
            </div>

            <Button type='submit'>Войти в аккаунт</Button>
          </form>
        </Form>
      </AuthWrapper>
    </>
  )
}
