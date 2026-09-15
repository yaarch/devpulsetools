import React, { useState } from 'react';
import { ToolItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { IconRenderer } from '../common/IconRenderer';
import { getToolSeo, SITE_URL } from '../../config/seoConfig';
import { getLocalizedTool } from '../../i18n/toolTranslations';
import {
  Heart,
  Share2,
  HelpCircle,
  BookOpen,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Info,
  Layers,
  Lock
} from 'lucide-react';

interface ToolWrapperProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({ tool, children }) => {
  const {
    t,
    language,
    navigateTo,
    navigateToTool,
    toggleFavorite,
    isFavorite,
    addToast
  } = useApp();

  const favorited = isFavorite(tool.id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const localizedTool = getLocalizedTool(tool, language);

  // Retrieve comprehensive SEO metadata
  const seo = getToolSeo(tool.id) || getToolSeo(tool.slug);

  const canonicalSlug = seo?.slug || tool.slug || tool.id;
  const canonicalUrl = `${SITE_URL}/tools/${canonicalSlug}/`;

  const handleShare = () => {
    navigator.clipboard.writeText(canonicalUrl).then(() => {
      addToast(t.urlCopied, canonicalUrl, 'success');
    });
  };

  const isAr = language === 'ar';

  const labels = {
    home: t.navHome || 'Home',
    tools: t.navTools || 'Tools',
    inBrowser: isAr ? '١٠٠٪ داخل المتصفح' : '100% In-Browser',
    share: isAr ? 'مشاركة' : 'Share',
    keyFeatures: isAr ? 'أهم الميزات والخصائص' : 'Key Features',
    howToUse: isAr ? `طريقة استخدام ${localizedTool.name}` : `How to Use ${localizedTool.name}`,
    whatIs: isAr ? `ما هي أداة ${localizedTool.name}؟` : `What is ${localizedTool.name}?`,
    commonUseCases: isAr ? 'حالات الاستخدام الشائعة' : 'Common Use Cases',
    privacyTitle: isAr ? 'ضمان الخصوصية والأمان المحلي' : 'Privacy & Client-Side Security Guarantee',
    privacyDesc: isAr
      ? 'تتم جميع العمليات محلياً داخل ذاكرة متصفحك. لا يتم إرسال أي ملفات، نصوص، أو بيانات شخصية إلى أي خوادم خارجية.'
      : 'Your data is processed locally in your browser. No files, text, tokens, or credentials are ever sent to remote servers.',
    faqs: t.toolFaqs || 'Frequently Asked Questions',
    relatedTools: t.toolRelated || 'Related Tools'
  };

  // Find related tools based on SEO config or same category
  const relatedTools = (seo?.relatedToolIds
    ? seo.relatedToolIds.map(id => TOOLS_LIST.find(tl => tl.id === id || tl.slug === id)).filter(Boolean)
    : TOOLS_LIST.filter(item => item.id !== tool.id && item.category === tool.category).slice(0, 4)
  ) as ToolItem[];

  const categoryLabel = t[`cat_${tool.category}` as keyof typeof t] || tool.category;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* 1. Visual Breadcrumbs (Home → Tools → Tool Name) */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo({ type: 'home' });
          }}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {labels.home}
        </a>
        <span>/</span>
        <a
          href="/tools/"
          onClick={(e) => {
            e.preventDefault();
            navigateTo({ type: 'tools' });
          }}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          {labels.tools}
        </a>
        <span>/</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs" aria-current="page">
          {localizedTool.name}
        </span>
      </nav>

      {/* 2. Tool Header: Exactly ONE Primary H1 + Short Intro */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
            <IconRenderer name={tool.iconName} className="w-7 h-7" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {categoryLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{labels.inBrowser}</span>
              </span>
            </div>

            {/* Exactly One Primary H1 */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {localizedTool.name}
            </h1>

            {/* Short Introduction Paragraph */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {localizedTool.shortDesc}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            onClick={() => {
              toggleFavorite(tool.id);
              addToast(
                favorited
                  ? (isAr ? 'تمت الإزالة من المفضلة' : 'Removed from favorites')
                  : (isAr ? 'تمت الإضافة إلى المفضلة' : 'Added to favorites'),
                localizedTool.name,
                'info'
              );
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors ${
              favorited
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-900 dark:text-rose-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
            aria-label={favorited ? t.favorited : t.favorite}
          >
            <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{favorited ? t.favorited : t.favorite}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            title="Copy Shareable Link"
            aria-label="Share tool link"
          >
            <Share2 className="w-4 h-4" />
            <span>{labels.share}</span>
          </button>
        </div>
      </header>

      {/* 3. Main Interactive Tool Body Slot */}
      <section aria-label="Interactive Tool Workspace" className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
        {children}
      </section>

      {/* 4. Key Features Section */}
      {seo?.features && seo.features.length > 0 && (
        <section aria-label="Key Features" className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-500" />
            <span>{labels.keyFeatures}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {seo.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. How to Use Instructions */}
      <section aria-label="How to Use Instructions" className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span>{labels.howToUse}</span>
        </h2>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          {(seo?.howToUse || tool.instructions).map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 6. What is [tool]? */}
      {seo?.whatIs && (
        <section aria-label="What is this tool" className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-500" />
            <span>{labels.whatIs}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {seo.whatIs}
          </p>
        </section>
      )}

      {/* 7. Practical Use Cases */}
      {seo?.useCases && seo.useCases.length > 0 && (
        <section aria-label="Practical Use Cases" className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>{labels.commonUseCases}</span>
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {seo.useCases.map((useCase, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{useCase}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8. Privacy & Security Statement */}
      <section aria-label="Privacy and Security Statement" className="p-5 sm:p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
          <Lock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-1">
            {labels.privacyTitle}
          </h3>
          <p className="text-xs text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
            {seo?.privacyStatement || labels.privacyDesc}
          </p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-label="Frequently Asked Questions" className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-500" />
            <span>{labels.faqs}</span>
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-3">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. Related Tools */}
      {relatedTools.length > 0 && (
        <section aria-label="Related Developer Tools" className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {labels.relatedTools}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map(item => {
              const itemLocalized = getLocalizedTool(item, language);
              const itemSeo = getToolSeo(item.id);
              const targetSlug = itemSeo?.slug || item.slug || item.id;
              const targetHref = `/tools/${targetSlug}/`;

              return (
                <a
                  key={item.id}
                  href={targetHref}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToTool(item.id);
                  }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-left transition-all group"
                  title={`Open ${itemLocalized.name}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <IconRenderer name={item.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {itemLocalized.name}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {itemLocalized.shortDesc}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
