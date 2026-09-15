import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Dices, 
  Copy, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  Coins 
} from 'lucide-react';

export const RandomNumberGenerator: React.FC = () => {
  const { addToast } = useApp();

  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [count, setCount] = useState<number>(1);
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [numbers, setNumbers] = useState<number[]>([42]);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate numbers
  const generateNumbers = () => {
    const minVal = Math.min(min, max);
    const maxVal = Math.max(min, max);
    const range = maxVal - minVal + 1;

    const requestedCount = Math.min(Math.max(1, count), 1000);

    if (!allowDuplicates && requestedCount > range) {
      addToast('Range too small', `Cannot pick ${requestedCount} unique numbers from a range of ${range}.`, 'error');
      return;
    }

    const results: number[] = [];

    if (!allowDuplicates) {
      const pool = Array.from({ length: range }, (_, i) => minVal + i);
      // Fisher-Yates sample
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      results.push(...pool.slice(0, requestedCount));
    } else {
      for (let i = 0; i < requestedCount; i++) {
        const rand = Math.floor(Math.random() * range) + minVal;
        results.push(rand);
      }
    }

    if (sortOrder === 'asc') {
      results.sort((a, b) => a - b);
    } else if (sortOrder === 'desc') {
      results.sort((a, b) => b - a);
    }

    setNumbers(results);
  };

  const handleCopy = () => {
    if (numbers.length === 0) return;
    const text = numbers.join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', text, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (numbers.length === 0) return;
    const text = numbers.join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `random-numbers-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded file', 'List saved.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Configuration Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Dices className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Random Number Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate true cryptographically uniform integers for raffles, classroom picks, statistical sampling, and lotteries.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => { setMin(1); setMax(6); setCount(1); setAllowDuplicates(true); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              Dice (1-6)
            </button>
            <button
              onClick={() => { setMin(1); setMax(100); setCount(1); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              1 - 100
            </button>
            <button
              onClick={() => { setMin(1); setMax(49); setCount(6); setAllowDuplicates(false); setSortOrder('asc'); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              Lotto 6/49
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Minimum Value
            </label>
            <input
              type="number"
              value={min}
              onChange={e => setMin(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Maximum Value
            </label>
            <input
              type="number"
              value={max}
              onChange={e => setMax(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Quantity to Generate
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={count}
              onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={e => setAllowDuplicates(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Allow Duplicates</span>
            </label>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <span>Sort Order:</span>
              <select
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value as any)}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none"
              >
                <option value="none">As Drawn (Random)</option>
                <option value="asc">Ascending (Small to Large)</option>
                <option value="desc">Descending (Large to Small)</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateNumbers}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Dices className="w-4 h-4" />
            <span>Generate Number{count > 1 ? 's' : ''}</span>
          </button>
        </div>
      </div>

      {/* Result Display */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Results ({numbers.length} number{numbers.length > 1 ? 's' : ''})
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            {numbers.length > 1 && (
              <button
                onClick={handleDownload}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Download List"
              >
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Big Single Number or Grid of Multiple Numbers */}
        {numbers.length === 1 ? (
          <div className="py-12 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-6xl sm:text-7xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tracking-tight animate-in fade-in zoom-in duration-200">
              {numbers[0]}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Drawn randomly between {min} and {max}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2.5 max-h-96 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            {numbers.map((num, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl font-mono text-sm font-bold text-slate-900 dark:text-white shadow-xs"
              >
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
