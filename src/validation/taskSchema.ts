import * as yup from 'yup'
import { TASK_STATUS } from '../constants/taskConstants'
import type { CreateTaskDTO, Task } from '../types/Task'
import { taskService } from '../services/taskService'

// Base schema with common validations
const baseSchema = {
  name: yup.string().required('Task name is required'),
  description: yup.string().optional(),
  status: yup
    .string()
    .oneOf([TASK_STATUS.COMPLETE, TASK_STATUS.INCOMPLETE])
    .required(),
  createdAt: yup.date().required(),
}

// Schema for creating new tasks
export const createTaskSchema: yup.ObjectSchema<CreateTaskDTO> = yup.object({
  ...baseSchema,
  name: baseSchema.name.test(
    'unique',
    'Task name already exists',
    async function (value) {
      if (!value) return true
      return !(await taskService.isNameTaken(value))
    }
  ),
})

// Schema for updating existing tasks
export const updateTaskSchema: yup.ObjectSchema<Task> = yup.object({
  ...baseSchema,
  id: yup.string().required(),
  name: baseSchema.name.test(
    'unique',
    'Task name already exists',
    async function (value) {
      if (!value) return true
      const taskId = this.parent.id
      return !(await taskService.isNameTaken(value, taskId))
    }
  ),
})
