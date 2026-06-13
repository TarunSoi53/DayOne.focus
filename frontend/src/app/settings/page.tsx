'use client';

import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('dayone_ai_key');
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('dayone_ai_key', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const clearKey = () => {
    localStorage.removeItem('dayone_ai_key');
    setApiKey('');
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-zinc-100 tracking-tight uppercase mb-2">
          System <span className="text-[#39d353]">Settings</span>
        </h1>
        <p className="text-zinc-400 font-mono text-sm">
          Configure local environment overrides and Bring-Your-Own-Key (BYOK) settings.
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-[#0d1117] border border-zinc-800 rounded-sm p-6">
          <div className="mb-6">
            <h3 className="text-zinc-100 font-mono tracking-widest uppercase mb-1">
              AI Engine Configuration
            </h3>
            <p className="text-zinc-500 text-sm">
              DayOne.Focus uses Google Gemini to drive its behavioral intelligence and CLI agent. 
              Because this is an open-source project, you must provide your own API key. 
              The key is stored securely in your browser's local storage and is only sent to your local backend.
            </p>
          </div>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="apiKey" className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                Google Gemini API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="bg-[#050505] border border-zinc-800 p-3 rounded-sm text-zinc-100 focus:outline-none focus:border-[#39d353] font-mono text-sm transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                type="submit"
                className="bg-[#39d353] text-[#050505] px-6 py-2.5 rounded-sm font-bold tracking-tight hover:bg-[#2ea043] transition-colors"
              >
                {isSaved ? 'Saved Locally' : 'Save Key'}
              </button>
              {apiKey && (
                <button 
                  type="button"
                  onClick={clearKey}
                  className="bg-transparent border border-red-500/50 text-red-500 px-6 py-2.5 rounded-sm font-bold tracking-tight hover:bg-red-500/10 transition-colors"
                >
                  Clear Key
                </button>
              )}
            </div>
          </form>
          
          <div className="mt-6 p-4 bg-zinc-900/50 border-l-2 border-purple-500 text-sm text-zinc-400">
            <p className="font-mono text-purple-400 mb-1 tracking-widest uppercase text-xs">Security Note</p>
            Your API key is transmitted via the <code className="bg-[#050505] px-1 py-0.5 rounded text-zinc-300">x-ai-api-key</code> HTTP header. It is never logged or saved to the backend database.
          </div>
        </section>
      </div>
    </div>
  );
}
