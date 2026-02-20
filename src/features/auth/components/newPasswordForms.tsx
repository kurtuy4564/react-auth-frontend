import { AuthWrapper } from './AuthWrapper'
import { useForm } from 'react-hook-form'
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

import {
  ResetPasswordSchema,
  type TypeResetPasswordSchema,
} from '../schemes/reset-password.schemes'
import { useNewPasswordMutation, useResetPasswordMutation } from '../hooks'
import { NewPasswordSchema, type TypeNewPasswordSchema } from '../schemes'

export const NewPasswordForm = () => {
  const { theme } = useTheme()
  const [recap, setRecap] = useState<string | null>(null)

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const { newPassword, isLoadingNew } = useNewPasswordMutation()

  const onSubmit = (values: TypeNewPasswordSchema) => {
    if (recap) {
      newPassword({ values, recaptcha: recap })
    } else {
      toast.error('Пожалуйта, завершите reCAPTCHA')
    }
  }

  return (
    <>
      <AuthWrapper
        heading='Новый пароль'
        description='Придумайте новый пароль для вашего аккаунта'
        backButtonLabel='Войти в аккаунт'
        backButtonHref='/auth/login'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input placeholder='******' disabled={isLoadingNew} type='password' {...field} />
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

            <Button disabled={isLoadingNew} type='submit'>
              Продолжить
            </Button>
          </form>
        </Form>
      </AuthWrapper>
    </>
  )
}
