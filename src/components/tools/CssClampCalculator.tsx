import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Scale, Sliders, Sparkles } from 'lucide-react';

export const CssClampCalculator: React.FC = () => {
  const { addToast } = useApp();
  // Viewport
  const [minViewport, setMinViewport] = useState<number>(360);
  const [maxViewport, setMaxViewport] = useState<number>(1280);

  // Sizes in px
  const [minSize, setMinSize] = useState<number>(16);
  const [maxSize, setMaxSize] = useState<number>(32);

  // Root px (default 16)
  const [rootPx, setRootPx] = useState<number>(16);

  // Interactive viewport simulator slider
  const [simViewport, setSimViewport] = useState<number>(768);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Calculations
  const minRem = (minSize / rootPx).toFixed(4).replace(/\.?0+$/, '');
  const maxRem = (maxSize / rootPx).toFixed(4).replace(/\.?0+$/, '');

  // Slope = (maxSize - minSize) / (maxViewport - minViewport)
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const slopeVw = (slope * 100).toFixed(4).replace(/\.?0+$/, '');

  // y-intercept = (-minViewport * slope + minSize) / rootPx
  const yIntercept = ((-minViewport * slope + minSize) / rootPx).toFixed(4).replace(/\.?0+$/, '');

  // Clamp string
  const clampFormula = `clamp(${minRem}rem, ${yIntercept}rem + ${slopeVw}vw, ${maxRem}rem)`;
  const cssProperty = `font-size: ${clampFormula};`;

  // Calculate live current simulated size
  const simulatedSize = Math.max(
    minSize,
    Math.min(maxSize, minSize + (simViewport - minViewport) * slope)
  );

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFormat(label);
    addToast('Copied clamp formula!', '', 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Interactive Fluid Simulator */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-indigo-500" /> Interactive Viewport Simulator
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Simulated Screen:</span>
            <span className="text-xs font-mono font-bold text-indigo-600 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border">
              {simViewport}px
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border">
              Calculated: {simulatedSize.toFixed(1)}px
            </span>
          </div>
        </div>

        <input
          type="range"
          min="320"
          max="1920"
          value={simViewport}
          onChange={e => setSimViewport(Number(e.target.value))}
          className="w-full accent-indigo-600"
        />

        {/* Live dynamic text rendering */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-center min-h-[140px]">
          <p
            className="font-extrabold text-slate-900 dark:text-white transition-all duration-75 leading-tight"
            style={{ fontSize: `${simulatedSize}px` }}
          >
            DevPulse Fluid Typography
          </p>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Scales smoothly between {minSize}px ({minViewport}px screen) and {maxSize}px ({maxViewport}px screen)
          </p>
        </div>
      </div>

      {/* Grid: Inputs & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Dimensions &amp; Scaling Parameters</h4>

          {/* Viewport Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Min Viewport Width (px)
              </label>
              <input
                type="number"
                value={minViewport}
                onChange={e => setMinViewport(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Max Viewport Width (px)
              </label>
              <input
                type="number"
                value={maxViewport}
                onChange={e => setMaxViewport(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold font-mono"
              />
            </div>
          </div>

          {/* Size Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Min Font / Element Size (px)
              </label>
              <input
                type="number"
                value={minSize}
                onChange={e => setMinSize(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Max Font / Element Size (px)
              </label>
              <input
                type="number"
                value={maxSize}
                onChange={e => setMaxSize(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold font-mono"
              />
            </div>
          </div>
        </div>

        {/* Code Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Declaration</span>
              <button
                onClick={() => handleCopy(cssProperty, 'css')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed whitespace-pre-wrap">
              {cssProperty}
            </pre>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1 font-bold">Only Formula:</span>
              <div
                onClick={() => handleCopy(clampFormula, 'formula')}
                className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs cursor-pointer hover:bg-slate-950/80 transition-colors"
              >
                {clampFormula}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
