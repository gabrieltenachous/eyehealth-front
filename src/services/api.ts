import axios, { AxiosError } from 'axios'
import { useUiStore } from '@/stores/ui'

// Tipo genérico de resposta padrão
export interface ApiResponse<T> {
  data: T
  message?: string
}

// Criação da instância Axios com configuração global
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: import.meta.env.VITE_API_TOKEN,
  },
})

// Intercepta requisições e ativa loading
api.interceptors.request.use(config => {
  const ui = useUiStore()
  ui.setLoading(true)
  return config
})

// Intercepta respostas e trata erros
api.interceptors.response.use(
  response => {
    const ui = useUiStore()
    ui.setLoading(false)
    return response
  },
  (error: AxiosError) => {
    const ui = useUiStore()
    ui.setLoading(false)

    if (error.response) {
      const data = error.response.data as { message?: string }
      const message =
        data?.message || error.message || 'Erro ao processar a requisição'
      ui.setError(message)
    } else {
      ui.setError('Erro de rede ou servidor indisponível')
    }

    return Promise.reject(error)
  }
)

export default api
