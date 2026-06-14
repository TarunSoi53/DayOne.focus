'use client';

import React, { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('dayone_ai_key');
    if (savedKey) {
      setApiKey(savedKey);
      setHasKey(true);
    } else {
      setIsEditing(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;
    localStorage.setItem('dayone_ai_key', apiKey.trim());
    setIsSaved(true);
    setHasKey(true);
    setIsEditing(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const clearKey = () => {
    localStorage.removeItem('dayone_ai_key');
    setApiKey('');
    setHasKey(false);
    setIsEditing(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full pb-32">
      <header className="mb-12 border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-semibold text-zinc-100 tracking-tight font-sans">
          System Configuration
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-mono uppercase tracking-widest flex items-center">
          Manage local environment and neural link keys
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-[#0d1117] border border-zinc-800 rounded-sm p-8 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#39d353]/5 blur-3xl rounded-full pointer-events-none" />

          <div className="mb-8 relative z-10">
            <h3 className="text-zinc-100 font-mono text-sm tracking-widest uppercase mb-2 flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#39d353]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Neural Core Settings (BYOK)
            </h3>
            <p className="text-zinc-400 text-sm font-sans max-w-2xl leading-relaxed">
              DayOne.Focus utilizes Google Gemini to power its AI behavioral intelligence and terminal agents.
              To maintain absolute privacy and decentralization, you must supply your own local API key. 
            </p>
          </div>

          <div className="relative z-10 bg-[#050505] border border-zinc-800 p-6 rounded-sm">
            {!isEditing && hasKey ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.8)] animate-pulse" />
                  <span className="text-zinc-200 font-mono text-sm uppercase tracking-widest">Neural Link Established</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setIsEditing(true)} className="text-zinc-400 border border-zinc-700 px-4 py-2 hover:bg-zinc-800 transition-colors font-mono text-xs uppercase tracking-widest rounded-sm">
                    Modify Key
                  </button>
                  <button onClick={clearKey} className="text-red-400 border border-red-900/30 bg-red-900/10 px-4 py-2 hover:bg-red-900/20 transition-colors font-mono text-xs uppercase tracking-widest rounded-sm">
                    Sever Link
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="apiKey" className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                    Gemini API Key (Local Storage)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      id="apiKey"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="flex-1 bg-[#0d1117] border border-zinc-800 p-3 rounded-sm text-zinc-100 outline-none focus:border-[#39d353] font-mono text-sm transition-colors"
                      autoFocus
                    />
                    <button 
                      type="submit"
                      disabled={!apiKey.trim()}
                      className="bg-[#39d353] text-[#050505] px-6 py-2.5 rounded-sm font-mono text-xs tracking-widest uppercase hover:bg-[#26a641] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Initialize
                    </button>
                  </div>
                </div>
                {hasKey && (
                  <button type="button" onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-zinc-300 font-mono text-[10px] uppercase tracking-widest self-start mt-2">
                    Cancel Modification
                  </button>
                )}
              </form>
            )}
          </div>
          
          <div className="mt-6 flex gap-3 p-4 bg-purple-900/10 border-l-2 border-purple-500 rounded-r-sm">
            <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
               <p className="font-mono text-purple-400 mb-1 tracking-widest uppercase text-[10px]">Data Sovereignty</p>
               <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                 Your API key is only stored in your browser's local cache. It is injected natively into HTTP headers via <code className="bg-[#050505] border border-zinc-800 px-1 py-0.5 rounded-sm text-zinc-300 font-mono text-[10px]">x-ai-api-key</code>. It never hits our database.
               </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
