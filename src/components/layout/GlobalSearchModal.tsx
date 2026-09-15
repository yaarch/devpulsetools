import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, History } from 'lucide-react';
import { IconRenderer } from '../common/IconRenderer';
import { getLocalizedTool } from '../../i18n/toolTranslations';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToTool, t, recentTools, language } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredTools = query.trim()
    ? TOOLS_LIST.filter(tool => {
        const q = query.toLowerCase().trim();
        const localized = getLocalizedTool(tool, language);
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.shortDesc.toLowerCase().includes(q) ||
          tool.tags.some(tag => tag.toLowerCase().includes(q)) ||
          localized.name.toLowerCase().includes(q) ||
          localized.shortDesc.toLowerCase().includes(q) ||
          localized.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
    : [];

  const displayTools = query.trim()
    ? filteredTools
    : TOOLS_LIST.filter(t => recentTools.includes(t.id)).slice(0, 6);

  const handleSelect = (toolId: string) => {
    navigateToTool(toolId);
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (displayTools.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + (displayTools.length || 1)) % (displayTools.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (displayTools[selectedIndex]) {
        handleSelect(displayTools[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t.searchPlaceholder}
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 px-2 py-1 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {displayTools.length > 0 ? (
            <div>
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                {query ? <Sparkles className="w-3.5 h-3.5" /> : <History className="w-3.5 h-3.5" />}
                <span>{query ? `${t.searchResults} (${displayTools.length})` : t.recentAndSuggested}</span>
              </div>
              <div className="space-y-1 mt-1">
                {displayTools.map((tool, idx) => {
                  const isSelected = idx === selectedIndex;
                  const localized = getLocalizedTool(tool, language);
                  const categoryLabel = t[`cat_${tool.category}` as keyof typeof t] || tool.category;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => handleSelect(tool.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-100'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <IconRenderer name={tool.iconName} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-slate-900 dark:text-white">
                            {localized.name}
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {localized.shortDesc}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium">
                          {categoryLabel}
                        </span>
                        {isSelected && (
                          <CornerDownLeft className="w-4 h-4 text-indigo-600 dark:text-indigo-400 hidden sm:block" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : query ? (
            <div className="p-8 text-center">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {t.noToolsFound}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                {t.noToolsFoundDesc}
              </p>
            </div>
          ) : null}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              {t.searchNavHint}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-slate-300 dark:border-slate-700">↵</kbd> {t.searchSelectHint}
            </span>
          </div>
          <span>{t.totalTools}: {TOOLS_LIST.length}</span>
        </div>
      </div>
    </div>
  );
};
