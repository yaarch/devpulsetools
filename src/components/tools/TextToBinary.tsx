import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Binary, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  Sparkles, 
  Check, 
  RotateCcw,
  Table as TableIcon 
} from 'lucide-react';

export const TextToBinary: React.FC = () => {
  const { addToast } = useApp();

  const [mode, setMode] = useState<'textToBinary' | 'binaryToText'>('textToBinary');
  const [textInput, setTextInput] = useState<string>('Hello DevPulse!');
  const [binaryInput, setBinaryInput] = useState<string>('01001000 01100101 01101100 01101100 01101111');
  const [delimiter, setDelimiter] = useState<'space' | 'none' | 'comma' | 'hyphen'>('space');
  const [copied, setCopied] = useState<boolean>(false);

  // Conversion: Text to Binary
  const textToBinaryOutput = useMemo(() => {
    if (!textInput) return '';
    const sep = delimiter === 'space' ? ' ' : delimiter === 'comma' ? ', ' : delimiter === 'hyphen' ? '-' : '';
    const bytes: string[] = [];
    
    for (let i = 0; i < textInput.length; i++) {
      const code = textInput.charCodeAt(i);
      bytes.push(code.toString(2).padStart(8, '0'));
    }
    return bytes.join(sep);
  }, [textInput, delimiter]);

  // Conversion: Binary to Text
  const binaryToTextOutput = useMemo(() => {
    if (!binaryInput.trim()) return '';
    // Strip everything except 0 and 1, or split by spaces
    const clean = binaryInput.replace(/[^01]/g, ' ');
    const chunks = clean.trim().split(/\s+/).filter(Boolean);

    let result = '';
    for (const chunk of chunks) {
      if (chunk.length > 0) {
        const charCode = parseInt(chunk, 2);
        if (!isNaN(charCode)) {
          result += String.fromCharCode(charCode);
        }
      }
    }
    return result;
  }, [binaryInput]);

  // Detailed Byte Map for Text to Binary
  const byteBreakdown = useMemo(() => {
    if (mode !== 'textToBinary' || !textInput) return [];
    const rows = [];
    const maxRows = 20; // limit to prevent huge DOM
    for (let i = 0; i < Math.min(textInput.length, maxRows); i++) {
      const char = textInput[i];
      const code = char.charCodeAt(0);
      rows.push({
        char: char === ' ' ? '(space)' : char === '\n' ? '(newline)' : char,
        dec: code,
        hex: '0x' + code.toString(16).toUpperCase().padStart(2, '0'),
        bin: code.toString(2).padStart(8, '0')
      });
    }
    return rows;
  }, [textInput, mode]);

  const handleCopy = (content: string) => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', '', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSwap = () => {
    if (mode === 'textToBinary') {
      setMode('binaryToText');
      setBinaryInput(textToBinaryOutput || '01001000 01100101');
    } else {
      setMode('textToBinary');
      setTextInput(binaryToTextOutput || 'Hello');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Controls */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Binary className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Text &harr; Binary Converter
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Translate plain text into 8-bit binary code strings and decode binary bytes back into readable ASCII/Unicode text.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-sm active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Switch Direction</span>
            </button>
          </div>
        </div>

        {/* Direction Mode Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('textToBinary')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'textToBinary'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Text &rarr; Binary
            </button>
            <button
              type="button"
              onClick={() => setMode('binaryToText')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'binaryToText'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Binary &rarr; Text
            </button>
          </div>

          {mode === 'textToBinary' && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold">Delimiter:</span>
              <select
                value={delimiter}
                onChange={e => setDelimiter(e.target.value as any)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="space">Space (01001000 01100101)</option>
                <option value="none">None (0100100001100101)</option>
                <option value="comma">Comma (01001000, 01100101)</option>
                <option value="hyphen">Hyphen (01001000-01100101)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mode === 'textToBinary' ? (
          <>
            {/* Text Input */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Plain Text Input
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {textInput.length} chars
                </span>
              </div>
              <textarea
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                rows={8}
                placeholder="Enter regular text to convert to binary..."
                className="w-full flex-1 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
              />
            </div>

            {/* Binary Output */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Binary Output
                </label>
                <button
                  onClick={() => handleCopy(textToBinaryOutput)}
                  disabled={!textToBinaryOutput}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={textToBinaryOutput}
                rows={8}
                placeholder="Binary 0s and 1s will appear here..."
                className="w-full flex-1 p-3.5 bg-indigo-50/20 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </>
        ) : (
          <>
            {/* Binary Input */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Binary Input (0s and 1s)
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {binaryInput.replace(/[^01]/g, '').length} bits
                </span>
              </div>
              <textarea
                value={binaryInput}
                onChange={e => setBinaryInput(e.target.value)}
                rows={8}
                placeholder="Paste binary bytes separated by spaces (e.g., 01001000 01101001)..."
                className="w-full flex-1 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
              />
            </div>

            {/* Decoded Text Output */}
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Decoded Plain Text
                </label>
                <button
                  onClick={() => handleCopy(binaryToTextOutput)}
                  disabled={!binaryToTextOutput}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={binaryToTextOutput}
                rows={8}
                placeholder="Decoded text will appear here..."
                className="w-full flex-1 p-3.5 bg-indigo-50/20 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-sm font-sans text-slate-900 dark:text-slate-100 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </>
        )}
      </div>

      {/* ASCII Breakdown Table */}
      {byteBreakdown.length > 0 && (
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <TableIcon className="w-4 h-4 text-indigo-500" />
              Byte Breakdown Preview (First {byteBreakdown.length} characters)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[11px]">
                  <th className="pb-2 font-medium">Character</th>
                  <th className="pb-2 font-medium">Decimal (ASCII)</th>
                  <th className="pb-2 font-medium">Hex</th>
                  <th className="pb-2 font-medium">8-bit Binary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {byteBreakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">{row.char}</td>
                    <td className="py-2 text-slate-700 dark:text-slate-300">{row.dec}</td>
                    <td className="py-2 text-emerald-600 dark:text-emerald-400">{row.hex}</td>
                    <td className="py-2 font-bold text-slate-900 dark:text-white">{row.bin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
