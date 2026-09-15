import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Flame,
  Activity,
  Heart,
  Scale,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  TrendingDown,
  TrendingUp,
  Target
} from 'lucide-react';

type Gender = 'male' | 'female';
type UnitSystem = 'metric' | 'imperial';
type Goal = 'maintain' | 'mild_loss' | 'weight_loss' | 'extreme_loss' | 'mild_gain' | 'weight_gain';

interface ActivityLevel {
  id: string;
  multiplier: number;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
}

const ACTIVITY_LEVELS: ActivityLevel[] = [
  {
    id: 'sedentary',
    multiplier: 1.2,
    labelEn: 'Sedentary',
    labelAr: 'خامل / قليل الحركة',
    descEn: 'Desk job, little to no regular exercise',
    descAr: 'عمل مكتبي وقليل الحركة بدون تمارين'
  },
  {
    id: 'light',
    multiplier: 1.375,
    labelEn: 'Lightly Active',
    labelAr: 'نشاط خفيف',
    descEn: 'Light exercise or sports 1-3 days/week',
    descAr: 'تمارين خفيفة من ١ إلى ٣ أيام أسبوعياً'
  },
  {
    id: 'moderate',
    multiplier: 1.55,
    labelEn: 'Moderately Active',
    labelAr: 'نشاط متوسط',
    descEn: 'Moderate exercise 3-5 days/week',
    descAr: 'تمارين رياضية معتدلة من ٣ إلى ٥ أيام أسبوعياً'
  },
  {
    id: 'heavy',
    multiplier: 1.725,
    labelEn: 'Very Active',
    labelAr: 'نشاط عالي',
    descEn: 'Hard exercise 6-7 days/week',
    descAr: 'تمارين مكثفة شاقة من ٦ إلى ٧ أيام أسبوعياً'
  },
  {
    id: 'athlete',
    multiplier: 1.9,
    labelEn: 'Athlete / Physical Job',
    labelAr: 'رياضي محترف / عمل بدني شاق',
    descEn: 'Very heavy physical training twice a day',
    descAr: 'تدريب احترافي مرتين يومياً أو عمل بدني شاق'
  }
];

export const CalorieMacroCalculator: React.FC = () => {
  const { language, addToast } = useApp();
  const isAr = language === 'ar';

  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(28);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [heightCm, setHeightCm] = useState<number>(178);
  const [weightLbs, setWeightLbs] = useState<number>(165);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(10);
  const [activityId, setActivityId] = useState<string>('moderate');
  const [goal, setGoal] = useState<Goal>('weight_loss');
  const [copied, setCopied] = useState<boolean>(false);

  // Conversion calculations
  const actualWeightKg = unitSystem === 'metric' ? weightKg : weightLbs * 0.45359237;
  const actualHeightCm = unitSystem === 'metric' ? heightCm : heightFeet * 30.48 + heightInches * 2.54;

  const calculation = useMemo(() => {
    // 1. Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation (Golden Standard)
    let bmr = 10 * actualWeightKg + 6.25 * actualHeightCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // 2. Total Daily Energy Expenditure (TDEE)
    const currentActivity = ACTIVITY_LEVELS.find((a) => a.id === activityId) || ACTIVITY_LEVELS[2];
    const tdee = bmr * currentActivity.multiplier;

    // 3. Goal Calorie Target
    let targetCalories = tdee;
    if (goal === 'mild_loss') targetCalories = tdee - 250; // ~0.25 kg/week
    if (goal === 'weight_loss') targetCalories = tdee - 500; // ~0.5 kg/week
    if (goal === 'extreme_loss') targetCalories = tdee - 1000; // ~1.0 kg/week
    if (goal === 'mild_gain') targetCalories = tdee + 250; // ~0.25 kg/week
    if (goal === 'weight_gain') targetCalories = tdee + 500; // ~0.5 kg/week

    // Safety floor
    targetCalories = Math.max(gender === 'male' ? 1400 : 1200, targetCalories);

    // 4. Macro Nutrients Calculation (Moderate Carbs / High Protein Split: 30% Protein, 40% Carbs, 30% Fats)
    // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
    const proteinGrams = Math.round((targetCalories * 0.30) / 4);
    const carbsGrams = Math.round((targetCalories * 0.40) / 4);
    const fatGrams = Math.round((targetCalories * 0.30) / 9);

    // Alternative: Low-Carb / Keto split (30% Protein, 10% Carbs, 60% Fat)
    const ketoProtein = Math.round((targetCalories * 0.30) / 4);
    const ketoCarbs = Math.round((targetCalories * 0.10) / 4);
    const ketoFat = Math.round((targetCalories * 0.60) / 9);

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      proteinGrams,
      carbsGrams,
      fatGrams,
      ketoProtein,
      ketoCarbs,
      ketoFat
    };
  }, [actualWeightKg, actualHeightCm, age, gender, activityId, goal]);

  const handleCopy = () => {
    const text = isAr
      ? `تقرير السعرات والماكروز اليومي:\n- معدل الأيض الأساسي (BMR): ${calculation.bmr} سعرة\n- الاحتياج اليومي للثبات (TDEE): ${calculation.tdee} سعرة\n- السعرات المستهدفة لهدفك: ${calculation.targetCalories} سعرة/يوم\n- توزيع الماكروز المتوازن:\n  • بروتين: ${calculation.proteinGrams} جرام\n  • كربوهيدرات: ${calculation.carbsGrams} جرام\n  • دهون صحية: ${calculation.fatGrams} جرام\nتم الحساب بواسطة DevPulse Utilities.`
      : `Daily Calorie & Macro Target Report:\n- Basal Metabolic Rate (BMR): ${calculation.bmr} kcal/day\n- Maintenance TDEE: ${calculation.tdee} kcal/day\n- Target Calorie Goal: ${calculation.targetCalories} kcal/day\n- Recommended Macro Breakdown:\n  • Protein: ${calculation.proteinGrams}g\n  • Carbohydrates: ${calculation.carbsGrams}g\n  • Healthy Fats: ${calculation.fatGrams}g\nCalculated with DevPulse Utilities.`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast(isAr ? 'تم النسخ!' : 'Copied!', isAr ? 'تم نسخ تقرير السعرات والماكروز' : 'Calorie report copied to clipboard', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => {
    setAge(28);
    setWeightKg(75);
    setHeightCm(178);
    setGender('male');
    setActivityId('moderate');
    setGoal('weight_loss');
  };

  return (
    <div className="space-y-8" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
      {/* Header Info Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'حسابات الصحة والتغذية الدقيقة' : 'Clinical Mifflin-St Jeor Algorithm'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black">
              {isAr ? 'حاسبة السعرات الحرارية والماكروز (TDEE)' : 'TDEE, Calorie & Macro Nutrition Calculator'}
            </h2>
            <p className="text-orange-100 text-xs md:text-sm max-w-2xl">
              {isAr
                ? 'احسب احتياجك اليومي من السعرات الحرارية بدقة علمية لتنزيل الوزن، تثبيته أو بناء العضلات مع تقسيم البروتين والكاربوهيدرات والدهون.'
                : 'Calculate your exact Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and tailored macronutrient splits for your fitness goals.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white text-orange-800 hover:bg-orange-50 transition shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ التقرير' : 'Copy Report')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Inputs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              {isAr ? 'بيانات الجسم والنشاط' : 'Body Metrics & Activity'}
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

          {/* Unit System & Gender Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'نظام القياس' : 'Unit System'}
              </label>
              <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    unitSystem === 'metric'
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  {isAr ? 'متري (كجم/سم)' : 'Metric (kg/cm)'}
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    unitSystem === 'imperial'
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  {isAr ? 'أمريكي (رطل/قدم)' : 'Imperial (lbs/ft)'}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                {isAr ? 'الجنس البيولوجي' : 'Gender'}
              </label>
              <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    gender === 'male'
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  {isAr ? 'ذكر' : 'Male'}
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                    gender === 'female'
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-xs'
                      : 'text-slate-500'
                  }`}
                >
                  {isAr ? 'أنثى' : 'Female'}
                </button>
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'العمر (بالسنوات)' : 'Age (Years)'}</label>
              <span className="text-orange-600 font-bold">{age} {isAr ? 'سنة' : 'yrs'}</span>
            </div>
            <input
              type="number"
              min="10"
              max="110"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'الوزن الحالي' : 'Current Weight'}</label>
              <span className="text-orange-600 font-bold">
                {unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
              </span>
            </div>
            {unitSystem === 'metric' ? (
              <input
                type="number"
                min="30"
                max="300"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <input
                type="number"
                min="60"
                max="650"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-orange-500"
              />
            )}
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <label>{isAr ? 'الطول' : 'Height'}</label>
              <span className="text-orange-600 font-bold">
                {unitSystem === 'metric' ? `${heightCm} cm` : `${heightFeet}ft ${heightInches}in`}
              </span>
            </div>
            {unitSystem === 'metric' ? (
              <input
                type="number"
                min="90"
                max="240"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-orange-500"
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="3"
                  max="8"
                  placeholder="Feet"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold"
                />
                <input
                  type="number"
                  min="0"
                  max="11"
                  placeholder="Inches"
                  value={heightInches}
                  onChange={(e) => setHeightInches(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold"
                />
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {isAr ? 'مستوى النشاط اليومي والتمارين' : 'Daily Physical Activity Level'}
            </label>
            <select
              value={activityId}
              onChange={(e) => setActivityId(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            >
              {ACTIVITY_LEVELS.map((a) => (
                <option key={a.id} value={a.id}>
                  {isAr ? `${a.labelAr} - ${a.descAr}` : `${a.labelEn} (${a.descEn})`}
                </option>
              ))}
            </select>
          </div>

          {/* Fitness Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              {isAr ? 'الهدف المطلوب' : 'Your Primary Fitness Goal'}
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as Goal)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-orange-500"
            >
              <option value="maintain">{isAr ? 'تثبيت الوزن الحالي (Maintain)' : 'Maintain Current Weight'}</option>
              <option value="mild_loss">{isAr ? 'نزول وزن بطيء وصحي (-0.25 كجم/أسبوع)' : 'Mild Weight Loss (-0.5 lb / -0.25 kg / week)'}</option>
              <option value="weight_loss">{isAr ? 'نزول وزن مثالي (-0.5 كجم/أسبوع)' : 'Standard Weight Loss (-1.0 lb / -0.5 kg / week)'}</option>
              <option value="extreme_loss">{isAr ? 'نزول وزن مكثف وسريع (-1 كجم/أسبوع)' : 'Extreme Weight Loss (-2.0 lbs / -1.0 kg / week)'}</option>
              <option value="mild_gain">{isAr ? 'زيادة وزن بطيئة ونظيفة (+0.25 كجم/أسبوع)' : 'Mild Weight Gain / Lean Bulk (+0.5 lb/week)'}</option>
              <option value="weight_gain">{isAr ? 'زيادة وزن وبناء عضل (+0.5 كجم/أسبوع)' : 'Weight Gain / Bulk (+1.0 lb/week)'}</option>
            </select>
          </div>
        </div>

        {/* Right Output: Results & Nutrition Macro Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Calorie Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/80">
              <span className="text-xs font-bold text-orange-700 dark:text-orange-300 block uppercase tracking-wider">
                {isAr ? 'السعرات المستهدفة لهدفك' : 'Target Daily Calories'}
              </span>
              <span className="text-3xl font-black text-orange-900 dark:text-orange-100 mt-1 block">
                {calculation.targetCalories.toLocaleString()}
              </span>
              <span className="text-[11px] font-semibold text-orange-700 dark:text-orange-300 mt-1 block">
                {isAr ? 'سعرة حرارية / اليوم' : 'Calories (kcal) / day'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
                {isAr ? 'سعرات الثبات (TDEE)' : 'Maintenance (TDEE)'}
              </span>
              <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
                {calculation.tdee.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {isAr ? 'للبقاء على نفس الوزن' : 'To maintain exact weight'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 block uppercase tracking-wider">
                {isAr ? 'معدل الأيض الأساسي (BMR)' : 'Base Metabolism (BMR)'}
              </span>
              <span className="text-2xl font-bold text-amber-900 dark:text-amber-100 mt-1 block">
                {calculation.bmr.toLocaleString()}
              </span>
              <span className="text-[11px] text-amber-700 dark:text-amber-300 mt-1 block">
                {isAr ? 'أثناء الراحة والنوم' : 'Calories burned at pure rest'}
              </span>
            </div>
          </div>

          {/* Balanced Macro Split Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                {isAr ? 'التوزيع الغذائي الموصى به (الماكروز اليومي)' : 'Balanced Macro Split (30% Protein / 40% Carbs / 30% Fat)'}
              </h4>
              <span className="text-xs text-slate-500">{isAr ? 'لكل وجبات اليوم' : 'Daily Targets'}</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {/* Protein */}
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
                <span className="text-xs font-bold text-red-700 dark:text-red-300 uppercase block">
                  {isAr ? 'البروتين' : 'Protein'}
                </span>
                <span className="text-2xl font-black text-red-900 dark:text-red-100 mt-1 block">
                  {calculation.proteinGrams}g
                </span>
                <span className="text-[11px] text-red-600 dark:text-red-400">
                  {Math.round(calculation.proteinGrams * 4)} kcal (30%)
                </span>
              </div>

              {/* Carbs */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase block">
                  {isAr ? 'الكاربوهيدرات' : 'Carbs'}
                </span>
                <span className="text-2xl font-black text-amber-900 dark:text-amber-100 mt-1 block">
                  {calculation.carbsGrams}g
                </span>
                <span className="text-[11px] text-amber-600 dark:text-amber-400">
                  {Math.round(calculation.carbsGrams * 4)} kcal (40%)
                </span>
              </div>

              {/* Fats */}
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase block">
                  {isAr ? 'الدهون الصحية' : 'Fats'}
                </span>
                <span className="text-2xl font-black text-blue-900 dark:text-blue-100 mt-1 block">
                  {calculation.fatGrams}g
                </span>
                <span className="text-[11px] text-blue-600 dark:text-blue-400">
                  {Math.round(calculation.fatGrams * 9)} kcal (30%)
                </span>
              </div>
            </div>

            {/* Macro Visual Bar */}
            <div className="h-3.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
              <div style={{ width: '30%' }} className="bg-red-500 h-full" title="Protein 30%" />
              <div style={{ width: '40%' }} className="bg-amber-400 h-full" title="Carbs 40%" />
              <div style={{ width: '30%' }} className="bg-blue-500 h-full" title="Fats 30%" />
            </div>
          </div>

          {/* Alternative Keto / Low Carb Split */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">
              {isAr ? 'خيار بديل: نظام قليل الكاربوهيدرات أو كيتو (Low Carb / Keto Option)' : 'Alternative: Low-Carb / Ketogenic Split (30P / 10C / 60F)'}
            </h5>
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>{isAr ? 'بروتين' : 'Protein'}: <strong>{calculation.ketoProtein}g</strong></span>
              <span>{isAr ? 'كارب' : 'Carbs'}: <strong>{calculation.ketoCarbs}g</strong></span>
              <span>{isAr ? 'دهون' : 'Fats'}: <strong>{calculation.ketoFat}g</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Formula Note */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
          <Info className="w-4 h-4 text-orange-500" />
          <span>{isAr ? 'المعادلة الطبية المعتمدة (Mifflin-St Jeor Formula)' : 'Clinical Mifflin-St Jeor BMR Equation'}</span>
        </div>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
          {gender === 'male'
            ? 'BMR (Men) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5'
            : 'BMR (Women) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161'}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {isAr
            ? 'تعتبر معادلة Mifflin-St Jeor المعيار الذهبي الأكثر دقة المعترف به من قبل منظمة الصحة العالمية والجمعية الأمريكية للتغذية لتقدير معدل الحرق اليومي للأجسام بدقة تصل إلى ٩٥٪.'
            : 'The Mifflin-St Jeor equation is recognized as the most accurate standard for calculating resting metabolic rates in healthy adults without clinical body scans.'}
        </p>
      </div>
    </div>
  );
};
