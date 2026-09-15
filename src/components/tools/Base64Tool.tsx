import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Binary,
  Copy,
  Download,
  UploadCloud,
  FileCode,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ArrowDownUp
} from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const { addToast } = useApp();
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [detectedImage, setDetectedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Robust UTF-8 safe encode
  const utf8ToBase64 = (str: string, urlSafe: boolean): string => {
    const encoded = btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
    if (urlSafe) {
      return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return encoded;
  };

  // Robust UTF-8 safe decode
  const base64ToUtf8 = (str: string): string => {
    // Revert URL safe if needed
    let sanitized = str.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (sanitized.length % 4) {
      sanitized += '=';
    }
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(sanitized), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  };

  const handleProcess = () => {
    if (!input.trim()) {
      setOutput('');
      setDetectedImage(null);
      setError(null);
      return;
    }
    setError(null);

    try {
      if (mode === 'encode') {
        const res = utf8ToBase64(input, isUrlSafe);
        setOutput(res);
        setDetectedImage(null);
      } else {
        // Decode
        // Check if input is a data URL image
        if (input.startsWith('data:image/')) {
          setDetectedImage(input);
        } else {
          // Check if string can be image
          try {
            const rawDecoded = base64ToUtf8(input);
            setOutput(rawDecoded);
            setDetectedImage(null);
          } catch {
            // might be binary or data url without header
            setDetectedImage(`data:image/png;base64,${input.trim()}`);
          }
        }
      }
    } catch (err: any) {
      setError(`Failed to ${mode}: ${err.message || 'Invalid characters'}`);
      setOutput('');
    }
  };

  // Drag and drop file to Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (mode === 'encode') {
        setInput(result);
        setOutput(result);
        if (file.type.startsWith('image/')) {
          setDetectedImage(result);
        }
        addToast('File converted to Base64!', `${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 'success');
      } else {
        setInput(result);
        handleProcess();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSwap = () => {
    setMode(prev => (prev === 'encode' ? 'decode' : 'encode'));
    setInput(output);
    setOutput(input);
    setDetectedImage(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      addToast('Output copied to clipboard!', '', 'success');
    });
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base64-${mode}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded output file', '', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setMode('encode');
              setError(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              mode === 'encode'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700'
            }`}
          >
            Encode to Base64
          </button>
          <button
            onClick={() => {
              setMode('decode');
              setError(null);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              mode === 'decode'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700'
            }`}
          >
            Decode from Base64
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isUrlSafe}
              onChange={e => setIsUrlSafe(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>URL-Safe (- and _)</span>
          </label>

          <button
            onClick={handleSwap}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-200"
          >
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
        </div>
      </div>

      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input pane */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span>{mode === 'encode' ? 'Plaintext / File Input' : 'Base64 Encoded Input'}</span>
            <span className="text-[11px] text-slate-400 font-normal lowercase">{input.length} chars</span>
          </div>
          <div className="relative">
            <textarea
              value={input}
              onChange={e => {
                setInput(e.target.value);
                setError(null);
              }}
              rows={8}
              placeholder={
                mode === 'encode'
                  ? 'Type or paste text here to encode...'
                  : 'Paste Base64 string here to decode...'
              }
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* File Drag and Drop Dropzone */}
          <div className="relative border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-2xl p-4 text-center transition-colors">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400">
              <UploadCloud className="w-6 h-6 text-indigo-500 mb-1" />
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Drop any file or image here
              </div>
              <div className="text-[11px]">Converts directly into Base64 Data URL</div>
            </div>
          </div>
        </div>

        {/* Output pane */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span>{mode === 'encode' ? 'Base64 Result' : 'Decoded Result'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!output}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-30"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                disabled={!output}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline disabled:opacity-30"
              >
                Download
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              readOnly
              value={output}
              rows={8}
              placeholder="Computed result will appear here..."
              className="w-full p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none resize-y"
            />
          </div>

          {/* Image Preview if detected */}
          {detectedImage && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Rendered Image Preview</span>
              </div>
              <img
                src={detectedImage}
                alt="Decoded Preview"
                className="max-h-48 mx-auto rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Convert Trigger Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={handleProcess}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all"
        >
          {mode === 'encode' ? 'Encode to Base64' : 'Decode Base64'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
