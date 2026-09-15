import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Fingerprint, Copy, RefreshCw, Check } from 'lucide-react';

export const UuidGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [quantity, setQuantity] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuid = () => {
    let id = '';
    if (typeof window.crypto.randomUUID === 'function') {
      id = window.crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hyphens) {
      id = id.replace(/-/g, '');
    }
    if (uppercase) {
      id = id.toUpperCase();
    }
    return id;
  };

  const generateBatch = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      list.push(generateUuid());
    }
    setUuids(list);
  };

  useEffect(() => {
    generateBatch();
  }, [quantity, uppercase, hyphens]);

  const handleCopySingle = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      addToast('UUID copied!', id, 'success');
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      addToast(`Copied all ${uuids.length} UUIDs!`, '', 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Settings bar */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>Quantity:</span>
            <select
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value, 10))}
              className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={e => setUppercase(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Uppercase</span>
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={e => setHyphens(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Include Hyphens</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50"
          >
            Copy All
          </button>
          <button
            onClick={generateBatch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      {/* UUID list */}
      <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs sm:text-sm">
        {uuids.map((id, idx) => (
          <div key={idx} className="py-2.5 flex items-center justify-between gap-3 group">
            <span className="text-slate-800 dark:text-slate-200 truncate select-all">{id}</span>
            <button
              onClick={() => handleCopySingle(id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-80 group-hover:opacity-100 transition-all"
              title="Copy UUID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
