'use client';

import React, { useState } from 'react';

// Mock types
type Priority = 'P0' | 'P1' | 'P2';
type Task = { 
  id: string; 
  title: string; 
  status: 'TODO' | 'DONE'; 
  isAiGenerated?: boolean; 
  xp: number; 
  project?: string; 
  completedAt?: string; 
  subtasks?: Task[];
  priority?: Priority;
  isBlocked?: boolean;
};

const mockDailies: Task[] = [
  { id: 'd1', title: '14,000 Steps Target', status: 'TODO', xp: 50 },
  { id: 'd2', title: '5:30 AM Workout', status: 'DONE', xp: 100, completedAt: 'Today, 06:45 AM' },
  { id: 'd3', title: 'Read System Docs (15m)', status: 'TODO', isAiGenerated: true, xp: 20 },
];

const mockProjects = [
  {
    id: 'p1', name: 'Foodiee Monorepo', type: 'project', tasks: [
      { 
        id: 't1', title: 'Authentication Refactor', status: 'TODO', xp: 120, priority: 'P0',
        subtasks: [
          { id: 'st1', title: 'Update Prisma Auth models', status: 'DONE', xp: 10 }, 
          { id: 'st2', title: 'Configure NestJS JWT Guard', status: 'TODO', xp: 10, isBlocked: false },
        ] 
      }
    ]
  },
  {
    id: 'h1', name: 'Health & Body', type: 'pillar', tasks: [
      { id: 't3', title: 'Meal Prep for Week', status: 'TODO', xp: 80, priority: 'P1' }
    ]
  }
];

export const TaskWorkspace = ({ setFocusVector }: { setFocusVector?: (title: string, sub: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'dailies' | 'projects' | 'completed'>('projects');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dumpInput, setDumpInput] = useState('');

  const handleSetFocus = (taskTitle: string, subtasks?: Task[]) => {
    const nextSub = subtasks?.find(s => s.status === 'TODO' && !s.isBlocked);
    if (setFocusVector) {
      setFocusVector(taskTitle, nextSub ? nextSub.title : 'Execute root task objective.');
    }
  };

  const getPriorityColor = (p?: Priority) => {
    if (p === 'P0') return 'text-red-400 bg-red-400/10 border-red-400/30';
    if (p === 'P1') return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    if (p === 'P2') return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    return 'hidden';
  };

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] flex flex-col md:flex-row h-full min-h-[600px] relative overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* Brain Dump Capture Bar */}
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2 bg-[#0d1117]">
           <span className="text-zinc-500 font-mono">{'>'}</span>
           <input 
             type="text" 
             value={dumpInput}
             onChange={(e) => setDumpInput(e.target.value)}
             placeholder="Brain dump thoughts, tasks, or anxieties... AI will categorize them." 
             className="flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600 font-mono" 
           />
           <button className="text-[9px] font-mono bg-purple-500/10 text-purple-400 px-3 py-1.5 rounded-sm border border-purple-500/30 hover:bg-purple-500/20 uppercase tracking-widest transition-colors whitespace-nowrap">
             AI Sort
           </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 font-mono text-xs overflow-x-auto scrollbar-none shrink-0 bg-[#050505]">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 text-center transition-colors uppercase tracking-widest whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-[#09090b] text-zinc-100 border-b-2 border-[#39d353]' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('dailies')}
            className={`px-6 py-3 text-center transition-colors uppercase tracking-widest whitespace-nowrap ${
              activeTab === 'dailies' ? 'bg-[#09090b] text-zinc-100 border-b-2 border-[#39d353]' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
            }`}
          >
            Daily Quests
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 text-center transition-colors uppercase tracking-widest whitespace-nowrap ${
              activeTab === 'completed' ? 'bg-[#09090b] text-zinc-100 border-b-2 border-[#39d353]' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
            }`}
          >
            History Log
          </button>
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto scrollbar-none relative">
          {activeTab === 'dailies' && (
             <div className="space-y-3">
              {mockDailies.map(t => (
                <div key={t.id} className={`flex items-center justify-between p-3 border rounded-sm group ${t.status === 'DONE' ? 'border-[#39d353]/30 bg-[#39d353]/5' : t.isAiGenerated ? 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/30'}`}>
                  <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedTask(t)}>
                    <div className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${t.status === 'DONE' ? 'bg-[#39d353] border-[#39d353]' : 'border-zinc-600 group-hover:border-[#39d353]'}`}>
                      {t.status === 'DONE' && <svg className="w-3 h-3 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-sans text-sm ${t.status === 'DONE' ? 'text-zinc-500 line-through' : 'text-zinc-300 group-hover:text-zinc-100'}`}>{t.title}</span>
                      {t.isAiGenerated && <span className="text-[9px] font-mono bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-sm border border-purple-500/50 uppercase tracking-widest">[AI Generated]</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {mockProjects.filter(p => p.id === 'p1').map(p => (
                <div key={p.id}>
                  <div className="flex justify-between items-end mb-4 border-b border-zinc-800 pb-2">
                    <h4 className="text-zinc-100 font-sans text-lg font-semibold tracking-tight">{p.name}</h4>
                  </div>
                  <div className="space-y-4">
                    {p.tasks.map(t => (
                      <div key={t.id} className="border border-zinc-800 p-4 rounded-sm bg-[#050505]/50">
                        <div className="flex justify-between items-start mb-3 group">
                          <div className="flex gap-3 items-center">
                             <div className="w-4 h-4 border border-zinc-600 rounded-sm group-hover:border-[#39d353] cursor-pointer shrink-0" />
                             <div className="flex items-center gap-2">
                               <h5 className="text-zinc-200 text-sm font-sans font-medium hover:underline cursor-pointer transition-colors" onClick={() => setSelectedTask(t)}>{t.title}</h5>
                               {t.priority && (
                                 <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded-sm ${getPriorityColor(t.priority)}`}>
                                   {t.priority}
                                 </span>
                               )}
                             </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-zinc-500 hover:text-purple-400 transition-colors hidden sm:block" title="AI Sub-task Breakdown">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </button>
                            <button onClick={() => handleSetFocus(t.title, t.subtasks)} className="text-[9px] font-mono bg-[#39d353]/10 text-[#39d353] border border-[#39d353]/30 px-2 py-1 hover:bg-[#39d353]/20 transition-colors uppercase tracking-widest hidden sm:block whitespace-nowrap rounded-sm">Set Target</button>
                          </div>
                        </div>
                        {t.subtasks && (
                          <div className="ml-7 border-l border-zinc-800 pl-4 space-y-2.5 mt-3">
                            {t.subtasks.map(st => (
                              <div key={st.id} className="flex items-center justify-between text-xs group">
                                <div className="flex items-center gap-3">
                                  <div className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border shrink-0 ${st.status === 'DONE' ? 'bg-zinc-700 border-zinc-700' : st.isBlocked ? 'border-red-900 bg-red-900/20' : 'border-zinc-600'}`}>
                                    {st.status === 'DONE' && <svg className="w-2 h-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                    {st.isBlocked && <svg className="w-2 h-2 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
                                  </div>
                                  <span className={`font-sans ${st.status === 'DONE' ? 'text-zinc-600 line-through' : st.isBlocked ? 'text-zinc-500' : 'text-zinc-300'}`}>
                                    {st.title}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Workspace Right Navigation (Projects, Pillars, Telemetry) */}
      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#050505] p-4 flex flex-col shrink-0 order-first md:order-last">
         <h3 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-3">Project Telemetry</h3>
         <div className="bg-[#0d1117] border border-zinc-800 rounded-sm p-3 mb-6">
            <div className="flex justify-between items-center mb-1">
               <span className="text-zinc-300 font-sans text-xs font-semibold">Foodiee Monorepo</span>
               <span className="text-[#39d353] font-mono text-[9px]">45%</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-sm overflow-hidden mt-2">
               <div className="h-full bg-[#39d353] w-[45%]" />
            </div>
            <p className="text-zinc-500 font-mono text-[9px] mt-2 leading-tight">Velocity is stable. 12 tasks remain in current sprint.</p>
         </div>

         <h3 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-3">Active Projects</h3>
         <ul className="space-y-1 mb-6">
            <li><button className="w-full text-left px-2 py-1.5 text-zinc-100 bg-zinc-900 border-r-2 border-[#39d353] font-sans text-sm rounded-l-sm transition-colors">Foodiee Monorepo</button></li>
            <li><button className="w-full text-left px-2 py-1.5 text-zinc-400 font-sans text-sm hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors">DayOne OS</button></li>
         </ul>

         <h3 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-3">Life Pillars</h3>
         <ul className="space-y-1 mb-6">
            <li><button className="w-full text-left px-2 py-1.5 text-zinc-400 font-sans text-sm hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors">Health & Body</button></li>
            <li><button className="w-full text-left px-2 py-1.5 text-zinc-400 font-sans text-sm hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors">Wealth & Career</button></li>
            <li><button className="w-full text-left px-2 py-1.5 text-zinc-400 font-sans text-sm hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors">Mind & Knowledge</button></li>
         </ul>
      </div>

      {/* Task Edit Slide-over Modal */}
      <div className={`absolute inset-y-0 right-0 w-full sm:w-80 bg-[#0d1117] border-l border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 flex flex-col z-20 transition-transform duration-300 ease-in-out ${selectedTask ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedTask && (
          <>
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">Edit Task</h3>
              <button onClick={() => setSelectedTask(null)} className="text-zinc-500 hover:text-zinc-300 transition-colors">✕</button>
            </div>
            
            <div className="space-y-4 flex-1">
              {/* forms... */}
              <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Title</label>
                  <input type="text" defaultValue={selectedTask.title} className="w-full bg-[#050505] border border-zinc-800 text-zinc-200 text-sm p-2 rounded-sm outline-none focus:border-[#39d353] transition-colors" />
              </div>
              <div className="flex gap-2 pt-4 border-t border-zinc-800">
                 <button className="flex-1 py-2 bg-red-500/10 text-red-500 border border-red-500/30 font-mono text-xs uppercase tracking-widest hover:bg-red-500/20 rounded-sm transition-colors">Delete</button>
                 <button className="flex-1 py-2 bg-[#39d353] text-[#050505] font-mono text-xs uppercase tracking-widest hover:bg-[#26a641] rounded-sm font-bold transition-colors">Save</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
