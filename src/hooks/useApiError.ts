import { useState } from 'react'

export const useApiError = () => {
  const [error, setError] = useState<string | null>(null)

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message)
    } else if (typeof error === 'string') {
      setError(error)
    } else {
      setError('An unexpected error occurred')
    }
    console.error(error)
  }

  const clearError = () => setError(null)

  return { error, handleError, clearError }
} 