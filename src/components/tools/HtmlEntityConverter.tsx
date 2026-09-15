import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, ArrowUpDown, Trash2, Code, BookOpen } from 'lucide-react';

const COMMON_ENTITIES = [
  { char: '&', name: '&amp;', dec: '&#38;', hex: '&#x26;', desc: 'Ampersand' },
  { char: '<', name: '&lt;', dec: '&#60;', hex: '&#x3C;', desc: 'Less than' },
  { char: '>', name: '&gt;', dec: '&#62;', hex: '&#x3E;', desc: 'Greater than' },
  { char: '"', name: '&quot;', dec: '&#34;', hex: '&#x22;', desc: 'Double quote' },
  { char: "'", name: '&apos;', dec: '&#39;', hex: '&#x27;', desc: 'Single quote' },
  { char: ' ', name: '&nbsp;', dec: '&#160;', hex: '&#xA0;', desc: 'Non-breaking space' },
  { char: '©', name: '&copy;', dec: '&#169;', hex: '&#xA9;', desc: 'Copyright' },
  { char: '®', name: '&reg;', dec: '&#174;', hex: '&#xAE;', desc: 'Registered' },
  { char: '™', name: '&trade;', dec: '&#8482;', hex: '&#x2122;', desc: 'Trademark' },
  { char: '€', name: '&euro;', dec: '&#8364;', hex: '&#x20AC;', desc: 'Euro sign' },
  { char: '£', name: '&pound;', dec: '&#163;', hex: '&#xA3;', desc: 'Pound sign' },
  { char: '¥', name: '&yen;', dec: '&#165;', hex: '&#xA5;', desc: 'Yen sign' },
  { char: '←', name: '&larr;', dec: '&#8592;', hex: '&#x2190;', desc: 'Left arrow' },
  { char: '→', name: '&rarr;', dec: '&#8594;', hex: '&#x2192;', desc: 'Right arrow' },
  { char: '•', name: '&bull;', dec: '&#8226;', hex: '&#x2022;', desc: 'Bullet' },
  { char: '—', name: '&mdash;', dec: '&#8212;', hex: '&#x2014;', desc: 'Em dash' },
];

export const HtmlEntityConverter: React.FC = () => {
  const { addToast } = useApp();
  const [input, setInput] = useState('<div class="hero">\n  <h1>Welcome & "Enjoy"!</h1>\n  <p>Price: 100€ &copy; 2026</p>\n</div>');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [entityFormat, setEntityFormat] = useState<'named' | 'decimal' | 'hex'>('named');
  const [copied, setCopied] = useState<boolean>(false);

  // Encode function
  const encodeHtml = (str: string, format: 'named' | 'decimal' | 'hex') => {
    return str.replace(/[<>&"'\u00A0-\u9999]/g, (c) => {
      if (format === 'named') {
        const found = COMMON_ENTITIES.find(e => e.char === c);
        if (found) return found.name;
        return `&#${c.charCodeAt(0)};`;
      } else if (format === 'decimal') {
        return `&#${c.charCodeAt(0)};`;
      } else {
        return `&#x${c.charCodeAt(0).toString(16).toUpperCase()};`;
      }
    });
  };

  // Decode function using DOMParser
  const decodeHtml = (str: string) => {
    try {
      const doc = new DOMParser().parseFromString(str, 'text/html');
      return doc.documentElement.textContent || '';
    } catch {
      return str;
    }
  };

  const output = mode === 'encode' ? encodeHtml(input, entityFormat) : decodeHtml(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    addToast('Copied HTML entities to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInput(output);
    setMode(prev => (prev === 'encode' ? 'decode' : 'encode'));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'encode'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Encode Entities
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'decode'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Decode Entities
            </button>
          </div>

          {mode === 'encode' && (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-300">Format:</span>
              <div className="inline-flex rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5">
                {(['named', 'decimal', 'hex'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setEntityFormat(fmt)}
                    className={`px-2.5 py-1 rounded text-xs font-semibold capitalize ${
                      entityFormat === fmt ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {fmt} ({fmt === 'named' ? '&amp;' : fmt === 'decimal' ? '&#38;' : '&#x26;'})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
          <button
            onClick={() => setInput('')}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            {mode === 'encode' ? 'Raw Characters / HTML Input' : 'HTML Entities Input'}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              {mode === 'encode' ? 'Escaped Entities Output' : 'Decoded Text Output'}
            </label>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy Result'}</span>
            </button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Quick Lookup Cheat-Sheet */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" /> Quick Entity Reference &amp; Click to Insert
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
          {COMMON_ENTITIES.map((ent, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prev => prev + ent.char)}
              className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-center transition-all group"
              title={`Click to add ${ent.desc}`}
            >
              <div className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600">{ent.char}</div>
              <div className="text-[10px] font-mono text-slate-400 truncate">{ent.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
