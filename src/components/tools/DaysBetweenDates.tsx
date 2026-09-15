import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CalendarDays, 
  Briefcase, 
  Coffee, 
  Copy, 
  Check, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

export const DaysBetweenDates: React.FC = () => {
  const { addToast } = useApp();

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const futureStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  }, []);

  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(futureStr);
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const isReversed = end < start;
    const from = isReversed ? end : start;
    const to = isReversed ? start : end;

    let totalDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
    if (includeEndDate) {
      totalDays += 1;
    }

    // Business Days calculation
    let businessDays = 0;
    let weekendDays = 0;

    const cur = new Date(from);
    const limit = new Date(to);
    if (!includeEndDate) {
      limit.setDate(limit.getDate() - 1);
    }

    while (cur <= limit) {
      const day = cur.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const hours = totalDays * 24;

    return {
      totalDays,
      businessDays,
      weekendDays,
      weeks,
      remainingDays,
      hours,
      isReversed
    };
  }, [startDate, endDate, includeEndDate]);

  const handleCopy = () => {
    if (!stats) return;
    const text = `${stats.totalDays} calendar days (${stats.businessDays} business days, ${stats.weekendDays} weekend days) from ${startDate} to ${endDate}.`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast('Copied duration!', text, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const addDaysToEnd = (days: number) => {
    const d = new Date(startDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setEndDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Days Between Dates Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Compute calendar days, working/business days, and weekends between any two historical or future calendar dates.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => addDaysToEnd(7)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              +7 Days
            </button>
            <button
              onClick={() => addDaysToEnd(30)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              +30 Days
            </button>
            <button
              onClick={() => addDaysToEnd(90)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              +90 Days
            </button>
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Options */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={e => setIncludeEndDate(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Include end day in total (+1 day)</span>
          </label>
        </div>
      </div>

      {/* Results Display */}
      {stats && (
        <div className="space-y-4">
          {/* Main Hero Card */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                Total Duration
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                {stats.totalDays} <span className="text-xl font-medium text-slate-500">Days</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Equivalent to {stats.weeks} weeks and {stats.remainingDays} days ({stats.hours.toLocaleString()} hours)
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all self-start sm:self-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Summary'}</span>
            </button>
          </div>

          {/* Breakdown: Working Days vs Weekend */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Working / Business Days</span>
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.businessDays} Days
                </span>
                <span className="text-[11px] text-slate-500 block">Mon - Fri (Excludes weekends)</span>
              </div>
            </div>

            <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-medium block">Weekend Days</span>
                <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
                  {stats.weekendDays} Days
                </span>
                <span className="text-[11px] text-slate-500 block">Saturdays and Sundays</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
