# Task Management App

A modern task management application built with React, TypeScript, and Tailwind CSS.

## Features

- ✨ Create, edit, and delete tasks
- 📝 Form validation
- 🔍 Filter by status
- 📱 Responsive design
- ⌨️ Keyboard navigation
- 🚫 Duplicate prevention
- 🎯 Error handling

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Headless UI
- React Hook Form + Yup
- JSON Server

## Quick Start

1. Install dependencies:
2. Start JSON Server: npx json-server --watch db.json --port 3001
3. Start the app: npm start

Visit `http://localhost:3000`

## Project Structure
<pre>
src/
├── components/         # UI components
│   ├── common/         # Reusable components
│   └── ...             # Feature components
├── hooks/              # Custom hooks
├── services/           # API layer
├── context/            # Global state
└── types/              # TypeScript types
</pre>



## Key Features

### Task Management
- Create tasks with validation
- Edit
- Delete with confirmation
- Status toggle
- Pagination

### Form Features
- Validation
- Error messages
- Loading states

### UI/UX
- Responsive design
- Keyboard navigation
- Loading indicators
- Error boundaries

## Development Notes

### State Management
- Context API for global state
- Custom hooks for API calls
- Local state for UI

### Error Handling
- Error boundaries
- API error handling
- Form validation

### Performance
- Debounced filters
- Efficient form handling
- Pagination
