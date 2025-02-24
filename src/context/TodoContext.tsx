'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, TodoContextType, TodoType } from '@/types/todo';
import { format } from 'date-fns';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content: string, type: TodoType) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      content,
      isCompleted: false,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      type,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getDailyRecords = () => {
    const records = new Map<string, { completed: number; total: number }>();

    todos
      .filter((todo) => todo.type === 'main')
      .forEach((todo) => {
        const current = records.get(todo.createdAt) || { completed: 0, total: 0 };
        records.set(todo.createdAt, {
          completed: current.completed + (todo.isCompleted ? 1 : 0),
          total: current.total + 1,
        });
      });

    return Array.from(records.entries()).map(([date, { completed, total }]) => ({
      date,
      mainTodosCompleted: completed,
      totalMainTodos: total,
    }));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo, getDailyRecords }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 