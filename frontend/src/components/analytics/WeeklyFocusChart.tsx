'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export const WeeklyFocusChart = () => {
  const { data = [], isLoading } = useQuery<{day: string, hours: number}[]>({
    queryKey: ['analytics', 'weekly'],
    queryFn: async () => {
      const res = await api.get('/analytics/weekly');
      return res.data;
    },
    refetchInterval: 10000
  });

  const totalHrs = data.reduce((sum, item) => sum + item.hours, 0).toFixed(1);

  if (isLoading) {
    return (
      <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-[300px] flex items-center justify-center font-mono text-xs text-zinc-500">
        Loading Telemetry...
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-xs tracking-widest uppercase font-mono">
          Weekly Focus Time
        </h3>
        <span className="text-[#39d353] font-mono text-xs font-bold">{totalHrs} Hrs Total</span>
      </div>
      
      <div className="flex-1 w-full h-full font-mono text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="day" 
              stroke="#52525b" 
              tick={{ fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#52525b" 
              tick={{ fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip 
              cursor={{ fill: '#18181b' }}
              contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', color: '#f4f4f5' }}
              itemStyle={{ color: '#39d353' }}
              formatter={(value: any) => [`${value} hrs`, 'Focus']}
            />
            <Bar dataKey="hours" radius={[2, 2, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hours > 3 ? '#39d353' : entry.hours > 1 ? '#26a641' : '#0e4429'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
