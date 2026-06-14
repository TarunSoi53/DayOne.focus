'use client';

import React, { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import api from '@/lib/api';

export const SystemLog = ({ minimized = false }: { minimized?: boolean }) => {
  const endRef = useRef<HTMLDivElement>(null);

  const { data: logs = [] } = useQuery<string[]>({
    queryKey: ['system', 'logs'],
    queryFn: async () => {
      const res = await api.get('/system/logs');
      return res.data;
    },
    refetchInterval: 5000,
    initialData: [
      '[SYSTEM] Neural link established.',
      '[AI_ENGINE] Telemetry handshake successful.',
    ]
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (minimized) {
    return (
      <div className="h-full flex flex-col p-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500 overflow-hidden relative">
        <h3 className="text-zinc-100 font-bold mb-4 flex items-center border-b border-zinc-800 pb-2 shrink-0">
          <span className="w-1.5 h-1.5 bg-[#39d353] rounded-full mr-2 animate-pulse" />
          Terminal Stream
        </h3>
        <div className="flex-1 overflow-y-auto scrollbar-none space-y-2 pb-10">
          {logs.map((log, i) => (
            <div key={i} className={`leading-relaxed ${log.includes('[WARN]') ? 'text-red-400' : log.includes('[AI_') ? 'text-purple-400' : 'text-zinc-400'}`}>
              {log}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-32 bg-[#050505] border-t border-zinc-800 p-4 font-mono text-xs text-zinc-500 overflow-y-auto z-50">
       <div className="space-y-1">
         {logs.map((log, i) => (
            <div key={i}>{log}</div>
         ))}
         <div ref={endRef} />
       </div>
    </div>
  );
}
