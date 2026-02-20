import { AuthWrapper } from './AuthWrapper'
import { useForm } from 'react-hook-form'
import { RegisterSchema, type TypeRegisterSchema } from '../schemes'
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
import ReCAPTCHA from 'react-google-recaptcha'
import { toast } from 'sonner'
import { useRegisterMutation } from '../hooks'

export const RegisterForm = () => {
  const { theme } = useTheme()
  const [recap, setRecap] = useState<string | null>(null)

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
  })

  const { register, isLoadingRegister } = useRegisterMutation()

  const onSubmit = (values: TypeRegisterSchema) => {
    if (recap) {
      register({ values, recaptcha: recap })
    } else {
      toast.error('Пожалуйта, завершите reCAPTCHA')
    }
  }

  return (
    <>
      <AuthWrapper
        heading='Регистрация'
        description='Чтобы войти на сайт введите ваш email и пароль'
        backButtonLabel='Уже есть аккаунт? Войти'
        backButtonHref='/auth/login'
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
                    <Input placeholder='Иван' disabled={isLoadingRegister} {...field} />
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
                    <Input
                      placeholder='ivan@example.com'
                      disabled={isLoadingRegister}
                      type='email'
                      {...field}
                    />
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
                    <Input
                      placeholder='******'
                      disabled={isLoadingRegister}
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='passwordRepeat'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Подтверждение пароля</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='******'
                      disabled={isLoadingRegister}
                      type='password'
                      {...field}
                    />
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

            <Button disabled={isLoadingRegister} type='submit'>
              Создать аккаунт
            </Button>
          </form>
        </Form>
      </AuthWrapper>
    </>
  )
}
