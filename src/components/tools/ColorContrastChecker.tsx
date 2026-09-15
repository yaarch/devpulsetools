import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Eye, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  Check, 
  Copy, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';

export const ColorContrastChecker: React.FC = () => {
  const { addToast } = useApp();

  const [textColor, setTextColor] = useState<string>('#1e293b');
  const [bgColor, setBgColor] = useState<string>('#f8fafc');

  // Convert Hex to RGB
  const hexToRgb = (hex: string): [number, number, number] | null => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    if (clean.length !== 6) return null;
    const num = parseInt(clean, 16);
    if (isNaN(num)) return null;
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  // Calculate WCAG relative luminance
  const getLuminance = (r: number, g: number, b: number): number => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const contrastData = useMemo(() => {
    const rgb1 = hexToRgb(textColor);
    const rgb2 = hexToRgb(bgColor);

    if (!rgb1 || !rgb2) {
      return {
        ratio: 1,
        normalAA: false,
        normalAAA: false,
        largeAA: false,
        largeAAA: false,
        uiAA: false,
        grade: 'Fail'
      };
    }

    const lum1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    const ratio = (brightest + 0.05) / (darkest + 0.05);
    const roundedRatio = Math.round(ratio * 100) / 100;

    return {
      ratio: roundedRatio,
      normalAA: roundedRatio >= 4.5,
      normalAAA: roundedRatio >= 7.0,
      largeAA: roundedRatio >= 3.0,
      largeAAA: roundedRatio >= 4.5,
      uiAA: roundedRatio >= 3.0,
      grade: roundedRatio >= 7.0 ? 'AAA Superb' : roundedRatio >= 4.5 ? 'AA Good' : roundedRatio >= 3.0 ? 'AA Large Only' : 'Poor'
    };
  }, [textColor, bgColor]);

  const handleSwap = () => {
    const temp = textColor;
    setTextColor(bgColor);
    setBgColor(temp);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              WCAG Color Contrast Checker
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verify Web Content Accessibility Guidelines (WCAG 2.1) compliance levels AA &amp; AAA in real time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Invert Colors</span>
            </button>
          </div>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Text / Foreground Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 shrink-0"
              />
              <input
                type="text"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono font-bold text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5 shrink-0"
              />
              <input
                type="text"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono font-bold text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Contrast Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between md:col-span-1">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Contrast Ratio
            </span>
            <div className="text-5xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              {contrastData.ratio}:1
            </div>
          </div>

          <div className="mt-4">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-lg ${
              contrastData.ratio >= 4.5 
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300' 
                : contrastData.ratio >= 3.0 
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300'
                : 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300'
            }`}>
              {contrastData.grade}
            </span>
          </div>
        </div>

        {/* Live Visual Sample Card */}
        <div
          className="p-6 rounded-2xl border shadow-sm md:col-span-2 flex flex-col justify-center transition-all"
          style={{ backgroundColor: bgColor, color: textColor, borderColor: `${textColor}33` }}
        >
          <h3 className="text-2xl font-bold mb-2">
            The quick brown fox jumps over the lazy dog.
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            Good design is as little design as possible. Accessible color combinations ensure clear legibility across devices and lighting conditions for all readers.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-xs font-bold rounded-lg transition-opacity"
              style={{ backgroundColor: textColor, color: bgColor }}
            >
              Interactive Button
            </button>
            <span className="text-xs opacity-75 font-mono">
              Sample UI Element
            </span>
          </div>
        </div>
      </div>

      {/* WCAG Compliance Matrix */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-500" />
          WCAG 2.1 Criteria Matrix
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Normal Text */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Normal Text (&lt;18pt)</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AA (4.5:1 min)</span>
              {contrastData.normalAA ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Pass
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <XCircle className="w-4 h-4" /> Fail
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AAA (7.0:1 min)</span>
              {contrastData.normalAAA ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Pass
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <XCircle className="w-4 h-4" /> Fail
                </span>
              )}
            </div>
          </div>

          {/* Large Text */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Large Text (&ge;18pt or 14pt bold)</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AA (3.0:1 min)</span>
              {contrastData.largeAA ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Pass
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <XCircle className="w-4 h-4" /> Fail
                </span>
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AAA (4.5:1 min)</span>
              {contrastData.largeAAA ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Pass
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <XCircle className="w-4 h-4" /> Fail
                </span>
              )}
            </div>
          </div>

          {/* UI Components */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">UI &amp; Form Borders</div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">AA (3.0:1 min)</span>
              {contrastData.uiAA ? (
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Pass
                </span>
              ) : (
                <span className="flex items-center gap-1 font-bold text-rose-500">
                  <XCircle className="w-4 h-4" /> Fail
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
