'use client';

import React, { useState, useEffect } from 'react';

type Priority = 'P0' | 'P1' | 'P2';
type Task = { 
  id: string; 
  title: string; 
  status: 'TODO' | 'DONE'; 
  isAiGenerated?: boolean; 
  xpReward: number; 
  projectId?: string; 
  completedAt?: string; 
  subTasks?: Task[];
  priority?: Priority;
  isActiveTarget?: boolean;
};

type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export const TaskWorkspace = ({ setFocusVector, isAddingTask, setIsAddingTask }: { 
  setFocusVector?: (title: string, sub: string) => void, 
  isAddingTask?: boolean, 
  setIsAddingTask?: (val: boolean) => void 
}) => {
  const [activeTab, setActiveTab] = useState<'dailies' | 'projects' | 'completed'>('projects');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dumpInput, setDumpInput] = useState('');
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit / Add Form State
  const [formTitle, setFormTitle] = useState('');
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isAddingTask) {
      setSelectedTask(null);
      setFormTitle('');
    }
  }, [isAddingTask]);

  useEffect(() => {
    if (selectedTask) {
      setFormTitle(selectedTask.title);
      if (setIsAddingTask) setIsAddingTask(false);
    }
  }, [selectedTask, setIsAddingTask]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [tasksRes, projectsRes] = await Promise.all([
        fetch('http://localhost:3001/tasks'),
        fetch('http://localhost:3001/tasks/projects')
      ]);
      const tasksData = await tasksRes.json();
      const projectsData = await projectsRes.json();
      setTasks(tasksData);
      setProjects(projectsData);
    } catch (e) {
      console.error('Failed to fetch data', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    try {
      if (isAddingTask) {
        await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: formTitle, isRecurringDaily: activeTab === 'dailies' })
        });
        if (setIsAddingTask) setIsAddingTask(false);
      } else if (selectedTask) {
        await fetch(`http://localhost:3001/tasks/${selectedTask.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: formTitle })
        });
        setSelectedTask(null);
      }
      setFormTitle('');
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE'
      });
      setSelectedTask(null);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    try {
      await fetch(`http://localhost:3001/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: task.status === 'DONE' ? 'TODO' : 'DONE' })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetFocus = (taskTitle: string, subtasks?: Task[]) => {
    const nextSub = subtasks?.find(s => s.status === 'TODO' && !s.isActiveTarget);
    if (setFocusVector) {
      setFocusVector(taskTitle, nextSub ? nextSub.title : 'Execute root task objective.');
    }
  };

  const dailies = tasks.filter(t => t.isRecurringDaily || t.title.toLowerCase().includes('daily'));

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
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto scrollbar-none relative">
          {isLoading ? (
             <div className="text-zinc-500 font-mono text-xs">Loading sync data...</div>
          ) : (
            <>
              {activeTab === 'dailies' && (
                <div className="space-y-3">
                  {dailies.length === 0 && <div className="text-zinc-500 font-mono text-xs italic">No daily quests found.</div>}
                  {dailies.map(t => (
                    <div key={t.id} className={`flex items-center justify-between p-3 border rounded-sm group ${t.status === 'DONE' ? 'border-[#39d353]/30 bg-[#39d353]/5' : t.isAiGenerated ? 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500' : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900/30'}`}>
                      <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setSelectedTask(t)}>
                        <div onClick={(e) => { e.stopPropagation(); toggleTaskStatus(t); }} className={`w-5 h-5 border rounded-sm flex items-center justify-center transition-colors ${t.status === 'DONE' ? 'bg-[#39d353] border-[#39d353]' : 'border-zinc-600 group-hover:border-[#39d353]'}`}>
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
                  {projects.length === 0 && (
                    <div className="text-zinc-500 font-mono text-xs italic">No projects found. Add a vector above to start or check the unsorted tasks.</div>
                  )}
                  {tasks.filter(t => !t.projectId && !t.isRecurringDaily).length > 0 && (
                    <div className="border border-zinc-800 p-4 rounded-sm bg-[#050505]/50">
                       <h4 className="text-zinc-400 font-sans text-sm mb-3">Uncategorized Vectors</h4>
                       {tasks.filter(t => !t.projectId && !t.isRecurringDaily).map(t => (
                         <div key={t.id} className="flex items-center gap-3 mb-2 group">
                            <div onClick={() => toggleTaskStatus(t)} className={`w-4 h-4 border rounded-sm flex items-center justify-center cursor-pointer ${t.status === 'DONE' ? 'bg-[#39d353] border-[#39d353]' : 'border-zinc-600 group-hover:border-[#39d353]'}`}>
                               {t.status === 'DONE' && <svg className="w-3 h-3 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                            </div>
                            <span onClick={() => setSelectedTask(t)} className="text-zinc-200 text-sm font-sans hover:underline cursor-pointer">{t.title}</span>
                         </div>
                       ))}
                    </div>
                  )}
                  {projects.map(p => (
                    <div key={p.id}>
                      <div className="flex justify-between items-end mb-4 border-b border-zinc-800 pb-2">
                        <h4 className="text-zinc-100 font-sans text-lg font-semibold tracking-tight">{p.name}</h4>
                      </div>
                      <div className="space-y-4">
                        {p.tasks.map(t => (
                          <div key={t.id} className="border border-zinc-800 p-4 rounded-sm bg-[#050505]/50">
                            <div className="flex justify-between items-start mb-3 group">
                              <div className="flex gap-3 items-center">
                                 <div onClick={() => toggleTaskStatus(t)} className={`w-4 h-4 border rounded-sm flex items-center justify-center cursor-pointer ${t.status === 'DONE' ? 'bg-[#39d353] border-[#39d353]' : 'border-zinc-600 group-hover:border-[#39d353]'}`}>
                                   {t.status === 'DONE' && <svg className="w-3 h-3 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <h5 className={`text-sm font-sans font-medium hover:underline cursor-pointer transition-colors ${t.status === 'DONE' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`} onClick={() => setSelectedTask(t)}>{t.title}</h5>
                                 </div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleSetFocus(t.title, t.subTasks)} className="text-[9px] font-mono bg-[#39d353]/10 text-[#39d353] border border-[#39d353]/30 px-2 py-1 hover:bg-[#39d353]/20 transition-colors uppercase tracking-widest hidden sm:block whitespace-nowrap rounded-sm">Set Target</button>
                              </div>
                            </div>
                            {t.subTasks && t.subTasks.length > 0 && (
                              <div className="ml-7 border-l border-zinc-800 pl-4 space-y-2.5 mt-3">
                                {t.subTasks.map(st => (
                                  <div key={st.id} className="flex items-center justify-between text-xs group">
                                    <div className="flex items-center gap-3">
                                      <div onClick={() => toggleTaskStatus(st)} className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center border shrink-0 cursor-pointer ${st.status === 'DONE' ? 'bg-zinc-700 border-zinc-700' : 'border-zinc-600 group-hover:border-[#39d353]'}`}>
                                        {st.status === 'DONE' && <svg className="w-2 h-2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                                      </div>
                                      <span onClick={() => setSelectedTask(st)} className={`font-sans cursor-pointer hover:underline ${st.status === 'DONE' ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
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
            </>
          )}
        </div>
      </div>

      {/* Workspace Right Navigation (Projects, Pillars, Telemetry) */}
      <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-zinc-800 bg-[#050505] p-4 flex flex-col shrink-0 order-first md:order-last">
         <h3 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-3">Project Telemetry</h3>
         <div className="bg-[#0d1117] border border-zinc-800 rounded-sm p-3 mb-6">
            <div className="flex justify-between items-center mb-1">
               <span className="text-zinc-300 font-sans text-xs font-semibold">Overall Progress</span>
               <span className="text-[#39d353] font-mono text-[9px]">45%</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-sm overflow-hidden mt-2">
               <div className="h-full bg-[#39d353] w-[45%]" />
            </div>
            <p className="text-zinc-500 font-mono text-[9px] mt-2 leading-tight">Connected to database. Real data loaded.</p>
         </div>

         <h3 className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest mb-3">Active Projects</h3>
         <ul className="space-y-1 mb-6">
            {projects.map(p => (
              <li key={p.id}><button className="w-full text-left px-2 py-1.5 text-zinc-400 font-sans text-sm hover:text-zinc-200 hover:bg-zinc-900 rounded-sm transition-colors">{p.name}</button></li>
            ))}
         </ul>
      </div>

      {/* Task Edit Slide-over Modal */}
      <div className={`absolute inset-y-0 right-0 w-full sm:w-80 bg-[#0d1117] border-l border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] p-6 flex flex-col z-20 transition-transform duration-300 ease-in-out ${(selectedTask || isAddingTask) ? 'translate-x-0' : 'translate-x-full'}`}>
        {(selectedTask || isAddingTask) && (
          <>
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400">{isAddingTask ? 'Add New Vector' : 'Edit Task'}</h3>
              <button onClick={() => { setSelectedTask(null); if (setIsAddingTask) setIsAddingTask(false); }} className="text-zinc-500 hover:text-zinc-300 transition-colors">✕</button>
            </div>
            
            <div className="space-y-4 flex-1">
              <div>
                  <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Title</label>
                  <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full bg-[#050505] border border-zinc-800 text-zinc-200 text-sm p-2 rounded-sm outline-none focus:border-[#39d353] transition-colors" placeholder="Task title..." />
              </div>
              <div className="flex gap-2 pt-4 border-t border-zinc-800 mt-auto">
                 {!isAddingTask && selectedTask && (
                   <button onClick={() => handleDelete(selectedTask.id)} className="flex-1 py-2 bg-red-500/10 text-red-500 border border-red-500/30 font-mono text-xs uppercase tracking-widest hover:bg-red-500/20 rounded-sm transition-colors">Delete</button>
                 )}
                 <button onClick={handleSave} className="flex-1 py-2 bg-[#39d353] text-[#050505] font-mono text-xs uppercase tracking-widest hover:bg-[#26a641] rounded-sm font-bold transition-colors">Save</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
