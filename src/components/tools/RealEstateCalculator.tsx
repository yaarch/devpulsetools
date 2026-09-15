import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Home,
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
  PieChart,
  Table as TableIcon,
  Copy,
  Check,
  Download,
  Info,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Share2,
  Printer
} from 'lucide-react';
import {
  exportMortgagePdfReport,
  exportInvestmentPdfReport,
  exportRentVsBuyPdfReport
} from '../../services/realEstatePdfGenerator';

type Currency = {
  code: string;
  symbol: string;
  name: string;
};

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal (ر.س)' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham (د.إ)' },
  { code: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound (ج.م)' },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar (د.ك)' },
  { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal (ر.ق)' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CA$)' }
];

export const RealEstateCalculator: React.FC = () => {
  const { addToast, language } = useApp();
  const isArabic = language === 'ar';

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'mortgage' | 'investment' | 'rent-vs-buy'>('mortgage');

  // Currency
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(CURRENCIES[0]);

  // MORTGAGE STATE
  const [propertyPrice, setPropertyPrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2); // % per year
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1200);
  const [hoaMonthly, setHoaMonthly] = useState<number>(150);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [amortizationFilter, setAmortizationFilter] = useState<'5yr' | 'all'>('5yr');

  // INVESTMENT STATE
  const [purchasePrice, setPurchasePrice] = useState<number>(350000);
  const [initialClosingRenovation, setInitialClosingRenovation] = useState<number>(15000);
  const [investmentDownPaymentPct, setInvestmentDownPaymentPct] = useState<number>(25);
  const [investmentInterestRate, setInvestmentInterestRate] = useState<number>(6.8);
  const [monthlyRentExpected, setMonthlyRentExpected] = useState<number>(2800);
  const [vacancyRate, setVacancyRate] = useState<number>(5); // %
  const [mgmtFeePercent, setMgmtFeePercent] = useState<number>(8); // % of collected rent
  const [maintenanceReservePct, setMaintenanceReservePct] = useState<number>(6); // % of rent
  const [invAnnualTaxes, setInvAnnualTaxes] = useState<number>(3600);
  const [invAnnualInsurance, setInvAnnualInsurance] = useState<number>(1400);

  // RENT VS BUY STATE
  const [rvbHomePrice, setRvbHomePrice] = useState<number>(450000);
  const [rvbMonthlyRent, setRvbMonthlyRent] = useState<number>(2200);
  const [rvbTimeHorizonYears, setRvbTimeHorizonYears] = useState<number>(7);
  const [rvbAppreciationRate, setRvbAppreciationRate] = useState<number>(3.5); // % annual home value growth
  const [rvbInvestmentReturnRate, setRvbInvestmentReturnRate] = useState<number>(7.0); // % stock market return for renter
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState<boolean>(false);

  // Hydrate state from URL search parameters or hash query on mount
  useEffect(() => {
    try {
      const searchStr = window.location.search || window.location.hash.split('?')[1] || '';
      if (!searchStr) return;
      const params = new URLSearchParams(searchStr);

      const tabParam = params.get('tab');
      if (tabParam === 'mortgage' || tabParam === 'investment' || tabParam === 'rent-vs-buy') {
        setActiveTab(tabParam);
      }

      const currParam = params.get('currency');
      if (currParam) {
        const found = CURRENCIES.find(c => c.code.toLowerCase() === currParam.toLowerCase());
        if (found) setSelectedCurrency(found);
      }

      // Mortgage params
      if (params.has('price')) setPropertyPrice(Number(params.get('price')) || 400000);
      if (params.has('down')) setDownPaymentPercent(Number(params.get('down')) || 20);
      if (params.has('rate')) setInterestRate(Number(params.get('rate')) || 6.5);
      if (params.has('years')) setLoanTermYears(Number(params.get('years')) || 30);
      if (params.has('tax')) setPropertyTaxRate(Number(params.get('tax')) || 1.2);
      if (params.has('ins')) setHomeInsuranceAnnual(Number(params.get('ins')) || 1200);
      if (params.has('hoa')) setHoaMonthly(Number(params.get('hoa')) || 150);

      // Investment params
      if (params.has('invPrice')) setPurchasePrice(Number(params.get('invPrice')) || 350000);
      if (params.has('rent')) setMonthlyRentExpected(Number(params.get('rent')) || 2800);
      if (params.has('vacancy')) setVacancyRate(Number(params.get('vacancy')) || 5);
      if (params.has('mgmt')) setMgmtFeePercent(Number(params.get('mgmt')) || 8);
      if (params.has('maint')) setMaintenanceReservePct(Number(params.get('maint')) || 6);

      // Rent vs Buy params
      if (params.has('rvbPrice')) setRvbHomePrice(Number(params.get('rvbPrice')) || 450000);
      if (params.has('rvbRent')) setRvbMonthlyRent(Number(params.get('rvbRent')) || 2200);
      if (params.has('horizon')) setRvbTimeHorizonYears(Number(params.get('horizon')) || 7);
    } catch {
      // Safe fallback if URL search parsing fails
    }
  }, []);

  // Currency Formatter
  const formatMoney = (amount: number, compact: boolean = false) => {
    if (isNaN(amount)) return `${selectedCurrency.symbol} 0`;
    if (compact && Math.abs(amount) >= 1000000) {
      return `${selectedCurrency.symbol} ${(amount / 1000000).toFixed(2)}M`;
    }
    return `${selectedCurrency.symbol} ${Math.round(amount).toLocaleString('en-US')}`;
  };

  // --- 1. MORTGAGE CALCULATIONS ---
  const mortgageData = useMemo(() => {
    const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
    const principal = Math.max(0, propertyPrice - downPaymentAmount);

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalMonths = loanTermYears * 12;

    let monthlyPI = 0;
    if (monthlyInterestRate > 0 && totalMonths > 0) {
      monthlyPI =
        (principal *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths))) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
    } else if (totalMonths > 0) {
      monthlyPI = principal / totalMonths;
    }

    const monthlyTax = (propertyPrice * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsuranceAnnual / 12;
    const totalMonthlyPayment = monthlyPI + monthlyTax + monthlyInsurance + hoaMonthly;

    const totalPaidOverLoan = monthlyPI * totalMonths;
    const totalInterestPaid = Math.max(0, totalPaidOverLoan - principal);

    // Amortization Schedule (Year by Year)
    const schedule: Array<{
      year: number;
      principalPaid: number;
      interestPaid: number;
      totalInterestToDate: number;
      remainingBalance: number;
      equity: number;
    }> = [];

    let balance = principal;
    let accumulatedInterest = 0;

    for (let year = 1; year <= loanTermYears; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break;
        const interestForMonth = balance * monthlyInterestRate;
        const principalForMonth = Math.min(balance, monthlyPI - interestForMonth);

        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
      }

      accumulatedInterest += yearlyInterest;
      const equity = propertyPrice - balance;

      schedule.push({
        year,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        totalInterestToDate: Math.round(accumulatedInterest),
        remainingBalance: Math.max(0, Math.round(balance)),
        equity: Math.round(equity)
      });
    }

    return {
      downPaymentAmount,
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      hoaMonthly,
      totalMonthlyPayment,
      totalPaidOverLoan,
      totalInterestPaid,
      schedule
    };
  }, [propertyPrice, downPaymentPercent, loanTermYears, interestRate, propertyTaxRate, homeInsuranceAnnual, hoaMonthly]);

  // --- 2. INVESTMENT & ROI CALCULATIONS ---
  const investmentData = useMemo(() => {
    const downPayment = (purchasePrice * investmentDownPaymentPct) / 100;
    const totalInitialCash = downPayment + initialClosingRenovation;
    const loanAmount = Math.max(0, purchasePrice - downPayment);

    // Monthly debt service
    const monthlyRate = investmentInterestRate / 100 / 12;
    const totalMonths = 30 * 12;
    let monthlyMortgage = 0;
    if (monthlyRate > 0 && loanAmount > 0) {
      monthlyMortgage =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Revenue
    const grossAnnualRent = monthlyRentExpected * 12;
    const effectiveGrossIncome = grossAnnualRent * (1 - vacancyRate / 100);

    // Expenses
    const annualMgmt = effectiveGrossIncome * (mgmtFeePercent / 100);
    const annualMaintenance = effectiveGrossIncome * (maintenanceReservePct / 100);
    const totalOperatingExpenses =
      annualMgmt + annualMaintenance + invAnnualTaxes + invAnnualInsurance;

    // Net Operating Income (NOI) before debt service
    const netOperatingIncome = effectiveGrossIncome - totalOperatingExpenses;

    // Annual Debt Service
    const annualDebtService = monthlyMortgage * 12;

    // Cash Flow
    const annualNetCashFlow = netOperatingIncome - annualDebtService;
    const monthlyNetCashFlow = annualNetCashFlow / 12;

    // Key Real Estate Financial Metrics
    const grossYield = purchasePrice > 0 ? (grossAnnualRent / purchasePrice) * 100 : 0;
    const netYield = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;
    const capRate = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;
    const cashOnCashReturn =
      totalInitialCash > 0 ? (annualNetCashFlow / totalInitialCash) * 100 : 0;

    // Payback period
    const paybackYears =
      annualNetCashFlow > 0 ? totalInitialCash / annualNetCashFlow : 999;

    let rating = 'Average';
    let ratingColor = 'text-amber-600 dark:text-amber-400';
    let ratingBg = 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';

    if (capRate >= 8 && cashOnCashReturn >= 10) {
      rating = 'Excellent Deal / Prime Return';
      ratingColor = 'text-emerald-600 dark:text-emerald-400';
      ratingBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    } else if (capRate >= 6 && cashOnCashReturn >= 6) {
      rating = 'Healthy & Stable Investment';
      ratingColor = 'text-blue-600 dark:text-blue-400';
      ratingBg = 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
    } else if (cashOnCashReturn <= 0) {
      rating = 'Negative Cash Flow (Caution)';
      ratingColor = 'text-rose-600 dark:text-rose-400';
      ratingBg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
    }

    return {
      downPayment,
      totalInitialCash,
      loanAmount,
      monthlyMortgage,
      grossAnnualRent,
      effectiveGrossIncome,
      totalOperatingExpenses,
      netOperatingIncome,
      annualNetCashFlow,
      monthlyNetCashFlow,
      grossYield: Math.round(grossYield * 100) / 100,
      netYield: Math.round(netYield * 100) / 100,
      capRate: Math.round(capRate * 100) / 100,
      cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
      paybackYears: paybackYears < 100 ? Math.round(paybackYears * 10) / 10 : null,
      rating,
      ratingColor,
      ratingBg
    };
  }, [
    purchasePrice,
    initialClosingRenovation,
    investmentDownPaymentPct,
    investmentInterestRate,
    monthlyRentExpected,
    vacancyRate,
    mgmtFeePercent,
    maintenanceReservePct,
    invAnnualTaxes,
    invAnnualInsurance
  ]);

  // --- 3. RENT VS BUY CALCULATIONS ---
  const rentVsBuyData = useMemo(() => {
    const downPayment = rvbHomePrice * 0.2;
    const loanAmount = rvbHomePrice * 0.8;
    const monthlyRate = 0.065 / 12;
    const totalMonths = 30 * 12;
    const monthlyMortgage =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const monthlyOwnershipExtras = (rvbHomePrice * 0.015) / 12; // 1.5% for tax, insurance, maintenance
    const totalMonthlyBuy = monthlyMortgage + monthlyOwnershipExtras;

    // Horizon simulation
    let homeValue = rvbHomePrice;
    let loanBal = loanAmount;
    let totalBuyerCost = downPayment;

    // Renter simulation: starts with downPayment invested in market
    let renterInvestedWealth = downPayment;
    let totalRentPaid = 0;
    let curRent = rvbMonthlyRent;

    for (let yr = 1; yr <= rvbTimeHorizonYears; yr++) {
      // Home appreciates
      homeValue *= 1 + rvbAppreciationRate / 100;

      // Pay down loan
      for (let m = 1; m <= 12; m++) {
        const interest = loanBal * monthlyRate;
        const princ = monthlyMortgage - interest;
        loanBal -= princ;
        totalBuyerCost += totalMonthlyBuy;

        // Renter pays rent and invests difference (if buy cost > rent)
        totalRentPaid += curRent;
        const diff = totalMonthlyBuy - curRent;
        if (diff > 0) {
          renterInvestedWealth += diff;
        }
      }

      // Rent increases 3% per year
      curRent *= 1.03;

      // Renter portfolio returns
      renterInvestedWealth *= 1 + rvbInvestmentReturnRate / 100;
    }

    const buyerHomeEquity = homeValue - Math.max(0, loanBal);
    const buyerNetWealth = buyerHomeEquity - (rvbHomePrice * 0.06); // 6% selling transaction cost
    const renterNetWealth = renterInvestedWealth;

    const advantage = buyerNetWealth - renterNetWealth;
    const winner = advantage >= 0 ? 'Buying' : 'Renting';

    return {
      homeValueAtHorizon: Math.round(homeValue),
      buyerHomeEquity: Math.round(buyerHomeEquity),
      buyerNetWealth: Math.round(buyerNetWealth),
      renterNetWealth: Math.round(renterNetWealth),
      totalBuyerCost: Math.round(totalBuyerCost),
      totalRentPaid: Math.round(totalRentPaid),
      advantage: Math.abs(Math.round(advantage)),
      winner
    };
  }, [
    rvbHomePrice,
    rvbMonthlyRent,
    rvbTimeHorizonYears,
    rvbAppreciationRate,
    rvbInvestmentReturnRate
  ]);

  // Quick Presets
  const applyPreset = (type: 'starter' | 'villa' | 'commercial' | 'duplex') => {
    if (type === 'starter') {
      setPropertyPrice(250000);
      setDownPaymentPercent(15);
      setLoanTermYears(30);
      setInterestRate(6.25);
      setPropertyTaxRate(1.1);
      setHomeInsuranceAnnual(900);
      setHoaMonthly(120);

      setPurchasePrice(250000);
      setMonthlyRentExpected(1950);
    } else if (type === 'villa') {
      setPropertyPrice(750000);
      setDownPaymentPercent(25);
      setLoanTermYears(25);
      setInterestRate(5.9);
      setPropertyTaxRate(1.25);
      setHomeInsuranceAnnual(2200);
      setHoaMonthly(250);

      setPurchasePrice(750000);
      setMonthlyRentExpected(4800);
    } else if (type === 'duplex') {
      setPropertyPrice(420000);
      setDownPaymentPercent(20);
      setLoanTermYears(30);
      setInterestRate(6.5);
      setPropertyTaxRate(1.2);
      setHomeInsuranceAnnual(1400);
      setHoaMonthly(0);

      setPurchasePrice(420000);
      setMonthlyRentExpected(3600);
      setInvestmentDownPaymentPct(25);
    } else {
      setPropertyPrice(1200000);
      setDownPaymentPercent(30);
      setLoanTermYears(20);
      setInterestRate(6.75);
      setPropertyTaxRate(1.5);
      setHomeInsuranceAnnual(3500);
      setHoaMonthly(500);

      setPurchasePrice(1200000);
      setMonthlyRentExpected(9200);
    }
    addToast('Preset Applied', 'Updated parameters with benchmark values.', 'info');
  };

  // Copy Executive Report
  const handleCopySummary = () => {
    let text = '';
    if (activeTab === 'mortgage') {
      text = `=== REAL ESTATE MORTGAGE REPORT ===\nProperty Price: ${formatMoney(propertyPrice)}\nDown Payment: ${formatMoney(mortgageData.downPaymentAmount)} (${downPaymentPercent}%)\nLoan Amount: ${formatMoney(mortgageData.principal)}\nLoan Term: ${loanTermYears} Years @ ${interestRate}%\n\nTotal Monthly Payment: ${formatMoney(mortgageData.totalMonthlyPayment)}\n- Principal & Interest: ${formatMoney(mortgageData.monthlyPI)}\n- Property Taxes: ${formatMoney(mortgageData.monthlyTax)}\n- Home Insurance: ${formatMoney(mortgageData.monthlyInsurance)}\n- HOA / Maintenance: ${formatMoney(mortgageData.hoaMonthly)}\n\nTotal Paid over Loan: ${formatMoney(mortgageData.totalPaidOverLoan)}\nTotal Interest: ${formatMoney(mortgageData.totalInterestPaid)}`;
    } else if (activeTab === 'investment') {
      text = `=== REAL ESTATE INVESTMENT REPORT ===\nPurchase Price: ${formatMoney(purchasePrice)}\nCash Invested: ${formatMoney(investmentData.totalInitialCash)}\nExpected Monthly Rent: ${formatMoney(monthlyRentExpected)}\n\nKey Metrics:\n- Cap Rate: ${investmentData.capRate}%\n- Cash-on-Cash Return: ${investmentData.cashOnCashReturn}%\n- Gross Yield: ${investmentData.grossYield}%\n- Net Yield: ${investmentData.netYield}%\n- Monthly Net Cash Flow: ${formatMoney(investmentData.monthlyNetCashFlow)}\n- Annual Net Cash Flow: ${formatMoney(investmentData.annualNetCashFlow)}\n- Deal Rating: ${investmentData.rating}`;
    } else {
      text = `=== RENT VS BUY ANALYSIS (${rvbTimeHorizonYears} YEARS) ===\nVerdict: ${rentVsBuyData.winner} is financially ahead by ${formatMoney(rentVsBuyData.advantage)}!\nBuyer Net Wealth: ${formatMoney(rentVsBuyData.buyerNetWealth)}\nRenter Portfolio Wealth: ${formatMoney(rentVsBuyData.renterNetWealth)}`;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast('Copied Report!', 'Summary report saved to clipboard.', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // PDF Report Export Handler
  const handleExportPdf = () => {
    try {
      setExportingPdf(true);
      if (activeTab === 'mortgage') {
        exportMortgagePdfReport({
          currencySymbol: selectedCurrency.symbol,
          currencyCode: selectedCurrency.code,
          propertyPrice,
          downPaymentPercent,
          downPaymentAmount: mortgageData.downPaymentAmount,
          principal: mortgageData.principal,
          loanTermYears,
          interestRate,
          monthlyPI: mortgageData.monthlyPI,
          monthlyTax: mortgageData.monthlyTax,
          monthlyInsurance: mortgageData.monthlyInsurance,
          hoaMonthly: mortgageData.hoaMonthly,
          totalMonthlyPayment: mortgageData.totalMonthlyPayment,
          totalPaidOverLoan: mortgageData.totalPaidOverLoan,
          totalInterestPaid: mortgageData.totalInterestPaid,
          schedule: mortgageData.schedule
        });
      } else if (activeTab === 'investment') {
        exportInvestmentPdfReport({
          currencySymbol: selectedCurrency.symbol,
          currencyCode: selectedCurrency.code,
          purchasePrice,
          initialClosingRenovation,
          totalInitialCash: investmentData.totalInitialCash,
          loanAmount: investmentData.loanAmount,
          monthlyMortgage: investmentData.monthlyMortgage,
          monthlyRentExpected,
          grossAnnualRent: investmentData.grossAnnualRent,
          effectiveGrossIncome: investmentData.effectiveGrossIncome,
          totalOperatingExpenses: investmentData.totalOperatingExpenses,
          netOperatingIncome: investmentData.netOperatingIncome,
          annualNetCashFlow: investmentData.annualNetCashFlow,
          monthlyNetCashFlow: investmentData.monthlyNetCashFlow,
          grossYield: investmentData.grossYield,
          netYield: investmentData.netYield,
          capRate: investmentData.capRate,
          cashOnCashReturn: investmentData.cashOnCashReturn,
          paybackYears: investmentData.paybackYears,
          rating: investmentData.rating
        });
      } else {
        exportRentVsBuyPdfReport({
          currencySymbol: selectedCurrency.symbol,
          currencyCode: selectedCurrency.code,
          rvbHomePrice,
          rvbMonthlyRent,
          rvbTimeHorizonYears,
          rvbAppreciationRate,
          rvbInvestmentReturnRate,
          homeValueAtHorizon: rentVsBuyData.homeValueAtHorizon,
          buyerHomeEquity: rentVsBuyData.buyerHomeEquity,
          buyerNetWealth: rentVsBuyData.buyerNetWealth,
          renterNetWealth: rentVsBuyData.renterNetWealth,
          totalBuyerCost: rentVsBuyData.totalBuyerCost,
          totalRentPaid: rentVsBuyData.totalRentPaid,
          advantage: rentVsBuyData.advantage,
          winner: rentVsBuyData.winner
        });
      }
      addToast('PDF Downloaded!', 'Executive report generated and downloaded.', 'success');
    } catch {
      addToast('PDF Export Failed', 'An error occurred while generating the PDF document.', 'error');
    } finally {
      setExportingPdf(false);
    }
  };

  // Share Calculation Link Handler
  const handleShareCalculation = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams();

    params.set('tab', activeTab);
    params.set('currency', selectedCurrency.code);

    if (activeTab === 'mortgage') {
      params.set('price', String(propertyPrice));
      params.set('down', String(downPaymentPercent));
      params.set('rate', String(interestRate));
      params.set('years', String(loanTermYears));
      params.set('tax', String(propertyTaxRate));
      params.set('ins', String(homeInsuranceAnnual));
      params.set('hoa', String(hoaMonthly));
    } else if (activeTab === 'investment') {
      params.set('invPrice', String(purchasePrice));
      params.set('rent', String(monthlyRentExpected));
      params.set('vacancy', String(vacancyRate));
      params.set('mgmt', String(mgmtFeePercent));
      params.set('maint', String(maintenanceReservePct));
    } else {
      params.set('rvbPrice', String(rvbHomePrice));
      params.set('rvbRent', String(rvbMonthlyRent));
      params.set('horizon', String(rvbTimeHorizonYears));
    }

    url.search = params.toString();
    const shareableUrl = url.toString();

    navigator.clipboard.writeText(shareableUrl).then(() => {
      setShared(true);
      addToast('Shareable Link Copied!', 'Anyone opening this link will see these exact calculation values.', 'success');
      setTimeout(() => setShared(false), 2500);
    });
  };

  // Export Amortization CSV
  const handleExportCsv = () => {
    let csv = 'Year,Principal Paid,Interest Paid,Total Interest To Date,Remaining Loan Balance,Total Home Equity\n';
    mortgageData.schedule.forEach(row => {
      csv += `${row.year},${row.principalPaid},${row.interestPaid},${row.totalInterestToDate},${row.remainingBalance},${row.equity}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `amortization-schedule-${propertyPrice}-${loanTermYears}yr.csv`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Schedule Downloaded', 'Amortization CSV file ready for Excel.', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header Card & Global Controls */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                Real Estate &amp; Mortgage Investment Calculator
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Comprehensive suite for mortgage loan amortization, rental property ROI &amp; Cap Rate analysis, and Rent vs. Buy comparison.
              </p>
            </div>
          </div>

          {/* Currency & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedCurrency.code}
              onChange={e => {
                const found = CURRENCIES.find(c => c.code === e.target.value);
                if (found) setSelectedCurrency(found);
              }}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Shareable Link Button */}
            <button
              type="button"
              onClick={handleShareCalculation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all shadow-2xs"
              title={isArabic ? 'مشاركة رابط بحسابات هذه الأرقام' : 'Share pre-calculated link with these exact numbers'}
            >
              {shared ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{shared ? (isArabic ? 'تم النسخ!' : 'Link Copied!') : (isArabic ? 'مشاركة الرابط' : 'Share Link')}</span>
            </button>

            {/* PDF Report Export Button */}
            <button
              type="button"
              onClick={handleExportPdf}
              disabled={exportingPdf}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80 transition-all shadow-2xs"
              title={isArabic ? 'تحميل التقرير التنفيذي بصيغة PDF' : 'Download Executive PDF Report'}
            >
              <FileText className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>{exportingPdf ? (isArabic ? 'جارِ التصدير...' : 'Exporting...') : (isArabic ? 'تصدير PDF' : 'Export PDF')}</span>
            </button>

            {/* Copy Summary Text Button */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? (isArabic ? 'تم النسخ!' : 'Copied!') : (isArabic ? 'نسخ التقرير' : 'Copy Report')}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('mortgage')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'mortgage'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Mortgage &amp; Amortization</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('investment')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'investment'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Rental Yield &amp; ROI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('rent-vs-buy')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'rent-vs-buy'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>Rent vs. Buy</span>
            </button>
          </div>

          {/* Quick Benchmark Presets */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 text-[11px] font-medium hidden sm:inline mr-1">Presets:</span>
            <button
              onClick={() => applyPreset('starter')}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300"
            >
              Starter Apartment
            </button>
            <button
              onClick={() => applyPreset('villa')}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300"
            >
              Family Villa
            </button>
            <button
              onClick={() => applyPreset('duplex')}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-600 dark:text-slate-300"
            >
              Duplex / Rental
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: MORTGAGE & AMORTIZATION
         ========================================================================= */}
      {activeTab === 'mortgage' && (
        <div className="space-y-6">
          {/* Main Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Form Column (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <Home className="w-4 h-4 text-indigo-500" />
                Mortgage Financing Details
              </h3>

              {/* Home Price */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Home / Property Price
                  </label>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {formatMoney(propertyPrice)}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={10000}
                    step={5000}
                    value={propertyPrice}
                    onChange={e => setPropertyPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold text-slate-900 dark:text-slate-100 pr-12 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
                    {selectedCurrency.code}
                  </span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={2000000}
                  step={10000}
                  value={propertyPrice}
                  onChange={e => setPropertyPrice(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Down Payment (% and calculated cash) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Down Payment (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={downPaymentPercent}
                      onChange={e =>
                        setDownPaymentPercent(
                          Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Down Payment Cash Amount
                  </label>
                  <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-mono font-bold text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700">
                    {formatMoney(mortgageData.downPaymentAmount)}
                  </div>
                </div>
              </div>

              {/* Loan Term & Interest Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Loan Term
                  </label>
                  <select
                    value={loanTermYears}
                    onChange={e => setLoanTermYears(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200"
                  >
                    <option value={10}>10 Years (Fixed)</option>
                    <option value={15}>15 Years (Fixed)</option>
                    <option value={20}>20 Years (Fixed)</option>
                    <option value={25}>25 Years (Fixed)</option>
                    <option value={30}>30 Years (Fixed)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Annual Interest Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0.1}
                      max={25}
                      step={0.1}
                      value={interestRate}
                      onChange={e => setInterestRate(parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>

              {/* Property Taxes, Insurance, HOA */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Escrow, Taxes &amp; Fees (Monthly Additions)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Property Tax Rate / yr
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step={0.1}
                        value={propertyTaxRate}
                        onChange={e => setPropertyTaxRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                      />
                      <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Home Insurance / yr
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={homeInsuranceAnnual}
                      onChange={e => setHomeInsuranceAnnual(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      HOA / Maintenance / mo
                    </label>
                    <input
                      type="number"
                      step={25}
                      value={hoaMonthly}
                      onChange={e => setHoaMonthly(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results & Breakdown Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Monthly Payment Hero Card */}
              <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl shadow-md space-y-5">
                <div>
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white mt-1">
                    {formatMoney(mortgageData.totalMonthlyPayment)}
                  </div>
                  <span className="text-xs text-indigo-200/80">
                    Principal, Interest, Property Taxes, Insurance &amp; HOA
                  </span>
                </div>

                {/* Progress Bar of components */}
                <div className="space-y-2">
                  <div className="h-3 w-full rounded-full bg-slate-800 flex overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full"
                      style={{
                        width: `${(mortgageData.monthlyPI / mortgageData.totalMonthlyPayment) * 100}%`
                      }}
                      title="Principal & Interest"
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{
                        width: `${(mortgageData.monthlyTax / mortgageData.totalMonthlyPayment) * 100}%`
                      }}
                      title="Property Tax"
                    />
                    <div
                      className="bg-amber-500 h-full"
                      style={{
                        width: `${(mortgageData.monthlyInsurance / mortgageData.totalMonthlyPayment) * 100}%`
                      }}
                      title="Insurance"
                    />
                    <div
                      className="bg-purple-500 h-full"
                      style={{
                        width: `${(mortgageData.hoaMonthly / mortgageData.totalMonthlyPayment) * 100}%`
                      }}
                      title="HOA Fees"
                    />
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                      <span className="text-slate-300">P &amp; I:</span>
                      <strong className="font-mono text-white ml-auto">
                        {formatMoney(mortgageData.monthlyPI)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-slate-300">Taxes:</span>
                      <strong className="font-mono text-white ml-auto">
                        {formatMoney(mortgageData.monthlyTax)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-slate-300">Insurance:</span>
                      <strong className="font-mono text-white ml-auto">
                        {formatMoney(mortgageData.monthlyInsurance)}
                      </strong>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                      <span className="text-slate-300">HOA:</span>
                      <strong className="font-mono text-white ml-auto">
                        {formatMoney(mortgageData.hoaMonthly)}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Cost Over Loan Life */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Loan Lifetime Summary
                </span>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Total Financed Principal:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {formatMoney(mortgageData.principal)}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Total Interest Paid:</span>
                    <span className="font-bold font-mono text-rose-600 dark:text-rose-400">
                      {formatMoney(mortgageData.totalInterestPaid)}
                    </span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-400">Total Payments (Principal + Interest):</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {formatMoney(mortgageData.totalPaidOverLoan)}
                    </span>
                  </div>

                  <div className="flex justify-between py-1">
                    <span className="text-slate-600 dark:text-slate-400">Interest-to-Principal Ratio:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {mortgageData.principal > 0
                        ? `${Math.round((mortgageData.totalInterestPaid / mortgageData.principal) * 100)}%`
                        : '0%'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <TableIcon className="w-5 h-5 text-indigo-600" />
                  Loan Amortization Schedule
                </h3>
                <p className="text-xs text-slate-500">
                  Year-by-year equity growth, remaining loan principal, and interest amortization curve.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
                  <button
                    onClick={() => setAmortizationFilter('5yr')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      amortizationFilter === '5yr'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    First 5 Years
                  </button>
                  <button
                    onClick={() => setAmortizationFilter('all')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                      amortizationFilter === 'all'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    All {loanTermYears} Years
                  </button>
                </div>

                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-700">
                    <th className="py-2.5 px-3">Year</th>
                    <th className="py-2.5 px-3">Principal Paid</th>
                    <th className="py-2.5 px-3">Interest Paid</th>
                    <th className="py-2.5 px-3">Total Interest</th>
                    <th className="py-2.5 px-3">Remaining Balance</th>
                    <th className="py-2.5 px-3 text-right">Home Equity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                  {mortgageData.schedule
                    .slice(0, amortizationFilter === '5yr' ? 5 : loanTermYears)
                    .map(row => (
                      <tr
                        key={row.year}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-slate-100 font-sans">
                          Year {row.year}
                        </td>
                        <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">
                          {formatMoney(row.principalPaid)}
                        </td>
                        <td className="py-2.5 px-3 text-rose-600 dark:text-rose-400">
                          {formatMoney(row.interestPaid)}
                        </td>
                        <td className="py-2.5 px-3 text-slate-500">
                          {formatMoney(row.totalInterestToDate)}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                          {formatMoney(row.remainingBalance)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-indigo-600 dark:text-indigo-400">
                          {formatMoney(row.equity)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: RENTAL INVESTMENT, CAP RATE & CASH-ON-CASH ROI
         ========================================================================= */}
      {activeTab === 'investment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Investment Inputs Column (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Rental Property Acquisition &amp; Revenue
              </h3>

              {/* Purchase Price & Closing Costs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    step={5000}
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Renovation &amp; Closing Costs
                  </label>
                  <input
                    type="number"
                    step={1000}
                    value={initialClosingRenovation}
                    onChange={e =>
                      setInitialClosingRenovation(Math.max(0, parseFloat(e.target.value) || 0))
                    }
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                  />
                </div>
              </div>

              {/* Financing on Investment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Down Payment (% of purchase)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={investmentDownPaymentPct}
                      onChange={e =>
                        setInvestmentDownPaymentPct(
                          Math.min(100, Math.max(0, parseFloat(e.target.value) || 0))
                        )
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Investment Loan Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      value={investmentInterestRate}
                      onChange={e =>
                        setInvestmentInterestRate(parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                    />
                    <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>

              {/* Rental Income */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Expected Monthly Rent
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={monthlyRentExpected}
                      onChange={e =>
                        setMonthlyRentExpected(Math.max(0, parseFloat(e.target.value) || 0))
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Estimated Vacancy Rate
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={vacancyRate}
                        onChange={e => setVacancyRate(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                      />
                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operating Expenses */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Operating Expenses &amp; Reserves
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Mgmt Fee (%)
                    </label>
                    <input
                      type="number"
                      value={mgmtFeePercent}
                      onChange={e => setMgmtFeePercent(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Maintenance (%)
                    </label>
                    <input
                      type="number"
                      value={maintenanceReservePct}
                      onChange={e => setMaintenanceReservePct(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Annual Taxes
                    </label>
                    <input
                      type="number"
                      step={100}
                      value={invAnnualTaxes}
                      onChange={e => setInvAnnualTaxes(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Annual Insurance
                    </label>
                    <input
                      type="number"
                      step={50}
                      value={invAnnualInsurance}
                      onChange={e => setInvAnnualInsurance(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Results Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Deal Quality Badge Card */}
              <div className={`p-6 rounded-2xl border ${investmentData.ratingBg} transition-all space-y-4`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Deal Assessment
                  </span>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${investmentData.ratingColor} bg-white dark:bg-slate-900 shadow-2xs`}>
                    {investmentData.rating}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl">
                    <span className="text-[11px] text-slate-500 block">Cap Rate</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                      {investmentData.capRate}%
                    </div>
                  </div>

                  <div className="p-3 bg-white/80 dark:bg-slate-900/80 rounded-xl">
                    <span className="text-[11px] text-slate-500 block">Cash-on-Cash Return</span>
                    <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {investmentData.cashOnCashReturn}%
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Initial Out-of-Pocket Cash:</span>
                  <strong className="font-mono text-slate-900 dark:text-white">
                    {formatMoney(investmentData.totalInitialCash)}
                  </strong>
                </div>
              </div>

              {/* Monthly Cash Flow Card */}
              <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Net Monthly Cash Flow
                  </span>
                  <div
                    className={`text-3xl font-black font-mono mt-1 ${
                      investmentData.monthlyNetCashFlow >= 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {formatMoney(investmentData.monthlyNetCashFlow)} / mo
                  </div>
                  <span className="text-xs text-slate-500">
                    Net in-pocket after mortgage debt and all operational reserves.
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Annual Net Cash Flow:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {formatMoney(investmentData.annualNetCashFlow)} / yr
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Gross Rental Yield:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {investmentData.grossYield}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Net Rental Yield:</span>
                    <span className="font-bold font-mono text-slate-900 dark:text-white">
                      {investmentData.netYield}%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Est. Capital Payback:</span>
                    <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                      {investmentData.paybackYears ? `${investmentData.paybackYears} Years` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: RENT VS. BUY ANALYZER
         ========================================================================= */}
      {activeTab === 'rent-vs-buy' && (
        <div className="space-y-6">
          {/* Rent vs Buy Simulation Hero */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  Financial Wealth Outcome: Buying vs. Renting
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulates cumulative net worth growth over your expected timeframe, factoring home appreciation, equity build-up, and stock market returns for invested rent savings.
                </p>
              </div>

              {/* Time Horizon Slider */}
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-xs font-bold">
                <span className="text-slate-500">Horizon:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">
                  {rvbTimeHorizonYears} Years
                </span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Target Purchase Price
                </label>
                <input
                  type="number"
                  step={10000}
                  value={rvbHomePrice}
                  onChange={e => setRvbHomePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Equivalent Monthly Rent
                </label>
                <input
                  type="number"
                  step={50}
                  value={rvbMonthlyRent}
                  onChange={e => setRvbMonthlyRent(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Home Annual Growth (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={rvbAppreciationRate}
                  onChange={e => setRvbAppreciationRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Renter Market Return (%)
                </label>
                <input
                  type="number"
                  step={0.5}
                  value={rvbInvestmentReturnRate}
                  onChange={e => setRvbInvestmentReturnRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono font-bold"
                />
              </div>
            </div>

            {/* Time Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-500">
                <span>3 Years (Short-term)</span>
                <span>10 Years (Medium-term)</span>
                <span>20 Years (Long-term)</span>
              </div>
              <input
                type="range"
                min={3}
                max={25}
                value={rvbTimeHorizonYears}
                onChange={e => setRvbTimeHorizonYears(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Final Verdict Banner */}
            <div
              className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                rentVsBuyData.winner === 'Buying'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                  : 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800'
              }`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  {rvbTimeHorizonYears}-Year Financial Verdict
                </span>
                <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {rentVsBuyData.winner} wins by{' '}
                  <span
                    className={
                      rentVsBuyData.winner === 'Buying'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }
                  >
                    {formatMoney(rentVsBuyData.advantage)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Over {rvbTimeHorizonYears} years, choosing to {rentVsBuyData.winner.toLowerCase()} results in higher net liquid and physical wealth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 shrink-0">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Buyer Net Wealth</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                    {formatMoney(rentVsBuyData.buyerNetWealth)}
                  </span>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 block">Renter Net Wealth</span>
                  <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                    {formatMoney(rentVsBuyData.renterNetWealth)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
