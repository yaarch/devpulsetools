import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { getToolSeo } from '../../config/seoConfig';
import { IconRenderer } from '../common/IconRenderer';
import { Search, Home, ArrowRight, AlertCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { navigateTo, navigateToTool } = useApp();
  const [query, setQuery] = useState('');

  // Top popular suggested tools
  const topTools = TOOLS_LIST.filter(t => t.isPopular || ['json-formatter', 'base64-encoder-decoder', 'qr-code-generator', 'image-compressor', 'regex-tester', 'hash-generator'].includes(t.id)).slice(0, 6);

  const searchedTools = query.trim()
    ? TOOLS_LIST.filter(t =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : topTools;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-10">
      {/* 404 Header Badge */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold">
          <AlertCircle className="w-4 h-4" />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Looking for a Developer Tool?
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          The requested URL does not exist or may have been moved. Try searching our collection of 20 free developer utilities below or jump back to our homepage.
        </p>
      </div>

      {/* Interactive Search Box */}
      <div className="max-w-md mx-auto relative">
        <div className="flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
          <div className="pl-4 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search JSON, Base64, QR, Regex, Diff..."
            className="w-full py-3.5 px-3 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Suggested / Searched Tools Grid */}
      <div className="text-left space-y-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>{query ? 'Matching Tools' : 'Popular Utilities'}</span>
          <a
            href="/tools/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo({ type: 'tools' });
            }}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Browse All 20 Tools &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {searchedTools.map(tool => {
            const seo = getToolSeo(tool.id);
            const slug = seo?.slug || tool.slug;
            return (
              <a
                key={tool.id}
                href={`/tools/${slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToTool(tool.id);
                }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <IconRenderer name={tool.iconName} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">
                      {tool.shortDesc}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </a>
            );
          })}
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="pt-4">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo({ type: 'home' });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </a>
      </div>
    </div>
  );
};
