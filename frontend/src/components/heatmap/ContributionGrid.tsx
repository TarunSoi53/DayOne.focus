'use client';

import React, { useState, useEffect } from 'react';

const generateMockData = () => Array.from({ length: 365 }, () => Math.floor(Math.random() * 5));

export const ContributionGrid = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setData(generateMockData());
  }, []);

  // GitHub Green Color Scale
  const getIntensityColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-[#161b22] border border-[#161b22]'; // Empty state
      case 1: return 'bg-[#0e4429] border border-[#000000]/10'; // Light activity
      case 2: return 'bg-[#006d32] border border-[#000000]/10'; 
      case 3: return 'bg-[#26a641] border border-[#000000]/10'; 
      case 4: return 'bg-[#39d353] border border-[#000000]/10 shadow-[0_0_8px_rgba(57,211,83,0.3)]'; // High activity
      default: return 'bg-[#161b22] border border-[#161b22]';
    }
  };

  return (
    <div className="p-6 bg-[#0d1117] border border-zinc-800 rounded-sm w-full">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-zinc-400 text-xs tracking-widest uppercase font-mono">
          Activity Heatmap
        </h3>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {Array.from({ length: 52 }).map((_, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-1.5">
            {Array.from({ length: 7 }).map((_, rowIndex) => {
              const dayIndex = colIndex * 7 + rowIndex;
              if (dayIndex >= 365) return null;
              return (
                <div
                  key={dayIndex}
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-sm ${getIntensityColor(data[dayIndex] || 0)} transition-all duration-200 hover:scale-125 cursor-pointer`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
