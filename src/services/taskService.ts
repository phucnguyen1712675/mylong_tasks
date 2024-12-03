import { Task } from '../types/Task';
import { API_CONFIG } from '../constants/taskConstants';

const API_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.TASKS}`;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL)
    return handleResponse(response)
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    return handleResponse(response)
  },

  async updateTask(task: Task): Promise<Task> {
    const response = await fetch(`${API_URL}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    return handleResponse(response)
  },

  async deleteTask(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    return response.ok
  },

  async isNameTaken(name: string, excludeId?: string): Promise<boolean> {
    const response = await fetch(API_URL);
    const tasks: Task[] = await response.json();
    return tasks.some(task => 
      task.name.toLowerCase() === name.toLowerCase() && 
      task.id !== excludeId
    );
  },
}; 