'use client';

import React from 'react';
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WeekTabsProps {
  days: Array<{
    date: Date;
    isToday: boolean;
  }>;
  currentDay: string;
  onDayChange: (day: string) => void;
  onWeekChange: (days: Date[]) => void;
}

export const WeekTabs: React.FC<WeekTabsProps> = ({
  days,
  currentDay,
  onDayChange,
  onWeekChange,
}) => {
  const handlePrevWeek = () => {
    const prevWeekStart = subWeeks(days[0].date, 1);
    const prevWeekEnd = endOfWeek(prevWeekStart, { locale: zhCN });
    const newDays = Array.from({ length: 7 }, (_, i) => addWeeks(days[i].date, -1));
    onWeekChange(newDays);
  };

  const handleNextWeek = () => {
    const nextWeekStart = addWeeks(days[0].date, 1);
    const nextWeekEnd = endOfWeek(nextWeekStart, { locale: zhCN });
    const newDays = Array.from({ length: 7 }, (_, i) => addWeeks(days[i].date, 1));
    onWeekChange(newDays);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const selectedWeekStart = startOfWeek(date, { locale: zhCN });
      const newDays = Array.from({ length: 7 }, (_, i) => addWeeks(selectedWeekStart, 0));
      onWeekChange(newDays);
      onDayChange(format(date, 'yyyy-MM-dd'));
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevWeek}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[240px]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(days[0].date, 'yyyy年MM月dd日', { locale: zhCN })} - {format(days[6].date, 'MM月dd日', { locale: zhCN })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(currentDay)}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextWeek}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex overflow-x-auto -mx-6 px-6 pb-2 scrollbar-none">
        <div className="flex divide-x border rounded-lg">
          {days.map((day) => {
            const dayKey = format(day.date, 'yyyy-MM-dd');
            const isSelected = currentDay === dayKey;
            
            return (
              <button
                key={dayKey}
                onClick={() => onDayChange(dayKey)}
                className={cn(
                  "flex flex-col items-center px-6 py-3 min-w-[120px] transition-colors",
                  isSelected && "bg-accent",
                  day.isToday && !isSelected && "bg-accent/20",
                  "first:rounded-l-lg last:rounded-r-lg hover:bg-accent/50"
                )}
              >
                <span className="text-base font-medium">
                  {format(day.date, 'MM月dd日', { locale: zhCN })}
                </span>
                <span className={cn(
                  "text-sm mt-1",
                  isSelected ? "text-foreground" : "text-muted-foreground"
                )}>
                  {format(day.date, 'EEEE', { locale: zhCN }).replace('星期', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}; 