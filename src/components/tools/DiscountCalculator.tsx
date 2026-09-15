import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Tag, 
  Copy, 
  Check, 
  DollarSign, 
  Percent, 
  ShoppingBag, 
  Sparkles, 
  Receipt 
} from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const { addToast } = useApp();

  const [currency, setCurrency] = useState<string>('$');
  const [originalPrice, setOriginalPrice] = useState<string>('120');
  const [discountPercent, setDiscountPercent] = useState<string>('25');
  const [additionalDiscount, setAdditionalDiscount] = useState<string>('10');
  const [taxPercent, setTaxPercent] = useState<string>('8');
  const [copied, setCopied] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const price = parseFloat(originalPrice) || 0;
    const disc1 = Math.min(100, Math.max(0, parseFloat(discountPercent) || 0));
    const disc2 = Math.min(100, Math.max(0, parseFloat(additionalDiscount) || 0));
    const tax = Math.max(0, parseFloat(taxPercent) || 0);

    // Primary discount
    const amountOff1 = price * (disc1 / 100);
    const priceAfter1 = price - amountOff1;

    // Additional stacked discount
    const amountOff2 = priceAfter1 * (disc2 / 100);
    const priceAfterDiscounts = priceAfter1 - amountOff2;

    const totalSavings = amountOff1 + amountOff2;
    const effectiveDiscountPercent = price > 0 ? (totalSavings / price) * 100 : 0;

    // Tax
    const taxAmount = priceAfterDiscounts * (tax / 100);
    const finalTotalWithTax = priceAfterDiscounts + taxAmount;

    return {
      price,
      amountOff1,
      amountOff2,
      priceAfterDiscounts,
      totalSavings,
      effectiveDiscountPercent: Math.round(effectiveDiscountPercent * 10) / 10,
      taxAmount,
      finalTotalWithTax: Math.round(finalTotalWithTax * 100) / 100
    };
  }, [originalPrice, discountPercent, additionalDiscount, taxPercent]);

  const handleCopy = () => {
    const summary = `Original: ${currency}${calculations.price} | Discount: ${calculations.effectiveDiscountPercent}% | You Pay: ${currency}${calculations.finalTotalWithTax} (Saved ${currency}${calculations.totalSavings.toFixed(2)})`;
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      addToast('Copied summary!', summary, 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Sale &amp; Discount Calculator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate final sale prices with stackable coupons, clearance discounts, and regional sales tax.
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {['$', '€', '£', '¥', 'SAR'].map(sym => (
              <button
                key={sym}
                type="button"
                onClick={() => setCurrency(sym)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                  currency === sym
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Original Price */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Original Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold text-sm">{currency}</span>
              <input
                type="number"
                min={0}
                step="any"
                value={originalPrice}
                onChange={e => setOriginalPrice(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Discount % */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Discount Off (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                value={discountPercent}
                onChange={e => setDiscountPercent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
              />
              <span className="absolute right-3 top-2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          {/* Additional Discount (Stacked Coupon) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Extra Coupon (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                value={additionalDiscount}
                onChange={e => setAdditionalDiscount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
              />
              <span className="absolute right-3 top-2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          {/* Sales Tax % */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Sales Tax (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                value={taxPercent}
                onChange={e => setTaxPercent(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-bold font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
              />
              <span className="absolute right-3 top-2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Quick Discount Presets */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Quick Discount:</span>
          {[10, 15, 20, 25, 30, 40, 50, 70].map(pct => (
            <button
              key={pct}
              type="button"
              onClick={() => setDiscountPercent(pct.toString())}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                discountPercent === pct.toString()
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {pct}% off
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Final Price */}
        <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 md:col-span-2 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block">
                Final Total (With Tax)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-950 dark:text-emerald-200 font-mono tracking-tight mt-1">
                {currency}{calculations.finalTotalWithTax.toFixed(2)}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/80 dark:border-emerald-800/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Before Tax</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {currency}{calculations.priceAfterDiscounts.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Estimated Tax ({taxPercent}%)</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                +{currency}{calculations.taxAmount.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Total Savings</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currency}{calculations.totalSavings.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Savings Badge Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
            <Percent className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Effective Total Off
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {calculations.effectiveDiscountPercent}%
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            You save {currency}{calculations.totalSavings.toFixed(2)} off original price
          </p>
        </div>
      </div>
    </div>
  );
};
