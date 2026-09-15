import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Shuffle, Palette, Download, Sparkles } from 'lucide-react';

type HarmonyMode = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic';

export const ColorPaletteGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [baseColor, setBaseColor] = useState<string>('#6366f1');
  const [harmony, setHarmony] = useState<HarmonyMode>('triadic');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Helper conversions
  const hexToHsl = (hex: string): [number, number, number] => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    const r = ((num >> 16) & 255) / 255;
    const g = ((num >> 8) & 255) / 255;
    const b = (num & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

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
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    h = (h % 360 + 360) % 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // Generate harmony colors
  const [h, s, l] = hexToHsl(baseColor);

  const getPalette = (): { name: string; hex: string }[] => {
    switch (harmony) {
      case 'complementary':
        return [
          { name: 'Base Dark', hex: hslToHex(h, s, Math.max(15, l - 25)) },
          { name: 'Base Color', hex: baseColor },
          { name: 'Base Light', hex: hslToHex(h, s, Math.min(92, l + 25)) },
          { name: 'Complement', hex: hslToHex(h + 180, s, l) },
          { name: 'Complement Light', hex: hslToHex(h + 180, s, Math.min(92, l + 25)) },
        ];
      case 'analogous':
        return [
          { name: 'Analogous -30°', hex: hslToHex(h - 30, s, l) },
          { name: 'Analogous -15°', hex: hslToHex(h - 15, s, l) },
          { name: 'Base Color', hex: baseColor },
          { name: 'Analogous +15°', hex: hslToHex(h + 15, s, l) },
          { name: 'Analogous +30°', hex: hslToHex(h + 30, s, l) },
        ];
      case 'triadic':
        return [
          { name: 'Base Dark', hex: hslToHex(h, s, Math.max(20, l - 20)) },
          { name: 'Base Color', hex: baseColor },
          { name: 'Triad 1 (+120°)', hex: hslToHex(h + 120, s, l) },
          { name: 'Triad 2 (+240°)', hex: hslToHex(h + 240, s, l) },
          { name: 'Accent Light', hex: hslToHex(h + 120, s, Math.min(90, l + 25)) },
        ];
      case 'tetradic':
        return [
          { name: 'Base Color', hex: baseColor },
          { name: 'Tetrad 1 (+60°)', hex: hslToHex(h + 60, s, l) },
          { name: 'Tetrad 2 (+180°)', hex: hslToHex(h + 180, s, l) },
          { name: 'Tetrad 3 (+240°)', hex: hslToHex(h + 240, s, l) },
          { name: 'Muted Neutral', hex: hslToHex(h, Math.max(10, s - 40), 90) },
        ];
      case 'monochromatic':
        return [
          { name: 'Shade 900', hex: hslToHex(h, s, 15) },
          { name: 'Shade 700', hex: hslToHex(h, s, 32) },
          { name: 'Base Color', hex: baseColor },
          { name: 'Tint 300', hex: hslToHex(h, s, 68) },
          { name: 'Tint 100', hex: hslToHex(h, s, 92) },
        ];
    }
  };

  const palette = getPalette();

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addToast('Copied color code!', hex, 'success');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const randomize = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setBaseColor(randomHex);
  };

  const exportCss = `:root {
  --color-1: ${palette[0]?.hex};
  --color-2: ${palette[1]?.hex};
  --color-3: ${palette[2]?.hex};
  --color-4: ${palette[3]?.hex};
  --color-5: ${palette[4]?.hex};
}`;

  return (
    <div className="space-y-8">
      {/* Visual Palette Strips */}
      <div className="w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-5 min-h-[260px]">
        {palette.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleCopyHex(item.hex)}
            className="p-6 flex flex-col justify-between cursor-pointer select-none transition-transform hover:-translate-y-1 hover:shadow-lg relative group"
            style={{ background: item.hex }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/20 text-white backdrop-blur-xs">
                {item.name}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-black/30 text-white">
                {copiedHex === item.hex ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div>
              <div className="text-xl font-extrabold text-white uppercase font-mono drop-shadow-md">
                {item.hex}
              </div>
              <div className="text-[11px] text-white/80 font-mono drop-shadow-xs">
                Click to copy
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Color Input */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Base Color:</span>
              <input
                type="color"
                value={baseColor}
                onChange={e => setBaseColor(e.target.value)}
                className="w-9 h-9 rounded-xl cursor-pointer border-0 p-0"
              />
              <input
                type="text"
                value={baseColor}
                onChange={e => setBaseColor(e.target.value)}
                className="w-24 px-2.5 py-1.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              />
            </div>

            {/* Harmony Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Harmony:</span>
              <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
                {(['triadic', 'complementary', 'analogous', 'tetradic', 'monochromatic'] as const).map(hMode => (
                  <button
                    key={hMode}
                    onClick={() => setHarmony(hMode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      harmony === hMode
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {hMode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={randomize}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Randomize Color</span>
          </button>
        </div>
      </div>

      {/* Export CSS Variables */}
      <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Custom Properties</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(exportCss);
              addToast('Copied CSS Variables!', '', 'success');
            }}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy CSS</span>
          </button>
        </div>
        <pre className="p-3.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
          {exportCss}
        </pre>
      </div>
    </div>
  );
};
