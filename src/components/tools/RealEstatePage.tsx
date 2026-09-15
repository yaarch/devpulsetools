import React from 'react';
import { useApp } from '../../context/AppContext';
import { RealEstateCalculator } from './RealEstateCalculator';
import {
  Building2,
  Home,
  TrendingUp,
  Percent,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ChevronRight,
  Calculator,
  DollarSign,
  PieChart,
  BadgeCheck,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';

export const RealEstatePage: React.FC = () => {
  const { navigateTo, isRtl, language } = useApp();

  const isArabic = language === 'ar';

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => navigateTo({ type: 'home' })}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ArrowLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            <span>{isArabic ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </button>

          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span
              onClick={() => navigateTo({ type: 'home' })}
              className="hover:underline cursor-pointer"
            >
              {isArabic ? 'الرئيسية' : 'Home'}
            </span>
            <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
            <span
              onClick={() => navigateTo({ type: 'tools' })}
              className="hover:underline cursor-pointer"
            >
              {isArabic ? 'الأدوات' : 'Tools'}
            </span>
            <ChevronRight className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} />
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {isArabic ? 'حاسبة العقارات والرهن العقاري' : 'Real Estate Hub'}
            </span>
          </nav>
        </div>

        {/* Hero Banner for Dedicated Page */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border border-emerald-800/40 shadow-xl shadow-emerald-950/20">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isArabic ? 'الأداة العقارية والمالية #1 في المنصة' : '#1 Featured Real Estate & Financial Hub'}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              {isArabic ? (
                <>
                  حاسبة العقارات والتمويل الشاملة{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    للمستثمرين والمشترين
                  </span>
                </>
              ) : (
                <>
                  Advanced Real Estate &amp; Mortgage{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Investment Hub
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {isArabic
                ? 'حسابات دقيقة وشاملة لجميع سيناريوهات التمويل العقاري، جدول إهلاك القرض لـ 30 عاماً، العائد على الاستثمار (ROI)، معدل الرسملة (Cap Rate)، والمقارنة الحسابية بين الإيجار والشراء بأعلى معايير الخصوصية.'
                : 'Accurate and comprehensive calculations for all mortgage scenarios, 30-year amortization tables, rental property cash-on-cash ROI, capitalization rates (Cap Rate), and rent vs. buy financial feasibility.'}
            </p>

            {/* Micro value props */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isArabic ? 'خصوصية 100% بدون خوادم' : '100% Client-Side Privacy'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{isArabic ? 'تحليل العائد الصافي والرسملة' : 'Cap Rate & Cash-on-Cash'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <PieChart className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isArabic ? 'جدول الإهلاك السنوي والشهري' : 'Full Amortization Table'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isArabic ? 'مجانية بالكامل بدون تسجيل' : 'No Account Required'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Calculator */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-4 sm:p-6 lg:p-8">
          <RealEstateCalculator />
        </div>

        {/* Real Estate Investor Knowledge Center / Educational Guide */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {isArabic ? 'دليل المستثمر العقاري والمصطلحات الرئيسية' : 'Real Estate Investor Financial Handbook'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isArabic ? 'معايير وقواعد ذهبية لاتخاذ أفضل قرار تمويلي أو استثماري' : 'Key rules and metrics used by seasoned property investors'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Guide Card 1 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isArabic ? 'معدل الرسملة (Cap Rate)' : 'Capitalization Rate (Cap Rate)'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isArabic
                  ? 'يُقاس بقسمة صافي الدخل التشغيلي السنوي (NOI) على سعر شراء العقار الإجمالي. يوضح العائد السنوي للعقار كأنه تم شراؤه نقداً بدون قروض. المعدلات الجيدة تتراوح عادة بين 5% و 9% بحسب السوق.'
                  : 'Calculated by dividing Net Operating Income (NOI) by the property purchase price. It reflects the unleveraged annual rate of return. A standard healthy Cap Rate usually ranges between 5% and 9% depending on location.'}
              </p>
            </div>

            {/* Guide Card 2 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isArabic ? 'العائد على النقد المستثمر (Cash-on-Cash)' : 'Cash-on-Cash Return'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isArabic
                  ? 'يقيس التدفق النقدي السنوي المتبقي بعد سداد أقساط القرض العقاري مقسوماً على الدفعة الأولى ومصاريف الإغلاق النقدية فقط. هذا المقياس هو الأكثر دقة لمعرفة كفاءة أموالك المستثمرة.'
                  : 'Calculates the annual pre-tax cash flow divided by the actual total cash invested (down payment + closing costs). It measures the direct return on the money you personally pulled out of your pocket.'}
              </p>
            </div>

            {/* Guide Card 3 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isArabic ? 'قاعدة 5% (الشراء مقابل الإيجار)' : 'The 5% Rule (Rent vs. Buy)'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isArabic
                  ? 'التكاليف غير القابلة للاسترداد لامتلاك منزل تعادل تقريباً 5% سنوياً من قيمة العقار (1% صيانة + 1% ضرائب عقارية + 3% تكلفة رأس المال). إذا كان الإيجار السنوي أقل من 5% من سعر المنزل، فالاستئجار اقتصادياً أفضل.'
                  : 'Unrecoverable homeownership costs equal roughly 5% of property value annually (1% maintenance + 1% property tax + 3% capital cost). If equivalent annual rent is less than 5% of the purchase price, renting is often financially advantageous.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
