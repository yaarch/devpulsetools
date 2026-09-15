import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Palette, Copy, Check, Eye } from 'lucide-react';

export const ColorConverter: React.FC = () => {
  const { addToast } = useApp();
  const [hex, setHex] = useState('#6366f1');

  // Convert HEX to RGB
  const hexToRgb = (hexStr: string) => {
    let sanitized = hexStr.replace(/^#/, '');
    if (sanitized.length === 3) {
      sanitized = sanitized.split('').map(c => c + c).join('');
    }
    const num = parseInt(sanitized, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    return {
      c: Math.round(((c - k) / (1 - k)) * 100),
      m: Math.round(((m - k) / (1 - k)) * 100),
      y: Math.round(((y - k) / (1 - k)) * 100),
      k: Math.round(k * 100)
    };
  };

  // Luminance & WCAG contrast calculation
  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const lum = getLuminance(rgb.r, rgb.g, rgb.b);
  const contrastWhite = ((1.0 + 0.05) / (lum + 0.05)).toFixed(2);
  const contrastBlack = ((lum + 0.05) / (0.0 + 0.05)).toFixed(2);

  const copyVal = (val: string, label: string) => {
    navigator.clipboard.writeText(val).then(() => {
      addToast(`Copied ${label}!`, val, 'success');
    });
  };

  // Generate 5 shades and 5 tints
  const tintsAndShades = [-40, -20, -10, 0, 10, 20, 40].map(offset => {
    const newL = Math.max(0, Math.min(100, hsl.l + offset));
    return `hsl(${hsl.h}, ${hsl.s}%, ${newL}%)`;
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Visual Color Preview Box */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-900 shadow-sm">
        <div
          className="w-32 h-32 rounded-2xl shadow-inner border border-black/10 shrink-0 relative flex items-center justify-center transition-colors"
          style={{ backgroundColor: hex }}
        >
          <input
            type="color"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full pointer-events-none">
            Pick Color
          </span>
        </div>

        <div className="flex-1 space-y-3 w-full">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              HEX Color Code
            </label>
            <input
              type="text"
              value={hex}
              onChange={e => setHex(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Contrast badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="p-1.5 px-3 rounded-lg bg-black text-white font-mono">
              On Black: <strong>{contrastBlack}:1</strong> {parseFloat(contrastBlack) >= 4.5 ? '✓ AA' : '✗ Fail'}
            </span>
            <span className="p-1.5 px-3 rounded-lg bg-white text-black border border-slate-300 font-mono">
              On White: <strong>{contrastWhite}:1</strong> {parseFloat(contrastWhite) >= 4.5 ? '✓ AA' : '✗ Fail'}
            </span>
          </div>
        </div>
      </div>

      {/* Cross Format Conversions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: 'RGB', val: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
          { label: 'RGBA', val: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
          { label: 'HSL', val: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
          { label: 'CMYK', val: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` }
        ].map(item => (
          <div
            key={item.label}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">{item.label}</span>
              <span className="text-xs sm:text-sm font-mono font-semibold text-slate-800 dark:text-slate-200">
                {item.val}
              </span>
            </div>
            <button
              onClick={() => copyVal(item.val, item.label)}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-800"
              title="Copy"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Shades and Tints Palette */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Shades & Tints Harmony
        </span>
        <div className="flex rounded-xl overflow-hidden h-10 border border-slate-200 dark:border-slate-800">
          {tintsAndShades.map((col, idx) => (
            <div
              key={idx}
              className="flex-1 cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: col }}
              title={col}
              onClick={() => copyVal(col, 'Color value')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
