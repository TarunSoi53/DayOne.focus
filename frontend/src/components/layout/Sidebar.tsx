'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Command Center', path: '/dashboard', icon: '⌘' },
    { name: 'Task Vectors', path: '/tasks', icon: '▤' },
    { name: 'Skill Trees', path: '/roadmap', icon: '◰' },
    { name: 'Analytics & Heatmap', path: '/analytics', icon: '◠' },
    { name: 'System Shell', path: '/cli', icon: '>' },
  ];

  return (
    <div className="w-64 h-screen border-r border-zinc-800 bg-[#050505] flex flex-col shrink-0 hidden md:flex sticky top-0">
      <div className="p-6 mb-2 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 bg-[#39d353] rounded-sm flex items-center justify-center font-bold text-[#050505] font-mono">
          D1
        </div>
        <div>
          <h2 className="text-zinc-100 font-bold font-sans tracking-tight leading-tight">DayOne</h2>
          <span className="text-[#39d353] font-mono text-[9px] uppercase tracking-widest">Focus OS v1.1</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col">
        {/* Main Navigation */}
        <nav className="space-y-1 font-mono text-xs uppercase tracking-widest px-4 pb-6">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (pathname === '/' && item.path === '/dashboard');
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-sm transition-colors ${
                  isActive 
                    ? 'bg-zinc-900 text-zinc-100 border-l-2 border-[#39d353]' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 border-l-2 border-transparent'
                }`}
              >
                <span className={`text-lg ${isActive ? 'text-[#39d353]' : 'text-zinc-600'}`}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 pt-4 border-t border-zinc-800 shrink-0">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
          <span>AI Engine</span>
          <span className="text-[#39d353]">Online</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
           <div className="h-full bg-[#39d353] w-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
