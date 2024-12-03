import { useApi } from './useApi'
import { taskService } from '../services/taskService'
import type { Task, CreateTaskDTO } from '../types/Task'
import { useTaskContext } from '../context/TaskContext'

export const useTaskApi = () => {
  const { dispatch, state } = useTaskContext()
  const api = useApi<Task | Task[]>()

  const getTasks = async () => {
    const tasks = await api.execute(taskService.getTasks())
    if (tasks) {
      dispatch({ type: 'SET_TASKS', payload: tasks as Task[] })
    }
  }

  const createTask = async (task: CreateTaskDTO) => {
    const newTask = await api.execute(taskService.createTask(task))
    if (!newTask) throw new Error('Failed to create task')
    dispatch({ type: 'ADD_TASK', payload: newTask as Task })
    return newTask as Task
  }

  const updateTask = async (task: Task) => {
    const updatedTask = await api.execute(taskService.updateTask(task))
    if (!updatedTask) throw new Error('Failed to update task')
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask as Task })
    return updatedTask as Task
  }

  const deleteTask = async (id: string) => {
    await api.execute(taskService.deleteTask(id))
    dispatch({ type: 'DELETE_TASK', payload: id })

    const { tasks, filter, currentPage, itemsPerPage } = state
    const filteredTasks = tasks.filter(task => {
      if (filter === 'all') return true;
      return task.status === filter;
    }).filter(task => task.id !== id)

    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
    
    if (currentPage > totalPages && currentPage > 1) {
      dispatch({ type: 'SET_PAGE', payload: currentPage - 1 })
    }
  }

  return {
    loading: api.loading,
    error: api.error,
    clearError: api.clearError,
    getTasks,
    createTask,
    updateTask,
    deleteTask
  }
} 