import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Shuffle, Sparkles, Sliders } from 'lucide-react';

export const BorderRadiusGenerator: React.FC = () => {
  const { addToast } = useApp();
  // 8 values for fancy border-radius:
  // horizontal: tl, tr, br, bl
  const [tlH, setTlH] = useState<number>(60);
  const [trH, setTrH] = useState<number>(40);
  const [brH, setBrH] = useState<number>(30);
  const [blH, setBlH] = useState<number>(70);

  // vertical: tl, tr, br, bl
  const [tlV, setTlV] = useState<number>(60);
  const [trV, setTrV] = useState<number>(30);
  const [brV, setBrV] = useState<number>(70);
  const [blV, setBlV] = useState<number>(40);

  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const radiusString = `${tlH}% ${trH}% ${brH}% ${blH}% / ${tlV}% ${trV}% ${brV}% ${blV}%`;
  const cssProperty = `border-radius: ${radiusString};`;
  const tailwindArbitrary = `rounded-[${radiusString.replace(/\s+/g, '_')}]`;

  const randomize = () => {
    const r = () => Math.floor(Math.random() * 65) + 20;
    setTlH(r()); setTrH(r()); setBrH(r()); setBlH(r());
    setTlV(r()); setTrV(r()); setBrV(r()); setBlV(r());
  };

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFormat(label);
    addToast('Copied border radius!', '', 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Visual Organic Blob Stage */}
      <div className="w-full min-h-[360px] p-8 rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden">
        <button
          onClick={randomize}
          className="absolute top-4 right-4 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold shadow-xs flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Randomize Organic Shape</span>
        </button>

        {/* The Blob */}
        <div
          className="w-64 h-64 sm:w-72 sm:h-72 shadow-2xl transition-all duration-300 flex items-center justify-center text-center p-6"
          style={{
            borderRadius: radiusString,
            background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
          }}
        >
          <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-sm">
            8-Point Fancy Radius
          </span>
        </div>
      </div>

      {/* Grid: 8 Sliders & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Horizontal Radii (%):</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Top Left (H)</span>
                <span className="font-mono text-indigo-600">{tlH}%</span>
              </div>
              <input type="range" min="0" max="100" value={tlH} onChange={e => setTlH(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Top Right (H)</span>
                <span className="font-mono text-indigo-600">{trH}%</span>
              </div>
              <input type="range" min="0" max="100" value={trH} onChange={e => setTrH(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Bottom Right (H)</span>
                <span className="font-mono text-indigo-600">{brH}%</span>
              </div>
              <input type="range" min="0" max="100" value={brH} onChange={e => setBrH(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Bottom Left (H)</span>
                <span className="font-mono text-indigo-600">{blH}%</span>
              </div>
              <input type="range" min="0" max="100" value={blH} onChange={e => setBlH(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-800">
            Vertical Radii (%):
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Top Left (V)</span>
                <span className="font-mono text-indigo-600">{tlV}%</span>
              </div>
              <input type="range" min="0" max="100" value={tlV} onChange={e => setTlV(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Top Right (V)</span>
                <span className="font-mono text-indigo-600">{trV}%</span>
              </div>
              <input type="range" min="0" max="100" value={trV} onChange={e => setTrV(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Bottom Right (V)</span>
                <span className="font-mono text-indigo-600">{brV}%</span>
              </div>
              <input type="range" min="0" max="100" value={brV} onChange={e => setBrV(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Bottom Left (V)</span>
                <span className="font-mono text-indigo-600">{blV}%</span>
              </div>
              <input type="range" min="0" max="100" value={blV} onChange={e => setBlV(Number(e.target.value))} className="w-full accent-indigo-600" />
            </div>
          </div>
        </div>

        {/* Code Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Rule</span>
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
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tailwind Arbitrary Class</span>
                <button
                  onClick={() => handleCopy(tailwindArbitrary, 'tw')}
                  className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedFormat === 'tw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'tw' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto select-all">
                {tailwindArbitrary}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
