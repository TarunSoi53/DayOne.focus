'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3.8 },
  { day: 'Wed', hours: 1.2 },
  { day: 'Thu', hours: 4.5 },
  { day: 'Fri', hours: 5.0 },
  { day: 'Sat', hours: 0.5 },
  { day: 'Sun', hours: 2.0 },
];

export const WeeklyFocusChart = () => {
  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-xs tracking-widest uppercase font-mono">
          Weekly Focus Time
        </h3>
        <span className="text-[#39d353] font-mono text-xs font-bold">19.5 Hrs Total</span>
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
              formatter={(value: number) => [`${value} hrs`, 'Focus']}
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
