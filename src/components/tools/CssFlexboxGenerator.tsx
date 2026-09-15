import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Plus, Trash2, LayoutGrid, RotateCcw } from 'lucide-react';

interface FlexItem {
  id: number;
  label: string;
  grow: number;
  shrink: number;
  alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

export const CssFlexboxGenerator: React.FC = () => {
  const { addToast } = useApp();
  // Container properties
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline'>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('wrap');
  const [gap, setGap] = useState<number>(16);

  // Items
  const [items, setItems] = useState<FlexItem[]>([
    { id: 1, label: 'Item 1', grow: 0, shrink: 1, alignSelf: 'auto' },
    { id: 2, label: 'Item 2', grow: 0, shrink: 1, alignSelf: 'auto' },
    { id: 3, label: 'Item 3', grow: 0, shrink: 1, alignSelf: 'auto' },
    { id: 4, label: 'Item 4', grow: 0, shrink: 1, alignSelf: 'auto' },
  ]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const addItem = () => {
    if (items.length >= 12) return;
    const nextId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    setItems([...items, { id: nextId, label: `Item ${nextId}`, grow: 0, shrink: 1, alignSelf: 'auto' }]);
  };

  const removeItem = (id: number) => {
    if (items.length <= 1) return;
    setItems(items.filter(i => i.id !== id));
    if (selectedItemId === id) setSelectedItemId(null);
  };

  const selectedItem = items.find(i => i.id === selectedItemId);

  const updateSelectedItem = (key: keyof FlexItem, val: any) => {
    if (!selectedItemId) return;
    setItems(items.map(it => (it.id === selectedItemId ? { ...it, [key]: val } : it)));
  };

  const cssCode = `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;

  const tailwindClasses = `flex flex-${flexDirection} justify-${justifyContent.replace('flex-', '')} items-${alignItems.replace('flex-', '')} ${flexWrap} gap-[${gap}px]`;

  const handleCopy = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFormat(label);
    addToast('Copied CSS to clipboard!', '', 'success');
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const resetAll = () => {
    setFlexDirection('row');
    setJustifyContent('space-between');
    setAlignItems('center');
    setFlexWrap('wrap');
    setGap(16);
    setItems([
      { id: 1, label: 'Item 1', grow: 0, shrink: 1, alignSelf: 'auto' },
      { id: 2, label: 'Item 2', grow: 0, shrink: 1, alignSelf: 'auto' },
      { id: 3, label: 'Item 3', grow: 0, shrink: 1, alignSelf: 'auto' },
      { id: 4, label: 'Item 4', grow: 0, shrink: 1, alignSelf: 'auto' },
    ]);
  };

  return (
    <div className="space-y-8">
      {/* Live Interactive Flex Stage */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Flex Container Interactive Stage (Click any box to inspect item)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={addItem}
              disabled={items.length >= 12}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 disabled:opacity-40 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Box</span>
            </button>
            <button
              onClick={resetAll}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div
          className="w-full min-h-[300px] p-6 rounded-3xl bg-slate-100 dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 transition-all overflow-auto"
          style={{
            display: 'flex',
            flexDirection,
            justifyContent,
            alignItems,
            flexWrap,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedItemId(item.id === selectedItemId ? null : item.id)}
              className={`p-4 min-w-[80px] min-h-[70px] rounded-2xl cursor-pointer select-none transition-all flex flex-col items-center justify-center font-bold text-xs shadow-sm ${
                selectedItemId === item.id
                  ? 'bg-indigo-600 text-white ring-4 ring-indigo-300 dark:ring-indigo-900 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400 border border-slate-200 dark:border-slate-700'
              }`}
              style={{
                flexGrow: item.grow,
                flexShrink: item.shrink,
                alignSelf: item.alignSelf !== 'auto' ? item.alignSelf : undefined,
              }}
            >
              <span>{item.label}</span>
              {item.grow > 0 && <span className="text-[10px] font-mono opacity-80">grow:{item.grow}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column (7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Container Properties</h4>

          {/* flex-direction */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">flex-direction:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map(dir => (
                <button
                  key={dir}
                  onClick={() => setFlexDirection(dir)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                    flexDirection === dir
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          {/* justify-content */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">justify-content:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map(jc => (
                <button
                  key={jc}
                  onClick={() => setJustifyContent(jc)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                    justifyContent === jc
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {jc}
                </button>
              ))}
            </div>
          </div>

          {/* align-items */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">align-items:</span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as const).map(ai => (
                <button
                  key={ai}
                  onClick={() => setAlignItems(ai)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border ${
                    alignItems === ai
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {ai}
                </button>
              ))}
            </div>
          </div>

          {/* flex-wrap and gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">flex-wrap:</span>
              <div className="flex gap-1.5">
                {(['nowrap', 'wrap', 'wrap-reverse'] as const).map(fw => (
                  <button
                    key={fw}
                    onClick={() => setFlexWrap(fw)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border ${
                      flexWrap === fw
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {fw}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Gap</span>
                <span className="font-mono text-indigo-600">{gap}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={gap}
                onChange={e => setGap(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>

          {/* Selected Item Inspector (if any selected) */}
          {selectedItem && (
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                  Inspecting: {selectedItem.label}
                </span>
                <button
                  onClick={() => removeItem(selectedItem.id)}
                  className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Item
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    flex-grow:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={selectedItem.grow}
                    onChange={e => updateSelectedItem('grow', Number(e.target.value))}
                    className="w-full px-2.5 py-1 text-xs font-bold rounded border bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    align-self:
                  </label>
                  <select
                    value={selectedItem.alignSelf}
                    onChange={e => updateSelectedItem('alignSelf', e.target.value)}
                    className="w-full px-2 py-1 text-xs font-semibold rounded border bg-white dark:bg-slate-800"
                  >
                    <option value="auto">auto</option>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Code Output Column (5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CSS Code</span>
              <button
                onClick={() => handleCopy(cssCode, 'css')}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedFormat === 'css' ? 'Copied' : 'Copy CSS'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
              {cssCode}
            </pre>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tailwind CSS</span>
                <button
                  onClick={() => handleCopy(tailwindClasses, 'tw')}
                  className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  {copiedFormat === 'tw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedFormat === 'tw' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto select-all">
                {tailwindClasses}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
