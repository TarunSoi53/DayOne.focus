'use client';

import React from 'react';
import { WeeklyFocusChart } from '@/components/analytics/WeeklyFocusChart';
import { ContributionGrid } from '@/components/heatmap/ContributionGrid';
import { FocusRadarChart } from '@/components/analytics/FocusRadarChart';

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 pb-32 max-w-6xl mx-auto flex flex-col min-h-screen">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-800 pb-6 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">Analytics & Heatmap</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
             System Diagnostics, Heatmaps & Performance Vectors
          </p>
        </div>
        
        {/* Burnout Predictor Widget */}
        <div className="bg-[#0d1117] border border-zinc-800 px-6 py-3 rounded-sm flex items-center gap-4">
           <div>
             <p className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Burnout Risk</p>
             <p className="text-[#39d353] font-mono text-sm font-bold">12% (Optimal)</p>
           </div>
           <div className="w-16 h-2 bg-zinc-900 rounded-sm overflow-hidden">
             <div className="h-full bg-[#39d353] w-[12%]" />
           </div>
        </div>
      </header>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm">
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Total Focus Time</p>
            <p className="text-3xl font-sans text-zinc-100">124<span className="text-sm text-zinc-500 ml-1">hrs</span></p>
         </div>
         <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm">
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Tasks Completed</p>
            <p className="text-3xl font-sans text-zinc-100">342</p>
         </div>
         <div className="bg-[#0d1117] border border-[#39d353]/30 p-6 rounded-sm">
            <p className="text-[#39d353] text-[10px] font-mono uppercase tracking-widest mb-2">Current Streak</p>
            <p className="text-3xl font-sans text-zinc-100">12<span className="text-sm text-zinc-500 ml-1">days</span></p>
         </div>
      </div>

      {/* The Grid */}
      <div className="w-full">
         <ContributionGrid />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <WeeklyFocusChart />
         <FocusRadarChart />
      </div>

      {/* AI Diagnostic Report */}
      <div className="bg-purple-900/10 border border-purple-500/30 p-6 rounded-sm flex gap-4">
         <div className="w-8 h-8 rounded-sm bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
         </div>
         <div>
           <h3 className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-2">AI Diagnostic Report</h3>
           <p className="text-zinc-300 text-sm font-sans leading-relaxed">
             Your focus block variance has decreased by 15% this week, indicating higher consistency in deep work. 
             However, completion rates for "Architecture" tasks drop significantly after 14:00 PM. 
             Consider shifting high-cognitive load programming to your 08:00 AM blocks to align with your natural circadian peak.
           </p>
         </div>
      </div>
    </div>
  );
}
