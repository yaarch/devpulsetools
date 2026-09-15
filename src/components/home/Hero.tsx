import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Zap, Lock, Sparkles, Search, ArrowRight } from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

export const Hero: React.FC = () => {
  const { t, setSearchQuery, searchQuery, navigateToTool } = useApp();

  const quickPills = [
    { id: 'json-formatter', label: 'JSON Formatter' },
    { id: 'base64-encoder-decoder', label: 'Base64' },
    { id: 'qr-code-generator', label: 'QR Code' },
    { id: 'image-compressor', label: 'Image Compressor' },
    { id: 'regex-tester', label: 'Regex Tester' },
    { id: 'jwt-decoder', label: 'JWT Decoder' }
  ];

  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 text-xs sm:text-sm font-semibold mb-6 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t.heroBadge}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-5">
          {t.heroTitle}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-300">
            {t.heroTitleHighlight}
          </span>
        </h1>

        {/* Hero Description */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
          {t.heroDescription}
        </p>

        {/* Hero In-Page Search Bar */}
        <div className="max-w-2xl mx-auto relative mb-6">
          <div className="relative flex items-center shadow-lg shadow-indigo-500/5 dark:shadow-black/20 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
            <div className="pl-4 sm:pl-5 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full py-4 px-2 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="px-3 py-1 mr-3 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
              >
                {t.clear}
              </button>
            )}
          </div>
        </div>

        {/* Quick Launch Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-400">{t.quickSearch}:</span>
          {quickPills.map(pill => (
            <button
              key={pill.id}
              onClick={() => navigateToTool(pill.id)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-2xs flex items-center gap-1"
            >
              <span>{pill.label}</span>
              <ArrowRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>

        {/* In-App PWA Install Banner Button */}
        <div className="mt-6 flex justify-center">
          <PWAInstallButton variant="hero" />
        </div>

        {/* Feature Micro-Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-left rtl:text-right">
          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{t.clientSideBadge}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.clientSideDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{t.zeroLatency}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.zeroLatencyDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{t.privacyBadge}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.privacyDesc}</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">{t.freeForeverBadge}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{t.freeForeverDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
