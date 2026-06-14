'use client';

import React from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

type RoadmapNode = {
  id: string;
  title: string;
  status: 'LOCKED' | 'IN_PROGRESS' | 'COMPLETED';
  xpReward: number;
  estHrs?: number;
  description?: string;
  order: number;
};

export const RoadmapTracker = ({ goalOverride }: { goalOverride?: string }) => {
  const queryClient = useQueryClient();
  const [isOptimizing, setIsOptimizing] = React.useState(false);

  const { data: nodes = [], isLoading } = useQuery<RoadmapNode[]>({
    queryKey: ['roadmap'],
    queryFn: async () => {
      const res = await api.get('/roadmap');
      return res.data;
    },
    refetchInterval: 5000
  });

  const handleAiOptimize = async () => {
    const goal = goalOverride?.trim() || 'Master Fullstack AI Engineering';
    setIsOptimizing(true);
    try {
      const res = await api.post('/ai/decompose-roadmap', { goal });
      
      const result = res.data;
      if (result.data && Array.isArray(result.data)) {
        // AI generated new nodes, so we should clear old nodes and create new ones
        for (const node of nodes) {
          await api.delete(`/roadmap/${node.id}`);
        }

        for (let i = 0; i < result.data.length; i++) {
          const item = result.data[i];
          await api.post('/roadmap', {
            title: item.title || 'AI Milestone',
            description: item.description || '',
            xpReward: 500,
            order: i
          });
        }
        
        queryClient.invalidateQueries({ queryKey: ['roadmap'] });
      }
    } catch (error) {
      console.error('Failed to optimize path', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] p-6 w-full h-full flex flex-col min-w-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-zinc-800 pb-4 shrink-0 gap-4">
        <div>
          <h3 className="text-zinc-100 text-sm font-sans font-medium">Core Curriculum</h3>
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mt-1">AI Engineering Path</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleAiOptimize}
            disabled={isOptimizing}
            className="text-purple-400 font-mono text-[10px] uppercase tracking-widest border border-purple-500/30 px-3 py-1.5 hover:bg-purple-500/10 transition-colors bg-purple-500/5 rounded-sm disabled:opacity-50"
          >
            {isOptimizing ? 'Optimizing...' : 'AI Optimize Path'}
          </button>
          <button className="text-[#39d353] font-mono text-[10px] uppercase tracking-widest border border-[#39d353]/30 px-3 py-1.5 hover:bg-[#39d353]/10 transition-colors rounded-sm">
            Adopt Curriculum
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pr-2 pb-12">
        <div className="relative pl-4 space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
          {nodes.map((node, index) => (
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
                    <span>{node.xpReward} XP</span>
                  </div>
                </div>
                <h4 className={`text-sm font-sans font-medium mb-1 ${node.status === 'LOCKED' ? 'text-zinc-400' : 'text-zinc-100'}`}>
                  {node.title}
                </h4>
                <p className="text-xs text-zinc-500 font-sans leading-relaxed">
                  {node.description || 'No description provided.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
