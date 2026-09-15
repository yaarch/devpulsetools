import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, RotateCw, Plus, Trash2, Sparkles, Shuffle } from 'lucide-react';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

const PRESETS = [
  { name: 'Hyper Dawn', type: 'linear', angle: 90, stops: [{ id: '1', color: '#ec4899', position: 0 }, { id: '2', color: '#8b5cf6', position: 50 }, { id: '3', color: '#3b82f6', position: 100 }] },
  { name: 'Sunset Glow', type: 'linear', angle: 135, stops: [{ id: '1', color: '#ff7e5f', position: 0 }, { id: '2', color: '#feb47b', position: 100 }] },
  { name: 'Ocean Calm', type: 'linear', angle: 180, stops: [{ id: '1', color: '#2b5876', position: 0 }, { id: '2', color: '#4e4376', position: 100 }] },
  { name: 'Neon Cyber', type: 'linear', angle: 45, stops: [{ id: '1', color: '#00f2fe', position: 0 }, { id: '2', color: '#4facfe', position: 100 }] },
  { name: 'Emerald Forest', type: 'linear', angle: 120, stops: [{ id: '1', color: '#0ba360', position: 0 }, { id: '2', color: '#3cba92', position: 100 }] },
  { name: 'Dark Nebula', type: 'radial', angle: 0, stops: [{ id: '1', color: '#434343', position: 0 }, { id: '2', color: '#000000', position: 100 }] },
];

export const CssGradientGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [gradientType, setGradientType] = useState<'linear' | 'radial' | 'conic'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366f1', position: 0 },
    { id: '2', color: '#a855f7', position: 50 },
    { id: '3', color: '#ec4899', position: 100 },
  ]);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Generate CSS background value
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopString = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ');

  let cssValue = '';
  if (gradientType === 'linear') {
    cssValue = `linear-gradient(${angle}deg, ${stopString})`;
  } else if (gradientType === 'radial') {
    cssValue = `radial-gradient(circle at center, ${stopString})`;
  } else {
    cssValue = `conic-gradient(from ${angle}deg at 50% 50%, ${stopString})`;
  }

  const fullCss = `background: ${cssValue};`;
  const tailwindValue = `bg-[${cssValue.replace(/\s+/g, '_')}]`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(label);
    addToast('Copied to clipboard!', text, 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    const newId = Math.random().toString(36).substring(2, 7);
    const lastPos = stops[stops.length - 1]?.position || 50;
    const newPos = Math.min(100, lastPos + 15);
    setStops([...stops, { id: newId, color: '#38bdf8', position: newPos }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter(s => s.id !== id));
  };

  const updateStopColor = (id: string, color: string) => {
    setStops(stops.map(s => (s.id === id ? { ...s, color } : s)));
  };

  const updateStopPos = (id: string, position: number) => {
    setStops(stops.map(s => (s.id === id ? { ...s, position } : s)));
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setGradientType(preset.type as any);
    setAngle(preset.angle);
    setStops(preset.stops);
  };

  const randomize = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setAngle(Math.floor(Math.random() * 360));
    setStops([
      { id: '1', color: randomHex(), position: 0 },
      { id: '2', color: randomHex(), position: 50 },
      { id: '3', color: randomHex(), position: 100 },
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Visual Live Preview Box */}
      <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center p-6 text-center"
        style={{ background: cssValue }}
      >
        <div className="px-6 py-4 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/30 text-white shadow-lg max-w-sm">
          <p className="text-sm font-semibold tracking-wide drop-shadow-sm">Modern CSS Gradient Preview</p>
          <p className="text-xs opacity-90 font-mono mt-1 drop-shadow-sm">{gradientType} &bull; {gradientType !== 'radial' ? `${angle}°` : 'circle'}</p>
        </div>

        <button
          onClick={randomize}
          className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-100 text-xs font-semibold shadow-md flex items-center gap-1.5 hover:bg-white transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Randomize</span>
        </button>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Properties */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gradient Type & Angle */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Type:</span>
                <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
                  {(['linear', 'radial', 'conic'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setGradientType(t)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                        gradientType === t ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {gradientType !== 'radial' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Angle:</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 min-w-9">{angle}°</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={e => setAngle(Number(e.target.value))}
                    className="w-28 accent-indigo-600"
                  />
                </div>
              )}
            </div>

            {/* Quick Angle Direction Buttons */}
            {gradientType === 'linear' && (
              <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 mr-2">Directions:</span>
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
                      angle === deg
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Stops */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Color Stops ({stops.length}/6)
              </span>
              <button
                onClick={addStop}
                disabled={stops.length >= 6}
                className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Stop</span>
              </button>
            </div>

            <div className="space-y-3">
              {stops.map((stop, idx) => (
                <div key={stop.id} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold text-slate-400 w-4">{idx + 1}</span>
                  <input
                    type="color"
                    value={stop.color}
                    onChange={e => updateStopColor(stop.id, e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={e => updateStopColor(stop.id, e.target.value)}
                    className="w-20 px-2 py-1 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={e => updateStopPos(stop.id, Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <span className="text-xs font-mono text-slate-500 w-10 text-right">{stop.position}%</span>
                  </div>
                  <button
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="p-1 text-slate-400 hover:text-rose-500 disabled:opacity-20 transition-colors"
                    title="Remove stop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code Export & Presets */}
        <div className="lg:col-span-5 space-y-6">
          {/* Presets */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Curated Palettes
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => applyPreset(preset)}
                  className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:border-indigo-500 text-left transition-all"
                >
                  <div
                    className="w-7 h-7 rounded-lg shrink-0 shadow-xs"
                    style={{
                      background: `linear-gradient(135deg, ${preset.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`,
                    }}
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Code Cards */}
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Rule</span>
              <button
                onClick={() => handleCopy(fullCss, 'css')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                <span>{copiedFormat === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all">
              {fullCss}
            </pre>

            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tailwind Arbitrary Class</span>
                <button
                  onClick={() => handleCopy(tailwindValue, 'tw')}
                  className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedFormat === 'tw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'tw' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto select-all">
                {tailwindValue}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
