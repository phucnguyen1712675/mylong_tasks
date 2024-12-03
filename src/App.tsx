import React from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import TaskFilter from './components/TaskFilter'
import './App.css'
import { TaskProvider } from './context/TaskContext'

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Task Manager
          </h1>
          <div className="space-y-6">
            <TaskForm />
            <TaskFilter />
            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  )
}

export default App
