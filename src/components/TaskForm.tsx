import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TASK_STATUS } from '../constants/taskConstants'
import { createTaskSchema } from '../validation/taskSchema'
import ErrorMessage from './ErrorMessage'
import type { CreateTaskDTO } from '../types/Task'
import Label from './common/Label'
import Input from './common/Input'
import TextArea from './common/TextArea'
import Button from './common/Button'
import { useTaskApi } from '../hooks/useTaskApi'

type TaskFormData = CreateTaskDTO

const TaskForm: React.FC = () => {
  const { createTask, error, clearError } = useTaskApi()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: yupResolver(createTaskSchema),
    defaultValues: {
      status: TASK_STATUS.INCOMPLETE,
      createdAt: new Date(),
    },
  })

  const onSubmit = async (data: TaskFormData) => {
    const result = await createTask(data)
    if (result) {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card">
      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={clearError}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Dismiss
          </button>
        </div>
      )}
      <div className="space-y-4">
        <div className="form-group">
          <Label htmlFor="name">Task Name</Label>
          <Input
            {...register('name')}
            type="text"
            id="name"
            error={!!errors.name}
            placeholder="Enter task name"
          />
          <ErrorMessage message={errors.name?.message} />
        </div>
        <div className="form-group">
          <Label htmlFor="description">Description</Label>
          <TextArea
            {...register('description')}
            id="description"
            error={!!errors.description}
            placeholder="Enter task description"
            rows={3}
          />
          <ErrorMessage message={errors.description?.message} />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="sm:w-auto w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default TaskForm
