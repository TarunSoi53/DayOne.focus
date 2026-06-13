'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SystemLog } from '@/components/system/SystemLog';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'ai' | 'table';
  content: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'DayOne.Focus OS [Version 1.1.0]' },
    { id: '2', type: 'system', content: '(c) System Corporation. All rights reserved.' },
    { id: '3', type: 'output', content: ' ' },
    { id: '4', type: 'output', content: 'System is online. AI Engine is standing by.' },
    { id: '5', type: 'ai', content: '[AI] Hello. I am your neural assistant. Type `help` for commands or `ai [query]` to talk directly.' },
  ]);
  const [input, setInput] = useState('');
  const [aiMode, setAiMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeMacro = (cmd: string) => {
    handleCommand(cmd);
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'exit' && aiMode) {
      setAiMode(false);
      setLines(prev => [...prev, { id: Date.now().toString(), type: 'input', content: `AI> exit` }, { id: Date.now().toString() + '1', type: 'system', content: 'Exited AI conversational mode.' }]);
      return;
    }

    const promptPrefix = aiMode ? 'AI>' : 'C:\\User\\Dev>';
    setLines(prev => [...prev, { id: Date.now().toString(), type: 'input', content: `${promptPrefix} ${trimmed}` }]);

    if (aiMode) {
      // Process everything as an AI query
      setLines(prev => [...prev, { id: Date.now().toString() + '1', type: 'system', content: '> Thinking...' }]);
      setTimeout(() => {
        setLines(prev => prev.filter(l => l.content !== '> Thinking...').concat({
          id: Date.now().toString() + '2',
          type: 'ai',
          content: `[Gemini]: I processed "${trimmed}". Based on your telemetry, you should break this down into 3 smaller sub-tasks. Want me to add them to your Task Vectors? (Y/N)`
        }));
      }, 1000);
      return;
    }

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    let response: TerminalLine;

    switch (command) {
      case 'help':
        response = { id: Date.now().toString() + '1', type: 'output', content: 
`Commands:
  sys.diag      Run a system & telemetry diagnostic
  task.list     List active tasks in ASCII table
  task.add      Add a new task (e.g., task.add Fix API)
  focus.init    Begin deep work neural link
  ai            Toggle conversational AI mode
  ai [query]    Single-shot AI query
  clear         Clear console` 
        };
        break;
      case 'sys.diag':
        response = { 
          id: Date.now().toString() + '1', 
          type: 'success', 
          content: 
`[SYSTEM DIAGNOSTICS]
------------------------------------------------
ENERGY RESERVES : [||||||||--] 80% (Optimal)
FOCUS VARIANCE  : 12% (Decreasing)
STREAK ACTIVE   : 12 Days
BURN RATE       : Stable
------------------------------------------------
[AI ADVISORY]: You are operating at peak efficiency. Recommend initiating deep work.`
        };
        break;
      case 'task.list':
        response = {
          id: Date.now().toString() + '1',
          type: 'table',
          content:
`+-----------------------------+-------------+-------+
| TASK TITLE                  | PROJECT     | PRIO  |
+-----------------------------+-------------+-------+
| Configure NestJS JWT Guard  | Auth Refac. | P0    |
| Update Prisma Auth models   | Auth Refac. | DONE  |
| Build AI Predictive Logic   | DayOne OS   | P1    |
| 14,000 Steps Target         | Daily       | P2    |
+-----------------------------+-------------+-------+`
        };
        break;
      case 'ai':
        if (args.length === 1) {
          setAiMode(true);
          response = { id: Date.now().toString() + '1', type: 'ai', content: '[AI] Conversational mode activated. All input will be sent to Gemini. Type "exit" to leave.' };
        } else {
          const query = trimmed.substring(2).trim();
          setLines(prev => [...prev, { id: Date.now().toString() + '1', type: 'system', content: '> Transmitting...' }]);
          setTimeout(() => {
            setLines(prev => prev.filter(l => l.content !== '> Transmitting...').concat({
              id: Date.now().toString() + '2',
              type: 'ai',
              content: `[Gemini Response]: Here is the optimized solution for "${query}". Ensure you implement memoization to reduce time complexity from O(n^2) to O(n).`
            }));
          }, 1200);
          return;
        }
        break;
      case 'task.add':
        const title = args.slice(1).join(' ');
        if (!title) {
          response = { id: Date.now().toString() + '1', type: 'error', content: 'Usage: task.add [title]' };
        } else {
          response = { id: Date.now().toString() + '1', type: 'success', content: `[+] Success. Task injected into vector database: ${title}` };
        }
        break;
      case 'focus.init':
        response = { id: Date.now().toString() + '1', type: 'success', content: '> NEURAL LINK INITIATED. Redirecting to Focus Interface...' };
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        response = { id: Date.now().toString() + '1', type: 'error', content: `'${command}' is not recognized. Type 'help' for available commands.` };
    }

    setLines(prev => [...prev, response]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full flex w-full">
      <div className="flex-1 flex flex-col bg-[#050505]">
        {/* Top Macro Bar */}
        <div className="bg-[#0d1117] border-b border-zinc-800 p-4 flex gap-3 shrink-0 overflow-x-auto scrollbar-none">
           <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest flex items-center mr-4">
              Quick Macros {'>'}
           </span>
           <button onClick={() => executeMacro('sys.diag')} className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm hover:bg-zinc-800 hover:text-zinc-200 transition-colors whitespace-nowrap">
             [Run sys.diag]
           </button>
           <button onClick={() => executeMacro('task.list')} className="text-zinc-400 font-mono text-[10px] uppercase tracking-widest bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-sm hover:bg-zinc-800 hover:text-zinc-200 transition-colors whitespace-nowrap">
             [task.list]
           </button>
           <button onClick={() => executeMacro('ai "Predict my burnout risk"')} className="text-purple-400 font-mono text-[10px] uppercase tracking-widest bg-purple-900/10 border border-purple-500/30 px-3 py-1.5 rounded-sm hover:bg-purple-500/20 transition-colors whitespace-nowrap">
             [AI Burnout Check]
           </button>
           <button onClick={() => executeMacro('ai')} className="text-[#39d353] font-mono text-[10px] uppercase tracking-widest bg-[#39d353]/10 border border-[#39d353]/30 px-3 py-1.5 rounded-sm hover:bg-[#39d353]/20 transition-colors whitespace-nowrap">
             [Toggle AI Mode]
           </button>
        </div>

        {/* Terminal View */}
        <div 
          className="flex-1 overflow-y-auto scrollbar-none text-[#c9d1d9] font-mono p-4 md:p-8 cursor-text selection:bg-[#39d353] selection:text-[#0d1117] relative"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="max-w-5xl mx-auto flex flex-col gap-2 text-sm md:text-base pb-32">
            {lines.map(line => (
              <div key={line.id} className={`whitespace-pre-wrap leading-relaxed ${
                line.type === 'error' ? 'text-red-400' : 
                line.type === 'success' ? 'text-[#39d353]' : 
                line.type === 'input' ? 'text-zinc-500' : 
                line.type === 'system' ? 'text-blue-400' : 
                line.type === 'table' ? 'text-zinc-300' :
                line.type === 'ai' ? 'text-purple-400' :
                'text-[#c9d1d9]'
              }`}>
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center mt-4">
              <span className={`mr-2 font-bold ${aiMode ? 'text-purple-400' : 'text-zinc-400'}`}>
                {aiMode ? 'AI>' : 'C:\\User\\Dev>'}
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent border-none outline-none ${aiMode ? 'text-purple-300' : 'text-[#c9d1d9]'}`}
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
