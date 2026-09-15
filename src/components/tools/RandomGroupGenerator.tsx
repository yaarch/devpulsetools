import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shuffle, Copy, RefreshCcw } from 'lucide-react';

export const RandomGroupGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [namesText, setNamesText] = useState('Alice\nBob\nCharlie\nDavid\nEve\nFrank\nGrace\nHeidi');
  const [numGroups, setNumGroups] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  const generateGroups = () => {
    const names = namesText.split('\n').map(n => n.trim()).filter(n => n !== '');
    if (names.length === 0) {
      addToast('Error', 'Please enter at least one name.', 'error');
      return;
    }
    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const result: string[][] = Array.from({ length: numGroups }, () => []);
    shuffled.forEach((name, index) => {
      result[index % numGroups].push(name);
    });
    setGroups(result);
  };

  const copyResults = () => {
    if (groups.length === 0) return;
    const text = groups.map((g, i) => `Group ${i + 1}: ${g.join(', ')}`).join('\n');
    navigator.clipboard.writeText(text);
    addToast('Copied', 'Groups copied to clipboard', 'success');
  };

  const reset = () => {
    setNamesText('');
    setGroups([]);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">Names List</label>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">One per line</span>
            </div>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full h-48 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-medium"
              placeholder="Enter names here..."
            />
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Number of Groups</label>
                <input type="number" min="1" max="50" value={numGroups} onChange={(e) => setNumGroups(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex-none pt-5">
                <button onClick={reset} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 rounded-xl transition-colors">
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button onClick={generateGroups} className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm">
              <Shuffle className="w-5 h-5" /> Generate Groups
            </button>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Generated Groups</h3>
            {groups.length > 0 && (
              <button onClick={copyResults} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
                <Copy className="w-3.5 h-3.5" /> Copy All
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {groups.length > 0 ? (
              groups.map((group, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Group {i + 1}</h4>
                  <ul className="flex flex-wrap gap-2">
                    {group.map((member, j) => (
                      <li key={j} className="bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Users className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm">Click generate to create groups</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
