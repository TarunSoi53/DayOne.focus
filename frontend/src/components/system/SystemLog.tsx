'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: new Date(Date.now() - 3600000).toISOString(), message: 'System initialized. Authentication verified.', type: 'info' },
  { id: '2', timestamp: new Date(Date.now() - 1800000).toISOString(), message: 'Daily coding focus down 15% compared to yesterday.', type: 'warning' },
];

export const SystemLog = () => {
  const [logs] = useState<LogEntry[]>(mockLogs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-0 left-0 w-full md:w-[450px] md:left-8 md:bottom-8 z-40">
      <div className="bg-[#09090b] border border-zinc-800 rounded-sm shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-zinc-900 border-b border-zinc-800 px-3 py-1.5 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">System.Log</span>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-sm bg-zinc-700"></div>
            <div className="w-1.5 h-1.5 rounded-sm bg-zinc-700"></div>
          </div>
        </div>
        <div 
          ref={scrollRef}
          className="p-3 h-32 overflow-y-auto font-mono text-xs flex flex-col gap-2 scrollbar-none"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex flex-col">
              <div className="text-zinc-600 text-[10px]">[{new Date(log.timestamp).toLocaleTimeString()}]</div>
              <div className={`flex gap-2 ${log.type === 'warning' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                <span className="text-zinc-700">{'>'}</span>
                <span>{log.message}</span>
              </div>
            </div>
          ))}
          <div className="animate-pulse w-2 h-3 bg-zinc-500 mt-1"></div>
        </div>
      </div>
    </div>
  );
};
