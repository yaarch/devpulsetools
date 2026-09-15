import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'qrcode';
import {
  Link2,
  Copy,
  Trash2,
  ShieldCheck,
  ExternalLink,
  QrCode,
  Sparkles,
  Bookmark
} from 'lucide-react';

interface SavedLink {
  id: string;
  original: string;
  cleaned: string;
  timestamp: number;
}

export const UrlShortener: React.FC = () => {
  const { addToast } = useApp();
  const [inputUrl, setInputUrl] = useState('https://example.com/product/shoes?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale&fbclid=IwAR2xyz123&ref=banner');
  const [cleanedUrl, setCleanedUrl] = useState('');
  const [strippedParams, setStrippedParams] = useState<string[]>([]);
  const [savedLinks, setSavedLinks] = useState<SavedLink[]>(() => {
    try {
      const saved = localStorage.getItem('devpulse_saved_links');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const cleanUrl = (raw: string) => {
    try {
      let target = raw.trim();
      if (!target.startsWith('http://') && !target.startsWith('https://')) {
        target = 'https://' + target;
      }
      const url = new URL(target);
      const trackingKeys = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'gclid',
        'fbclid',
        'msclkid',
        'mc_cid',
        'mc_eid',
        '_ga',
        '_gl',
        'ref',
        'ref_src',
        'si'
      ];

      const removed: string[] = [];
      trackingKeys.forEach(key => {
        if (url.searchParams.has(key)) {
          removed.push(key);
          url.searchParams.delete(key);
        }
      });

      setStrippedParams(removed);
      setCleanedUrl(url.toString());
    } catch {
      setCleanedUrl(raw);
      setStrippedParams([]);
    }
  };

  useEffect(() => {
    if (inputUrl) {
      cleanUrl(inputUrl);
    } else {
      setCleanedUrl('');
      setStrippedParams([]);
    }
  }, [inputUrl]);

  // Render QR code for cleaned URL
  useEffect(() => {
    if (cleanedUrl && canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, cleanedUrl, { width: 140, margin: 1 });
    }
  }, [cleanedUrl]);

  const handleSaveLink = () => {
    if (!cleanedUrl) return;
    const newItem: SavedLink = {
      id: Math.random().toString(36).substring(2, 9),
      original: inputUrl,
      cleaned: cleanedUrl,
      timestamp: Date.now()
    };
    const updated = [newItem, ...savedLinks.slice(0, 19)];
    setSavedLinks(updated);
    try {
      localStorage.setItem('devpulse_saved_links', JSON.stringify(updated));
    } catch {
      // ignore
    }
    addToast('Link saved to bookmarks!', '', 'success');
  };

  const handleDeleteSaved = (id: string) => {
    const updated = savedLinks.filter(l => l.id !== id);
    setSavedLinks(updated);
    try {
      localStorage.setItem('devpulse_saved_links', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleCopy = (txt: string) => {
    navigator.clipboard.writeText(txt).then(() => {
      addToast('Cleaned link copied!', '', 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input area */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Paste Long or Tracking URL
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            placeholder="https://example.com/article?utm_source=twitter&..."
            className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Cleaned Result Card */}
      {cleanedUrl && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Cleaned Privacy Link</span>
            </div>

            {strippedParams.length > 0 && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Stripped {strippedParams.length} tracking tags ({strippedParams.join(', ')})
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="flex-1 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 break-all select-all">
              {cleanedUrl}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleCopy(cleanedUrl)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>

              <button
                onClick={handleSaveLink}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300"
                title="Save link bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>

              <a
                href={cleanedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300"
                title="Test Link"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* QR Code generator */}
          <div className="flex items-center gap-4 pt-2">
            <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0">
              <canvas ref={canvasRef} className="rounded" />
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Scan with your phone to open the clean tracking-free link immediately.
            </div>
          </div>
        </div>
      )}

      {/* Saved Bookmarks History */}
      {savedLinks.length > 0 && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span>Saved Clean Links ({savedLinks.length})</span>
          </div>
          <div className="divide-y divide-slate-200 dark:divide-slate-700 max-h-52 overflow-y-auto">
            {savedLinks.map(link => (
              <div key={link.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="truncate font-mono text-slate-700 dark:text-slate-300">
                  {link.cleaned}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleCopy(link.cleaned)}
                    className="p-1 text-slate-400 hover:text-indigo-600"
                    title="Copy"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteSaved(link.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
