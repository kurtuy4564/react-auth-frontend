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
import { useResetPasswordMutation } from '../hooks'

export const ResetPasswordForm = () => {
  const { theme } = useTheme()
  const [recap, setRecap] = useState<string | null>(null)

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const { reset, isLoadingReset } = useResetPasswordMutation()

  const onSubmit = (values: TypeResetPasswordSchema) => {
    if (recap) {
      reset({ values, recaptcha: recap })
    } else {
      toast.error('Пожалуйта, завершите reCAPTCHA')
    }
  }

  return (
    <>
      <AuthWrapper
        heading='Сброс пароля'
        description='Для сброса пароля введите почту'
        backButtonLabel='Войти в аккаунт'
        backButtonHref='/auth/login'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-2 space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='ivan@example.com'
                      disabled={isLoadingReset}
                      type='email'
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

            <Button disabled={isLoadingReset} type='submit'>
              Сбросить
            </Button>
          </form>
        </Form>
      </AuthWrapper>
    </>
  )
}
