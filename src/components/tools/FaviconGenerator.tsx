import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Download, Sparkles, Image as ImageIcon, Smile, Type } from 'lucide-react';

export const FaviconGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [sourceType, setSourceType] = useState<'emoji' | 'letter'>('emoji');
  const [emoji, setEmoji] = useState('⚡');
  const [letter, setLetter] = useState('P');
  const [bgColor, setBgColor] = useState('#4f46e5');
  const [textColor, setTextColor] = useState('#ffffff');
  const [shape, setShape] = useState<'circle' | 'rounded' | 'square'>('rounded');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Render canvas
  const drawFavicon = (size = 128) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Draw background
    ctx.fillStyle = bgColor;
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'rounded') {
      const radius = size * 0.22;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    // Draw content
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (sourceType === 'emoji') {
      ctx.font = `${size * 0.55}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.fillText(emoji || '⚡', size / 2, size / 2 + size * 0.05);
    } else {
      ctx.fillStyle = textColor;
      ctx.font = `bold ${size * 0.55}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.fillText((letter || 'D').toUpperCase().slice(0, 2), size / 2, size / 2 + size * 0.04);
    }

    setDataUrl(canvas.toDataURL('image/png'));
  };

  useEffect(() => {
    drawFavicon(128);
  }, [sourceType, emoji, letter, bgColor, textColor, shape]);

  const downloadFavicon = (size: number, filename: string) => {
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // Draw same logic at target size
    ctx.fillStyle = bgColor;
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'rounded') {
      const radius = size * 0.22;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(size - radius, 0);
      ctx.quadraticCurveTo(size, 0, size, radius);
      ctx.lineTo(size, size - radius);
      ctx.quadraticCurveTo(size, size, size - radius, size);
      ctx.lineTo(radius, size);
      ctx.quadraticCurveTo(0, size, 0, size - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (sourceType === 'emoji') {
      ctx.font = `${size * 0.55}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
      ctx.fillText(emoji || '⚡', size / 2, size / 2 + size * 0.05);
    } else {
      ctx.fillStyle = textColor;
      ctx.font = `bold ${size * 0.55}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
      ctx.fillText((letter || 'D').toUpperCase().slice(0, 2), size / 2, size / 2 + size * 0.04);
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = offscreen.toDataURL('image/png');
    link.click();
    addToast(`Downloaded ${filename}!`, '', 'success');
  };

  const htmlTags = `<!-- Favicon & Apple Touch Icons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`;

  const copyHtmlTags = () => {
    navigator.clipboard.writeText(htmlTags);
    setCopiedLink(true);
    addToast('Copied HTML link tags!', '', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const POPULAR_EMOJIS = ['⚡', '🚀', '🔥', '💻', '💡', '💎', '🛡️', '⚙️', '🌟', '🎨', '📦', '🎯'];

  return (
    <div className="space-y-8">
      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Live Preview Multi-Size Stage */}
      <div className="p-8 rounded-3xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Browser &amp; Device Real-Scale Previews
        </span>

        <div className="flex flex-wrap items-end justify-center gap-8">
          {/* 128px Large */}
          <div className="flex flex-col items-center gap-2">
            <img src={dataUrl} alt="128px" className="w-28 h-28 shadow-xl" />
            <span className="text-[11px] font-mono text-slate-400">128 × 128</span>
          </div>

          {/* 64px */}
          <div className="flex flex-col items-center gap-2">
            <img src={dataUrl} alt="64px" className="w-16 h-16 shadow-md" />
            <span className="text-[11px] font-mono text-slate-400">64 × 64</span>
          </div>

          {/* 32px Tab scale */}
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-2">
              <img src={dataUrl} alt="32px" className="w-8 h-8" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Tab Title</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">32 × 32 Tab</span>
          </div>

          {/* 16px Tiny */}
          <div className="flex flex-col items-center gap-2">
            <img src={dataUrl} alt="16px" className="w-4 h-4 shadow-xs" />
            <span className="text-[11px] font-mono text-slate-400">16 × 16</span>
          </div>
        </div>
      </div>

      {/* Customization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Design &amp; Appearance</h4>

          {/* Source Type Selector */}
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
              <button
                onClick={() => setSourceType('emoji')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sourceType === 'emoji' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Smile className="w-3.5 h-3.5" /> Emoji
              </button>
              <button
                onClick={() => setSourceType('letter')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  sourceType === 'letter' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <Type className="w-3.5 h-3.5" /> Letters / Monogram
              </button>
            </div>
          </div>

          {sourceType === 'emoji' ? (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Pick or Enter Emoji</label>
              <div className="flex flex-wrap gap-2">
                {POPULAR_EMOJIS.map(e => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={`w-9 h-9 text-lg rounded-xl border flex items-center justify-center transition-transform hover:scale-110 ${
                      emoji === e ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Text Monogram (1-2 Characters)</label>
              <input
                type="text"
                maxLength={2}
                value={letter}
                onChange={e => setLetter(e.target.value)}
                className="w-24 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-center text-lg uppercase"
              />
            </div>
          )}

          {/* Shape & Colors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Shape</label>
              <div className="flex gap-2">
                {(['rounded', 'circle', 'square'] as const).map(sh => (
                  <button
                    key={sh}
                    onClick={() => setShape(sh)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold capitalize border ${
                      shape === sh
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {sh}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-24 px-2 py-1 text-xs font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Export & Download (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Download Favicon Assets
            </span>
            <div className="space-y-2">
              <button
                onClick={() => downloadFavicon(32, 'favicon-32x32.png')}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-between shadow-xs transition-colors"
              >
                <span>Download Standard (32×32 PNG)</span>
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => downloadFavicon(16, 'favicon-16x16.png')}
                className="w-full py-2 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between transition-colors"
              >
                <span>Download Small (16×16 PNG)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => downloadFavicon(180, 'apple-touch-icon.png')}
                className="w-full py-2 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-between transition-colors"
              >
                <span>Download Apple Touch Icon (180×180 PNG)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">HTML Tags</span>
              <button
                onClick={copyHtmlTags}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-950 text-indigo-300 font-mono text-[11px] overflow-x-auto select-all leading-relaxed">
              {htmlTags}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
