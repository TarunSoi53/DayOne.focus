'use client';

import React, { useState } from 'react';
import { RoadmapTracker } from '@/components/tasks/RoadmapTracker';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function RoadmapPage() {
  const [goal, setGoal] = useState('');

  const { data: stats } = useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: async () => {
      const res = await api.get('/analytics/stats');
      return res.data;
    }
  });

  const { data: nodes = [] } = useQuery<any[]>({
    queryKey: ['roadmap'],
    queryFn: async () => {
      const res = await api.get('/roadmap');
      return res.data;
    },
    refetchInterval: 5000
  });

  // Derive skills from roadmap nodes
  const completedNodes = nodes.filter(n => n.status === 'COMPLETED').length;
  const totalXp = completedNodes * 500;
  const level = Math.floor(totalXp / 1000) + 1;

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32 max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
      
      {/* Main Roadmap Area */}
      <div className="flex-1 space-y-8 min-w-0">
        <header className="flex flex-col justify-between border-b border-zinc-800 pb-6 gap-2">
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">Skill Trees</h1>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest flex items-center">
             Curriculum Decomposition & Neural Learning Paths
          </p>
        </header>

        {/* AI Generator Input */}
        <div className="bg-[#0d1117] border border-zinc-800 p-6 rounded-sm">
          <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
             Target Objective Matrix
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="e.g. Master Next.js 14 App Router & Server Actions" 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && goal.trim()) { /* Will be handled by RoadmapTracker */ } }}
              className="flex-1 bg-[#050505] border border-zinc-800 text-zinc-200 text-sm p-4 rounded-sm outline-none focus:border-purple-500 transition-colors font-mono"
            />
          </div>
          <p className="text-zinc-600 text-[10px] font-mono mt-2 uppercase tracking-widest">
            Type a goal above then click "AI Optimize Path" in the curriculum below to generate a skill tree.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="h-[600px]">
             <RoadmapTracker goalOverride={goal} />
           </div>
           {/* Stats Panel */}
           <div className="border border-zinc-800 rounded-sm bg-[#0d1117] p-6 flex flex-col gap-6">
              <div>
                <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-4">Learning Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#050505] border border-zinc-800 p-4 rounded-sm text-center">
                    <p className="text-3xl font-sans text-zinc-100">{completedNodes}</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">Nodes Complete</p>
                  </div>
                  <div className="bg-[#050505] border border-zinc-800 p-4 rounded-sm text-center">
                    <p className="text-3xl font-sans text-zinc-100">{nodes.length}</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">Total Nodes</p>
                  </div>
                  <div className="bg-[#050505] border border-[#39d353]/30 p-4 rounded-sm text-center">
                    <p className="text-3xl font-sans text-[#39d353]">{totalXp}</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">Total XP</p>
                  </div>
                  <div className="bg-[#050505] border border-purple-500/30 p-4 rounded-sm text-center">
                    <p className="text-3xl font-sans text-purple-400">{level}</p>
                    <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">Current Level</p>
                  </div>
                </div>
              </div>

              {nodes.length > 0 && (
                <div>
                  <h3 className="text-zinc-400 font-mono text-xs uppercase tracking-widest mb-3">Curriculum Progress</h3>
                  <div className="w-full h-2 bg-zinc-900 rounded-sm overflow-hidden">
                    <div className="h-full bg-[#39d353] transition-all duration-500" style={{ width: `${nodes.length > 0 ? Math.round((completedNodes / nodes.length) * 100) : 0}%` }} />
                  </div>
                  <p className="text-zinc-600 font-mono text-[10px] mt-2 text-right uppercase tracking-widest">
                    {nodes.length > 0 ? Math.round((completedNodes / nodes.length) * 100) : 0}% Complete
                  </p>
                </div>
              )}

              {nodes.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8">
                  <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span className="font-mono text-zinc-500 text-xs uppercase tracking-widest">
                     Awaiting Curriculum...
                  </span>
                  <p className="text-zinc-600 font-sans text-sm max-w-xs">
                     Type a broad goal above. Click "AI Optimize Path" to have Gemini construct a learning path.
                  </p>
                </div>
              )}
           </div>
        </div>
      </div>

      {/* Skill Inventory Sidebar */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#050505] md:pl-8 pt-8 md:pt-0 flex flex-col shrink-0">
         <h3 className="text-zinc-100 font-sans text-lg font-semibold mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Skill Inventory
         </h3>
         
         <div className="space-y-4">
            {nodes.length === 0 && (
              <p className="text-zinc-600 font-mono text-xs italic">No skills tracked yet. Generate a curriculum to see your skill tree.</p>
            )}
            {nodes.map(node => {
              const isComplete = node.status === 'COMPLETED';
              const isActive = node.status === 'IN_PROGRESS';
              return (
                <div key={node.id} className={`bg-[#0d1117] border rounded-sm p-4 ${isComplete ? 'border-[#39d353]/30' : isActive ? 'border-zinc-500' : 'border-zinc-800 opacity-60'}`}>
                   <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-sans text-sm font-medium ${isComplete ? 'text-[#39d353]' : 'text-zinc-300'}`}>{node.title}</h4>
                      <span className={`font-mono text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm border ${
                        isComplete ? 'text-[#39d353] border-[#39d353]/30 bg-[#39d353]/5' : 
                        isActive ? 'text-zinc-300 border-zinc-500 bg-zinc-800' : 
                        'text-zinc-600 border-zinc-800'
                      }`}>
                        {isComplete ? 'Mastered' : isActive ? 'Learning' : 'Locked'}
                      </span>
                   </div>
                   <div className="w-full h-1.5 bg-zinc-900 rounded-sm overflow-hidden mb-2">
                      <div className={`h-full ${isComplete ? 'bg-[#39d353] w-full' : isActive ? 'bg-zinc-500 w-[50%]' : 'bg-zinc-800 w-0'}`} />
                   </div>
                   <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest text-right">
                     {isComplete ? node.xpReward : 0} / {node.xpReward} XP
                   </p>
                </div>
              );
            })}
         </div>
      </div>
      
    </div>
  );
}
