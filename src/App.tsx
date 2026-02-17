import { buttonVariants } from './components/ui/button'
import { BrowserRouter, Link, Route, Routes } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/ModeToggle'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <div className='relative flex min-h-screen flex-col'>
          <div className='flex h-screen w-full items-center justify-center px-4'>
            <ModeToggle className='absolute top-5 left-5'/>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<MainPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App

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
