import { useState } from 'react'
import { useApiError } from './useApiError'

interface ApiState<T> {
  data: T | null
  loading: boolean
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false
  })
  const { error, handleError, clearError } = useApiError()

  const execute = async <R>(
    promise: Promise<R>,
    onSuccess?: (data: R) => void
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true }))
      clearError()
      const data = await promise
      setState({ data: data as unknown as T, loading: false })
      onSuccess?.(data)
      return data
    } catch (err) {
      setState(prev => ({ ...prev, loading: false }))
      handleError(err)
      return null
    }
  }

  return {
    ...state,
    error,
    execute,
    clearError
  }
} 