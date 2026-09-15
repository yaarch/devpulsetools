import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileCode, Copy, Download, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';

export const HtmlMinifier: React.FC = () => {
  const { addToast } = useApp();
  const [htmlInput, setHtmlInput] = useState(
`<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta Configuration -->
    <meta charset="UTF-8" />
    <title>DevPulse Fast Suite</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <!-- Main Content Area -->
    <header>
      <h1>Free Client-Side Developer Utilities</h1>
      <p>100% private, runs directly in your browser.</p>
    </header>
  </body>
</html>`
  );

  const [removeComments, setRemoveComments] = useState(true);
  const [collapseWhitespace, setCollapseWhitespace] = useState(true);
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    let result = htmlInput;
    if (removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, '');
    }
    if (collapseWhitespace) {
      result = result
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        .trim();
    }
    setOutput(result);
    addToast('HTML minified successfully!', '', 'success');
  };

  const origBytes = new Blob([htmlInput]).size;
  const outBytes = new Blob([output]).size;
  const savings = origBytes > 0 && outBytes > 0 ? Math.round(((origBytes - outBytes) / origBytes) * 100) : 0;

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      addToast('Minified HTML copied!', '', 'success');
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minified-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded minified HTML', '', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Configuration bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={removeComments}
              onChange={e => setRemoveComments(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Strip Comments (&lt;!-- --&gt;)</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={collapseWhitespace}
              onChange={e => setCollapseWhitespace(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Collapse Spaces & Tags</span>
          </label>
        </div>

        <button
          onClick={handleMinify}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Minify HTML</span>
        </button>
      </div>

      {/* Editor & output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Raw HTML Input</span>
            <span>{origBytes} B</span>
          </div>
          <textarea
            value={htmlInput}
            onChange={e => setHtmlInput(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y border border-slate-800"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Minified Output</span>
            <div className="flex items-center gap-2">
              {savings > 0 && (
                <span className="text-emerald-500 font-bold">↓ {savings}%</span>
              )}
              <button
                onClick={handleCopy}
                disabled={!output}
                className="text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-40"
              >
                Download
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={output}
            rows={14}
            placeholder="Click 'Minify HTML' above to compress..."
            className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none resize-y border border-slate-200 dark:border-slate-800"
          />
        </div>
      </div>
    </div>
  );
};
