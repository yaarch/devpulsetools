import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Trash2, Code2, Sparkles, Download } from 'lucide-react';

const SAMPLE_JS = `// Utility function for debounce
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/* Example usage of debounce */
window.addEventListener('resize', debounce(function() {
  console.log('Window resized!');
}, 250));
`;

export const JsMinifier: React.FC = () => {
  const { addToast } = useApp();
  const [inputCode, setInputCode] = useState(SAMPLE_JS);
  const [removeComments, setRemoveComments] = useState(true);
  const [removeConsole, setRemoveConsole] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fast client-side JS Minifier
  const minifyJs = (code: string): string => {
    let result = code;

    // Remove multi-line comments
    if (removeComments) {
      result = result.replace(/\/\*[\s\S]*?\*\//g, '');
      // Remove single-line comments
      result = result.replace(/(^|[^\\])\/\/.*$/gm, '$1');
    }

    // Optional remove console.log
    if (removeConsole) {
      result = result.replace(/console\.(log|debug|info|warn)\s*\([\s\S]*?\);?/g, '');
    }

    // Collapse multiple whitespace
    result = result
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join(' ')
      .replace(/\s*([{};,:=+\-*/%&|<>!?:()[\]])\s*/g, '$1')
      .replace(/;\}/g, '}')
      .trim();

    return result;
  };

  const minified = minifyJs(inputCode);
  const originalBytes = new Blob([inputCode]).size;
  const minifiedBytes = new Blob([minified]).size;
  const savings = originalBytes > 0 ? Math.round(((originalBytes - minifiedBytes) / originalBytes) * 100) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(minified);
    setCopied(true);
    addToast('Copied minified JS!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([minified], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bundle.min.js';
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded min.js', '', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeComments}
              onChange={e => setRemoveComments(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Strip Comments (/* */ &amp; //)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={removeConsole}
              onChange={e => setRemoveConsole(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Strip console.log() statements</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .min.js</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Minified'}</span>
          </button>
        </div>
      </div>

      {/* Stats Ribbon */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">{originalBytes} B</div>
          <div className="text-[11px] uppercase font-semibold text-slate-500">Original Size</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">{minifiedBytes} B</div>
          <div className="text-[11px] uppercase font-semibold text-slate-500">Minified Size</div>
        </div>
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <div className="text-lg font-bold font-mono text-emerald-500">{savings}%</div>
          <div className="text-[11px] uppercase font-semibold text-slate-500">Compression</div>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>JavaScript Source Code</span>
            <button
              onClick={() => setInputCode('')}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Minified JavaScript Bundle
          </span>
          <textarea
            value={minified}
            readOnly
            rows={12}
            className="w-full p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs focus:outline-none border border-slate-800 resize-y select-all leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
