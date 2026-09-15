import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowDownUp, Calculator, Copy } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'storage' | 'temperature' | 'speed';

export const UnitConverter: React.FC = () => {
  const { addToast } = useApp();
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromValue, setFromValue] = useState<number>(100);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  const unitData: Record<UnitCategory, { label: string; units: { id: string; name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[] }> = {
    length: {
      label: 'Length & Distance',
      units: [
        { id: 'm', name: 'Meters (m)', toBase: v => v, fromBase: v => v },
        { id: 'km', name: 'Kilometers (km)', toBase: v => v * 1000, fromBase: v => v / 1000 },
        { id: 'cm', name: 'Centimeters (cm)', toBase: v => v * 0.01, fromBase: v => v / 0.01 },
        { id: 'mm', name: 'Millimeters (mm)', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
        { id: 'mi', name: 'Miles (mi)', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
        { id: 'yd', name: 'Yards (yd)', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
        { id: 'ft', name: 'Feet (ft)', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
        { id: 'in', name: 'Inches (in)', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 }
      ]
    },
    weight: {
      label: 'Mass & Weight',
      units: [
        { id: 'kg', name: 'Kilograms (kg)', toBase: v => v, fromBase: v => v },
        { id: 'g', name: 'Grams (g)', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
        { id: 'mg', name: 'Milligrams (mg)', toBase: v => v * 0.000001, fromBase: v => v / 0.000001 },
        { id: 'lb', name: 'Pounds (lb)', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
        { id: 'oz', name: 'Ounces (oz)', toBase: v => v * 0.02834952, fromBase: v => v / 0.02834952 },
        { id: 't', name: 'Metric Tons (t)', toBase: v => v * 1000, fromBase: v => v / 1000 }
      ]
    },
    storage: {
      label: 'Digital Data Storage',
      units: [
        { id: 'B', name: 'Bytes (B)', toBase: v => v, fromBase: v => v },
        { id: 'KB', name: 'Kilobytes (KB)', toBase: v => v * 1024, fromBase: v => v / 1024 },
        { id: 'MB', name: 'Megabytes (MB)', toBase: v => v * 1024 * 1024, fromBase: v => v / (1024 * 1024) },
        { id: 'GB', name: 'Gigabytes (GB)', toBase: v => v * Math.pow(1024, 3), fromBase: v => v / Math.pow(1024, 3) },
        { id: 'TB', name: 'Terabytes (TB)', toBase: v => v * Math.pow(1024, 4), fromBase: v => v / Math.pow(1024, 4) }
      ]
    },
    temperature: {
      label: 'Temperature',
      units: [
        { id: 'C', name: 'Celsius (°C)', toBase: v => v, fromBase: v => v },
        { id: 'F', name: 'Fahrenheit (°F)', toBase: v => (v - 32) * (5 / 9), fromBase: v => (v * 9) / 5 + 32 },
        { id: 'K', name: 'Kelvin (K)', toBase: v => v - 273.15, fromBase: v => v + 273.15 }
      ]
    },
    speed: {
      label: 'Speed',
      units: [
        { id: 'kmh', name: 'Kilometers per hour (km/h)', toBase: v => v, fromBase: v => v },
        { id: 'mph', name: 'Miles per hour (mph)', toBase: v => v * 1.609344, fromBase: v => v / 1.609344 },
        { id: 'ms', name: 'Meters per second (m/s)', toBase: v => v * 3.6, fromBase: v => v / 3.6 },
        { id: 'knot', name: 'Knots (kn)', toBase: v => v * 1.852, fromBase: v => v / 1.852 }
      ]
    }
  };

  const currentCategory = unitData[category];
  const activeFrom = currentCategory.units.find(u => u.id === fromUnit) || currentCategory.units[0];
  const activeTo = currentCategory.units.find(u => u.id === toUnit) || currentCategory.units[1];

  const calculateResult = () => {
    if (isNaN(fromValue)) return 0;
    const base = activeFrom.toBase(fromValue);
    const result = activeTo.fromBase(base);
    return result;
  };

  const result = calculateResult();

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const units = unitData[cat].units;
    setFromUnit(units[0].id);
    setToUnit(units[1].id);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Category selector */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
        {(Object.keys(unitData) as UnitCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${
              category === cat
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main interactive converter card */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* From value & unit */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              From
            </label>
            <input
              type="number"
              value={fromValue}
              onChange={e => setFromValue(parseFloat(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold"
            />
            <select
              value={fromUnit}
              onChange={e => setFromUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {currentCategory.units.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-indigo-600 shadow-xs transition-transform hover:scale-110"
              title="Swap units"
            >
              <ArrowDownUp className="w-5 h-5" />
            </button>
          </div>

          {/* To value & unit */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              To
            </label>
            <div className="w-full px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 font-mono text-sm font-extrabold text-indigo-700 dark:text-indigo-300 truncate">
              {Number(result.toFixed(6))}
            </div>
            <select
              value={toUnit}
              onChange={e => setToUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {currentCategory.units.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Big Conversion Formula Statement */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center font-mono text-sm">
          <span className="font-bold text-slate-900 dark:text-white">{fromValue} {activeFrom.id}</span>
          <span className="text-slate-400 mx-2">=</span>
          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{Number(result.toFixed(6))} {activeTo.id}</span>
        </div>
      </div>
    </div>
  );
};
