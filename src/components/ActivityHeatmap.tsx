'use client';

import React, { useState } from 'react';
import { useTodo } from '@/context/TodoContext';
import {
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  startOfYear,
  endOfYear,
  subYears,
  addYears,
  getYear,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['', '一', '三', '五', '日'];

export const ActivityHeatmap = () => {
  const { getDailyRecords } = useTodo();
  const records = getDailyRecords();
  const [selectedYear, setSelectedYear] = useState(new Date());

  // 获取选中年份的起止时间
  const yearStart = startOfYear(selectedYear);
  const yearEnd = endOfYear(selectedYear);

  // 获取所有周的开始日期
  const weeks = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { locale: zhCN }
  );

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
    if (rate === 0) return 'bg-muted hover:bg-muted/80';
    if (rate <= 0.25) return 'bg-emerald-200 hover:bg-emerald-300 dark:bg-emerald-900 dark:hover:bg-emerald-800';
    if (rate <= 0.5) return 'bg-emerald-300 hover:bg-emerald-400 dark:bg-emerald-800 dark:hover:bg-emerald-700';
    if (rate <= 0.75) return 'bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600';
    return 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500';
  };

  const formatTooltipDate = (date: Date) => {
    return format(date, 'yyyy年MM月dd日 EEEE', { locale: zhCN });
  };

  const getTooltipText = (date: Date, rate: number) => {
    if (rate === 0) {
      return `${formatTooltipDate(date)}\n没有完成任何主干任务`;
    }
    return `${formatTooltipDate(date)}\n完成了 ${Math.round(rate * 100)}% 的主干任务`;
  };

  // 获取显示的月份
  const months = Array.from(
    new Set(
      eachDayOfInterval({ start: yearStart, end: yearEnd }).map((date) =>
        format(date, 'M月', { locale: zhCN })
      )
    )
  );

  const handlePrevYear = () => {
    setSelectedYear(subYears(selectedYear, 1));
  };

  const handleNextYear = () => {
    setSelectedYear(addYears(selectedYear, 1));
  };

  const currentYear = getYear(new Date());
  const selectedYearNum = getYear(selectedYear);

  return (
    <div className="w-full p-6 bg-card rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">活动记录</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevYear}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[4rem] text-center">
            {selectedYearNum}年
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextYear}
            disabled={selectedYearNum >= currentYear}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="grid grid-cols-1 gap-[3px] text-xs text-muted-foreground py-[2px]">
          {WEEKDAYS.map((day) => (
            <div key={day} className="h-5 flex items-center justify-end pr-2">
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <div className="flex gap-2 text-xs text-muted-foreground mb-2 pl-[2px]">
            {months.map((month) => (
              <div key={month} className="flex-1">
                {month}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-[repeat(53,1fr)] gap-[3px]">
            {weeks.map((week) => {
              const days = eachDayOfInterval({
                start: week,
                end: endOfWeek(week, { locale: zhCN }),
              });

              return (
                <div key={week.toISOString()} className="grid grid-rows-7 gap-[3px]">
                  {days.map((date) => {
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const rate = completionRateMap.get(dateStr) || 0;
                    return (
                      <div
                        key={dateStr}
                        className={cn(
                          'w-5 h-5 rounded-sm transition-colors',
                          getColor(rate)
                        )}
                        title={getTooltipText(date, rate)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
        <span>贡献度：</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-muted" />
          <div className="w-3 h-3 rounded-sm bg-emerald-200 dark:bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-800" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400 dark:bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-600" />
        </div>
        <span>Less</span>
        <span>More</span>
      </div>
    </div>
  );
}; 