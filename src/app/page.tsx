'use client';

import { TodoProvider } from '@/context/TodoContext';
import { DailyTasks } from '@/components/DailyTasks';
import { ActivityHeatmap } from '@/components/ActivityHeatmap';
import { HeatmapDialog } from '@/components/HeatmapDialog';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <TodoProvider>
      <main className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                EasyTodo
              </h1>
              <Sparkles className="h-8 w-8 text-emerald-500" />
            </div>
            <p className="text-lg text-muted-foreground">
              简单高效的任务管理工具，让你的每一天都井井有条
            </p>
          </div>

          <div className="flex items-center justify-end mb-8">
            <HeatmapDialog />
          </div>

          <div className="hidden md:block mb-8">
            <ActivityHeatmap />
          </div>
          
          <DailyTasks />
        </div>
      </main>
    </TodoProvider>
  );
}
