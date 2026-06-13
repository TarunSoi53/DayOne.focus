'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SystemLog } from '@/components/system/SystemLog';

interface TerminalLine {
  id: string;
  type: 'input' | 'system' | 'action' | 'ai';
  content: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'DayOne.Focus Agent Engine [Version 2.0]' },
    { id: '2', type: 'system', content: 'Initializing neural link...' },
    { id: '3', type: 'action', content: '[System Action] -> Connected to Gemini Behavioral Core.' },
    { id: '4', type: 'ai', content: '[AI] Online. I am your system agent. You can ask me to create tasks, update settings, or log progress using natural language.' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeMacro = (cmd: string) => {
    if (!isProcessing) handleCommand(cmd);
  };

  const processAiCommand = async (input: string) => {
    try {
      const apiKey = localStorage.getItem('dayone_ai_key') || '';
      
      const res = await fetch('http://localhost:3001/ai/process-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ai-api-key': apiKey
        },
        body: JSON.stringify({ input })
      });
      
      const result = await res.json();
      if (result.data) {
        return {
          actionLog: result.data.actionLog || '[System State] -> Intent processed.',
          aiSpeech: result.data.aiSpeech || 'Intent logged successfully.'
        };
      }
      throw new Error('Invalid response structure');
    } catch (error) {
      console.error('AI Intent Processing Error:', error);
      return {
        actionLog: '[Behavioral Engine] -> System Offline. Ensure backend is running.',
        aiSpeech: 'I am currently disconnected from the central intelligence server. Please verify your connection.'
      };
    }
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setLines([]);
      return;
    }

    setLines(prev => [...prev, { id: Date.now().toString(), type: 'input', content: `C:\\User\\Dev> ${trimmed}` }]);
    setIsProcessing(true);

    // Initial parsing log
    const parsingId = Date.now().toString() + 'p';
    setLines(prev => [...prev, { id: parsingId, type: 'system', content: '> Sending intent to Gemini...' }]);

    // Simulate AI network delay
    setTimeout(async () => {
      const { actionLog, aiSpeech } = await processAiCommand(trimmed);
      
      setLines(prev => prev.filter(l => l.id !== parsingId).concat([
        { id: Date.now().toString() + 'a', type: 'action', content: actionLog },
        { id: Date.now().toString() + 'b', type: 'ai', content: `[AI] ${aiSpeech}` }
      ]));
      setIsProcessing(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full flex w-full overflow-hidden">
      <div className="flex-1 flex flex-col bg-[#050505] min-w-0">
        {/* Top Macro Bar */}
        <div className="bg-[#0d1117] border-b border-zinc-800 p-4 flex gap-3 shrink-0 overflow-x-auto scrollbar-none">
           <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest flex items-center mr-4">
              Agent Macros {'>'}
           </span>
           <button onClick={() => executeMacro('Show me my tasks for today')} disabled={isProcessing} className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm hover:bg-zinc-800 hover:text-zinc-200 transition-colors whitespace-nowrap disabled:opacity-50">
             [List Tasks]
           </button>
           <button onClick={() => executeMacro('I just finished the authentication task')} disabled={isProcessing} className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm hover:bg-zinc-800 hover:text-zinc-200 transition-colors whitespace-nowrap disabled:opacity-50">
             [Log Completion]
           </button>
           <button onClick={() => executeMacro('I feel extremely tired, adjust my goals')} disabled={isProcessing} className="text-purple-400 font-mono text-[10px] uppercase tracking-widest bg-purple-900/10 border border-purple-500/30 px-3 py-1.5 rounded-sm hover:bg-purple-500/20 transition-colors whitespace-nowrap disabled:opacity-50">
             [Report Fatigue]
           </button>
        </div>

        {/* Terminal View */}
        <div 
          className="flex-1 overflow-y-auto scrollbar-none text-[#c9d1d9] font-mono p-4 md:p-8 cursor-text selection:bg-[#39d353] selection:text-[#0d1117] relative"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="max-w-5xl mx-auto flex flex-col gap-3 text-sm md:text-base pb-32">
            {lines.map(line => (
              <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${
                line.type === 'input' ? 'text-zinc-500' : 
                line.type === 'system' ? 'text-zinc-600 italic' : 
                line.type === 'action' ? 'text-[#39d353] bg-[#39d353]/5 border-l-2 border-[#39d353] pl-3 py-1 my-1' :
                line.type === 'ai' ? 'text-purple-300' :
                'text-[#c9d1d9]'
              }`}>
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center mt-6">
              <span className={`mr-2 font-bold ${isProcessing ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {isProcessing ? '...' : 'C:\\User\\Dev>'}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isProcessing}
                className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9] disabled:opacity-50"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} className="h-10" />
          </div>
        </div>
      </div>
      
      {/* Terminal Stream (Small Right Sidebar) */}
      <div className="hidden lg:block w-64 border-l border-zinc-800 bg-[#0d1117] shrink-0 h-full">
         <SystemLog minimized />
      </div>
    </div>
  );
}
