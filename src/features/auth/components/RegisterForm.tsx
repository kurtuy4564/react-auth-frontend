import { useState, useEffect } from 'react'
import { AuthWrapper } from './AuthWrapper'

interface RegisterFormProps {}

export const RegisterForm = ({}: RegisterFormProps) => {
  return (
    <>
      <AuthWrapper
        heading='Регистрация'
        description='Чтобы войти на сайт введите ваш email и пароль'
        backButtonLabel='Уже есть аккаунт? Войти'
        backButtonHref='/auth/login'
        isShowSocial>
          
        </AuthWrapper>
    </>
  )
}
