import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Percent, 
  Copy, 
  ArrowUpRight, 
  ArrowDownRight, 
  Check, 
  HelpCircle,
  Calculator
} from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const { addToast } = useApp();

  // Mode 1: What is X% of Y?
  const [calc1X, setCalc1X] = useState<string>('15');
  const [calc1Y, setCalc1Y] = useState<string>('120');

  // Mode 2: X is what percent of Y?
  const [calc2X, setCalc2X] = useState<string>('25');
  const [calc2Y, setCalc2Y] = useState<string>('200');

  // Mode 3: Percentage change from X to Y
  const [calc3X, setCalc3X] = useState<string>('50');
  const [calc3Y, setCalc3Y] = useState<string>('75');

  // Mode 4: Add/Subtract X% to Y
  const [calc4Val, setCalc4Val] = useState<string>('100');
  const [calc4Pct, setCalc4Pct] = useState<string>('20');

  const copyResult = (val: string) => {
    navigator.clipboard.writeText(val).then(() => {
      addToast('Copied to clipboard!', val, 'success');
    });
  };

  // Computations
  const num1X = parseFloat(calc1X) || 0;
  const num1Y = parseFloat(calc1Y) || 0;
  const result1 = (num1X / 100) * num1Y;

  const num2X = parseFloat(calc2X) || 0;
  const num2Y = parseFloat(calc2Y) || 0;
  const result2 = num2Y !== 0 ? (num2X / num2Y) * 100 : 0;

  const num3X = parseFloat(calc3X) || 0;
  const num3Y = parseFloat(calc3Y) || 0;
  const change3 = num3Y - num3X;
  const result3 = num3X !== 0 ? ((num3Y - num3X) / num3X) * 100 : 0;

  const num4Val = parseFloat(calc4Val) || 0;
  const num4Pct = parseFloat(calc4Pct) || 0;
  const result4Add = num4Val + (num4Val * (num4Pct / 100));
  const result4Sub = num4Val - (num4Val * (num4Pct / 100));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Percent className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Interactive Percentage Calculator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Solve percentages, proportions, percentage changes, discounts, and markups instantly.
        </p>
      </div>

      {/* Grid of Calculations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: What is X% of Y? */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            1. Percentage of a Value
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span>What is</span>
            <div className="relative w-24">
              <input
                type="number"
                value={calc1X}
                onChange={e => setCalc1X(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-right font-mono font-bold pr-6 text-sm"
              />
              <span className="absolute right-2 top-1.5 text-slate-400 font-bold">%</span>
            </div>
            <span>of</span>
            <input
              type="number"
              value={calc1Y}
              onChange={e => setCalc1Y(e.target.value)}
              className="w-28 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
            <span>?</span>
          </div>

          <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium block">Result:</span>
              <span className="text-xl font-extrabold text-indigo-950 dark:text-indigo-200 font-mono">
                {Number(result1.toFixed(4))}
              </span>
            </div>
            <button
              onClick={() => copyResult(result1.toString())}
              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-lg transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Formula: ({calc1X} ÷ 100) × {calc1Y} = {result1}
          </div>
        </div>

        {/* Card 2: X is what % of Y? */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            2. Proportion &amp; Share
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              type="number"
              value={calc2X}
              onChange={e => setCalc2X(e.target.value)}
              className="w-24 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={calc2Y}
              onChange={e => setCalc2Y(e.target.value)}
              className="w-28 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
            <span>?</span>
          </div>

          <div className="p-3 bg-teal-50/60 dark:bg-teal-950/40 rounded-xl border border-teal-100 dark:border-teal-900/60 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-teal-700 dark:text-teal-400 font-medium block">Result:</span>
              <span className="text-xl font-extrabold text-teal-950 dark:text-teal-200 font-mono">
                {Number(result2.toFixed(2))}%
              </span>
            </div>
            <button
              onClick={() => copyResult(`${Number(result2.toFixed(2))}%`)}
              className="p-1.5 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/60 rounded-lg transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Formula: ({calc2X} ÷ {calc2Y}) × 100 = {result2.toFixed(2)}%
          </div>
        </div>

        {/* Card 3: Percentage Change */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            3. Percentage Increase / Decrease
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span>From</span>
            <input
              type="number"
              value={calc3X}
              onChange={e => setCalc3X(e.target.value)}
              className="w-24 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
            <span>to</span>
            <input
              type="number"
              value={calc3Y}
              onChange={e => setCalc3Y(e.target.value)}
              className="w-24 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
          </div>

          <div className={`p-3 rounded-xl border flex items-center justify-between ${
            result3 >= 0 
              ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/60' 
              : 'bg-rose-50/60 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/60'
          }`}>
            <div>
              <span className={`text-[11px] font-medium block ${result3 >= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                {result3 >= 0 ? 'Increase (+)' : 'Decrease (-)'}:
              </span>
              <span className={`text-xl font-extrabold font-mono flex items-center gap-1 ${result3 >= 0 ? 'text-emerald-950 dark:text-emerald-200' : 'text-rose-950 dark:text-rose-200'}`}>
                {result3 >= 0 ? <ArrowUpRight className="w-5 h-5 text-emerald-500" /> : <ArrowDownRight className="w-5 h-5 text-rose-500" />}
                {Math.abs(Number(result3.toFixed(2)))}%
              </span>
            </div>
            <button
              onClick={() => copyResult(`${result3.toFixed(2)}%`)}
              className="p-1.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Difference: {change3 > 0 ? `+${change3}` : change3}
          </div>
        </div>

        {/* Card 4: Add / Deduct Percentage */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            4. Add / Subtract Percentage (Tax &amp; Discount)
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span>Base:</span>
            <input
              type="number"
              value={calc4Val}
              onChange={e => setCalc4Val(e.target.value)}
              className="w-24 px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono font-bold text-sm"
            />
            <span>&plusmn;</span>
            <div className="relative w-24">
              <input
                type="number"
                value={calc4Pct}
                onChange={e => setCalc4Pct(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-right font-mono font-bold pr-6 text-sm"
              />
              <span className="absolute right-2 top-1.5 text-slate-400 font-bold">%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                + {calc4Pct}% (Tax/Markup)
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {Number(result4Add.toFixed(2))}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
              <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400 block">
                - {calc4Pct}% (Discount)
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">
                {Number(result4Sub.toFixed(2))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
