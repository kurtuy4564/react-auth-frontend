import { FetchClient } from "../utils";

export const api = new FetchClient({
  baseUrl: import.meta.env.VITE_SERVER_URL,
  options:{
    credentials: 'include',
    
  }
})