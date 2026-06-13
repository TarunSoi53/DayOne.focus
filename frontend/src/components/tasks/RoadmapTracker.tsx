'use client';

import React from 'react';

const mockRoadmap = [
  { id: '1', title: 'Python Fundamentals', status: 'COMPLETED', xp: 100, estHrs: 15, desc: 'Master core syntax, data types, and control flow.' },
  { id: '2', title: 'Data Structures & Algorithms', status: 'IN_PROGRESS', xp: 250, estHrs: 40, desc: 'Implement trees, graphs, and master big-O notation.' },
  { id: '3', title: 'Machine Learning Basics (PyTorch)', status: 'LOCKED', xp: 500, estHrs: 60, desc: 'Build foundational neural networks and understand backpropagation.', dependsOn: '2' },
  { id: '4', title: 'AI Agent Integration', status: 'LOCKED', xp: 1000, estHrs: 30, desc: 'Connect LLMs to codebases using tools and function calling.', dependsOn: '3' },
  { id: '5', title: 'Production Deployment', status: 'LOCKED', xp: 500, estHrs: 20, desc: 'Deploy the agent architecture via Docker & AWS.', dependsOn: '4' },
];

export const RoadmapTracker = () => {
  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4 shrink-0">
        <div>
          <h3 className="text-zinc-100 text-sm font-sans font-medium">Core Curriculum</h3>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">AI Engineering Path</p>
        </div>
        <div className="flex gap-2">
          <button className="text-purple-400 font-mono text-[10px] uppercase tracking-widest border border-purple-500/30 px-3 py-1.5 hover:bg-purple-500/10 transition-colors bg-purple-500/5 rounded-sm">
            AI Optimize Path
          </button>
          <button className="text-[#39d353] font-mono text-[10px] uppercase tracking-widest border border-[#39d353]/30 px-3 py-1.5 hover:bg-[#39d353]/10 transition-colors rounded-sm">
            Adopt Curriculum
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pr-2 pb-12">
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
              <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-sm border transition-colors hover:border-zinc-500 cursor-default ${
                node.status === 'COMPLETED' ? 'border-[#39d353]/30 bg-[#39d353]/5' :
                node.status === 'IN_PROGRESS' ? 'border-zinc-500 bg-zinc-900/50' :
                'border-zinc-800 bg-[#0d1117] opacity-60 hover:opacity-100'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-[10px] uppercase tracking-widest ${
                    node.status === 'COMPLETED' ? 'text-[#39d353]' :
                    node.status === 'IN_PROGRESS' ? 'text-zinc-300' :
                    'text-zinc-600'
                  }`}>
                    {node.status.replace('_', ' ')}
                  </span>
                  <div className="flex gap-2 text-[9px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded-sm">
                    <span>{node.xp} XP</span>
                    <span>|</span>
                    <span>~{node.estHrs}H</span>
                  </div>
                </div>
                <h4 className={`text-sm font-sans font-medium mb-1 ${node.status === 'LOCKED' ? 'text-zinc-400' : 'text-zinc-100'}`}>
                  {node.title}
                </h4>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  {node.desc}
                </p>
                {node.dependsOn && (
                  <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-center text-[9px] font-mono text-orange-500/70 uppercase tracking-widest">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                    Requires Node {node.dependsOn}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
