import { type PropsWithChildren } from 'react'
import { ThemeProvider } from '@/app/providers'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import { ToastProvider } from './ToastProvider'

export const MainProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <>
      <TanstackQueryProvider>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </TanstackQueryProvider>
    </>
  )
}
