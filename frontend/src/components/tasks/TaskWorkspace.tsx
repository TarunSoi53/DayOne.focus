'use client';

import React, { useState } from 'react';

export const TaskWorkspace = () => {
  const [activeTab, setActiveTab] = useState<'dailies' | 'projects'>('dailies');

  return (
    <div className="border border-zinc-800 rounded-sm bg-[#09090b] flex flex-col h-full min-h-[400px]">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800 font-mono text-sm">
        <button
          onClick={() => setActiveTab('dailies')}
          className={`flex-1 py-3 text-center transition-colors uppercase tracking-widest ${
            activeTab === 'dailies' ? 'bg-zinc-900 text-zinc-100 border-b-2 border-[#39d353]' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
          }`}
        >
          Daily Quests
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-3 text-center transition-colors uppercase tracking-widest ${
            activeTab === 'projects' ? 'bg-zinc-900 text-zinc-100 border-b-2 border-[#39d353]' : 'text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'
          }`}
        >
          Architecture
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-y-auto scrollbar-none">
        {activeTab === 'dailies' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-sm cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-5 h-5 border border-zinc-600 rounded-sm group-hover:border-[#39d353] flex items-center justify-center transition-colors"></div>
                <span className="text-zinc-300 group-hover:text-zinc-100 font-sans">14,000 Steps Target</span>
              </div>
              <span className="font-mono text-xs text-[#39d353]">+50 XP</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-[#39d353]/30 bg-[#39d353]/5 rounded-sm cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-5 h-5 bg-[#39d353] border border-[#39d353] rounded-sm flex items-center justify-center">
                  <svg className="w-3 h-3 text-[#09090b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-zinc-500 line-through font-sans">5:30 AM Workout</span>
              </div>
              <span className="font-mono text-xs text-zinc-500 line-through">+100 XP</span>
            </div>
            
             <div className="flex items-center justify-between p-3 border border-zinc-800 hover:border-zinc-600 bg-zinc-900/30 rounded-sm cursor-pointer group">
              <div className="flex items-center space-x-4">
                <div className="w-5 h-5 border border-zinc-600 rounded-sm group-hover:border-[#39d353] flex items-center justify-center transition-colors"></div>
                <span className="text-zinc-300 group-hover:text-zinc-100 font-sans">Daily LeetCode</span>
              </div>
              <span className="font-mono text-xs text-[#39d353]">+75 XP</span>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="border border-zinc-800 rounded-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-zinc-100 font-sans font-medium">Authentication Refactor</h4>
                <span className="font-mono text-[10px] text-[#09090b] bg-[#39d353] px-2 py-1 rounded-sm uppercase tracking-widest font-bold">In Progress</span>
              </div>
              <div className="space-y-2 ml-4 border-l-2 border-zinc-800 pl-4 mt-4">
                <div className="flex items-center space-x-3 text-sm text-zinc-400 hover:text-zinc-200 cursor-pointer">
                  <div className="w-4 h-4 border border-zinc-600 rounded-sm" />
                  <span className="font-sans">Update Prisma Auth models</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-600 line-through cursor-pointer">
                  <div className="w-4 h-4 bg-zinc-700 border border-zinc-700 rounded-sm" />
                  <span className="font-sans">Configure NestJS JWT Guard</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-zinc-400 hover:text-zinc-200 cursor-pointer">
                  <div className="w-4 h-4 border border-zinc-600 rounded-sm" />
                  <span className="font-sans">Deploy migration to staging</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
