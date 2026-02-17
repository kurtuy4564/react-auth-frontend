import { type PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const TanstackQueryProvider = ({ children }: PropsWithChildren<unknown>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // количество попыток перезапроса
        refetchOnWindowFocus: false, // не обновлять при фокусе окна
      },
    },
  })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
