import { buttonVariants } from './components/ui/button'
import { BrowserRouter, Link, Route, Routes, Navigate, useLocation } from 'react-router'
import { ModeToggle } from './components/ModeToggle'
import { MainProvider } from './app/providers/MainProvider'
import { RegisterPage } from './app/auth/register/page'
import { LoginPage } from './app/auth/login/page'
import { useState, useEffect, createContext, useContext, type JSX } from 'react'
import { ResetPassword } from './app/auth/reset-password/page'

const AuthContext = createContext<any>(null)

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { session } = useAuth()
  const location = useLocation()

  if (!session) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />
  }

  return children
}

const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { session } = useAuth()

  if (session) {
    return <Navigate to='/dashboard/settings' replace />
  }

  return children
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = () => {
      const cookieSession = document.cookie
        .split('; ')
        .find(row => row.startsWith('session='))
        ?.split('=')[1]

      setSession(cookieSession || null)
      setIsLoading(false)
    }

    checkSession()
  }, [])

  const login = (token: string) => {
    document.cookie = `session=${token}; path=/`
    setSession(token)
  }

  const logout = () => {
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    setSession(null)
  }

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>
}

function App() {
  return (
    <AuthProvider>
      <MainProvider>
        <div className='relative flex min-h-screen flex-col'>
          <div className='flex h-screen w-full items-center justify-center px-4'>
            <ModeToggle className='absolute top-5 left-5' />
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<MainPage />} />

                <Route
                  path='/auth/login'
                  element={
                    <AuthRoute>
                      <LoginPage />
                    </AuthRoute>
                  }
                />

                <Route
                  path='/auth/register'
                  element={
                    <AuthRoute>
                      <RegisterPage />
                    </AuthRoute>
                  }
                />

                <Route
                  path='/auth/reset-password'
                  element={
                    <AuthRoute>
                      <ResetPassword />
                    </AuthRoute>
                  }
                />

                <Route
                  path='/dashboard/settings'
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </MainProvider>
    </AuthProvider>
  )
}

function MainPage() {
  return (
    <div className='space-y-5 text-center'>
      <h1 className='text-4xl font-bold'>Главная страница</h1>
      <Link to='/auth/login' className={buttonVariants()}>
        Войти в аккаунт
      </Link>
    </div>
  )
}

function DashboardPage() {
  const { logout } = useAuth()

  return (
    <div className='space-y-5 text-center'>
      <h1 className='text-4xl font-bold'>Настройки</h1>
      <button onClick={logout} className={buttonVariants({ variant: 'destructive' })}>
        Выйти
      </button>
    </div>
  )
}

export default App
