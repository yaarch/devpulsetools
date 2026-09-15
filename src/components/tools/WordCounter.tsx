import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlignLeft, Clock, Copy, Trash2 } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const { addToast } = useApp();
  const [text, setText] = useState(
    'DevPulse is an all-in-one developer and user utility web platform engineered for maximum speed and privacy. Every single tool runs 100% client-side inside your browser, ensuring zero server latency and absolute privacy.'
  );

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+/g) || []).length || (trimmed ? 1 : 0) : 0;
  const paragraphs = trimmed ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;

  // Reading & speaking times (minutes)
  const readingTimeSec = Math.ceil((words / 200) * 60);
  const speakingTimeSec = Math.ceil((words / 130) * 60);

  const formatSec = (s: number) => {
    if (s < 60) return `${s} sec`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  };

  // Keyword density
  const getKeywordFrequency = () => {
    if (!trimmed) return [];
    const stopWords = new Set(['the', 'and', 'a', 'an', 'in', 'on', 'is', 'for', 'of', 'to', 'with', 'by', 'at', 'this', 'that', 'it', 'as']);
    const cleanWords = trimmed.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const counts: Record<string, number> = {};

    cleanWords.forEach(w => {
      if (!stopWords.has(w)) {
        counts[w] = (counts[w] || 0) + 1;
      }
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: ((count / words) * 100).toFixed(1)
      }));
  };

  const topKeywords = getKeywordFrequency();

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Words', count: words },
          { label: 'Characters', count: charsWithSpaces },
          { label: 'Sentences', count: sentences },
          { label: 'Paragraphs', count: paragraphs }
        ].map(m => (
          <div key={m.label} className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-center">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              {m.label}
            </span>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
              {m.count}
            </span>
          </div>
        ))}
      </div>

      {/* Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Editor</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(text);
                addToast('Text copied!', '', 'success');
              }}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Copy
            </button>
            <button
              onClick={() => setText('')}
              className="text-rose-500 hover:underline"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={9}
          placeholder="Start typing or paste content to analyze..."
          className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {/* Reading time & keywords row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Estimated times */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>Time Estimates</span>
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Silent Reading (200 wpm):</span>
              <strong className="text-slate-900 dark:text-white font-mono">{formatSec(readingTimeSec)}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Speaking Aloud (130 wpm):</span>
              <strong className="text-slate-900 dark:text-white font-mono">{formatSec(speakingTimeSec)}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Chars without spaces:</span>
              <strong className="text-slate-900 dark:text-white font-mono">{charsNoSpaces}</strong>
            </div>
          </div>
        </div>

        {/* Keyword Frequency */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
            Top Keyword Density
          </span>
          {topKeywords.length > 0 ? (
            <div className="space-y-1.5 text-xs font-mono">
              {topKeywords.map(k => (
                <div key={k.word} className="flex items-center justify-between">
                  <span className="text-slate-800 dark:text-slate-200">{k.word}</span>
                  <span className="text-slate-400">
                    {k.count}x ({k.percent}%)
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-xs text-slate-400">Add more text to see keyword density.</span>
          )}
        </div>
      </div>
    </div>
  );
};
