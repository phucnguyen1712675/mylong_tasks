import React, { useEffect } from 'react';
import { useTaskApi } from '../hooks/useTaskApi';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import Pagination from './Pagination';

export const TaskList: React.FC = () => {
  const { getTasks, loading } = useTaskApi();
  const { state } = useTaskContext();

  useEffect(() => {
    getTasks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  const { tasks, filter, currentPage, itemsPerPage } = state;

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No tasks available. Add some tasks to get started!
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No {filter} tasks found. Try changing the filter or add new tasks.
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

  return (
    <div className="space-y-4">
      {paginatedTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
};

export default TaskList; 