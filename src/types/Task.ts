export interface Task {
  id: string;
  name: string;
  description?: string;
  status: 'complete' | 'incomplete';
  createdAt: Date;
}

export type CreateTaskDTO = Omit<Task, 'id'>;

export type TaskFilter = 'all' | 'incomplete' | 'complete';

export interface TaskContextType {
  tasks: Task[];
  filter: TaskFilter;
  currentPage: number;
  itemsPerPage: number;
} 