import type { P } from 'node_modules/react-router/dist/development/router-5iOvts3c.d.mts'

export type TypeSearchParams = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Array<string | number | boolean | undefined>
}

export interface ReuqestOptions extends RequestInit {
  header?: Record<string, string>
  params?: TypeSearchParams
}

export type TypeFetchRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ReuqestOptions }
  : { params: Params; config?: ReuqestOptions }
