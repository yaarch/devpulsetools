import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ImageDown,
  UploadCloud,
  Download,
  Sliders,
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ImageCompressor: React.FC = () => {
  const { addToast } = useApp();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (JPEG, PNG, WebP)', '', 'error');
      return;
    }
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      setMaxWidth(Math.min(img.width, 1920));
      compressImage(img, file, quality, format, Math.min(img.width, 1920));
    };
    img.src = url;
  };

  const compressImage = (
    img: HTMLImageElement,
    file: File,
    qual: number,
    outFormat: 'image/jpeg' | 'image/webp' | 'image/png',
    maxW: number
  ) => {
    setIsCompressing(true);
    const canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    if (width > maxW) {
      height = Math.round((height * maxW) / width);
      width = maxW;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (outFormat === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(img, 0, 0, width, height);

    canvas.toBlob(
      blob => {
        setIsCompressing(false);
        if (!blob) return;
        if (compressedUrl) {
          URL.revokeObjectURL(compressedUrl);
        }
        const newUrl = URL.createObjectURL(blob);
        setCompressedBlob(blob);
        setCompressedUrl(newUrl);
        addToast('Image compressed!', `Reduced to ${(blob.size / 1024).toFixed(1)} KB`, 'success');
      },
      outFormat,
      qual / 100
    );
  };

  const triggerRecompress = (newQual = quality, newFormat = format, newMaxW = maxWidth) => {
    if (!originalUrl || !originalFile) return;
    const img = new Image();
    img.onload = () => {
      compressImage(img, originalFile, newQual, newFormat, newMaxW);
    };
    img.src = originalUrl;
  };

  const handleDownload = () => {
    if (!compressedUrl || !compressedBlob) return;
    const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
    const a = document.createElement('a');
    a.href = compressedUrl;
    a.download = `compressed-${originalFile?.name.replace(/\.[^/.]+$/, '') || 'image'}.${ext}`;
    a.click();
    addToast('Downloaded compressed image!', '', 'success');
  };

  const origSize = originalFile ? originalFile.size : 0;
  const compSize = compressedBlob ? compressedBlob.size : 0;
  const savings = origSize > 0 && compSize > 0 ? Math.round(((origSize - compSize) / origSize) * 100) : 0;

  return (
    <div className="space-y-6">
      {!originalFile ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl p-12 text-center cursor-pointer transition-colors bg-slate-50 dark:bg-slate-950/40"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Choose an image or drag & drop here
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Supports JPEG, PNG, and WebP. 100% private in-browser compression with zero server upload.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Controls Toolbar */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6">
              {/* Quality Slider */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Quality: <span className="text-indigo-600 dark:text-indigo-400">{quality}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={e => {
                    const q = parseInt(e.target.value, 10);
                    setQuality(q);
                    triggerRecompress(q, format, maxWidth);
                  }}
                  className="w-32 accent-indigo-600"
                />
              </div>

              {/* Format Select */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Format:</label>
                <select
                  value={format}
                  onChange={e => {
                    const f = e.target.value as any;
                    setFormat(f);
                    triggerRecompress(quality, f, maxWidth);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/webp">WebP (.webp)</option>
                  <option value="image/png">PNG (.png)</option>
                </select>
              </div>

              {/* Max Width */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Max Width:</label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  step="100"
                  value={maxWidth}
                  onChange={e => {
                    const w = parseInt(e.target.value, 10) || 1920;
                    setMaxWidth(w);
                    triggerRecompress(quality, format, w);
                  }}
                  className="w-24 px-2 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
                />
                <span className="text-xs text-slate-400">px</span>
              </div>
            </div>

            {/* Reset / Clear */}
            <button
              onClick={() => {
                setOriginalFile(null);
                setOriginalUrl(null);
                setCompressedUrl(null);
                setCompressedBlob(null);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Choose Another Image</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-500">Original Size: </span>
                <strong className="text-slate-900 dark:text-white">{(origSize / 1024).toFixed(1)} KB</strong>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
              <div>
                <span className="text-slate-500">Compressed Size: </span>
                <strong className="text-indigo-600 dark:text-indigo-400">
                  {compSize > 0 ? `${(compSize / 1024).toFixed(1)} KB` : '...'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {savings > 0 ? (
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  ↓ {savings}% Smaller!
                </span>
              ) : savings < 0 ? (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                  No compression gains (Already optimized)
                </span>
              ) : null}

              <button
                onClick={handleDownload}
                disabled={!compressedUrl}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 disabled:opacity-50 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Optimized Image</span>
              </button>
            </div>
          </div>

          {/* Side by side preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Original Image
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center flex items-center justify-center min-h-[260px]">
                {originalUrl && (
                  <img
                    src={originalUrl}
                    alt="Original Preview"
                    className="max-h-72 max-w-full rounded-xl object-contain shadow-xs"
                  />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Optimized Compressed Preview
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center flex items-center justify-center min-h-[260px]">
                {compressedUrl ? (
                  <img
                    src={compressedUrl}
                    alt="Compressed Preview"
                    className="max-h-72 max-w-full rounded-xl object-contain shadow-xs"
                  />
                ) : (
                  <span className="text-xs text-slate-400">Compressing...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
