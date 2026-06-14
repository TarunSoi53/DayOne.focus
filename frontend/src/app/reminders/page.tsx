'use client';

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { format } from 'date-fns';

export default function RemindersPage() {
  const queryClient = useQueryClient();
  const [taskTitle, setTaskTitle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [now, setNow] = useState(Date.now());

  // Tick every second so "arrived" checks are live
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: tasks = [] } = useQuery<any[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await api.get('/tasks');
      return res.data;
    },
    refetchInterval: 5000
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/tasks', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setTaskTitle('');
      setReminderDate('');
      setReminderTime('');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      await api.put(`/tasks/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !reminderDate || !reminderTime) return;

    const reminderAt = new Date(`${reminderDate}T${reminderTime}`).toISOString();
    saveMutation.mutate({
      title: taskTitle,
      reminderAt,
      isRecurringDaily: false
    });
  };

  const tasksWithReminders = tasks
    .filter(t => t.reminderAt && t.status !== 'DONE')
    .sort((a, b) => new Date(a.reminderAt).getTime() - new Date(b.reminderAt).getTime());

  const completedReminders = tasks
    .filter(t => t.reminderAt && t.status === 'DONE')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 10);

  return (
    <div className="p-4 md:p-8 space-y-8 pb-32 max-w-4xl mx-auto flex flex-col min-h-screen">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-zinc-800 pb-6 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">Reminders</h1>
          <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
             Schedule temporal alerts for specific tasks
          </p>
        </div>
        <div className="flex gap-4 font-mono text-sm text-zinc-400 uppercase tracking-widest">
          <div className="flex flex-col text-right">
            <span className="text-zinc-600 text-[10px]">Active</span>
            <span className="text-yellow-400">{tasksWithReminders.length}</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-zinc-600 text-[10px]">Arrived</span>
            <span className="text-red-400">{tasksWithReminders.filter(t => now >= new Date(t.reminderAt).getTime()).length}</span>
          </div>
        </div>
      </header>

      <section className="bg-[#0d1117] border border-zinc-800 rounded-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 blur-3xl rounded-full pointer-events-none" />
        <h3 className="text-zinc-100 font-mono text-xs tracking-widest uppercase mb-4 relative z-10">Create New Reminder</h3>
        <form onSubmit={handleAddReminder} className="flex flex-col md:flex-row gap-4 items-end relative z-10">
          <div className="flex-1 w-full">
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Task Title</label>
            <input 
              type="text" 
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full bg-[#050505] border border-zinc-800 p-3 rounded-sm text-zinc-200 text-sm focus:outline-none focus:border-[#39d353] font-sans transition-colors" 
              placeholder="What to remind..."
              required
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Date</label>
            <input 
              type="date" 
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="w-full md:w-40 bg-[#050505] border border-zinc-800 p-3 rounded-sm text-zinc-200 text-sm focus:outline-none focus:border-[#39d353] font-sans transition-colors" 
              required
            />
          </div>
          <div className="w-full md:w-auto">
            <label className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Time</label>
            <input 
              type="time" 
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full md:w-32 bg-[#050505] border border-zinc-800 p-3 rounded-sm text-zinc-200 text-sm focus:outline-none focus:border-[#39d353] font-sans transition-colors" 
              required
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-[#39d353] text-[#050505] px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#26a641] transition-colors whitespace-nowrap">
             Set Alert
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h3 className="text-zinc-400 font-mono text-xs tracking-widest uppercase border-b border-zinc-800 pb-2">Upcoming Alerts</h3>
        
        {tasksWithReminders.length === 0 && (
          <div className="text-zinc-600 font-mono text-xs italic py-8 text-center">No active temporal alerts. Create one above to get started.</div>
        )}

        {tasksWithReminders.map(t => {
          const reminderTimeMs = new Date(t.reminderAt).getTime();
          const isArrived = now >= reminderTimeMs;
          const timeUntil = reminderTimeMs - now;
          const minutesUntil = Math.floor(timeUntil / 60000);
          const hoursUntil = Math.floor(minutesUntil / 60);
          
          let countdown = '';
          if (!isArrived) {
            if (hoursUntil > 24) {
              countdown = `in ${Math.floor(hoursUntil / 24)}d ${hoursUntil % 24}h`;
            } else if (hoursUntil > 0) {
              countdown = `in ${hoursUntil}h ${minutesUntil % 60}m`;
            } else if (minutesUntil > 0) {
              countdown = `in ${minutesUntil}m`;
            } else {
              countdown = 'any second now...';
            }
          }
          
          return (
            <div key={t.id} className={`flex items-center justify-between p-4 border rounded-sm group transition-all ${isArrived ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'border-zinc-800 bg-[#0d1117] hover:border-zinc-700'}`}>
               <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                     <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isArrived ? 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-yellow-500'}`} />
                     <h4 className="text-zinc-200 font-sans text-sm font-semibold">{t.title}</h4>
                     {!isArrived && <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest ml-auto mr-4 hidden sm:inline">{countdown}</span>}
                  </div>
                  <div className="ml-5 mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                     {format(new Date(t.reminderAt), 'PP p')} 
                     {isArrived && <span className="text-red-400 ml-2 font-bold animate-pulse">— TIME ARRIVED</span>}
                  </div>
               </div>
               <div className="flex gap-2 shrink-0">
                 <button 
                   onClick={() => updateMutation.mutate({ id: t.id, data: { status: 'DONE' } })}
                   className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-sm transition-colors ${isArrived ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200'}`}
                 >
                   Done
                 </button>
                 <button 
                   onClick={() => deleteMutation.mutate(t.id)}
                   className="px-3 py-2 font-mono text-xs text-zinc-600 border border-zinc-800 rounded-sm hover:text-red-400 hover:border-red-500/30 transition-colors opacity-0 group-hover:opacity-100"
                 >
                   ✕
                 </button>
               </div>
            </div>
          );
        })}
      </section>

      {completedReminders.length > 0 && (
        <section className="space-y-4">
          <h3 className="text-zinc-600 font-mono text-xs tracking-widest uppercase border-b border-zinc-800 pb-2">Recently Completed</h3>
          {completedReminders.map(t => (
            <div key={t.id} className="flex items-center justify-between p-3 border border-zinc-800/50 rounded-sm bg-[#050505]">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                <span className="text-zinc-500 font-sans text-sm line-through">{t.title}</span>
              </div>
              <span className="text-zinc-700 font-mono text-[10px]">{format(new Date(t.reminderAt), 'PP')}</span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
