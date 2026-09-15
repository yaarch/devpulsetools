import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users, ArrowRight, GraduationCap } from 'lucide-react';

export const EducationPromo: React.FC = () => {
  const { navigateTo, setActiveCategory, setActiveEducationSubCategory, t } = useApp();

  const handleSelectSubCategory = (sub: 'teachers' | 'students') => {
    setActiveCategory('education');
    setActiveEducationSubCategory(sub);
    navigateTo({ type: 'home' });
    const el = document.getElementById('tools-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-slate-200 dark:border-slate-800">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3 border border-amber-200 dark:border-amber-800/60">
          <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>{t.cat_education}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
          {t.eduPromoTitle || `${t.subcat_teachers} & ${t.subcat_students}`}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {t.eduPromoDesc}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Teacher Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <Users className="w-32 h-32 text-indigo-600" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span>👨‍🏫</span>
            <span>{t.subcat_teachers}</span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed max-w-sm">
            {t.teachersDesc}
          </p>
          <button
            type="button"
            onClick={() => handleSelectSubCategory('teachers')}
            className="inline-flex items-center gap-2 font-semibold text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
          >
            <span>{t.exploreAllTools} ({t.teachersBadge})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Student Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
            <BookOpen className="w-32 h-32 text-emerald-600" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <span>🎓</span>
            <span>{t.subcat_students}</span>
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed max-w-sm">
            {t.studentsDesc}
          </p>
          <button
            type="button"
            onClick={() => handleSelectSubCategory('students')}
            className="inline-flex items-center gap-2 font-semibold text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
          >
            <span>{t.exploreAllTools} ({t.studentsBadge})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
