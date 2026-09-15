import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  PlusCircle,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  PieChart as PieChartIcon,
  HelpCircle,
  Info
} from 'lucide-react';

interface FrequencyOption {
  value: number;
  labelEn: string;
  labelAr: string;
}

const FREQUENCIES: FrequencyOption[] = [
  { value: 1, labelEn: 'Annually (1/yr)', labelAr: 'سنوياً (مرة بالعام)' },
  { value: 2, labelEn: 'Semi-Annually (2/yr)', labelAr: 'نصف سنوي (مرتين بالعام)' },
  { value: 4, labelEn: 'Quarterly (4/yr)', labelAr: 'ربع سنوي (٤ مرات بالعام)' },
  { value: 12, labelEn: 'Monthly (12/yr)', labelAr: 'شهرياً (١٢ مرة بالعام)' },
  { value: 365, labelEn: 'Daily (365/yr)', labelAr: 'يومياً (٣٦٥ مرة بالعام)' }
];

export const CompoundInterestCalculator: React.FC = () => {
  const { language, addToast } = useApp();
  const isAr = language === 'ar';

  const [initialPrincipal, setInitialPrincipal] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(15);
  const [frequency, setFrequency] = useState<number>(12); // monthly
  const [periodicDeposit, setPeriodicDeposit] = useState<number>(500);
  const [depositFrequency, setDepositFrequency] = useState<number>(12); // monthly
  const [currencySymbol, setCurrencySymbol] = useState<string>('$');
  const [copied, setCopied] = useState<boolean>(false);

  // Calculation Engine
  const calculation = useMemo(() => {
    const P = Math.max(0, initialPrincipal);
    const r = Math.max(0, annualRate) / 100;
    const t = Math.max(1, Math.min(100, years));
    const n = frequency;
    const PMT = Math.max(0, periodicDeposit);
    const pmtPerYear = depositFrequency;

    const breakdown: Array<{
      year: number;
      deposits: number;
      interestEarnedYear: number;
      totalInterest: number;
      endBalance: number;
    }> = [];

    let currentBalance = P;
    let totalDeposits = P;
    let cumulativeInterest = 0;

    for (let yr = 1; yr <= t; yr++) {
      let balanceStartOfYear = currentBalance;
      let depositsThisYear = PMT * pmtPerYear;

      // Simulate month-by-month / sub-periods for accuracy
      for (let m = 1; m <= 12; m++) {
        // Add deposits if monthly
        if (pmtPerYear === 12) {
          currentBalance += PMT;
          totalDeposits += PMT;
        } else if (pmtPerYear === 1 && m === 1) {
          currentBalance += PMT;
          totalDeposits += PMT;
        }

        // Apply interest
        const monthlyRate = r / 12;
        currentBalance += currentBalance * monthlyRate;
      }

      const interestThisYear = currentBalance - balanceStartOfYear - depositsThisYear;
      cumulativeInterest += interestThisYear;

      breakdown.push({
        year: yr,
        deposits: totalDeposits,
        interestEarnedYear: Math.max(0, interestThisYear),
        totalInterest: Math.max(0, currentBalance - totalDeposits),
        endBalance: Math.max(0, currentBalance)
      });
    }

    const finalBalance = currentBalance;
    const totalPrincipalDeposited = totalDeposits;
    const totalInterestEarned = Math.max(0, finalBalance - totalPrincipalDeposited);
    const growthMultiplier = totalPrincipalDeposited > 0 ? (finalBalance / totalPrincipalDeposited).toFixed(2) : '1.00';

    return {
      finalBalance,
      totalPrincipalDeposited,
      totalInterestEarned,
      growthMultiplier,
      breakdown
    };
  }, [initialPrincipal, annualRate, years, frequency, periodicDeposit, depositFrequency]);

  const formatMoney = (val: number) => {
    return `${currencySymbol}${Math.round(val).toLocaleString('en-US')}`;
  };

  const handleCopySummary = () => {
    const text = isAr
      ? `تقرير الفائدة المركبة والنمو المالي:\n- المبلغ المبدئي: ${formatMoney(initialPrincipal)}\n- الإيداع الشهري: ${formatMoney(periodicDeposit)}\n- العائد السنوي: ${annualRate}%\n- المدة: ${years} سنة\n- إجمالي المدخرات والودائع: ${formatMoney(calculation.totalPrincipalDeposited)}\n- إجمالي الأرباح والفائدة المتراكمة: ${formatMoney(calculation.totalInterestEarned)}\n- الرصيد النهائي المتوقع: ${formatMoney(calculation.finalBalance)} (تضاعف ${calculation.growthMultiplier}x)\nتم الحساب بواسطة DevPulse Utilities.`
      : `Compound Interest Investment Summary:\n- Starting Principal: ${formatMoney(initialPrincipal)}\n- Regular Contribution: ${formatMoney(periodicDeposit)}/mo\n- Expected Annual Return: ${annualRate}%\n- Horizon: ${years} Years\n- Total Principal Contributed: ${formatMoney(calculation.totalPrincipalDeposited)}\n- Total Interest / Growth Earned: ${formatMoney(calculation.totalInterestEarned)}\n- Estimated Final Balance: ${formatMoney(calculation.finalBalance)} (${calculation.growthMultiplier}x Total Growth)\nCalculated with DevPulse Utilities.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast(isAr ? 'تم النسخ!' : 'Copied!', isAr ? 'تم نسخ التقرير المالي إلى الحافظة' : 'Financial summary copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setInitialPrincipal(10000);
    setAnnualRate(8.0);
    setYears(15);
    setPeriodicDeposit(500);
    setFrequency(12);
  };

  return (
    <div className="space-y-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Header Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حساب الثروة والنمو الاستثماري' : 'Wealth & Investment Growth Engine'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black">
              {isAr ? 'حاسبة الفائدة المركبة ونمو المدخرات' : 'Compound Interest & Investment Calculator'}
            </h2>
            <p className="text-emerald-100 text-xs md:text-sm max-w-2xl">
              {isAr
                ? 'اكتشف كيف تتضاعف أموالك مع الوقت بفضل قوة الفائدة المركبة وإعادة استثمار العوائد الدورية.'
                : 'Project the exponential growth of your wealth with compound interest, regular contributions, and annual equity returns.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              className="bg-white/20 text-white border border-white/30 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none"
            >
              <option value="$" className="text-slate-900">$ USD</option>
              <option value="ر.س" className="text-slate-900">ر.س SAR</option>
              <option value="د.إ" className="text-slate-900">د.إ AED</option>
              <option value="€" className="text-slate-900">€ EUR</option>
              <option value="£" className="text-slate-900">£ GBP</option>
              <option value="ج.م" className="text-slate-900">ج.م EGP</option>
            </select>
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ الملخص' : 'Copy Summary')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              {isAr ? 'مدخلات الخطة المالية' : 'Investment Parameters'}
            </h3>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              {isAr ? 'إعادة ضبط' : 'Reset'}
            </button>
          </div>

          {/* Initial Principal */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'المبلغ المبدئي (رأس المال الأولى)' : 'Initial Principal / Starting Balance'}</label>
              <span className="text-emerald-600 font-bold">{formatMoney(initialPrincipal)}</span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="500"
                value={initialPrincipal}
                onChange={(e) => setInitialPrincipal(Math.max(0, Number(e.target.value)))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Periodic Contribution */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'المساهمة الشهرية المضافة' : 'Monthly Contribution / Deposit'}</label>
              <span className="text-emerald-600 font-bold">{formatMoney(periodicDeposit)}/mo</span>
            </div>
            <input
              type="number"
              min="0"
              step="50"
              value={periodicDeposit}
              onChange={(e) => setPeriodicDeposit(Math.max(0, Number(e.target.value)))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Annual Interest / Return Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'معدل العائد السنوي المتوقع (%)' : 'Expected Annual Return Rate (%)'}</label>
              <span className="text-emerald-600 font-bold">{annualRate}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Conservative (4-6%)</span>
              <span>Index Funds (8-10%)</span>
              <span>Aggressive (12%+)</span>
            </div>
          </div>

          {/* Investment Time Horizon */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'المدة الزمنية للاستثمار (بالسنوات)' : 'Investment Horizon (Years)'}</label>
              <span className="text-emerald-600 font-bold">{years} {isAr ? 'سنة' : 'Years'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>5 {isAr ? 'سنوات' : 'yrs'}</span>
              <span>15 {isAr ? 'سنة' : 'yrs'}</span>
              <span>30 {isAr ? 'سنة' : 'yrs'}</span>
              <span>50 {isAr ? 'سنة' : 'yrs'}</span>
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {isAr ? 'تكرار حساب الفائدة والأرباح' : 'Compounding Frequency'}
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
            >
              {FREQUENCIES.map((f) => (
                <option key={f.value} value={f.value}>
                  {isAr ? f.labelAr : f.labelEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Output: Key Numbers & Visual Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Big Highlight Hero Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 block uppercase tracking-wider">
                {isAr ? 'الرصيد الإجمالي المتوقع' : 'Final Balance'}
              </span>
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-1 block">
                {formatMoney(calculation.finalBalance)}
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 mt-1 block">
                {calculation.growthMultiplier}x {isAr ? 'تضاعف رأس المال' : 'Initial Multiple'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                {isAr ? 'إجمالي المدخرات المودعة' : 'Total Principal In'}
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
                {formatMoney(calculation.totalPrincipalDeposited)}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {((calculation.totalPrincipalDeposited / calculation.finalBalance) * 100).toFixed(1)}% {isAr ? 'من الإجمالي' : 'of final'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-300 block uppercase tracking-wider">
                {isAr ? 'إجمالي الفائدة والأرباح' : 'Total Interest Earned'}
              </span>
              <span className="text-xl font-bold text-teal-900 dark:text-teal-100 mt-1 block">
                {formatMoney(calculation.totalInterestEarned)}
              </span>
              <span className="text-[11px] text-teal-700 dark:text-teal-300 mt-1 block">
                {((calculation.totalInterestEarned / calculation.finalBalance) * 100).toFixed(1)}% {isAr ? 'من الأرباح المتراكمة' : 'pure growth'}
              </span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{isAr ? 'توزيع الرصيد النهائي (المدخرات مقابل الأرباح)' : 'Balance Composition (Principal vs. Compound Growth)'}</span>
            </div>
            <div className="h-4 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
              <div
                style={{ width: `${(calculation.totalPrincipalDeposited / calculation.finalBalance) * 100}%` }}
                className="bg-slate-400 h-full transition-all duration-500"
                title="Total Principal"
              />
              <div
                style={{ width: `${(calculation.totalInterestEarned / calculation.finalBalance) * 100}%` }}
                className="bg-emerald-500 h-full transition-all duration-500"
                title="Compound Interest"
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                {isAr ? 'إجمالي المدفوعات' : 'Deposits'}: {formatMoney(calculation.totalPrincipalDeposited)}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                {isAr ? 'الأرباح المتراكمة' : 'Compound Growth'}: {formatMoney(calculation.totalInterestEarned)}
              </span>
            </div>
          </div>

          {/* Year-by-Year Growth Table */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                {isAr ? 'جدول نمو الثروة السنوي' : 'Year-by-Year Growth Milestones'}
              </h4>
              <span className="text-[11px] text-slate-500">
                {years} {isAr ? 'سنوات إجمالية' : 'Years Total'}
              </span>
            </div>
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-left rtl:text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold sticky top-0">
                  <tr>
                    <th className="px-4 py-2.5">{isAr ? 'السنة' : 'Year'}</th>
                    <th className="px-4 py-2.5">{isAr ? 'إجمالي الإيداعات' : 'Total In'}</th>
                    <th className="px-4 py-2.5">{isAr ? 'أرباح العام' : 'Year Growth'}</th>
                    <th className="px-4 py-2.5">{isAr ? 'الأرباح التراكمية' : 'Cumul. Growth'}</th>
                    <th className="px-4 py-2.5 text-right rtl:text-left">{isAr ? 'الرصيد النهائي' : 'End Balance'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {calculation.breakdown.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="px-4 py-2 font-bold text-slate-900 dark:text-white">{isAr ? `سنة ${row.year}` : `Yr ${row.year}`}</td>
                      <td className="px-4 py-2">{formatMoney(row.deposits)}</td>
                      <td className="px-4 py-2 text-emerald-600 dark:text-emerald-400">+{formatMoney(row.interestEarnedYear)}</td>
                      <td className="px-4 py-2">{formatMoney(row.totalInterest)}</td>
                      <td className="px-4 py-2 font-bold text-slate-900 dark:text-white text-right rtl:text-left">
                        {formatMoney(row.endBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Mathematical Formula Section (SEO & Step-by-Step Clarity) */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <Info className="w-4 h-4 text-emerald-600" />
          <span>{isAr ? 'المعادلة الرياضية وطريقة الحساب (Formula Breakdown)' : 'The Compound Interest Formula & Math'}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
          A = P(1 + r/n)^(nt) + PMT × [ ((1 + r/n)^(nt) - 1) / (r/n) ]
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {isAr
            ? 'حيث A هي الرصيد النهائي المتراكم، P رأس المال المبدئي، r معدل الفائدة السنوي، n عدد مرات حساب الفائدة في العام الواحد، t عدد السنوات، و PMT مبلغ المساهمة الدورية المنتظمة.'
            : 'Where A is the future value of the investment, P is the initial principal balance, r is the annual nominal interest rate, n is the compounding frequency per year, t is the number of years, and PMT is the regular monthly contribution.'}
        </p>
      </div>
    </div>
  );
};
