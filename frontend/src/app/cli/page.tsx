'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string;
}

export default function TerminalPage() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'DayOne.Focus OS [Version 1.0.42]' },
    { id: '2', type: 'system', content: '(c) System Corporation. All rights reserved.' },
    { id: '3', type: 'output', content: ' ' },
    { id: '4', type: 'output', content: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLines(prev => [...prev, { id: Date.now().toString(), type: 'input', content: `C:\\User\\Dev> ${trimmed}` }]);

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    let response: TerminalLine;

    switch (command) {
      case 'help':
        response = { id: Date.now().toString() + '1', type: 'output', content: 'Commands:\n  status       Show HUD metrics\n  task add     Add a new task (e.g., task add "Fix API" --project=Auth)\n  focus start  Begin deep work\n  ai analyze   Fetch diagnostic telemetry\n  clear        Clear console' };
        break;
      case 'status':
        response = { 
          id: Date.now().toString() + '1', 
          type: 'success', 
          content: 'LVL: 42 | XP: 8450/10000 | STREAK: 12 DAYS\n[||||||||||------] 65% DAILY COMPLETION' 
        };
        break;
      case 'task':
        if (args[1] === 'add') {
          const title = args.slice(2).join(' ');
          response = { id: Date.now().toString() + '1', type: 'success', content: `[+] Task logged to database: ${title}` };
        } else {
          response = { id: Date.now().toString() + '1', type: 'error', content: 'Usage: task add [title] [--daily|--project=name]' };
        }
        break;
      case 'focus':
        if (args[1] === 'start') {
          response = { id: Date.now().toString() + '1', type: 'success', content: '> NEURAL LINK INITIATED. Focus block active. Distractions neutralized.' };
        } else {
          response = { id: Date.now().toString() + '1', type: 'error', content: 'Usage: focus start "[description]"' };
        }
        break;
      case 'ai':
        if (args[1] === 'analyze') {
          setLines(prev => [...prev, { id: Date.now().toString() + '1', type: 'system', content: 'Fetching telemetry data... establishing secure connection to Gemini API...' }]);
          // Mock latency
          setTimeout(() => {
            setLines(prev => [...prev, { id: Date.now().toString() + '2', type: 'success', content: '> ANALYSIS: Focus variance is high. Heavy context-switching detected between backend auth and frontend UI. Recommendation: Batch identical tasks.' }]);
          }, 1500);
          return;
        } else {
          response = { id: Date.now().toString() + '1', type: 'error', content: 'Usage: ai analyze' };
        }
        break;
      case 'clear':
        setLines([]);
        return;
      default:
        response = { id: Date.now().toString() + '1', type: 'error', content: `'${command}' is not recognized as an internal or external command, operable program or batch file.` };
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
    <div 
      className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-mono p-4 md:p-8 cursor-text selection:bg-[#39d353] selection:text-[#0d1117]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-2 text-sm md:text-base">
        {lines.map(line => (
          <div key={line.id} className={`whitespace-pre-wrap ${
            line.type === 'error' ? 'text-red-400' : 
            line.type === 'success' ? 'text-[#39d353]' : 
            line.type === 'input' ? 'text-zinc-500' : 
            line.type === 'system' ? 'text-blue-400' : 
            'text-[#c9d1d9]'
          }`}>
            {line.content}
          </div>
        ))}
        
        <div className="flex items-center mt-2">
          <span className="text-zinc-400 mr-2">C:\\User\\Dev{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-[#c9d1d9]"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} className="h-8" />
      </div>
    </div>
  );
}
