import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Scale, 
  Heart, 
  Check, 
  Info 
} from 'lucide-react';

export const BmiCalculator: React.FC = () => {
  const { addToast } = useApp();

  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Metric
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');

  // Imperial
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('154');

  const bmiData = useMemo(() => {
    let heightMeters = 0;
    let weightInKg = 0;

    if (unit === 'metric') {
      const cm = parseFloat(heightCm) || 0;
      heightMeters = cm / 100;
      weightInKg = parseFloat(weightKg) || 0;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      heightMeters = totalInches * 0.0254;
      const lbs = parseFloat(weightLbs) || 0;
      weightInKg = lbs * 0.45359237;
    }

    if (heightMeters <= 0 || weightInKg <= 0) {
      return {
        bmi: 0,
        category: 'Enter measurements',
        color: 'text-slate-400',
        bg: 'bg-slate-100 dark:bg-slate-800',
        minHealthyWeightKg: 0,
        maxHealthyWeightKg: 0,
        meterPercent: 0
      };
    }

    const bmi = weightInKg / (heightMeters * heightMeters);
    const roundedBmi = Math.round(bmi * 10) / 10;

    // Healthy weight range (BMI 18.5 to 24.9)
    const minHealthyWeightKg = 18.5 * (heightMeters * heightMeters);
    const maxHealthyWeightKg = 24.9 * (heightMeters * heightMeters);

    let category = '';
    let color = '';
    let bg = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-600 dark:text-blue-400';
      bg = 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800';
    } else if (bmi < 25) {
      category = 'Healthy / Normal Weight';
      color = 'text-emerald-600 dark:text-emerald-400';
      bg = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-amber-600 dark:text-amber-400';
      bg = 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    } else {
      category = 'Obesity Range';
      color = 'text-rose-600 dark:text-rose-400';
      bg = 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
    }

    // Gauge meter percentage (clamped between 15 and 40 BMI)
    const meterPercent = Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100));

    return {
      bmi: roundedBmi,
      category,
      color,
      bg,
      minHealthyWeightKg: Math.round(minHealthyWeightKg * 10) / 10,
      maxHealthyWeightKg: Math.round(maxHealthyWeightKg * 10) / 10,
      meterPercent
    };
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Body Mass Index (BMI) Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate body mass index for adults according to the World Health Organization (WHO) benchmarks.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setUnit('metric')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'metric'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Metric (cm, kg)
            </button>
            <button
              type="button"
              onClick={() => setUnit('imperial')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                unit === 'imperial'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Imperial (ft, lbs)
            </button>
          </div>
        </div>

        {/* Inputs */}
        {unit === 'metric' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Height (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={50}
                  max={260}
                  value={heightCm}
                  onChange={e => setHeightCm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">cm</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Weight (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={20}
                  max={300}
                  value={weightKg}
                  onChange={e => setWeightKg(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">kg</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Height (Feet)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={8}
                  value={heightFt}
                  onChange={e => setHeightFt(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">ft</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Height (Inches)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={11}
                  value={heightIn}
                  onChange={e => setHeightIn(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">in</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Weight (Pounds)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={40}
                  max={700}
                  value={weightLbs}
                  onChange={e => setWeightLbs(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">lbs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Card */}
      <div className={`p-6 rounded-2xl border shadow-sm ${bmiData.bg} transition-all space-y-6`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Your Body Mass Index (BMI)
            </span>
            <div className="text-5xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
              {bmiData.bmi}
            </div>
          </div>

          <div className="sm:text-right">
            <span className={`text-lg font-extrabold ${bmiData.color} block`}>
              {bmiData.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              WHO Reference Classification
            </span>
          </div>
        </div>

        {/* Meter Gauge */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-500 relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 w-2 bg-slate-900 dark:bg-white rounded-full shadow-md -ml-1 transition-all duration-300"
              style={{ left: `${bmiData.meterPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>&lt;18.5 Under</span>
            <span>18.5 - 24.9 Normal</span>
            <span>25 - 29.9 Over</span>
            <span>30+ Obese</span>
          </div>
        </div>

        {/* Healthy Range Note */}
        {bmiData.minHealthyWeightKg > 0 && (
          <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <Heart className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Target healthy weight range for your height: <strong>{bmiData.minHealthyWeightKg} kg &ndash; {bmiData.maxHealthyWeightKg} kg</strong> (approx. {Math.round(bmiData.minHealthyWeightKg * 2.20462)} - {Math.round(bmiData.maxHealthyWeightKg * 2.20462)} lbs).
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
