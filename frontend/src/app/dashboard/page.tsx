'use client';

import React, { useState } from 'react';
import { ContributionGrid } from '@/components/heatmap/ContributionGrid';
import { ZenFocusTimer } from '@/components/timer/ZenFocusTimer';
import Link from 'next/link';

export default function DashboardPage() {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [mindState, setMindState] = useState<'Foggy' | 'Clear'>('Clear');
  const [isCalibrating, setIsCalibrating] = useState(false);

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => setIsCalibrating(false), 1500);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32">
      {/* Header HUD */}
      <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-800 pb-6 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">Command Center</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
             Global overview & AI recommendations
          </p>
        </div>
        
        <div className="flex gap-8 font-mono text-sm text-zinc-400 uppercase tracking-widest">
           <div className="flex flex-col text-right">
             <span className="text-zinc-600 text-[10px]">Streak</span>
             <span className="text-[#39d353]">12 Days</span>
           </div>
           <div className="flex flex-col text-right">
             <span className="text-zinc-600 text-[10px]">Lvl</span>
             <span className="text-zinc-100">42</span>
           </div>
        </div>
      </header>

      {/* NEW: Morning Briefing */}
      <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border border-blue-500/20 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-start md:items-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
         <div className="flex-1 relative z-10">
            <h3 className="text-blue-400 font-mono text-xs uppercase tracking-widest mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Daily Intelligence Briefing
            </h3>
            <p className="text-zinc-300 text-sm font-sans leading-relaxed">
              Good morning. You successfully closed 5 architecture tasks yesterday. You currently have <span className="text-zinc-100 font-bold">2 high-priority items</span> carrying over. Your biological rhythm suggests prioritizing the "Authentication Refactor" before 11:00 AM.
            </p>
         </div>
         <button className="relative z-10 shrink-0 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors">
            Acknowledge
         </button>
      </div>

      {/* Mind Calibration Widget */}
      <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
         <div className="md:col-span-2">
            <h3 className="text-zinc-300 font-mono text-xs uppercase tracking-widest mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              State of Mind Calibration
            </h3>
            <div className="flex flex-col sm:flex-row gap-6">
              <div>
                 <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Energy Reserves</p>
                 <div className="flex gap-2">
                    {['Low', 'Medium', 'High'].map(lvl => (
                      <button 
                        key={lvl}
                        onClick={() => setEnergyLevel(lvl as any)}
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors border ${energyLevel === lvl ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-[#050505] border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
                      >
                        {lvl}
                      </button>
                    ))}
                 </div>
              </div>
              <div>
                 <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-2">Mental Clarity</p>
                 <div className="flex gap-2">
                    {['Foggy', 'Clear'].map(state => (
                      <button 
                        key={state}
                        onClick={() => setMindState(state as any)}
                        className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest rounded-sm transition-colors border ${mindState === state ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'bg-[#050505] border-zinc-800 text-zinc-500 hover:bg-zinc-900'}`}
                      >
                        {state}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
         </div>
         <div className="flex flex-col items-start md:items-end md:border-l md:border-zinc-800 md:pl-6">
            {energyLevel === 'Low' || mindState === 'Foggy' ? (
              <p className="text-zinc-400 text-xs font-sans text-left md:text-right mb-3">AI shifting priorities to <strong className="text-zinc-200">low-friction documentation</strong> tasks.</p>
            ) : (
              <p className="text-[#39d353] text-xs font-sans text-left md:text-right mb-3">Optimal state detected. AI prioritizing <strong className="text-zinc-100">Deep Work Architecture</strong>.</p>
            )}
            <button onClick={handleCalibrate} className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors w-full md:w-auto">
              {isCalibrating ? 'Re-Routing...' : 'Lock State'}
            </button>
         </div>
      </div>

      {/* Next Target Widget */}
      <div className="bg-[#0d1117] border border-[#39d353]/30 border-l-4 border-l-[#39d353] p-6 rounded-sm flex flex-col justify-center">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#39d353] mb-2">Current Target Vector</span>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {energyLevel === 'Low' || mindState === 'Foggy' ? (
              <>
                 <h2 className="text-zinc-100 text-xl font-medium font-sans mb-1">Update README with API Specs</h2>
                 <p className="text-zinc-500 text-sm font-sans">Project: Foodiee Monorepo (Low Friction)</p>
              </>
            ) : (
              <>
                <h2 className="text-zinc-100 text-xl font-medium font-sans mb-1">Configure NestJS JWT Guard</h2>
                <p className="text-zinc-500 text-sm font-sans">Project: Authentication Refactor</p>
              </>
            )}
          </div>
          <Link href="/tasks" className="text-[#39d353] font-mono text-xs uppercase tracking-widest border border-[#39d353]/30 px-4 py-2 hover:bg-[#39d353]/10 transition-colors text-center">
            View in Backlog
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="space-y-4">
           <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Neural Link Timer</h3>
           <div className="h-[250px] border border-zinc-800 rounded-sm overflow-hidden">
              <ZenFocusTimer isFocusMode={isFocusMode} setIsFocusMode={setIsFocusMode} />
           </div>
         </div>
         <div className="space-y-4">
           <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest">Progress Heatmap</h3>
           <ContributionGrid />
         </div>
      </div>
    </div>
  );
}
