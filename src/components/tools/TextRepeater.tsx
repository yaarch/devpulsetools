import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Repeat, 
  Copy, 
  Download, 
  Trash2, 
  Check, 
  Sparkles, 
  Hash, 
  Sliders 
} from 'lucide-react';

export const TextRepeater: React.FC = () => {
  const { addToast } = useApp();

  const [text, setText] = useState<string>('Hello World! 🚀');
  const [count, setCount] = useState<number>(10);
  const [separatorType, setSeparatorType] = useState<'newline' | 'space' | 'comma' | 'none' | 'custom'>('newline');
  const [customSeparator, setCustomSeparator] = useState<string>(' | ');
  const [addNumbers, setAddNumbers] = useState<boolean>(false);
  const [numberFormat, setNumberFormat] = useState<'dot' | 'bracket' | 'dash'>('dot');
  const [copied, setCopied] = useState<boolean>(false);

  const repeatedOutput = useMemo(() => {
    if (!text) return '';
    const safeCount = Math.min(Math.max(1, count), 10000);

    let sep = '\n';
    if (separatorType === 'space') sep = ' ';
    else if (separatorType === 'comma') sep = ', ';
    else if (separatorType === 'none') sep = '';
    else if (separatorType === 'custom') sep = customSeparator;

    const items: string[] = [];
    for (let i = 1; i <= safeCount; i++) {
      let prefix = '';
      if (addNumbers) {
        if (numberFormat === 'dot') prefix = `${i}. `;
        else if (numberFormat === 'bracket') prefix = `[${i}] `;
        else if (numberFormat === 'dash') prefix = `${i} - `;
      }
      items.push(prefix + text);
    }

    return items.join(sep);
  }, [text, count, separatorType, customSeparator, addNumbers, numberFormat]);

  const handleCopy = () => {
    if (!repeatedOutput) return;
    navigator.clipboard.writeText(repeatedOutput).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', `${count} repetitions copied.`, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!repeatedOutput) return;
    const blob = new Blob([repeatedOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `repeated-text-${count}x.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded file', 'Repeated text saved to your device.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Controls Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Repeat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Text Repeater &amp; Multiplier
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Repeat any string, message, emoji, or list up to 10,000 times with custom separators and counters.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2">
            {[5, 10, 50, 100].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => setCount(val)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                  count === val
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {val}x
              </button>
            ))}
          </div>
        </div>

        {/* Input String */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Text to Repeat
          </label>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter words, phrases, or symbols..."
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Repetition Count & Separator Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Repetition Count */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Repetitions (1 - 10,000)
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={count}
              onChange={e => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Separator Selection */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Separator
            </label>
            <select
              value={separatorType}
              onChange={e => setSeparatorType(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newline">New Line (\n)</option>
              <option value="space">Single Space</option>
              <option value="comma">Comma &amp; Space (, )</option>
              <option value="none">None (Glued together)</option>
              <option value="custom">Custom Separator...</option>
            </select>
          </div>

          {/* Custom Separator input */}
          {separatorType === 'custom' ? (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Custom Delimiter
              </label>
              <input
                type="text"
                value={customSeparator}
                onChange={e => setCustomSeparator(e.target.value)}
                placeholder="e.g. --- or |"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Line Numbering
              </label>
              <div className="flex items-center gap-2 pt-1.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={addNumbers}
                    onChange={e => setAddNumbers(e.target.checked)}
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Add 1, 2, 3...</span>
                </label>

                {addNumbers && (
                  <select
                    value={numberFormat}
                    onChange={e => setNumberFormat(e.target.value as any)}
                    className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700"
                  >
                    <option value="dot">1.</option>
                    <option value="bracket">[1]</option>
                    <option value="dash">1 -</option>
                  </select>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Output Panel */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Output ({count}x)
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {repeatedOutput.length} characters &bull; {repeatedOutput.split('\n').length} lines
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={!repeatedOutput}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={!repeatedOutput}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 transition-colors"
              title="Download TXT"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={repeatedOutput}
          rows={12}
          placeholder="Multiplied text will show here..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none resize-y leading-relaxed"
        />
      </div>
    </div>
  );
};
