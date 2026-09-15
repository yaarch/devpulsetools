import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Trash2, ArrowUpDown, FileText, Sparkles, Filter } from 'lucide-react';

const SAMPLE_LIST = `apple
banana
orange
Apple
banana
grape
banana
mango
orange
pineapple
apple`;

export const TextDuplicateRemover: React.FC = () => {
  const { addToast } = useApp();
  const [input, setInput] = useState(SAMPLE_LIST);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc' | 'length-asc' | 'length-desc'>('none');
  const [copied, setCopied] = useState(false);

  // Process text
  const rawLines = input.split(/\r?\n/);
  let processed = rawLines.map(line => (trimWhitespace ? line.trim() : line));

  if (removeEmptyLines) {
    processed = processed.filter(l => l.length > 0);
  }

  // Deduplicate
  const seen = new Map<string, number>();
  const uniqueList: string[] = [];

  for (const line of processed) {
    const key = caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.set(key, 1);
      uniqueList.push(line);
    } else {
      seen.set(key, (seen.get(key) || 1) + 1);
    }
  }

  // Sort
  if (sortOrder === 'asc') {
    uniqueList.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: caseSensitive ? 'variant' : 'base' }));
  } else if (sortOrder === 'desc') {
    uniqueList.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: caseSensitive ? 'variant' : 'base' }));
  } else if (sortOrder === 'length-asc') {
    uniqueList.sort((a, b) => a.length - b.length);
  } else if (sortOrder === 'length-desc') {
    uniqueList.sort((a, b) => b.length - a.length);
  }

  const output = uniqueList.join('\n');
  const totalInputCount = processed.length;
  const uniqueCount = uniqueList.length;
  const duplicatesRemoved = Math.max(0, totalInputCount - uniqueCount);
  const percentSaved = totalInputCount > 0 ? Math.round((duplicatesRemoved / totalInputCount) * 100) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    addToast('Copied unique lines to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={e => setCaseSensitive(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Case Sensitive ("Apple" ≠ "apple")</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={trimWhitespace}
                onChange={e => setTrimWhitespace(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Trim Whitespace</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={removeEmptyLines}
                onChange={e => setRemoveEmptyLines(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Strip Empty Lines</span>
            </label>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Sort Lines:</span>
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-xs"
            >
              <option value="none">Original Order</option>
              <option value="asc">A &rarr; Z (Alphabetical)</option>
              <option value="desc">Z &rarr; A (Reverse)</option>
              <option value="length-asc">Shortest to Longest</option>
              <option value="length-desc">Longest to Shortest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Counter Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono">{totalInputCount}</div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Lines</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{uniqueCount}</div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Unique Lines</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl font-extrabold text-rose-500 font-mono">{duplicatesRemoved}</div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Duplicates Stripped</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-xl font-extrabold text-emerald-500 font-mono">{percentSaved}%</div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">List Reduction</div>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>Raw Input List</span>
            <button
              onClick={() => setInput('')}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={12}
            placeholder="Paste your lines here..."
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Deduplicated Result ({uniqueCount} items)
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy List'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
