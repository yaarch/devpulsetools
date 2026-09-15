import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Download, RefreshCw, FileText } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse',
  'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt',
  'mollit', 'anim', 'id', 'est', 'laborum', 'curabitur', 'pretium', 'tincidunt', 'lacus',
  'nulla', 'gravida', 'orci', 'a', 'odio', 'nullam', 'varius', 'turpis', 'et', 'commodo',
  'pharetra', 'est', 'eros', 'bibendum', 'elit', 'nec', 'luctus', 'magna', 'felis',
  'sollicitudin', 'mauris', 'integer', 'in', 'mauris', 'eu', 'nibh', 'euismod', 'gravida'
];

export const LoremIpsumGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words' | 'lists'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [format, setFormat] = useState<'plain' | 'html' | 'markdown'>('plain');
  const [copied, setCopied] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(1);

  // Generate random words
  const generateWords = (num: number): string[] => {
    const res: string[] = [];
    for (let i = 0; i < num; i++) {
      const idx = Math.floor(Math.random() * LOREM_WORDS.length);
      res.push(LOREM_WORDS[idx]);
    }
    return res;
  };

  const generateSentence = (): string => {
    const len = Math.floor(Math.random() * 10) + 8;
    const words = generateWords(len);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = (): string => {
    const numSentences = Math.floor(Math.random() * 4) + 4;
    const sentences: string[] = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence());
    }
    return sentences.join(' ');
  };

  const generatedContent = useMemo(() => {
    // dependency on seed to refresh
    void seed;
    let items: string[] = [];

    if (type === 'paragraphs') {
      for (let i = 0; i < count; i++) {
        items.push(generateParagraph());
      }
      if (startWithLorem && items.length > 0) {
        items[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' + items[0];
      }
      if (format === 'html') {
        return items.map(p => `<p>${p}</p>`).join('\n\n');
      }
      if (format === 'markdown') {
        return items.join('\n\n');
      }
      return items.join('\n\n');
    }

    if (type === 'sentences') {
      for (let i = 0; i < count; i++) {
        items.push(generateSentence());
      }
      if (startWithLorem && items.length > 0) {
        items[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      }
      if (format === 'html') {
        return items.map(s => `<span>${s}</span>`).join(' ');
      }
      return items.join(' ');
    }

    if (type === 'words') {
      const words = generateWords(count);
      if (startWithLorem && count >= 5) {
        words[0] = 'Lorem';
        words[1] = 'ipsum';
        words[2] = 'dolor';
        words[3] = 'sit';
        words[4] = 'amet';
      }
      return words.join(' ');
    }

    if (type === 'lists') {
      for (let i = 0; i < count; i++) {
        const itemWords = generateWords(Math.floor(Math.random() * 6) + 4);
        itemWords[0] = itemWords[0].charAt(0).toUpperCase() + itemWords[0].slice(1);
        items.push(itemWords.join(' '));
      }
      if (format === 'html') {
        return '<ul>\n' + items.map(it => `  <li>${it}</li>`).join('\n') + '\n</ul>';
      }
      if (format === 'markdown') {
        return items.map(it => `- ${it}`).join('\n');
      }
      return items.map(it => `• ${it}`).join('\n');
    }

    return '';
  }, [type, count, startWithLorem, format, seed]);

  const wordCount = generatedContent.split(/\s+/).filter(Boolean).length;
  const charCount = generatedContent.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    addToast('Copied Lorem Ipsum to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lorem-ipsum-${type}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded text file!', '', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Configuration Toolbar */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Unit selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Generate:</span>
            <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
              {(['paragraphs', 'sentences', 'words', 'lists'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    type === t ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Count controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={e => setCount(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                className="w-18 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-center"
              />
              <div className="flex gap-1">
                {[1, 3, 5, 10].map(n => (
                  <button
                    key={n}
                    onClick={() => setCount(n)}
                    className={`px-2 py-1 rounded-lg text-xs font-mono border ${
                      count === n
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-5">
            {/* Format toggle */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">Markup:</span>
              <select
                value={format}
                onChange={e => setFormat(e.target.value as any)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold focus:ring-2 focus:ring-indigo-500"
              >
                <option value="plain">Plain Text</option>
                <option value="html">HTML Elements (&lt;p&gt;, &lt;li&gt;)</option>
                <option value="markdown">Markdown</option>
              </select>
            </div>

            {/* Start with Lorem */}
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={e => setStartWithLorem(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSeed(s => s + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save .txt</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="flex items-center gap-6 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-600 dark:text-slate-400">
        <span><strong>{wordCount}</strong> Words</span>
        <span>&bull;</span>
        <span><strong>{charCount}</strong> Characters</span>
        <span>&bull;</span>
        <span><strong>{count}</strong> {type}</span>
      </div>

      {/* Output Display */}
      <div className="relative">
        <textarea
          value={generatedContent}
          readOnly
          rows={14}
          className="w-full p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>
    </div>
  );
};
