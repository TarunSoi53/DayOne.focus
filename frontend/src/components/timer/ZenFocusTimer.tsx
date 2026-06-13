'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ZenFocusTimer = ({ 
  isFocusMode, 
  setIsFocusMode 
}: { 
  isFocusMode: boolean; 
  setIsFocusMode: (val: boolean) => void 
}) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusMode && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsFocusMode(false);
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isFocusMode, timeLeft, setIsFocusMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isFocusMode ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#09090b] flex flex-col items-center justify-center"
        >
          <div className="text-center font-mono tracking-tighter text-zinc-100 text-9xl font-light mb-12">
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => setIsFocusMode(false)}
            className="px-6 py-2 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors rounded-sm uppercase tracking-widest text-xs"
          >
            Abort Sequence
          </button>
        </motion.div>
      ) : (
        <div className="bg-[#09090b] border border-zinc-800 p-6 flex flex-col items-center justify-center min-h-[300px] rounded-sm">
           <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-6 self-start w-full font-mono">
            Focus Block
          </h2>
          
          <div className="text-center font-mono text-6xl font-light text-zinc-200 mb-8 tracking-tight">
            25:00
          </div>

          <button 
            onClick={() => setIsFocusMode(true)}
            className="w-full py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium uppercase tracking-widest text-xs transition-colors rounded-sm"
          >
            Initiate Deep Work
          </button>
        </div>
      )}
    </AnimatePresence>
  );
};
