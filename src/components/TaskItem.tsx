import React, { useState } from 'react'
import { Task } from '../types/Task'
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { TASK_STATUS } from '../constants/taskConstants'
import ConfirmDialog from './ConfirmDialog'
import { Disclosure, Transition, Switch } from '@headlessui/react'
import ErrorMessage from './ErrorMessage'
import Input from './common/Input'
import TextArea from './common/TextArea'
import Button from './common/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateTaskSchema } from '../validation/taskSchema'
import { useTaskApi } from '../hooks/useTaskApi'

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { updateTask, deleteTask, error } = useTaskApi()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Task>({
    resolver: yupResolver(updateTaskSchema),
    defaultValues: task,
  })

  const watchedStatus = watch('status')

  const handleStatusToggle = async () => {
    const newStatus =
      watchedStatus === TASK_STATUS.COMPLETE
        ? TASK_STATUS.INCOMPLETE
        : TASK_STATUS.COMPLETE
    setValue('status', newStatus)
  }

  const resetForm = () => {
    reset(task)
  }

  const handleDelete = async () => {
    await deleteTask(task.id)
    setIsDeleteDialogOpen(false)
  }

  const onSubmit = async (data: Task, { close }: { close: () => void }) => {
    await updateTask(data)
    close()
  }

  return (
    <>
      <Disclosure>
        {({ open, close }) => (
          <div className="card hover:shadow-lg transition-shadow">
            {error && (
              <div className="mb-4 bg-red-50 p-4 rounded-md">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold truncate">{task.name}</h3>
                <p className="text-gray-600 line-clamp-2">{task.description}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <Switch
                  checked={
                    open
                      ? watchedStatus === TASK_STATUS.COMPLETE
                      : task.status === TASK_STATUS.COMPLETE
                  }
                  onChange={handleStatusToggle}
                  disabled={!open}
                  className={`${
                    (open ? watchedStatus : task.status) ===
                    TASK_STATUS.COMPLETE
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  } px-3 py-1 rounded-full text-sm whitespace-nowrap`}
                >
                  {open ? watchedStatus : task.status}
                </Switch>
                <div className="flex gap-2">
                  <Disclosure.Button
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="edit task"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Disclosure.Button>
                  <button
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-500 hover:text-red-600"
                    aria-label="delete task"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="mt-4 space-y-3">
                <form
                  onSubmit={handleSubmit((data) => onSubmit(data, { close }))}
                >
                  <div className="space-y-4">
                    <div>
                      <Input
                        {...register('name')}
                        error={!!errors.name}
                        placeholder="Task name"
                      />
                      <ErrorMessage message={errors.name?.message} />
                    </div>
                    <div>
                      <TextArea
                        {...register('description')}
                        error={!!errors.description}
                        placeholder="Description"
                        rows={3}
                      />
                      <ErrorMessage message={errors.description?.message} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="submit" disabled={isSubmitting}>
                        <CheckIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        onClick={() => {
                          resetForm()
                          close()
                        }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </form>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  )
}

export default TaskItem
