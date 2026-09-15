import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Play, Pause, Copy, Check } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const { addToast } = useApp();
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [isLive, setIsLive] = useState(true);

  // Epoch to Date state
  const [inputEpoch, setInputEpoch] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [isMilliseconds, setIsMilliseconds] = useState<boolean>(false);

  // Date to Epoch state
  const [customDate, setCustomDate] = useState<string>(new Date().toISOString().slice(0, 16));

  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isLive]);

  // Convert input epoch to various formats
  const parsedTimestamp = () => {
    const num = parseInt(inputEpoch, 10);
    if (isNaN(num)) return null;
    const ms = isMilliseconds ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const d = parsedTimestamp();

  // Relative time helper
  const getRelativeTime = (date: Date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (Math.abs(diff) < 5) return 'just now';
    if (diff > 0) {
      if (diff < 60) return `${diff} seconds ago`;
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      return `${Math.floor(diff / 86400)} days ago`;
    } else {
      const future = Math.abs(diff);
      if (future < 60) return `in ${future} seconds`;
      if (future < 3600) return `in ${Math.floor(future / 60)} minutes`;
      if (future < 86400) return `in ${Math.floor(future / 3600)} hours`;
      return `in ${Math.floor(future / 86400)} days`;
    }
  };

  const copyVal = (val: string) => {
    navigator.clipboard.writeText(val).then(() => {
      addToast('Copied to clipboard!', val, 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Live Epoch Counter Banner */}
      <div className="p-5 rounded-3xl bg-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-600/20">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-200">
            Current Unix Epoch Timestamp
          </div>
          <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-wide select-all">
            {currentEpoch}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLive(prev => !prev)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold backdrop-blur-xs transition-colors"
          >
            {isLive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLive ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={() => {
              setInputEpoch(currentEpoch.toString());
              setIsMilliseconds(false);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-indigo-700 text-xs font-semibold shadow-xs"
          >
            <span>Set to Input</span>
          </button>
        </div>
      </div>

      {/* Timestamp to Date card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Epoch Timestamp to Human Date
          </label>
          <label className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={isMilliseconds}
              onChange={e => setIsMilliseconds(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Input in Milliseconds (13 digits)</span>
          </label>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            value={inputEpoch}
            onChange={e => setInputEpoch(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
          />
        </div>

        {d ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              { label: 'UTC Date & Time', val: d.toUTCString() },
              { label: 'ISO 8601 Standard', val: d.toISOString() },
              { label: 'Local Browser Time', val: d.toString() },
              { label: 'Relative Offset', val: getRelativeTime(d) }
            ].map(item => (
              <div
                key={item.label}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-400 block">{item.label}</span>
                  <span className="text-xs font-mono text-slate-800 dark:text-slate-200 truncate block max-w-[240px]">
                    {item.val}
                  </span>
                </div>
                <button
                  onClick={() => copyVal(item.val)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600"
                  title="Copy"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-rose-500 font-medium">Invalid epoch timestamp value</div>
        )}
      </div>

      {/* Human Date to Timestamp card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
          Human Date to Unix Epoch
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <input
            type="datetime-local"
            value={customDate}
            onChange={e => setCustomDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
          />

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs flex-1">
              <span className="text-slate-400 block text-[10px]">Seconds:</span>
              <strong className="text-indigo-600 dark:text-indigo-400">
                {Math.floor(new Date(customDate).getTime() / 1000) || 0}
              </strong>
            </div>

            <button
              onClick={() => copyVal(Math.floor(new Date(customDate).getTime() / 1000).toString())}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
