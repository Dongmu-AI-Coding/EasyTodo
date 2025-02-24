'use client';

import React, { useState } from 'react';
import { useTodo } from '@/context/TodoContext';
import { TodoType } from '@/types/todo';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

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
    <div className="w-full max-w-md p-6 bg-card rounded-lg border shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="添加新任务..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <PlusCircle className="h-5 w-5" />
        </Button>
      </form>

      <ul className="space-y-2">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded-md group"
          >
            <Checkbox
              checked={todo.isCompleted}
              onCheckedChange={() => toggleTodo(todo.id)}
              className="h-5 w-5"
            />
            <span
              className={`flex-1 ${
                todo.isCompleted ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {todo.content}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
              onClick={() => deleteTodo(todo.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 