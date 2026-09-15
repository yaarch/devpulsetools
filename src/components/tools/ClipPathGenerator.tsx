import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Sparkles, Shapes, RefreshCw } from 'lucide-react';

interface ShapePreset {
  name: string;
  css: string;
}

const SHAPES: ShapePreset[] = [
  { name: 'Triangle', css: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { name: 'Inverted Triangle', css: 'polygon(0% 0%, 100% 0%, 50% 100%)' },
  { name: 'Trapezoid', css: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' },
  { name: 'Parallelogram', css: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' },
  { name: 'Rhombus / Diamond', css: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { name: 'Pentagon', css: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { name: 'Hexagon', css: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
  { name: 'Octagon', css: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' },
  { name: 'Star (5 Points)', css: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
  { name: 'Cross / Plus', css: 'polygon(10% 25%, 35% 25%, 35% 0%, 65% 0%, 65% 25%, 90% 25%, 90% 50%, 65% 50%, 65% 100%, 35% 100%, 35% 50%, 10% 50%)' },
  { name: 'Right Arrow / Chevron', css: 'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)' },
  { name: 'Message Bubble', css: 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)' },
  { name: 'Circle', css: 'circle(50% at 50% 50%)' },
  { name: 'Ellipse', css: 'ellipse(50% 35% at 50% 50%)' },
];

export const ClipPathGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [activeShape, setActiveShape] = useState<ShapePreset>(SHAPES[0]);
  const [customPath, setCustomPath] = useState<string>(SHAPES[0].css);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3'>('1:1');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const selectShape = (s: ShapePreset) => {
    setActiveShape(s);
    setCustomPath(s.css);
  };

  const cssRule = `clip-path: ${customPath};
-webkit-clip-path: ${customPath};`;

  const tailwindClass = `[clip-path:${customPath.replace(/\s+/g, '_')}]`;

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFormat(label);
    addToast('Copied to clipboard!', '', 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const getAspectClass = () => {
    if (aspectRatio === '16:9') return 'aspect-video w-full max-w-lg';
    if (aspectRatio === '4:3') return 'aspect-4/3 w-full max-w-md';
    return 'w-64 h-64 sm:w-80 sm:h-80';
  };

  return (
    <div className="space-y-8">
      {/* Interactive Visual Stage */}
      <div className="w-full min-h-[360px] p-8 rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Aspect Ratio Switcher */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          {(['1:1', '16:9', '4:3'] as const).map(ar => (
            <button
              key={ar}
              onClick={() => setAspectRatio(ar)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                aspectRatio === ar ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {ar}
            </button>
          ))}
        </div>

        {/* The Clipped Element with Gradient Background */}
        <div
          className={`${getAspectClass()} shadow-2xl transition-all duration-300 flex items-center justify-center`}
          style={{
            clipPath: customPath,
            WebkitClipPath: customPath,
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          }}
        >
          <div className="text-white text-center p-4">
            <span className="text-xs font-bold uppercase tracking-wider opacity-90 drop-shadow-sm">
              {activeShape.name}
            </span>
          </div>
        </div>
      </div>

      {/* Preset Shapes Grid */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Shape Presets (Click any to test)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {SHAPES.map((shape, idx) => (
            <button
              key={idx}
              onClick={() => selectShape(shape)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 group ${
                activeShape.name === shape.name
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div
                className="w-8 h-8 bg-indigo-500 transition-transform group-hover:scale-110"
                style={{ clipPath: shape.css, WebkitClipPath: shape.css }}
              />
              <span className="text-[11px] font-semibold truncate w-full">{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Code Export Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Rule</span>
            <button
              onClick={() => handleCopy(cssRule, 'css')}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFormat === 'css' ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
            {cssRule}
          </pre>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tailwind CSS Arbitrary Class</span>
            <button
              onClick={() => handleCopy(tailwindClass, 'tw')}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {copiedFormat === 'tw' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFormat === 'tw' ? 'Copied' : 'Copy Class'}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto select-all leading-relaxed">
            {tailwindClass}
          </pre>
        </div>
      </div>
    </div>
  );
};
