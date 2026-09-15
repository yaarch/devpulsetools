import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Trash2, ArrowUpDown, Check, Globe, RefreshCw, FileText } from 'lucide-react';

export const UrlEncoderDecoder: React.FC = () => {
  const { addToast } = useApp();
  const [input, setInput] = useState('https://example.com/search?q=developer tools & code=100% &lang=ar');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodeType, setEncodeType] = useState<'component' | 'uri'>('component');
  const [spaceAsPlus, setSpaceAsPlus] = useState(false);
  const [copied, setCopied] = useState(false);

  const getOutput = (): string => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        let res = encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input);
        if (spaceAsPlus) {
          res = res.replace(/%20/g, '+');
        }
        return res;
      } else {
        let toDecode = input;
        if (spaceAsPlus) {
          toDecode = toDecode.replace(/\+/g, '%20');
        }
        return encodeType === 'component' ? decodeURIComponent(toDecode) : decodeURI(toDecode);
      }
    } catch {
      return 'Malformed URI input sequence. Unable to decode URI with current settings.';
    }
  };

  const output = getOutput();

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    addToast('Copied to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (!output || output.startsWith('Malformed')) return;
    setInput(output);
    setMode(prev => (prev === 'encode' ? 'decode' : 'encode'));
  };

  const setSample = (type: string) => {
    if (type === 'query') {
      setInput('https://api.github.com/search/repositories?q=topic:developer-tools language:typescript&sort=stars');
      setMode('encode');
      setEncodeType('component');
    } else if (type === 'arabic') {
      setInput('https://ar.wikipedia.org/wiki/برمجة_الحاسوب');
      setMode('encode');
      setEncodeType('uri');
    } else if (type === 'oauth') {
      setInput('https://auth.provider.com/oauth/authorize?client_id=devpulse_app&redirect_uri=https%3A%2F%2Fmyapp.dev%2Fcallback%2F&scope=read%20write');
      setMode('decode');
      setEncodeType('component');
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Switcher */}
          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'encode'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Encode URL
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'decode'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Decode URL
            </button>
          </div>

          {/* Method Type */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span>Method:</span>
            <select
              value={encodeType}
              onChange={e => setEncodeType(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="component">Component (encodeURIComponent - All chars)</option>
              <option value="uri">Full URI (encodeURI - Preserves :/?#)</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={spaceAsPlus}
              onChange={e => setSpaceAsPlus(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Use + for spaces</span>
          </label>
        </div>

        {/* Samples */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span>Samples:</span>
          <button
            onClick={() => setSample('query')}
            className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 text-[11px]"
          >
            Query
          </button>
          <button
            onClick={() => setSample('arabic')}
            className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 text-[11px]"
          >
            Arabic/UTF8
          </button>
          <button
            onClick={() => setSample('oauth')}
            className="px-2 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 text-[11px]"
          >
            OAuth
          </button>
        </div>
      </div>

      {/* Two Column Input / Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>Input ({mode === 'encode' ? 'Raw Text / URL' : 'Percent-Encoded URL'})</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-normal lowercase">{input.length} chars</span>
              <button
                onClick={() => setInput('')}
                className="hover:text-rose-500 transition-colors p-1"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            placeholder="Paste your URL or query string here..."
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>Output ({mode === 'encode' ? 'Encoded Result' : 'Decoded String'})</span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-normal lowercase">{output.length} chars</span>
              <button
                onClick={handleSwap}
                className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                title="Swap output into input"
              >
                <ArrowUpDown className="w-3 h-3" />
                <span>Swap</span>
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            rows={10}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
