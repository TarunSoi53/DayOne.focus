'use client';

import React, { useState } from 'react';
import { TaskWorkspace } from '@/components/tasks/TaskWorkspace';

export default function TasksPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIOptimize = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32 h-full flex flex-col">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-800 pb-6 gap-6 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">Task Vectors</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
             Manage Daily Quests & Architecture Backlog
          </p>
        </div>
        
        <div className="flex gap-4">
           <button 
             onClick={handleAIOptimize}
             className="bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors flex items-center"
           >
             <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
             {isGenerating ? 'Optimizing...' : 'AI Autopilot'}
           </button>
           <button className="bg-[#39d353] hover:bg-[#26a641] text-[#050505] font-bold px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors">
             + New Vector
           </button>
        </div>
      </header>

      <div className="flex-1 min-h-[600px]">
         <TaskWorkspace />
      </div>
    </div>
  );
}
