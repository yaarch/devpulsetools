import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';
import {
  Wrench,
  Search,
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Heart,
  Check,
  Building2
} from 'lucide-react';
import { PWAInstallButton } from '../pwa/PWAInstallButton';

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'ar', label: 'العربية (RTL)', flag: '🇸🇦' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
];

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    isRtl,
    theme,
    toggleTheme,
    navigateTo,
    setIsSearchOpen,
    favorites,
    activePage
  } = useApp();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-60 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo({ type: 'home' });
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
          aria-label="DevPulse Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                DevPulse
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                Suite
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-600 font-medium hidden sm:block">
              {t.headerSubtitle}
            </p>
          </div>
        </a>

        {/* Center Search Bar Trigger (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-500 dark:text-slate-600 bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-xl shadow-xs transition-all text-left"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-600" />
              <span className="truncate">{t.searchPlaceholder}</span>
            </div>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-600 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Desktop Navigation Links & Actions */}
        <div className="hidden md:flex items-center gap-1.5">
          {/* Nav items */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ type: 'home' });
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activePage.type === 'home'
                ? 'text-indigo-600 dark:text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.navHome}
          </a>

          <a
            href="/tools/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ type: 'tools' });
            }}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activePage.type === 'tools'
                ? 'text-indigo-600 dark:text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.navTools}
          </a>

          {/* Featured Real Estate Dedicated Hub Nav */}
          <a
            href="/tools/real-estate-calculator/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ type: 'real-estate' });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              activePage.type === 'real-estate' || (activePage.type === 'tool' && activePage.toolId === 'real-estate-calculator')
                ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 ring-1 ring-emerald-500/30'
                : 'text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.navRealEstate}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-2xs">
              {t.realEstateBadge}
            </span>
          </a>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Language Selector Dropdown */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setIsLangMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
              aria-label={t.language}
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="text-xs uppercase font-semibold">{currentLangObj.code}</span>
              <span className="text-xs text-slate-600">{currentLangObj.flag}</span>
            </button>

            {isLangMenuOpen && (
              <div
                className={`absolute ${
                  isRtl ? 'left-0' : 'right-0'
                } mt-2 w-48 py-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-1`}
              >
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-600 border-b border-slate-100 dark:border-slate-800">
                  {t.language}
                </div>
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors ${
                      language === lang.code
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-600 font-semibold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                    {language === lang.code && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label={theme === 'dark' ? t.lightMode : t.darkMode}
            title={theme === 'dark' ? t.lightMode : t.darkMode}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-600" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Favorites Count Indicator */}
          {favorites.length > 0 && (
            <button
              onClick={() => {
                navigateTo({ type: 'home' });
              }}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-600 border border-rose-200/60 dark:border-rose-800/60 hover:bg-rose-100 transition-colors"
              title={`${favorites.length} saved tools`}
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{favorites.length}</span>
            </button>
          )}

          {/* PWA Install Button */}
          <PWAInstallButton variant="header" />
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-600" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <div className="space-y-1">
            <button
              onClick={() => {
                navigateTo({ type: 'home' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.navHome}
            </button>
            <button
              onClick={() => {
                navigateTo({ type: 'tools' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.navTools}
            </button>
            <button
              onClick={() => {
                navigateTo({ type: 'real-estate' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.navRealEstate}</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                {t.realEstateBadge}
              </span>
            </button>
            <button
              onClick={() => {
                navigateTo({ type: 'about' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.navAbout}
            </button>
            <button
              onClick={() => {
                navigateTo({ type: 'contact' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.navContact}
            </button>
          </div>

          {/* Mobile PWA Install CTA */}
          <div className="pt-2">
            <PWAInstallButton variant="mobile" />
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
              {t.language}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${
                    language === lang.code
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600 dark:bg-indigo-950/70 dark:border-indigo-700 dark:text-indigo-600'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
