'use client';

import React, { useState } from 'react';
import { useTodo } from '@/context/TodoContext';
import { TodoType } from '@/types/todo';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { WeekTabs } from './WeekTabs';

interface TodoListProps {
  type: TodoType;
  title: string;
}

interface GroupedTodos {
  [dateKey: string]: Array<{
    id: string;
    content: string;
    isCompleted: boolean;
  }>;
}

export const TodoList: React.FC<TodoListProps> = ({ type, title }) => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');
  
  // 获取本周的日期范围
  const today = new Date();
  const weekStart = startOfWeek(today, { locale: zhCN });
  const weekEnd = endOfWeek(today, { locale: zhCN });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // 当前选中的日期，默认是今天
  const [currentDay, setCurrentDay] = useState(format(today, 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim(), type);
      setNewTodo('');
    }
  };

  // 按日期分组 todos
  const groupedTodos = todos
    .filter((todo) => todo.type === type)
    .reduce<GroupedTodos>((acc, todo) => {
      const dateKey = todo.createdAt;
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push({
        id: todo.id,
        content: todo.content,
        isCompleted: todo.isCompleted,
      });
      return acc;
    }, {});

  const currentDayTodos = groupedTodos[currentDay] || [];

  return (
    <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
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

      <WeekTabs
        days={weekDays.map(date => ({
          date,
          isToday: isToday(date),
        }))}
        currentDay={currentDay}
        onDayChange={setCurrentDay}
      />

      <div className="border rounded-lg">
        {currentDayTodos.length > 0 ? (
          <ul className="divide-y">
            {currentDayTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-4 hover:bg-accent/50 group"
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
        ) : (
          <div className="text-center text-muted-foreground py-8">
            今天还没有任务，开始添加吧！
          </div>
        )}
      </div>
    </div>
  );
}; 