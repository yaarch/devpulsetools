import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Image as ImageIcon, 
  Copy, 
  Download, 
  Check, 
  Sparkles, 
  Palette, 
  Code2 
} from 'lucide-react';

export const SvgPlaceholderGenerator: React.FC = () => {
  const { addToast } = useApp();

  const [width, setWidth] = useState<number>(600);
  const [height, setHeight] = useState<number>(400);
  const [bgColor, setBgColor] = useState<string>('#e2e8f0');
  const [textColor, setTextColor] = useState<string>('#475569');
  const [customText, setCustomText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(24);
  const [copied, setCopied] = useState<boolean>(false);

  const displayText = customText.trim() || `${width} × ${height}`;

  const svgCode = useMemo(() => {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="${bgColor}" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}px" font-weight="600" fill="${textColor}">
    ${displayText}
  </text>
</svg>`;
  }, [width, height, bgColor, textColor, displayText, fontSize]);

  const dataUri = useMemo(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgCode)}`;
  }, [svgCode]);

  const handleCopy = (content: string, label: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      addToast(`Copied ${label}!`, '', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `placeholder-${width}x${height}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded SVG', `placeholder-${width}x${height}.svg`, 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Controls */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              SVG Placeholder Image Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Generate lightweight mock images, vector thumbnails, and inline Data URIs without external HTTP requests.
            </p>
          </div>

          {/* Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => { setWidth(600); setHeight(400); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              600&times;400
            </button>
            <button
              onClick={() => { setWidth(800); setHeight(600); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              800&times;600
            </button>
            <button
              onClick={() => { setWidth(400); setHeight(400); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              400&times;400
            </button>
            <button
              onClick={() => { setWidth(1200); setHeight(630); }}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
            >
              1200&times;630 (OG)
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Width (px)
            </label>
            <input
              type="number"
              min={10}
              max={3840}
              value={width}
              onChange={e => setWidth(Math.max(10, parseInt(e.target.value) || 10))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Height (px)
            </label>
            <input
              type="number"
              min={10}
              max={2160}
              value={height}
              onChange={e => setHeight(Math.max(10, parseInt(e.target.value) || 10))}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
                className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={bgColor}
                onChange={e => setBgColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Text Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={textColor}
                onChange={e => setTextColor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>
        </div>

        {/* Text & Font size */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Custom Label (Optional)
            </label>
            <input
              type="text"
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Defaults to dimension: e.g. 600 × 400"
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Font Size (px)
            </label>
            <input
              type="number"
              min={8}
              max={120}
              value={fontSize}
              onChange={e => setFontSize(parseInt(e.target.value) || 24)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      {/* Preview & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rendered Preview */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Live Image Preview
            </label>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .SVG</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 min-h-64 overflow-hidden">
            <img
              src={dataUri}
              alt="SVG Placeholder"
              className="max-w-full max-h-72 object-contain rounded shadow-xs"
            />
          </div>
        </div>

        {/* Code Output */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              SVG Code
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(svgCode, 'SVG Code')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy SVG</span>
              </button>

              <button
                onClick={() => handleCopy(dataUri, 'Data URI')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Data URI</span>
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={svgCode}
            rows={10}
            className="w-full flex-1 p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
};
