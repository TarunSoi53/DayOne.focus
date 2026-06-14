'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export const ContributionGrid = () => {
  const { data = [], isLoading } = useQuery<number[]>({
    queryKey: ['analytics', 'heatmap'],
    queryFn: async () => {
      const res = await api.get('/analytics/heatmap');
      return res.data;
    },
    refetchInterval: 10000
  });

  // GitHub Green Color Scale
  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-[#161b22] border border-[#161b22]'; // Empty state
      case 1: return 'bg-[#0e4429] border border-[#000000]/10'; // Light activity
      case 2: return 'bg-[#006d32] border border-[#000000]/10'; 
      case 3: return 'bg-[#26a641] border border-[#000000]/10'; 
      case 4: return 'bg-[#39d353] border border-[#000000]/10 shadow-[0_0_8px_rgba(57,211,83,0.3)]'; // High activity
      default: return 'bg-[#161b22] border border-[#161b22]';
    }
  };

  // Build calendar matrix exactly like GitHub
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // We want to show the last 365 days.
  const days = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({
      date: d,
      // data array maps 0 to 365 days ago, and 364 to today.
      count: data[364 - i] || 0,
      isToday: i === 0
    });
  }

  // Pad the first week with nulls so Sunday is always at the top
  const firstDayOfWeek = days[0].date.getDay(); // 0 is Sunday
  const paddedDays = Array(firstDayOfWeek).fill(null).concat(days);

  // Chunk into weeks (columns)
  const weeks = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  // Find month boundaries for labels
  const monthLabels: { label: string; colIndex: number }[] = [];
  let currentMonth = -1;
  const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  weeks.forEach((week, colIndex) => {
    // Check the first day of the week (or first non-null day)
    const firstDay = week.find(d => d !== null);
    if (firstDay) {
      const month = firstDay.date.getMonth();
      if (month !== currentMonth) {
        monthLabels.push({
          label: MONTH_NAMES[month],
          colIndex
        });
        currentMonth = month;
      }
    }
  });

  return (
    <div className="p-6 bg-[#0d1117] border border-zinc-800 rounded-sm w-full overflow-hidden flex flex-col">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-zinc-400 text-xs tracking-widest uppercase font-mono">
          Activity Heatmap
        </h3>
        <div className="text-zinc-500 text-[10px] font-mono flex items-center gap-2">
           <span>Less</span>
           <div className="flex gap-1">
             {[0, 1, 2, 3, 4].map(l => (
               <div key={l} className={`w-3 h-3 rounded-sm ${getIntensityColor(l)}`} />
             ))}
           </div>
           <span>More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4 scrollbar-none w-full" dir="rtl">
        <div className="min-w-max" dir="ltr">
          {/* Months Header */}
          <div className="flex relative h-6 text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">
            {monthLabels.map(({ label, colIndex }) => {
              // Approximate width of a column is 20px (w-4 + gap-1.5 = 16 + 6 = 22px). We'll use absolute positioning.
              return (
                <span 
                  key={`${label}-${colIndex}`} 
                  className="absolute"
                  style={{ left: `calc(${colIndex} * (1.25rem + 0.375rem))` }}
                >
                  {label}
                </span>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-1.5">
            {weeks.map((week, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-1.5">
                {week.map((day, rowIndex) => {
                  if (!day) return <div key={rowIndex} className="w-4 h-4 md:w-5 md:h-5 bg-transparent" />; // Padding
                  
                  return (
                    <div
                      key={rowIndex}
                      title={`${day.date.toDateString()}: ${day.count} tasks`}
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-sm ${getIntensityColor(day.count)} transition-all duration-200 hover:scale-125 cursor-pointer relative ${day.isToday ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0d1117]' : ''}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
