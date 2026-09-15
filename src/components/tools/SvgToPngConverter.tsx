import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FileImage, Download, UploadCloud, Heart, Share2, Sparkles } from 'lucide-react';

export const SvgToPngConverter: React.FC = () => {
  const { addToast } = useApp();
  
  const [svgCode, setSvgCode] = useState(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#grad)" />
  <circle cx="50" cy="50" r="24" fill="#ffffff" opacity="0.9" />
  <path d="M42 35 L65 50 L42 65 Z" fill="#4f46e5" />
</svg>`
  );

  const [scale, setScale] = useState<number>(2);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core conversion logic with viewBox dimension fallback
  const renderSvgToPng = () => {
    if (!svgCode.trim()) return;

    try {
      let processedSvg = svgCode;

      if (!processedSvg.includes('width=') || !processedSvg.includes('height=')) {
        const viewBoxMatch = processedSvg.match(/viewBox=["']([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)["']/i);
        if (viewBoxMatch) {
          const [, , , vbWidth, vbHeight] = viewBoxMatch;
          processedSvg = processedSvg.replace(
            /<svg/i,
            `<svg width="${vbWidth}" height="${vbHeight}"`
          );
        }
      }

      const blob = new Blob([processedSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          URL.revokeObjectURL(url);
          return;
        }

        const naturalW = img.width || img.naturalWidth || 300;
        const naturalH = img.height || img.naturalHeight || 300;

        const w = naturalW * scale;
        const h = naturalH * scale;

        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          URL.revokeObjectURL(url);
          return;
        }

        ctx.clearRect(0, 0, w, h);
        
        if (!isTransparent) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
        }

        ctx.drawImage(img, 0, 0, w, h);

        const pngUrl = canvas.toDataURL('image/png');
        setPreviewUrl(pngUrl);
        URL.revokeObjectURL(url);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
        addToast('Invalid SVG syntax!', 'Unable to parse vector data.', 'error');
      };

      img.src = url;
    } catch (err: any) {
      setPreviewUrl(null);
      addToast('Error parsing SVG', err?.message || '', 'error');
    }
  };

  useEffect(() => {
    renderSvgToPng();
  }, [svgCode, scale, isTransparent]);

  // Robust file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setSvgCode(content);
        addToast('Loaded SVG file successfully!', file.name, 'success');
      }
    };
    reader.onerror = () => {
      addToast('Failed to read file', 'Please try pasting the code manually.', 'error');
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `rasterized-${scale}x-${Date.now()}.png`;
    a.click();
    addToast('Downloaded PNG file!', '', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 md:p-6">
      
      {/* 1. Header & Description Banner */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-900">
              100% In-Browser
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              Tool under active refinement
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => addToast('Added to favorites!', '', 'success')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5" /> Save to favorites
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                addToast('Link copied to clipboard!', '', 'success');
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">SVG to PNG Converter</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
            Convert scalable vector graphics (SVG) into crisp, high-resolution PNG images with custom scaling.
          </p>
        </div>
      </div>

      {/* 2. How to Use Section */}
      <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100 dark:border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> How to Use
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
            <p>Paste raw SVG XML code or use the <strong>Upload .svg</strong> button directly.</p>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
            <p>Select your output resolution scale multiplier (1x, 2x, 4x Retina, or 8x Ultra HD).</p>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
            <p>Choose a transparent or solid background color using the toggle.</p>
          </div>
          <div className="flex gap-2.5 items-start">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">4</span>
            <p>Preview the rasterized result in real-time and export your PNG file.</p>
          </div>
        </div>
      </div>

      {/* 3. Interactive Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Resolution Scale:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 4, 8].map(s => (
                <button
                  key={s}
                  onClick={() => setScale(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    scale === s
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isTransparent}
              onChange={e => setIsTransparent(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
            <span>Transparent Background</span>
          </label>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Working Upload Button linked securely via useRef */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 shadow-xs transition-colors"
          >
            <UploadCloud className="w-4 h-4 text-indigo-500" />
            <span>Upload .svg</span>
          </button>
          
          <input 
            ref={fileInputRef}
            type="file" 
            accept=".svg,image/svg+xml,text/xml,text/plain" 
            onChange={handleFileUpload} 
            className="hidden" 
          />

          <button
            onClick={handleDownload}
            disabled={!previewUrl}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs disabled:opacity-40 transition-opacity cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export PNG</span>
          </button>
        </div>
      </div>

      {/* 4. Code Editor & Preview Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SVG Code Editor */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            SVG Source Code
          </label>
          <textarea
            value={svgCode}
            onChange={e => setSvgCode(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y border border-slate-800 shadow-inner"
          />
        </div>

        {/* Rasterized PNG Preview */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Rendered PNG Canvas ({scale}x resolution)
          </label>
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[310px] flex items-center justify-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="PNG Rasterization Preview"
                className="max-h-72 max-w-full rounded-xl shadow-lg object-contain"
              />
            ) : (
              <span className="text-xs text-slate-400">Rendering preview...</span>
            )}
          </div>
        </div>
      </div>

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
