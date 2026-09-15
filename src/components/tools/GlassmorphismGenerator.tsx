import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Sparkles, Sliders, Image as ImageIcon } from 'lucide-react';

const BACKGROUNDS = [
  { name: 'Aurora Sunset', style: 'linear-gradient(135deg, #ff6b6b, #556270, #4ecdc4)' },
  { name: 'Cyber Mesh', style: 'radial-gradient(at 0% 0%, #7928ca 0px, transparent 50%), radial-gradient(at 100% 100%, #ff0080 0px, transparent 50%), #111827' },
  { name: 'Tropical Lagoon', style: 'linear-gradient(to right, #00c6ff, #0072ff)' },
  { name: 'Warm Ember', style: 'linear-gradient(to right, #f12711, #f5af19)' },
];

export const GlassmorphismGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [blur, setBlur] = useState<number>(16);
  const [transparency, setTransparency] = useState<number>(0.25);
  const [color, setColor] = useState<string>('#ffffff');
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderOpacity, setBorderOpacity] = useState<number>(0.2);
  const [borderRadius, setBorderRadius] = useState<number>(24);
  const [shadowLevel, setShadowLevel] = useState<'none' | 'soft' | 'medium' | 'deep'>('medium');
  const [activeBg, setActiveBg] = useState<number>(0);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Convert hex to rgb
  const hexToRgb = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(color);
  const bgRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`;
  const borderRgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${borderOpacity})`;

  const shadows = {
    none: 'none',
    soft: '0 8px 24px 0 rgba(0, 0, 0, 0.1)',
    medium: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
    deep: '0 16px 48px 0 rgba(0, 0, 0, 0.45)',
  };

  const cssRules = [
    `background: ${bgRgba};`,
    `backdrop-filter: blur(${blur}px);`,
    `-webkit-backdrop-filter: blur(${blur}px);`,
    `border-radius: ${borderRadius}px;`,
    `border: ${borderWidth}px solid ${borderRgba};`,
    shadowLevel !== 'none' ? `box-shadow: ${shadows[shadowLevel]};` : '',
  ].filter(Boolean).join('\n');

  const tailwindClasses = `backdrop-blur-[${blur}px] bg-[${bgRgba}] border border-[${borderRgba}] rounded-[${borderRadius}px] shadow-lg`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(label);
    addToast('Copied CSS to clipboard!', '', 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Visual Live Stage with Switchable Backgrounds */}
      <div
        className="w-full min-h-[360px] sm:min-h-[420px] rounded-3xl p-6 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden transition-all shadow-inner border border-slate-200 dark:border-slate-800"
        style={{ background: BACKGROUNDS[activeBg].style }}
      >
        {/* Background Selector Chips */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 p-1 rounded-xl bg-black/40 backdrop-blur-md">
          <ImageIcon className="w-3.5 h-3.5 text-white/80 ml-2" />
          {BACKGROUNDS.map((bg, idx) => (
            <button
              key={idx}
              onClick={() => setActiveBg(idx)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeBg === idx ? 'bg-white text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
              }`}
            >
              {bg.name}
            </button>
          ))}
        </div>

        {/* The Glass Component */}
        <div
          className="max-w-md w-full p-8 text-slate-900 dark:text-white transition-all space-y-4"
          style={{
            background: bgRgba,
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            borderRadius: `${borderRadius}px`,
            border: `${borderWidth}px solid ${borderRgba}`,
            boxShadow: shadows[shadowLevel],
          }}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/40 dark:bg-black/40 backdrop-blur-xs">
              Frosted Glass UI
            </span>
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Modern Glassmorphism</h3>
          <p className="text-xs opacity-90 leading-relaxed">
            Backdrop blur combined with calculated translucent alpha channels creates stunning depth in contemporary user interfaces.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-white/60 dark:bg-white/20 text-xs font-bold shadow-xs hover:bg-white/80 transition-colors">
              Action Button
            </button>
            <span className="text-xs font-mono opacity-80">blur: {blur}px</span>
          </div>
        </div>
      </div>

      {/* Configuration Controls & Code Export */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Glass Parameters
          </h4>

          {/* Blur Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Backdrop Blur</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{blur}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={e => setBlur(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Opacity Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Background Opacity</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{Math.round(transparency * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={transparency}
              onChange={e => setTransparency(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Border Opacity & Width */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Border Width</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                value={borderWidth}
                onChange={e => setBorderWidth(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Border Opacity</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{Math.round(borderOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={borderOpacity}
                onChange={e => setBorderOpacity(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          {/* Border Radius & Color */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Border Radius</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={borderRadius}
                onChange={e => setBorderRadius(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Glass Tint Color</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Shadow Level */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Box Shadow</span>
            <div className="grid grid-cols-4 gap-2">
              {(['none', 'soft', 'medium', 'deep'] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setShadowLevel(lvl)}
                  className={`py-1.5 rounded-lg text-xs font-semibold capitalize border ${
                    shadowLevel === lvl
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pure CSS Rules</span>
              <button
                onClick={() => handleCopy(cssRules, 'css')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
              {cssRules}
            </pre>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tailwind Classes</span>
                <button
                  onClick={() => handleCopy(tailwindClasses, 'tw')}
                  className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedFormat === 'tw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'tw' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto select-all break-words whitespace-pre-wrap">
                {tailwindClasses}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
