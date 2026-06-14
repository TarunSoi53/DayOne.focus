'use client';

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export const FocusRadarChart = () => {
  const { data = [], isLoading } = useQuery<{subject: string, value: number, fullMark: number}[]>({
    queryKey: ['analytics', 'radar'],
    queryFn: async () => {
      const res = await api.get('/analytics/radar');
      return res.data;
    },
    refetchInterval: 10000
  });

  if (isLoading) {
    return (
      <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-[300px] flex items-center justify-center font-mono text-xs text-zinc-500">
        Aligning Vectors...
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-zinc-400 text-xs tracking-widest uppercase font-mono">
          Focus Distribution
        </h3>
        <span className="text-purple-400 font-mono text-[9px] border border-purple-500/30 px-2 py-1 rounded-sm uppercase tracking-widest">
          AI Auto-Categorized
        </span>
      </div>
      
      <div className="flex-1 w-full h-full font-mono text-[10px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa' }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Focus" dataKey="value" stroke="#39d353" fill="#39d353" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
