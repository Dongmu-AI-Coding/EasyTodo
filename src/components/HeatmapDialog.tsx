'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ActivityHeatmap } from './ActivityHeatmap';
import { BarChart2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function HeatmapDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <BarChart2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>活动记录</DialogTitle>
        </DialogHeader>
        <ActivityHeatmap />
      </DialogContent>
    </Dialog>
  );
} 