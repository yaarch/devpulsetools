import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Type, Copy, Check } from 'lucide-react';

export const CaseConverter: React.FC = () => {
  const { addToast } = useApp();
  const [text, setText] = useState('DevPulse suite provides the best developer tools');

  const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];

  const transformations = [
    {
      name: 'UPPERCASE',
      val: text.toUpperCase()
    },
    {
      name: 'lowercase',
      val: text.toLowerCase()
    },
    {
      name: 'Title Case',
      val: text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    },
    {
      name: 'Sentence case',
      val: text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase())
    },
    {
      name: 'camelCase',
      val: words.map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join('')
    },
    {
      name: 'PascalCase',
      val: words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
    },
    {
      name: 'snake_case',
      val: words.map(w => w.toLowerCase()).join('_')
    },
    {
      name: 'kebab-case',
      val: words.map(w => w.toLowerCase()).join('-')
    },
    {
      name: 'CONSTANT_CASE',
      val: words.map(w => w.toUpperCase()).join('_')
    },
    {
      name: 'dot.case',
      val: words.map(w => w.toLowerCase()).join('.')
    }
  ];

  const handleCopy = (val: string, name: string) => {
    navigator.clipboard.writeText(val).then(() => {
      addToast(`Copied ${name}!`, val, 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Input Text
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          placeholder="Type or paste your text here..."
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {/* Grid of Transformed Cases */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {transformations.map(item => (
          <div
            key={item.name}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {item.name}
              </span>
              <button
                onClick={() => handleCopy(item.val, item.name)}
                className="text-slate-400 hover:text-indigo-600 p-1"
                title="Copy"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate select-all">
              {item.val || <span className="text-slate-400 italic">empty</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
