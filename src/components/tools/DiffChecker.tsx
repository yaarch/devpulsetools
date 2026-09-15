import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GitCompare, ArrowLeftRight, Check } from 'lucide-react';

export const DiffChecker: React.FC = () => {
  const { addToast } = useApp();
  const [original, setOriginal] = useState(
`function calculateTotal(items) {
  let sum = 0;
  for (let i = 0; i < items.length; i++) {
    sum += items[i].price;
  }
  return sum;
}`
  );

  const [modified, setModified] = useState(
`function calculateTotal(items, taxRate = 0.08) {
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * taxRate;
  return subtotal + tax;
}`
  );

  const handleSwap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  // Basic line-by-line diff
  const origLines = original.split('\n');
  const modLines = modified.split('\n');
  const maxLines = Math.max(origLines.length, modLines.length);

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
          Side-by-Side Line Comparison
        </div>
        <button
          onClick={handleSwap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Swap Left & Right</span>
        </button>
      </div>

      {/* Editor inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Original Text
          </label>
          <textarea
            value={original}
            onChange={e => setOriginal(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Modified Text
          </label>
          <textarea
            value={modified}
            onChange={e => setModified(e.target.value)}
            rows={10}
            className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>
      </div>

      {/* Visual Diff Output */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden font-mono text-xs bg-white dark:bg-slate-950 shadow-inner">
        <div className="p-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 font-bold font-sans text-xs text-slate-600 dark:text-slate-400">
          Diff Visualizer
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-900 max-h-96 overflow-y-auto">
          {Array.from({ length: maxLines }).map((_, idx) => {
            const l1 = origLines[idx] ?? '';
            const l2 = modLines[idx] ?? '';
            const isDiff = l1 !== l2;

            return (
              <div key={idx} className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-800">
                <div className={`p-2 flex gap-3 ${isDiff ? 'bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200' : 'text-slate-700 dark:text-slate-300'}`}>
                  <span className="text-slate-400 select-none w-6 text-right shrink-0">{idx + 1}</span>
                  <span className="truncate">{l1 || <span className="text-slate-300 italic">empty</span>}</span>
                </div>
                <div className={`p-2 flex gap-3 ${isDiff ? 'bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'}`}>
                  <span className="text-slate-400 select-none w-6 text-right shrink-0">{idx + 1}</span>
                  <span className="truncate">{l2 || <span className="text-slate-300 italic">empty</span>}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
