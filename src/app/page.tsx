'use client';

import { TodoProvider } from '@/context/TodoContext';
import { TodoList } from '@/components/TodoList';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';

export default function Home() {
  return (
    <TodoProvider>
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Todo 管理工具</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <TodoList type="main" title="主干任务" />
            <TodoList type="extra" title="额外任务" />
          </div>
          
          <ActivityHeatmap />
        </div>
      </main>
    </TodoProvider>
  );
}
