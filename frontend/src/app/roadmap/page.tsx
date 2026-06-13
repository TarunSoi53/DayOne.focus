'use client';

import React, { useState } from 'react';
import { RoadmapTracker } from '@/components/tasks/RoadmapTracker';

export default function RoadmapPage() {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!goal) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const currentSkills = [
    { name: 'Python', level: 42, xp: 8500 },
    { name: 'React', level: 35, xp: 7200 },
    { name: 'System Design', level: 18, xp: 2100 },
    { name: 'AI Agents', level: 5, xp: 450 },
  ];

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
              className="flex-1 bg-[#050505] border border-zinc-800 text-zinc-200 text-sm p-4 rounded-sm outline-none focus:border-purple-500 transition-colors font-mono"
            />
            <button 
              onClick={handleGenerate}
              className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50 px-8 py-4 rounded-sm font-mono text-xs uppercase tracking-widest transition-colors sm:w-auto w-full flex justify-center items-center"
            >
              {isGenerating ? 'Synthesizing...' : 'Decompose'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="h-[600px]">
             <RoadmapTracker />
           </div>
           {/* Instruction / Secondary Tree */}
           <div className="border border-zinc-800 border-dashed rounded-sm flex flex-col items-center justify-center bg-zinc-900/10 p-8 text-center gap-4">
              <svg className="w-8 h-8 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <span className="font-mono text-zinc-500 text-xs uppercase tracking-widest">
                 Awaiting New Curriculum Request...
              </span>
              <p className="text-zinc-600 font-sans text-sm">
                 Type a broad goal above. The AI engine will automatically research the optimal learning path and construct a gamified skill tree with XP bounties for each node.
              </p>
           </div>
        </div>
      </div>

      {/* Skill Inventory Sidebar */}
      <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#050505] md:pl-8 pt-8 md:pt-0 flex flex-col shrink-0">
         <h3 className="text-zinc-100 font-sans text-lg font-semibold mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            Skill Inventory
         </h3>
         
         <div className="space-y-6">
            {currentSkills.map(skill => (
              <div key={skill.name} className="bg-[#0d1117] border border-zinc-800 rounded-sm p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-zinc-300 font-sans text-sm font-medium">{skill.name}</h4>
                    <span className="text-[#39d353] font-mono text-[10px] uppercase tracking-widest border border-[#39d353]/30 px-1.5 py-0.5 rounded-sm bg-[#39d353]/5">
                      Lvl {skill.level}
                    </span>
                 </div>
                 <div className="w-full h-1.5 bg-zinc-900 rounded-sm overflow-hidden mb-2">
                    {/* Mock progress calculation based on XP */}
                    <div className="h-full bg-zinc-500 w-[70%]" />
                 </div>
                 <p className="text-zinc-600 font-mono text-[9px] uppercase tracking-widest text-right">
                   {skill.xp} / {(skill.level + 1) * 200} XP to next level
                 </p>
              </div>
            ))}
         </div>
      </div>
      
    </div>
  );
}
