'use client';

import React from 'react';

const mockRoadmap = [
  { id: '1', title: 'Python Fundamentals', status: 'COMPLETED', xp: 100 },
  { id: '2', title: 'Data Structures & Algorithms', status: 'IN_PROGRESS', xp: 250 },
  { id: '3', title: 'Machine Learning Basics (PyTorch)', status: 'LOCKED', xp: 500 },
  { id: '4', title: 'AI Agent Integration', status: 'LOCKED', xp: 1000 },
];

export const RoadmapTracker = () => {
  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-full min-h-[400px]">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-zinc-100 text-sm font-sans font-medium">Core Curriculum</h3>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">AI Engineering Path</p>
        </div>
        <button className="text-[#39d353] font-mono text-xs uppercase tracking-widest border border-[#39d353]/30 px-3 py-1.5 hover:bg-[#39d353]/10 transition-colors">
          Decompose Goal
        </button>
      </div>

      <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
        {mockRoadmap.map((node, index) => (
          <div key={node.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            {/* Timeline Marker */}
            <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-[#09090b] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${
              node.status === 'COMPLETED' ? 'bg-[#39d353]' : 
              node.status === 'IN_PROGRESS' ? 'bg-zinc-100 animate-pulse' : 
              'bg-zinc-800'
            }`}>
              {node.status === 'COMPLETED' && (
                <svg className="w-3 h-3 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Content Box */}
            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-sm border ${
              node.status === 'COMPLETED' ? 'border-[#39d353]/30 bg-[#39d353]/5' :
              node.status === 'IN_PROGRESS' ? 'border-zinc-500 bg-zinc-900/50' :
              'border-zinc-800 bg-[#0d1117] opacity-60'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className={`font-mono text-[10px] uppercase tracking-widest ${
                  node.status === 'COMPLETED' ? 'text-[#39d353]' :
                  node.status === 'IN_PROGRESS' ? 'text-zinc-300' :
                  'text-zinc-600'
                }`}>
                  {node.status.replace('_', ' ')}
                </span>
                <span className="font-mono text-[10px] text-zinc-500">{node.xp} XP</span>
              </div>
              <h4 className={`text-sm font-sans ${node.status === 'LOCKED' ? 'text-zinc-500' : 'text-zinc-100'}`}>
                {node.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
