import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Code2, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

export const RegexTester: React.FC = () => {
  const { addToast } = useApp();
  const [pattern, setPattern] = useState('([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+)');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false });
  const [testText, setTestText] = useState(
    'Contact our team at support@devpulse.tools or alex.smith@example.org for inquiries. Invalid: user@.com'
  );

  const presets = [
    { label: 'Email Address', pattern: '[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+' },
    { label: 'Website URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { label: 'IPv4 Address', pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b' },
    { label: 'Date (YYYY-MM-DD)', pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b' },
    { label: 'Hex Color Code', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\\b' }
  ];

  const flagString = useMemo(() => {
    let str = '';
    if (flags.g) str += 'g';
    if (flags.i) str += 'i';
    if (flags.m) str += 'm';
    if (flags.s) str += 's';
    return str;
  }, [flags]);

  const { matches, error } = useMemo(() => {
    if (!pattern) return { matches: [], error: null };
    try {
      const reg = new RegExp(pattern, flagString);
      const results = [];
      let m;

      if (flags.g) {
        while ((m = reg.exec(testText)) !== null) {
          if (m.index === reg.lastIndex) reg.lastIndex++;
          results.push({
            index: m.index,
            fullMatch: m[0],
            groups: m.slice(1)
          });
        }
      } else {
        m = reg.exec(testText);
        if (m) {
          results.push({
            index: m.index,
            fullMatch: m[0],
            groups: m.slice(1)
          });
        }
      }

      return { matches: results, error: null };
    } catch (err: any) {
      return { matches: [], error: err.message };
    }
  }, [pattern, flagString, testText]);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Presets Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Presets:</span>
        </span>
        {presets.map(p => (
          <button
            key={p.label}
            onClick={() => {
              setPattern(p.pattern);
              addToast(`Loaded ${p.label} regex!`, '', 'info');
            }}
            className="px-2.5 py-1 rounded-xl text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Regex Input & Flags */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Regular Expression Pattern
        </label>
        <div className="flex items-center gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-sm">
          <span className="text-slate-400 font-bold px-2">/</span>
          <input
            type="text"
            value={pattern}
            onChange={e => setPattern(e.target.value)}
            placeholder="Enter regex..."
            className="flex-1 bg-transparent focus:outline-none text-slate-900 dark:text-white"
          />
          <span className="text-slate-400 font-bold px-2">/{flagString}</span>
        </div>

        {/* Flag Toggles */}
        <div className="flex items-center gap-3 pt-1">
          {[
            { key: 'g', label: 'Global (g)' },
            { key: 'i', label: 'Case Insensitive (i)' },
            { key: 'm', label: 'Multiline (m)' },
            { key: 's', label: 'DotAll (s)' }
          ].map(f => (
            <label key={f.key} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={(flags as any)[f.key]}
                onChange={e => setFlags(prev => ({ ...prev, [f.key]: e.target.checked }))}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Test String Input */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Test String
        </label>
        <textarea
          value={testText}
          onChange={e => setTestText(e.target.value)}
          rows={5}
          className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {/* Error or Matches Results */}
      {error ? (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Regex Syntax Error: {error}</span>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Matches Found: <strong className="text-indigo-600 dark:text-indigo-400">{matches.length}</strong>
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="text-xs text-slate-400 py-3 text-center">No matches found for current pattern.</div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs">
              {matches.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-bold mb-1">
                    <span>Match #{idx + 1}</span>
                    <span className="text-[11px] text-slate-400">Position {m.index}</span>
                  </div>
                  <div className="p-1.5 rounded bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 break-all select-all">
                    {m.fullMatch}
                  </div>
                  {m.groups.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1 text-[11px]">
                      {m.groups.map((g, gIdx) => (
                        <span key={gIdx} className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                          Group {gIdx + 1}: {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
