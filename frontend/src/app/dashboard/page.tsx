'use client';

import React, { useState } from 'react';
import { ContributionGrid } from '@/components/heatmap/ContributionGrid';
import { SystemLog } from '@/components/system/SystemLog';
import { ZenFocusTimer } from '@/components/timer/ZenFocusTimer';
import { TaskWorkspace } from '@/components/tasks/TaskWorkspace';
import { RoadmapTracker } from '@/components/tasks/RoadmapTracker';
import { WeeklyFocusChart } from '@/components/analytics/WeeklyFocusChart';

export default function DashboardPage() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4d4d8] font-sans selection:bg-zinc-800 selection:text-white">
      <div className={`max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 pb-40 transition-opacity duration-700 ${isFocusMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Header HUD */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-800 pb-6 gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#0d1117] border border-zinc-800 rounded-sm flex items-center justify-center shadow-lg">
              <span className="text-2xl font-mono text-zinc-100 font-bold">42</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight">DayOne.Focus</h1>
              <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
                <span className="w-2 h-2 bg-[#39d353] rounded-sm mr-2 animate-pulse"></span>
                Operative Status: Online
              </p>
            </div>
          </div>
          
          {/* Prominent Next Action Widget */}
          <div className="flex-1 max-w-lg bg-[#0d1117] border border-[#39d353]/30 border-l-4 border-l-[#39d353] p-4 rounded-sm flex flex-col justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#39d353] mb-1">Current Focus Vector</span>
            <p className="text-zinc-100 text-sm font-medium">Write Prisma migration for user roles</p>
          </div>

          <div className="flex gap-8 font-mono text-sm text-zinc-400 uppercase tracking-widest">
             <div className="flex flex-col text-right">
               <span className="text-zinc-600 text-[10px]">Streak</span>
               <span className="text-zinc-100">12 Days</span>
             </div>
             <div className="flex flex-col text-right">
               <span className="text-zinc-600 text-[10px]">Focus</span>
               <span className="text-zinc-100">124H</span>
             </div>
          </div>
        </header>

        {/* Top Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <ContributionGrid />
          <WeeklyFocusChart />
        </div>

        {/* Workspace Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Left: Dual-Tab Task Workspace */}
          <section className="xl:col-span-1 h-full">
            <TaskWorkspace />
          </section>

          {/* Middle: Learning Roadmap */}
          <section className="xl:col-span-1 h-full">
            <RoadmapTracker />
          </section>

          {/* Right: Focus Timer */}
          <section className="xl:col-span-1 h-full">
            <ZenFocusTimer isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode} />
          </section>
        </div>
      </div>

      {/* Persistent System Log */}
      {!isFocusMode && <SystemLog />}
    </div>
  );
}
