'use client';

import React, { useState, useEffect } from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';

export const ZenFocusTimer = () => {
  const { isFocusMode, setIsFocusMode } = useWorkspaceStore();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  
  // Session Configuration State
  const [tag, setTag] = useState('Coding');
  const [isStrictMode, setIsStrictMode] = useState(true);
  const [ambientAudio, setAmbientAudio] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setIsFocusMode(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, setIsFocusMode]);

  const toggleTimer = () => {
    if (!isActive) {
      setIsFocusMode(true);
      setShowConfig(false);
    }
    setIsActive(!isActive);
  };

  const abortTimer = () => {
    setIsActive(false);
    setIsFocusMode(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isFocusMode) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center transition-all duration-700">
        <div className="absolute top-8 left-8 flex items-center gap-4">
           <span className="font-mono text-xs text-[#39d353] uppercase tracking-widest border border-[#39d353]/30 px-3 py-1 rounded-sm bg-[#39d353]/5">
             Neural Link: Active
           </span>
           <span className="font-mono text-xs text-purple-400 uppercase tracking-widest border border-purple-500/30 px-3 py-1 rounded-sm bg-purple-500/5">
             Vector: {tag}
           </span>
        </div>

        {ambientAudio && (
          <div className="absolute top-8 right-8 flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
            <svg className="w-4 h-4 animate-pulse text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            Ambient: Brown Noise
          </div>
        )}

        <h1 className="text-[12rem] font-bold font-mono tracking-tighter text-zinc-100 leading-none drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]">
          {formatTime(timeLeft)}
        </h1>
        
        <div className="mt-16 space-x-6">
          {!isStrictMode && (
             <button onClick={toggleTimer} className="text-zinc-400 hover:text-white font-mono uppercase tracking-widest transition-colors">
               {isActive ? 'Pause Link' : 'Resume Link'}
             </button>
          )}
          <button onClick={abortTimer} className="text-red-500/70 hover:text-red-400 font-mono uppercase tracking-widest transition-colors">
            {isStrictMode ? 'Sever Link (Penalty: -50 XP)' : 'Abort Sequence'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#0d1117] flex flex-col items-center justify-center h-full relative overflow-hidden group p-6">
      {!showConfig ? (
        <>
          <div className="text-5xl font-mono text-zinc-300 font-bold mb-6 group-hover:scale-105 transition-transform duration-500">
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setShowConfig(true)}
            className="w-full bg-[#39d353]/10 hover:bg-[#39d353]/20 border border-[#39d353]/30 text-[#39d353] py-4 uppercase tracking-widest font-mono text-sm font-bold transition-all"
          >
            Configure Session
          </button>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-between">
           <div>
             <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-4 border-b border-zinc-800 pb-2">Session Parameters</h3>
             
             <div className="space-y-4 font-sans text-sm">
               <div className="flex justify-between items-center">
                 <span className="text-zinc-300">Focus Vector</span>
                 <select 
                   value={tag} 
                   onChange={(e) => setTag(e.target.value)}
                   className="bg-[#050505] border border-zinc-700 text-zinc-300 rounded-sm p-1 outline-none text-xs font-mono"
                 >
                   <option>Coding</option>
                   <option>Planning</option>
                   <option>Learning</option>
                 </select>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-zinc-300">Strict Mode (No Pausing)</span>
                 <button 
                   onClick={() => setIsStrictMode(!isStrictMode)}
                   className={`w-10 h-5 rounded-full relative transition-colors ${isStrictMode ? 'bg-[#39d353]' : 'bg-zinc-700'}`}
                 >
                   <div className={`w-3 h-3 bg-[#050505] rounded-full absolute top-1 transition-all ${isStrictMode ? 'right-1' : 'left-1'}`} />
                 </button>
               </div>

               <div className="flex justify-between items-center">
                 <span className="text-zinc-300">Ambient Noise</span>
                 <button 
                   onClick={() => setAmbientAudio(!ambientAudio)}
                   className={`w-10 h-5 rounded-full relative transition-colors ${ambientAudio ? 'bg-purple-500' : 'bg-zinc-700'}`}
                 >
                   <div className={`w-3 h-3 bg-[#050505] rounded-full absolute top-1 transition-all ${ambientAudio ? 'right-1' : 'left-1'}`} />
                 </button>
               </div>
             </div>
           </div>

           <div className="flex gap-2 mt-4">
             <button 
               onClick={() => setShowConfig(false)}
               className="flex-1 py-2 text-zinc-500 hover:bg-zinc-800 border border-zinc-800 font-mono text-xs uppercase tracking-widest transition-colors rounded-sm"
             >
               Cancel
             </button>
             <button 
               onClick={toggleTimer}
               className="flex-1 py-2 bg-[#39d353] text-[#050505] font-bold font-mono text-xs uppercase tracking-widest hover:bg-[#26a641] transition-colors rounded-sm"
             >
               Initiate
             </button>
           </div>
        </div>
      )}
    </div>
  );
};
