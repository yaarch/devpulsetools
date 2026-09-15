import React from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { Wrench, ShieldCheck, Zap, Globe2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, navigateTo, navigateToTool } = useApp();

  const popular = TOOLS_LIST.filter(tool => tool.isPopular).slice(0, 6);

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Privacy Guarantee */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                DevPulse Utilities
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              {t.footerTagline}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                {t.privacyGuarantee}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40 font-medium">
                <Zap className="w-3.5 h-3.5" />
                {t.hostedOnCloudflare}
              </span>
            </div>
          </div>

          {/* Col 2: Popular Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t.popularTools}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {popular.map(tool => {
                const slug = tool.slug || tool.id;
                return (
                  <li key={tool.id}>
                    <a
                      href={`/tools/${slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateToTool(tool.id);
                      }}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left block"
                      title={tool.name}
                    >
                      {tool.name}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="/tools/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ type: 'tools' });
                  }}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline block pt-1 text-xs"
                >
                  {t.viewAllToolsLink}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Static Pages */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t.platformAndLegal}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="/about/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ type: 'about' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left block"
                >
                  {t.navAbout}
                </a>
              </li>
              <li>
                <a
                  href="/privacy/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ type: 'privacy' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left block"
                >
                  {t.navPrivacy}
                </a>
              </li>
              <li>
                <a
                  href="/terms/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ type: 'terms' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left block"
                >
                  {t.navTerms}
                </a>
              </li>
              <li>
                <a
                  href="/contact/"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo({ type: 'contact' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left block"
                >
                  {t.navContact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} DevPulse Utilities. {t.allRightsReserved}
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for modern creators
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-slate-400" />
              100% Free & Open Web
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
