export const TASK_STATUS = {
  COMPLETE: 'complete',
  INCOMPLETE: 'incomplete',
} as const

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  ENDPOINTS: {
    TASKS: '/tasks',
  },
} as const
