'use client';

import React, { useState, useEffect } from 'react';
import { useTodo } from '@/context/TodoContext';
import { TodoType } from '@/types/todo';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isFuture, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { WeekTabs } from './WeekTabs';
import { cn } from '@/lib/utils';

interface GroupedTodos {
  [type: string]: Array<{
    id: string;
    content: string;
    isCompleted: boolean;
  }>;
}

export const DailyTasks = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodo();
  const [newTodo, setNewTodo] = useState('');
  const [activeType, setActiveType] = useState<TodoType>('main');
  
  // 获取本周的日期范围
  const today = new Date();
  const [weekStart, setWeekStart] = useState(startOfWeek(today, { locale: zhCN }));
  const weekEnd = endOfWeek(weekStart, { locale: zhCN });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  // 当前选中的日期，默认是今天
  const [currentDay, setCurrentDay] = useState(format(today, 'yyyy-MM-dd'));

  // 每次组件加载时确保选中今天
  useEffect(() => {
    setCurrentDay(format(today, 'yyyy-MM-dd'));
    setWeekStart(startOfWeek(today, { locale: zhCN }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      // 使用选中的日期而不是今天
      addTodo(newTodo.trim(), activeType, currentDay);
      setNewTodo('');
    }
  };

  const handleWeekChange = (newDays: Date[]) => {
    setWeekStart(newDays[0]);
  };

  const handleToggleTodo = (id: string, todoDate: string) => {
    // 检查是否是未来日期
    if (isFuture(parseISO(todoDate))) {
      alert('不能完成未来的任务');
      return;
    }
    toggleTodo(id);
  };

  // 按类型分组当天的任务
  const currentDayTodos = todos
    .filter((todo) => todo.createdAt === currentDay)
    .reduce<GroupedTodos>((acc, todo) => {
      if (!acc[todo.type]) {
        acc[todo.type] = [];
      }
      acc[todo.type].push({
        id: todo.id,
        content: todo.content,
        isCompleted: todo.isCompleted,
      });
      return acc;
    }, { main: [], extra: [] });

  // 检查是否是未来日期
  const isFutureDate = isFuture(parseISO(currentDay));

  return (
    <div className="w-full bg-card rounded-lg border shadow-sm">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加新任务..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setActiveType(activeType === 'main' ? 'extra' : 'main')}
          >
            {activeType === 'main' ? '主干' : '额外'}
          </Button>
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
          onWeekChange={handleWeekChange}
        />

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">主干任务</h3>
            <div className="border rounded-lg">
              {currentDayTodos.main.length > 0 ? (
                <ul className="divide-y">
                  {currentDayTodos.main.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center gap-3 p-4 hover:bg-accent/50 group"
                    >
                      <Checkbox
                        checked={todo.isCompleted}
                        onCheckedChange={() => handleToggleTodo(todo.id, currentDay)}
                        className={cn(
                          "h-5 w-5",
                          isFutureDate && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isFutureDate}
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
                  还没有主干任务
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">额外任务</h3>
            <div className="border rounded-lg">
              {currentDayTodos.extra.length > 0 ? (
                <ul className="divide-y">
                  {currentDayTodos.extra.map((todo) => (
                    <li
                      key={todo.id}
                      className="flex items-center gap-3 p-4 hover:bg-accent/50 group"
                    >
                      <Checkbox
                        checked={todo.isCompleted}
                        onCheckedChange={() => handleToggleTodo(todo.id, currentDay)}
                        className={cn(
                          "h-5 w-5",
                          isFutureDate && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isFutureDate}
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
                  还没有额外任务
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 