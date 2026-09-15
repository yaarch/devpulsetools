import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, Copy, Plus, Trash2, Check, Sparkles } from 'lucide-react';

interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

export const BoxShadowGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: '1', x: 0, y: 10, blur: 25, spread: -5, color: '#000000', opacity: 0.1, inset: false },
    { id: '2', x: 0, y: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.1, inset: false }
  ]);
  const [borderRadius, setBorderRadius] = useState<number>(24);

  // Convert layer to CSS string
  const layerToCss = (l: ShadowLayer): string => {
    // Hex to RGBA
    const num = parseInt(l.color.replace('#', ''), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    const rgba = `rgba(${r}, ${g}, ${b}, ${l.opacity})`;
    return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${rgba}`;
  };

  const fullCssBoxShadow = layers.map(layerToCss).join(', ');

  const handleAddLayer = () => {
    const newLayer: ShadowLayer = {
      id: Math.random().toString(36).substring(2, 9),
      x: 0,
      y: 4,
      blur: 12,
      spread: 0,
      color: '#000000',
      opacity: 0.08,
      inset: false
    };
    setLayers(prev => [...prev, newLayer]);
  };

  const handleRemoveLayer = (id: string) => {
    if (layers.length <= 1) return;
    setLayers(prev => prev.filter(l => l.id !== id));
  };

  const updateLayer = (id: string, updates: Partial<ShadowLayer>) => {
    setLayers(prev => prev.map(l => (l.id === id ? { ...l, ...updates } : l)));
  };

  const handleCopyCss = () => {
    const code = `box-shadow: ${fullCssBoxShadow};`;
    navigator.clipboard.writeText(code).then(() => {
      addToast('Copied CSS box-shadow!', code, 'success');
    });
  };

  const handleCopyTailwind = () => {
    const code = `shadow-[${fullCssBoxShadow.replace(/\s+/g, '_')}]`;
    navigator.clipboard.writeText(code).then(() => {
      addToast('Copied Tailwind class!', '', 'success');
    });
  };

  return (
    <div className="space-y-8">
      {/* Live Visual Preview Canvas */}
      <div className="p-12 sm:p-16 rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center min-h-[300px]">
        <div
          style={{
            boxShadow: fullCssBoxShadow,
            borderRadius: `${borderRadius}px`
          }}
          className="w-56 h-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-150"
        >
          <div className="text-center p-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              Preview Box
            </span>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              radius: {borderRadius}px
            </span>
          </div>
        </div>
      </div>

      {/* Code Export Box */}
      <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="truncate select-all max-w-xl">
          <span className="text-indigo-400">box-shadow:</span> {fullCssBoxShadow};
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyCss}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy CSS</span>
          </button>
          <button
            onClick={handleCopyTailwind}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold border border-slate-700"
          >
            Tailwind Class
          </button>
        </div>
      </div>

      {/* Global & Layer Controls */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Shadow Layers ({layers.length})
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Corner Radius:</span>
              <input
                type="range"
                min="0"
                max="60"
                value={borderRadius}
                onChange={e => setBorderRadius(parseInt(e.target.value, 10))}
                className="w-24 accent-indigo-600"
              />
              <span className="font-mono text-slate-700 dark:text-slate-300">{borderRadius}px</span>
            </div>
          </div>

          <button
            onClick={handleAddLayer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-slate-50"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Layer</span>
          </button>
        </div>

        <div className="space-y-3">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Layer #{index + 1}
                </span>
                {layers.length > 1 && (
                  <button
                    onClick={() => handleRemoveLayer(layer.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                    title="Remove Layer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block mb-1">X Offset: {layer.x}px</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={layer.x}
                    onChange={e => updateLayer(layer.id, { x: parseInt(e.target.value, 10) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Y Offset: {layer.y}px</span>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={layer.y}
                    onChange={e => updateLayer(layer.id, { y: parseInt(e.target.value, 10) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Blur: {layer.blur}px</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.blur}
                    onChange={e => updateLayer(layer.id, { blur: parseInt(e.target.value, 10) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Spread: {layer.spread}px</span>
                  <input
                    type="range"
                    min="-30"
                    max="50"
                    value={layer.spread}
                    onChange={e => updateLayer(layer.id, { spread: parseInt(e.target.value, 10) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div>
                  <span className="text-slate-400 block mb-1">Opacity: {Math.round(layer.opacity * 100)}%</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={layer.opacity}
                    onChange={e => updateLayer(layer.id, { opacity: parseFloat(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                <div className="flex items-center gap-3 pt-3">
                  <input
                    type="color"
                    value={layer.color}
                    onChange={e => updateLayer(layer.id, { color: e.target.value })}
                    className="w-7 h-7 rounded cursor-pointer border-0 p-0"
                  />
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={layer.inset}
                      onChange={e => updateLayer(layer.id, { inset: e.target.checked })}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Inset</span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
