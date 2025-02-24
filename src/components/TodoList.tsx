'use client';

import React, { useState } from 'react';
import { useTodo } from '@/context/TodoContext';
import { TodoType } from '@/types/todo';
import { PlusCircle, Trash2 } from 'lucide-react';

interface TodoListProps {
  type: TodoType;
  title: string;
}

export const TodoList: React.FC<TodoListProps> = ({ type, title }) => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = todos.filter((todo) => todo.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), type);
      setNewTodo('');
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="添加新任务..."
        />
        <button
          type="submit"
          className="p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </form>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 border-2 rounded-md checked:bg-blue-500"
            />
            <span
              className={`flex-1 ${
                todo.isCompleted ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.content}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded-md"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 