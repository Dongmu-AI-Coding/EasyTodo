'use client';

import React from 'react';
import { useTodo } from '@/context/TodoContext';
import { format, subDays, eachDayOfInterval } from 'date-fns';

export const ActivityHeatmap = () => {
  const { getDailyRecords } = useTodo();
  const records = getDailyRecords();

  // 生成最近90天的日期数组
  const dates = eachDayOfInterval({
    start: subDays(new Date(), 89),
    end: new Date(),
  });

  // 创建日期到完成率的映射
  const completionRateMap = new Map(
    records.map((record) => [
      record.date,
      record.totalMainTodos > 0
        ? record.mainTodosCompleted / record.totalMainTodos
        : 0,
    ])
  );

  const getColor = (rate: number) => {
    if (rate === 0) return 'bg-muted';
    if (rate <= 0.25) return 'bg-emerald-200 dark:bg-emerald-900';
    if (rate <= 0.5) return 'bg-emerald-300 dark:bg-emerald-800';
    if (rate <= 0.75) return 'bg-emerald-400 dark:bg-emerald-700';
    return 'bg-emerald-500 dark:bg-emerald-600';
  };

  return (
    <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
      <h2 className="text-xl font-bold mb-4">活动记录</h2>
      <div className="grid grid-cols-[repeat(auto-fill,20px)] gap-1">
        {dates.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const rate = completionRateMap.get(dateStr) || 0;
          return (
            <div
              key={dateStr}
              className={`w-5 h-5 rounded-sm transition-colors ${getColor(rate)}`}
              title={`${dateStr}: ${Math.round(rate * 100)}% 完成`}
            />
          );
        })}
      </div>
    </div>
  );
}; 