import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Cake, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  Heart,
  Hourglass
} from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const { addToast } = useApp();

  // Default to a date 25 years ago
  const defaultBirthDate = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 25);
    return d.toISOString().split('T')[0];
  }, []);

  const [birthDateStr, setBirthDateStr] = useState<string>(defaultBirthDate);
  const [targetDateStr, setTargetDateStr] = useState<string>(new Date().toISOString().split('T')[0]);
  const [copied, setCopied] = useState<boolean>(false);

  const ageData = useMemo(() => {
    if (!birthDateStr) return null;
    const birth = new Date(birthDateStr + 'T00:00:00');
    const target = new Date(targetDateStr + 'T00:00:00');

    if (isNaN(birth.getTime()) || isNaN(target.getTime()) || birth > target) {
      return null;
    }

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Days in previous month of target
      const prevMonthLastDay = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Totals
    const diffMs = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next Birthday countdown
    let nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBdayDayOfWeek = daysOfWeek[nextBday.getDay()];

    return {
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      nextBdayDayOfWeek
    };
  }, [birthDateStr, targetDateStr]);

  const handleCopy = () => {
    if (!ageData) return;
    const text = `Age: ${ageData.years} years, ${ageData.months} months, ${ageData.days} days (${ageData.totalDays.toLocaleString()} days total).`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', text, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Date Pickers Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cake className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Chronological Age Calculator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Calculate your exact age in years, months, weeks, days, and hours down to the calendar day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDateStr}
              onChange={e => setBirthDateStr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Age on Date (Default: Today)
            </label>
            <input
              type="date"
              value={targetDateStr}
              onChange={e => setTargetDateStr(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {ageData ? (
        <>
          {/* Main Age Hero */}
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/30 rounded-2xl border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
                Exact Chronological Age
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                {ageData.years} <span className="text-lg font-semibold text-slate-500">years</span> {ageData.months} <span className="text-lg font-semibold text-slate-500">months</span> {ageData.days} <span className="text-lg font-semibold text-slate-500">days</span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all self-start sm:self-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Age'}</span>
            </button>
          </div>

          {/* Next Birthday & Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Next Birthday */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Next Birthday</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {ageData.daysUntilBirthday === 0 ? 'Today! 🎉' : `in ${ageData.daysUntilBirthday} days`}
                </span>
                <span className="text-[11px] text-slate-500 block">on a {ageData.nextBdayDayOfWeek}</span>
              </div>
            </div>

            {/* Total Days */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Total Days Lived</span>
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                  {ageData.totalDays.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block">~{ageData.totalWeeks.toLocaleString()} weeks</span>
              </div>
            </div>

            {/* Total Hours */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">Total Hours</span>
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                  {ageData.totalHours.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 block">{ageData.totalMinutes.toLocaleString()} minutes</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          Please select a valid date of birth earlier than the target date.
        </div>
      )}
    </div>
  );
};
