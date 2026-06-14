'use client';

import React, { useEffect, useState, useRef } from 'react';
import { WeeklyFocusChart } from '@/components/analytics/WeeklyFocusChart';
import { ContributionGrid } from '@/components/heatmap/ContributionGrid';
import { FocusRadarChart } from '@/components/analytics/FocusRadarChart';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function AnalyticsPage() {
  const [aiReport, setAiReport] = useState('Initiating neural scan...');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const hasFetched = useRef(false);

  const { data: stats } = useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: async () => {
      const res = await api.get('/analytics/stats');
      return res.data;
    },
    refetchInterval: 10000
  });

  useEffect(() => {
    if (stats && !hasFetched.current) {
      hasFetched.current = true;
      setIsAnalyzing(true);
      api.post('/ai/terminal-analyze', { metrics: stats }).then(res => {
        if (res.data && res.data.output) {
          setAiReport(res.data.output);
        }
      }).catch(() => {
        setAiReport('> ERROR: Telemetry analysis failed. Verify your API key in Settings.');
      }).finally(() => setIsAnalyzing(false));
    }
  }, [stats]);

  const refreshReport = () => {
    if (!stats) return;
    setIsAnalyzing(true);
    setAiReport('Re-scanning neural pathways...');
    api.post('/ai/terminal-analyze', { metrics: stats }).then(res => {
      if (res.data && res.data.output) {
        setAiReport(res.data.output);
      }
    }).catch(() => {
      setAiReport('> ERROR: Telemetry analysis failed. Verify your API key in Settings.');
    }).finally(() => setIsAnalyzing(false));
  };

  const totalFocusTime = stats?.totalFocusTime || 0;
  const tasksCompleted = stats?.tasksCompleted || 0;
  const currentStreak = stats?.currentStreak || 0;
  const burnoutRisk = stats?.burnoutRisk || 0;

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
             <p className={`${burnoutRisk > 60 ? 'text-red-500' : burnoutRisk > 30 ? 'text-yellow-500' : 'text-[#39d353]'} font-mono text-sm font-bold`}>{burnoutRisk}% {burnoutRisk > 60 ? '(High)' : burnoutRisk > 30 ? '(Warning)' : '(Optimal)'}</p>
           </div>
           <div className="w-16 h-2 bg-zinc-900 rounded-sm overflow-hidden">
             <div className={`h-full ${burnoutRisk > 60 ? 'bg-red-500' : burnoutRisk > 30 ? 'bg-yellow-500' : 'bg-[#39d353]'}`} style={{ width: `${burnoutRisk}%` }} />
           </div>
        </div>
      </header>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm">
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Total Focus Time</p>
            <p className="text-3xl font-sans text-zinc-100">{totalFocusTime}<span className="text-sm text-zinc-500 ml-1">hrs</span></p>
         </div>
         <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm">
            <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Tasks Completed</p>
            <p className="text-3xl font-sans text-zinc-100">{tasksCompleted}</p>
         </div>
         <div className="bg-[#0d1117] border border-[#39d353]/30 p-6 rounded-sm">
            <p className="text-[#39d353] text-[10px] font-mono uppercase tracking-widest mb-2">Current Streak</p>
            <p className="text-3xl font-sans text-zinc-100">{currentStreak}<span className="text-sm text-zinc-500 ml-1">days</span></p>
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
      <div className="bg-purple-900/10 border border-purple-500/30 p-6 rounded-sm">
         <div className="flex items-start gap-4">
           <div className="w-8 h-8 rounded-sm bg-purple-500/20 border border-purple-500/50 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
           </div>
           <div className="flex-1">
             <div className="flex items-center justify-between mb-2">
               <h3 className="text-purple-400 font-mono text-xs uppercase tracking-widest">AI Diagnostic Report</h3>
               <button 
                 onClick={refreshReport} 
                 disabled={isAnalyzing}
                 className="text-purple-400/60 hover:text-purple-300 font-mono text-[10px] uppercase tracking-widest border border-purple-500/20 px-3 py-1 rounded-sm hover:bg-purple-500/10 transition-colors disabled:opacity-50"
               >
                 {isAnalyzing ? 'Scanning...' : 'Re-scan'}
               </button>
             </div>
             <p className={`text-zinc-300 text-sm font-mono whitespace-pre-wrap leading-relaxed ${isAnalyzing ? 'animate-pulse' : ''}`}>
               {aiReport}
             </p>
           </div>
         </div>
      </div>
    </div>
  );
}
