import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { TOOL_CATEGORIES, EDUCATION_SUBCATEGORIES, ToolRegistry } from '../../services/toolRegistry';
import { ToolCategory, EducationSubCategory } from '../../types';
import { ToolCard } from './ToolCard';
import { IconRenderer } from '../common/IconRenderer';
import {
  Heart,
  Sparkles,
  FilterX,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const CATEGORY_THEMES: Record<string, { activeBg: string; activeRing: string }> = {
  all: {
    activeBg: 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-600/20',
    activeRing: 'ring-indigo-500/30'
  },
  finance: {
    activeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/30',
    activeRing: 'ring-emerald-500/30'
  },
  developer: {
    activeBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/20 ring-2 ring-blue-600/20',
    activeRing: 'ring-blue-500/30'
  },
  designer: {
    activeBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/20 ring-2 ring-purple-600/20',
    activeRing: 'ring-purple-500/30'
  },
  security: {
    activeBg: 'bg-rose-600 text-white shadow-md shadow-rose-500/20 ring-2 ring-rose-600/20',
    activeRing: 'ring-rose-500/30'
  },
  data: {
    activeBg: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20 ring-2 ring-cyan-600/20',
    activeRing: 'ring-cyan-500/30'
  },
  education: {
    activeBg: 'bg-amber-600 text-white shadow-md shadow-amber-500/20 ring-2 ring-amber-600/20',
    activeRing: 'ring-amber-500/30'
  }
};

export const ToolGrid: React.FC = () => {
  const {
    t,
    activeCategory,
    setActiveCategory,
    activeEducationSubCategory,
    setActiveEducationSubCategory,
    searchQuery,
    setSearchQuery,
    favorites,
    navigateTo
  } = useApp();

  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Filter tools based on search query, category, education sub-category, and favorites
  const filteredTools = useMemo(() => {
    return ToolRegistry.filterTools({
      category: activeCategory,
      educationSubCategory: activeEducationSubCategory,
      query: searchQuery,
      onlyFavorites,
      favorites
    });
  }, [searchQuery, activeCategory, activeEducationSubCategory, onlyFavorites, favorites]);

  // Dynamic count per category
  const getCategoryCount = (catId: ToolCategory) => {
    return ToolRegistry.getCategoryCount(catId);
  };

  return (
    <section id="tools-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Category Pills and Filter Controls */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Horizontal scrolling Main Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {TOOL_CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id && !onlyFavorites;
              const count = getCategoryCount(cat.id);
              const label = t[cat.labelKey as keyof typeof t] || cat.name;
              const themeStyle = CATEGORY_THEMES[cat.id] || CATEGORY_THEMES.all;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOnlyFavorites(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? themeStyle.activeBg
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60'
                  }`}
                >
                  <IconRenderer name={cat.icon} className="w-4 h-4" />
                  <span>{label}</span>
                  {cat.id === 'finance' && !isActive && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      ★
                    </span>
                  )}
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Favorites Filter Tab */}
            <button
              onClick={() => setOnlyFavorites(prev => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 ${
                onlyFavorites
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 ring-2 ring-rose-600/20'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-white' : 'text-rose-500'}`} />
              <span>{t.favorited || 'Saved'}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                  onlyFavorites
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                }`}
              >
                {favorites.length}
              </span>
            </button>
          </div>

          {/* Status Counter */}
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0 self-end lg:self-center">
            <span className="font-bold text-slate-900 dark:text-white">{filteredTools.length}</span> / {TOOLS_LIST.length}
          </div>
        </div>

        {/* Real Estate & Finance Spotlight Banner when Finance category is active */}
        {activeCategory === 'finance' && !onlyFavorites && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    {t.cat_finance}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-bold tracking-wide">
                    {t.realEstateBadge || 'FEATURED'}
                  </span>
                </div>
                <p className="text-xs text-emerald-800/80 dark:text-emerald-400 mt-0.5 max-w-xl">
                  {t.financeCategoryDesc || 'أدوات عقارية واستثمارية متكاملة: حاسبة الرهن العقاري، جدول الإهلاك لـ 30 عاماً، العائد الصافي (ROI & Cap Rate)، والمقارنة بين الشراء والاستئجار.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigateTo({ type: 'real-estate' })}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all shrink-0"
            >
              <span>{t.navRealEstate}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Education Sub-category Filters (Appears when Education category is active) */}
        {activeCategory === 'education' && !onlyFavorites && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-900 dark:text-amber-200">
                  {t.cat_education} • {activeEducationSubCategory === 'teachers' ? t.subcat_teachers : activeEducationSubCategory === 'students' ? t.subcat_students : t.subcat_all_edu}
                </div>
                <div className="text-[11px] text-amber-700/80 dark:text-amber-400">
                  {activeEducationSubCategory === 'teachers'
                    ? (t.teachersDesc || 'Tools designed for teachers: seating groups, test timing, grade-level reading, and quizzes.')
                    : activeEducationSubCategory === 'students'
                    ? (t.studentsDesc || 'Tools for students: GPA tracking, flashcards, Pomodoro study routines, and citations.')
                    : (t.eduPromoDesc || 'Interactive classroom tools & study utilities with 100% private browser execution.')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto shrink-0">
              {EDUCATION_SUBCATEGORIES.map(subCat => {
                const isSubActive = activeEducationSubCategory === subCat.id;
                const subCount = ToolRegistry.getEducationSubCategoryCount(subCat.id);
                const subLabel = t[subCat.labelKey as keyof typeof t] || subCat.label;

                return (
                  <button
                    key={subCat.id}
                    onClick={() => setActiveEducationSubCategory(subCat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isSubActive
                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                        : 'bg-white/80 dark:bg-slate-900/80 text-amber-900 dark:text-amber-200 hover:bg-white dark:hover:bg-slate-900 border border-amber-200 dark:border-amber-800/60'
                    }`}
                  >
                    {subCat.id === 'teachers' && <Users className="w-3.5 h-3.5" />}
                    {subCat.id === 'students' && <BookOpen className="w-3.5 h-3.5" />}
                    {subCat.id === 'all' && <GraduationCap className="w-3.5 h-3.5" />}
                    <span>{subLabel}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSubActive
                          ? 'bg-white/20 text-white'
                          : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                      }`}
                    >
                      {subCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Tools */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-8">
          {filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <FilterX className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {t.noToolsFound}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            {t.noToolsFoundDesc}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
              setActiveEducationSubCategory('all');
              setOnlyFavorites(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.clearFilter}</span>
          </button>
        </div>
      )}
    </section>
  );
};
