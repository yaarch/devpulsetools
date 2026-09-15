import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  KeyRound,
  Copy,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Check
} from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [length, setLength] = useState<number>(18);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(true);
  const [password, setPassword] = useState('');
  const [batchCount, setBatchCount] = useState<number>(1);
  const [batchList, setBatchList] = useState<string[]>([]);

  const generateSinglePassword = (len: number): string => {
    let chars = '';
    if (includeUpper) chars += excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) chars += excludeAmbiguous ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += excludeAmbiguous ? '23456789' : '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(len);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  };

  const handleGenerate = () => {
    const main = generateSinglePassword(length);
    setPassword(main);
    if (batchCount > 1) {
      const batch: string[] = [];
      for (let i = 0; i < batchCount; i++) {
        batch.push(generateSinglePassword(length));
      }
      setBatchList(batch);
    } else {
      setBatchList([]);
    }
  };

  useEffect(() => {
    handleGenerate();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, batchCount]);

  // Entropy calculation
  let poolSize = 0;
  if (includeUpper) poolSize += 26;
  if (includeLower) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 30;
  if (poolSize === 0) poolSize = 26;
  const entropy = Math.round(length * Math.log2(poolSize));

  const getStrength = (bits: number) => {
    if (bits >= 100) return { label: 'Extremely Strong', color: 'text-emerald-500', bar: 'bg-emerald-500', width: 'w-full' };
    if (bits >= 75) return { label: 'Strong', color: 'text-emerald-500', bar: 'bg-emerald-500', width: 'w-4/5' };
    if (bits >= 50) return { label: 'Moderate', color: 'text-amber-500', bar: 'bg-amber-500', width: 'w-1/2' };
    return { label: 'Weak', color: 'text-rose-500', bar: 'bg-rose-500', width: 'w-1/4' };
  };

  const strength = getStrength(entropy);

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt).then(() => {
      addToast('Password copied to clipboard!', '', 'success');
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Primary Password Display Card */}
      <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 text-center shadow-lg relative">
        <div className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-white break-all select-all py-3">
          {password}
        </div>

        {/* Action icons */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={() => handleCopy(password)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Password</span>
          </button>

          <button
            onClick={handleGenerate}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Regenerate"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Strength meter bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Entropy: <strong className="text-white">{entropy} bits</strong></span>
            <span>•</span>
            <span className={`font-bold ${strength.color}`}>{strength.label}</span>
          </div>
          <span className="text-[11px] text-slate-500">window.crypto CSPRNG</span>
        </div>
      </div>

      {/* Configuration Sliders & Toggles */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-5">
        {/* Length Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
            <span>Password Length</span>
            <span className="text-base text-indigo-600 dark:text-indigo-400 font-mono">{length} chars</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={e => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-indigo-600"
          />
        </div>

        {/* Checkbox Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={e => setIncludeUpper(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Uppercase (A-Z)</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={e => setIncludeLower(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Lowercase (a-z)</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={e => setIncludeNumbers(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={e => setIncludeSymbols(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Special Symbols (!@#$%)</span>
          </label>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={e => setExcludeAmbiguous(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Exclude Ambiguous Characters (O, 0, l, 1, I)</span>
          </label>
        </div>

        {/* Batch Generate option */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Batch Generation
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 5, 10, 20].map(count => (
              <button
                key={count}
                onClick={() => setBatchCount(count)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  batchCount === count
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {count === 1 ? 'Single' : `${count}x`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Batch List Display if batchCount > 1 */}
      {batchList.length > 1 && (
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            <span>Generated Batch ({batchList.length})</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(batchList.join('\n')).then(() => {
                  addToast('Copied all batch passwords!', '', 'success');
                });
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
            >
              Copy All
            </button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs max-h-60 overflow-y-auto">
            {batchList.map((p, idx) => (
              <div key={idx} className="py-2 flex items-center justify-between gap-2">
                <span className="truncate">{p}</span>
                <button
                  onClick={() => handleCopy(p)}
                  className="p-1 text-slate-400 hover:text-indigo-600"
                  title="Copy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
