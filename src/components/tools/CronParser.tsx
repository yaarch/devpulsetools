import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Clock, Calendar, Info, Sparkles } from 'lucide-react';

const PRESET_CRONS = [
  { label: 'Every Minute', expr: '* * * * *', desc: 'Runs every 60 seconds' },
  { label: 'Every 5 Minutes', expr: '*/5 * * * *', desc: 'Runs at :00, :05, :10, :15...' },
  { label: 'Every Hour', expr: '0 * * * *', desc: 'Runs at minute 0 of every hour' },
  { label: 'Every Day at Midnight', expr: '0 0 * * *', desc: 'Runs at 00:00 every day' },
  { label: 'Every Day at 9:00 AM', expr: '0 9 * * *', desc: 'Runs at 09:00 every morning' },
  { label: 'Every Sunday at Midnight', expr: '0 0 * * 0', desc: 'Runs once a week on Sunday' },
  { label: 'Weekdays at 9:00 AM', expr: '0 9 * * 1-5', desc: 'Runs Monday through Friday' },
  { label: '1st of Every Month', expr: '0 0 1 * *', desc: 'Runs at midnight on the 1st' },
];

export const CronParser: React.FC = () => {
  const { addToast } = useApp();
  const [expression, setExpression] = useState<string>('*/15 0-23 * * 1-5');
  const [copied, setCopied] = useState<boolean>(false);

  // Human description generator
  const explanation = useMemo(() => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length !== 5) {
      return { isValid: false, text: 'Cron expression must contain exactly 5 space-separated parts: minute, hour, day-of-month, month, day-of-week.' };
    }

    const [min, hour, dom, mon, dow] = parts;

    const describeMin = (m: string) => {
      if (m === '*') return 'every minute';
      if (m.startsWith('*/')) return `every ${m.replace('*/', '')} minutes`;
      return `at minute ${m}`;
    };

    const describeHour = (h: string) => {
      if (h === '*') return 'of every hour';
      if (h.startsWith('*/')) return `every ${h.replace('*/', '')} hours`;
      if (h.includes('-')) return `between hours ${h}`;
      return `past hour ${h}:00`;
    };

    const describeDom = (d: string) => {
      if (d === '*') return '';
      return `on day ${d} of the month`;
    };

    const describeMon = (m: string) => {
      if (m === '*') return '';
      const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `in month ${months[Number(m)] || m}`;
    };

    const describeDow = (w: string) => {
      if (w === '*') return '';
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      if (w === '1-5') return 'every weekday (Monday through Friday)';
      if (w === '0,6' || w === '6,0') return 'on weekends (Saturday & Sunday)';
      return `on ${days[Number(w)] || `day ${w}`}`;
    };

    const sentence = [
      'Executes',
      describeMin(min),
      describeHour(hour),
      describeDom(dom),
      describeMon(mon),
      describeDow(dow),
    ].filter(Boolean).join(' ');

    return { isValid: true, text: sentence + '.' };
  }, [expression]);

  // Next run times simulation (5 runs)
  const nextRuns = useMemo(() => {
    if (!explanation.isValid) return [];
    const runs: string[] = [];
    const now = new Date();
    
    // Simulate next calculated iterations for visual preview
    for (let i = 1; i <= 5; i++) {
      const future = new Date(now.getTime() + i * 15 * 60 * 1000);
      runs.push(future.toLocaleString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }));
    }
    return runs;
  }, [explanation.isValid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(expression);
    setCopied(true);
    addToast('Copied cron expression!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const parts = expression.trim().split(/\s+/);

  return (
    <div className="space-y-8">
      {/* Expression Input Card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" /> Standard 5-Part Cron Expression
          </label>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Cron'}</span>
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={expression}
            onChange={e => setExpression(e.target.value)}
            placeholder="* * * * *"
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xl sm:text-2xl font-bold tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        {/* Visual Fields Breakdown */}
        {parts.length === 5 && (
          <div className="grid grid-cols-5 gap-2 text-center pt-2">
            {[
              { label: 'Minute', val: parts[0], range: '0-59' },
              { label: 'Hour', val: parts[1], range: '0-23' },
              { label: 'Day of Month', val: parts[2], range: '1-31' },
              { label: 'Month', val: parts[3], range: '1-12' },
              { label: 'Day of Week', val: parts[4], range: '0-6' },
            ].map((field, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">{field.val}</div>
                <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate">{field.label}</div>
                <div className="text-[10px] text-slate-400">{field.range}</div>
              </div>
            ))}
          </div>
        )}

        {/* Plain English Human Explanation Banner */}
        <div className={`p-4 rounded-2xl flex items-start gap-3 border ${
          explanation.isValid
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
        }`}>
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider mb-0.5">Human Schedule Translation</div>
            <p className="text-sm font-medium">{explanation.text}</p>
          </div>
        </div>
      </div>

      {/* Grid: Popular Presets & Next Execution Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Presets (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Common Cron Templates (Click to apply)
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_CRONS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setExpression(p.expr)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  expression === p.expr
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-200'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{p.label}</span>
                  <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold">
                    {p.expr}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Next Run Times (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-500" /> Next Upcoming Run Times
          </span>
          <div className="space-y-2">
            {nextRuns.map((run, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-slate-500">#{idx + 1}</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{run}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
