import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  Equal,
  Copy,
  Check,
  Percent,
  Divide,
  X,
  Minus,
  Plus
} from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const { language, addToast } = useApp();
  const isAr = language === 'ar';

  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [history, setHistory] = useState<Array<{ expr: string; res: string }>>([]);
  const [isDegree, setIsDegree] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Safe evaluation parser
  const evaluateExpression = (expr: string): string => {
    try {
      if (!expr || expr.trim() === '') return '0';

      // Pre-process mathematical symbols
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Functions handling
      // sin, cos, tan with deg/rad support
      if (isDegree) {
        sanitized = sanitized.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        sanitized = sanitized.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        sanitized = sanitized.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      } else {
        sanitized = sanitized.replace(/sin\(/g, 'Math.sin(');
        sanitized = sanitized.replace(/cos\(/g, 'Math.cos(');
        sanitized = sanitized.replace(/tan\(/g, 'Math.tan(');
      }

      sanitized = sanitized.replace(/sqrt\(/g, 'Math.sqrt(');
      sanitized = sanitized.replace(/log\(/g, 'Math.log10(');
      sanitized = sanitized.replace(/ln\(/g, 'Math.log(');
      sanitized = sanitized.replace(/\^/g, '**');

      // Basic regex check to prevent arbitrary execution
      if (!/^[0-9+\-*/().\sMathPIEsincoztanlgrq**]+$/.test(sanitized)) {
        return 'Error';
      }

      // eslint-disable-next-line no-new-func
      const evalRes = Function(`"use strict"; return (${sanitized});`)();
      if (typeof evalRes === 'number' && !isNaN(evalRes) && isFinite(evalRes)) {
        // Limit precision to avoid 0.30000000000000004
        return String(Number(evalRes.toFixed(10)));
      }
      return 'Error';
    } catch {
      return 'Error';
    }
  };

  const handleButtonClick = (val: string) => {
    if (val === '=') {
      const res = evaluateExpression(expression);
      setResult(res);
      if (res !== 'Error') {
        setHistory((prev) => [{ expr: expression, res }, ...prev.slice(0, 9)]);
      }
    } else if (val === 'AC') {
      setExpression('');
      setResult('0');
    } else if (val === 'DEL') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (val === 'ans') {
      setExpression((prev) => prev + result);
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      addToast(isAr ? 'تم النسخ!' : 'Copied!', isAr ? 'تم نسخ الناتج' : 'Result copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة علمية متقدمة' : 'Advanced Mathematical Engine'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black">
              {isAr ? 'الآلة الحاسبة العلمية وسجل العمليات' : 'Scientific Calculator with History Tape'}
            </h2>
            <p className="text-blue-100 text-xs md:text-sm">
              {isAr
                ? 'تنفيذ الدوال المثلثية، اللوغاريتمات، الجذور والأسس مع حفظ العمليات السابقة.'
                : 'Solve trigonometric functions, logarithms, powers, and roots with full history memory.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDegree(!isDegree)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition"
            >
              {isDegree ? 'DEG' : 'RAD'}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white text-blue-800 hover:bg-blue-50 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الناتج' : 'Copy Result')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Calculator Layout: Keypad + History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Keypad & Display (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {/* Display */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-right font-mono space-y-2">
            <div className="text-xs text-slate-400 min-h-[1.25rem] overflow-x-auto whitespace-nowrap">
              {expression || '0'}
            </div>
            <div className="text-3xl font-black tracking-wider text-emerald-400 overflow-x-auto whitespace-nowrap">
              {result}
            </div>
          </div>

          {/* Scientific Controls Keypad */}
          <div className="grid grid-cols-5 gap-2 text-xs font-bold">
            {/* Row 1 */}
            <button onClick={() => handleButtonClick('sin(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">sin</button>
            <button onClick={() => handleButtonClick('cos(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">cos</button>
            <button onClick={() => handleButtonClick('tan(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">tan</button>
            <button onClick={() => handleButtonClick('AC')} className="p-2.5 rounded-xl bg-rose-500 text-white hover:bg-rose-600 transition">AC</button>
            <button onClick={() => handleButtonClick('DEL')} className="p-2.5 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition">DEL</button>

            {/* Row 2 */}
            <button onClick={() => handleButtonClick('log(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">log</button>
            <button onClick={() => handleButtonClick('ln(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">ln</button>
            <button onClick={() => handleButtonClick('sqrt(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">√</button>
            <button onClick={() => handleButtonClick('^')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">x^y</button>
            <button onClick={() => handleButtonClick('÷')} className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition">÷</button>

            {/* Row 3 */}
            <button onClick={() => handleButtonClick('(')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">(</button>
            <button onClick={() => handleButtonClick(')')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">)</button>
            <button onClick={() => handleButtonClick('π')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">π</button>
            <button onClick={() => handleButtonClick('e')} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">e</button>
            <button onClick={() => handleButtonClick('×')} className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition">×</button>

            {/* Row 4 (Numbers 7 8 9 -) */}
            <button onClick={() => handleButtonClick('7')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">7</button>
            <button onClick={() => handleButtonClick('8')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">8</button>
            <button onClick={() => handleButtonClick('9')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">9</button>
            <button onClick={() => handleButtonClick('%')} className="p-3 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">%</button>
            <button onClick={() => handleButtonClick('-')} className="p-3 text-sm rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition">-</button>

            {/* Row 5 (Numbers 4 5 6 +) */}
            <button onClick={() => handleButtonClick('4')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">4</button>
            <button onClick={() => handleButtonClick('5')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">5</button>
            <button onClick={() => handleButtonClick('6')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">6</button>
            <button onClick={() => handleButtonClick('ans')} className="p-3 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition">Ans</button>
            <button onClick={() => handleButtonClick('+')} className="p-3 text-sm rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 transition">+</button>

            {/* Row 6 (Numbers 1 2 3 =) */}
            <button onClick={() => handleButtonClick('1')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">1</button>
            <button onClick={() => handleButtonClick('2')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">2</button>
            <button onClick={() => handleButtonClick('3')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">3</button>
            <button onClick={() => handleButtonClick('0')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">0</button>
            <button onClick={() => handleButtonClick('.')} className="p-3 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 transition">.</button>

            {/* Equals Wide Button */}
            <div className="col-span-5 pt-2">
              <button
                type="button"
                onClick={() => handleButtonClick('=')}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg shadow-md transition flex items-center justify-center gap-2"
              >
                <Equal className="w-5 h-5" />
                <span>=</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Calculation History Tape (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              {isAr ? 'سجل العمليات الحسابية' : 'History Memory'}
            </h4>
            <button
              type="button"
              onClick={() => setHistory([])}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              {isAr ? 'مسح السجل' : 'Clear'}
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              {isAr ? 'لا توجد عمليات سابقة حتى الآن' : 'No calculations yet'}
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {history.map((h, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setExpression(h.expr);
                    setResult(h.res);
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition"
                >
                  <div className="text-[11px] text-slate-500 font-mono">{h.expr}</div>
                  <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono text-right rtl:text-left">
                    = {h.res}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
