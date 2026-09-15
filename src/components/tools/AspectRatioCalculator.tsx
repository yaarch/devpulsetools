import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Maximize2, 
  Copy, 
  Check, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Camera, 
  Square 
} from 'lucide-react';

export const AspectRatioCalculator: React.FC = () => {
  const { addToast } = useApp();

  const [w1, setW1] = useState<string>('1920');
  const [h1, setH1] = useState<string>('1080');

  const [newWidth, setNewWidth] = useState<string>('1280');
  const [copied, setCopied] = useState<boolean>(false);

  // GCD function
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const ratioData = useMemo(() => {
    const width = parseFloat(w1) || 1;
    const height = parseFloat(h1) || 1;

    const divisor = gcd(Math.round(width), Math.round(height));
    const simpleW = Math.round(width) / divisor;
    const simpleH = Math.round(height) / divisor;

    // Decimal ratio
    const decimalRatio = width / height;

    // Computed new height
    const targetW = parseFloat(newWidth) || 0;
    const computedH = targetW > 0 ? Math.round(targetW / decimalRatio) : 0;

    // CSS padding-bottom trick percentage
    const paddingPercent = ((height / width) * 100).toFixed(2);

    return {
      simpleW,
      simpleH,
      decimalRatio: Math.round(decimalRatio * 1000) / 1000,
      computedH,
      paddingPercent,
      cssAspectRatio: `aspect-ratio: ${simpleW} / ${simpleH};`
    };
  }, [w1, h1, newWidth]);

  const setPreset = (w: number, h: number) => {
    setW1(w.toString());
    setH1(h.toString());
  };

  const handleCopyCss = () => {
    navigator.clipboard.writeText(ratioData.cssAspectRatio).then(() => {
      setCopied(true);
      addToast('Copied CSS!', ratioData.cssAspectRatio, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Maximize2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Aspect Ratio &amp; Dimension Scaler
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate simplified aspect ratios, scale dimensions while preserving proportions, and generate modern CSS rules.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setPreset(1920, 1080)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              16:9 Video
            </button>
            <button
              onClick={() => setPreset(1080, 1920)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              9:16 Shorts/Reels
            </button>
            <button
              onClick={() => setPreset(1080, 1080)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              1:1 Square
            </button>
            <button
              onClick={() => setPreset(1600, 1200)}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              4:3 Standard
            </button>
          </div>
        </div>

        {/* Dimension 1 inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Original Width (px)
            </label>
            <input
              type="number"
              min={1}
              value={w1}
              onChange={e => setW1(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Original Height (px)
            </label>
            <input
              type="number"
              min={1}
              value={h1}
              onChange={e => setH1(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Calculated Ratio Hero & Scale Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ratio & CSS */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Calculated Aspect Ratio
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono tracking-tight mt-1">
              {ratioData.simpleW}:{ratioData.simpleH}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Decimal ratio: {ratioData.decimalRatio} &bull; Responsive padding: {ratioData.paddingPercent}%
            </p>
          </div>

          {/* New dimension scaler */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
              Proportional Scaler
            </span>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 block mb-0.5">New Width (px)</span>
                <input
                  type="number"
                  value={newWidth}
                  onChange={e => setNewWidth(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono font-bold"
                />
              </div>
              <span className="text-slate-400 pt-3">&times;</span>
              <div className="flex-1">
                <span className="text-[10px] text-slate-400 block mb-0.5">Auto Height (px)</span>
                <div className="w-full px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-sm font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                  {ratioData.computedH}
                </div>
              </div>
            </div>
          </div>

          {/* CSS Rule Copy */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <code className="text-xs font-mono text-slate-800 dark:text-slate-200">
              {ratioData.cssAspectRatio}
            </code>
            <button
              onClick={handleCopyCss}
              className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Copy CSS"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Visual Preview Box */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center min-h-64">
          <div
            className="border-2 border-dashed border-indigo-400 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl flex items-center justify-center transition-all p-4 max-w-full max-h-56"
            style={{
              aspectRatio: `${ratioData.simpleW} / ${ratioData.simpleH}`,
              width: ratioData.decimalRatio >= 1 ? '100%' : 'auto',
              height: ratioData.decimalRatio < 1 ? '200px' : 'auto'
            }}
          >
            <span className="text-xs font-bold font-mono text-indigo-700 dark:text-indigo-300">
              {ratioData.simpleW}:{ratioData.simpleH} Preview
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
