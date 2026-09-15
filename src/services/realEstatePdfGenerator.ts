import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface MortgageReportParams {
  currencySymbol: string;
  currencyCode: string;
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  principal: number;
  loanTermYears: number;
  interestRate: number;
  monthlyPI: number;
  monthlyTax: number;
  monthlyInsurance: number;
  hoaMonthly: number;
  totalMonthlyPayment: number;
  totalPaidOverLoan: number;
  totalInterestPaid: number;
  schedule: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    totalInterestToDate: number;
    remainingBalance: number;
    equity: number;
  }>;
}

export interface InvestmentReportParams {
  currencySymbol: string;
  currencyCode: string;
  purchasePrice: number;
  initialClosingRenovation: number;
  totalInitialCash: number;
  loanAmount: number;
  monthlyMortgage: number;
  monthlyRentExpected: number;
  grossAnnualRent: number;
  effectiveGrossIncome: number;
  totalOperatingExpenses: number;
  netOperatingIncome: number;
  annualNetCashFlow: number;
  monthlyNetCashFlow: number;
  grossYield: number;
  netYield: number;
  capRate: number;
  cashOnCashReturn: number;
  paybackYears: number | null;
  rating: string;
}

export interface RentVsBuyReportParams {
  currencySymbol: string;
  currencyCode: string;
  rvbHomePrice: number;
  rvbMonthlyRent: number;
  rvbTimeHorizonYears: number;
  rvbAppreciationRate: number;
  rvbInvestmentReturnRate: number;
  homeValueAtHorizon: number;
  buyerHomeEquity: number;
  buyerNetWealth: number;
  renterNetWealth: number;
  totalBuyerCost: number;
  totalRentPaid: number;
  advantage: number;
  winner: string;
}

const formatCurrency = (val: number, sym: string) => {
  if (isNaN(val)) return `${sym}0`;
  return `${sym}${Math.round(val).toLocaleString('en-US')}`;
};

export function exportMortgagePdfReport(data: MortgageReportParams) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // 1. Top Header Banner
  doc.setFillColor(79, 70, 229); // #4F46E5 Brand Indigo
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DevPulse Utilities', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('EXECUTIVE MORTGAGE & LOAN REPORT', 14, 18);

  doc.setFontSize(8);
  doc.text(`Generated: ${dateStr} | Currency: ${data.currencyCode}`, pageWidth - 14, 15, { align: 'right' });

  // 2. Scenario Overview Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 30, pageWidth - 28, 26, 3, 3, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('Property & Financing Summary', 20, 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);

  const col1X = 20;
  const col2X = 80;
  const col3X = 140;

  doc.text(`Property Price: ${formatCurrency(data.propertyPrice, data.currencySymbol)}`, col1X, 46);
  doc.text(`Down Payment: ${formatCurrency(data.downPaymentAmount, data.currencySymbol)} (${data.downPaymentPercent}%)`, col1X, 52);

  doc.text(`Loan Principal: ${formatCurrency(data.principal, data.currencySymbol)}`, col2X, 46);
  doc.text(`Interest Rate: ${data.interestRate}%`, col2X, 52);

  doc.text(`Loan Term: ${data.loanTermYears} Years`, col3X, 46);
  doc.text(`Total Payments: ${data.loanTermYears * 12} Months`, col3X, 52);

  // 3. Payment Highlights Cards
  const cardY = 62;
  const cardWidth = (pageWidth - 28 - 8) / 3;

  // Monthly Card
  doc.setFillColor(238, 242, 255); // Indigo light
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(14, cardY, cardWidth, 24, 2, 2, 'FD');
  doc.setTextColor(79, 70, 229);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TOTAL MONTHLY PAYMENT', 14 + cardWidth / 2, cardY + 7, { align: 'center' });
  doc.setFontSize(13);
  doc.text(formatCurrency(data.totalMonthlyPayment, data.currencySymbol), 14 + cardWidth / 2, cardY + 17, { align: 'center' });

  // Total Interest Card
  doc.setFillColor(254, 242, 242); // Rose light
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14 + cardWidth + 4, cardY, cardWidth, 24, 2, 2, 'FD');
  doc.setTextColor(225, 29, 72);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TOTAL INTEREST OVER LOAN', 14 + cardWidth + 4 + cardWidth / 2, cardY + 7, { align: 'center' });
  doc.setFontSize(13);
  doc.text(formatCurrency(data.totalInterestPaid, data.currencySymbol), 14 + cardWidth + 4 + cardWidth / 2, cardY + 17, { align: 'center' });

  // Total Cost Card
  doc.setFillColor(240, 253, 244); // Emerald light
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(14 + (cardWidth + 4) * 2, cardY, cardWidth, 24, 2, 2, 'FD');
  doc.setTextColor(22, 101, 52);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('TOTAL PAID OVER LIFE OF LOAN', 14 + (cardWidth + 4) * 2 + cardWidth / 2, cardY + 7, { align: 'center' });
  doc.setFontSize(13);
  doc.text(formatCurrency(data.totalPaidOverLoan, data.currencySymbol), 14 + (cardWidth + 4) * 2 + cardWidth / 2, cardY + 17, { align: 'center' });

  // 4. Monthly Payment Breakdown Table
  autoTable(doc, {
    startY: 92,
    head: [['Monthly Component', 'Calculation Basis', 'Monthly Cost', '% of Total']],
    body: [
      ['Principal & Interest (P&I)', `${data.loanTermYears}yr amortized at ${data.interestRate}%`, formatCurrency(data.monthlyPI, data.currencySymbol), `${((data.monthlyPI / data.totalMonthlyPayment) * 100).toFixed(1)}%`],
      ['Property Taxes', 'Estimated yearly tax divided by 12', formatCurrency(data.monthlyTax, data.currencySymbol), `${((data.monthlyTax / data.totalMonthlyPayment) * 100).toFixed(1)}%`],
      ['Homeowners Insurance', 'Annual policy divided by 12', formatCurrency(data.monthlyInsurance, data.currencySymbol), `${((data.monthlyInsurance / data.totalMonthlyPayment) * 100).toFixed(1)}%`],
      ['HOA / Maintenance', 'Monthly association dues', formatCurrency(data.hoaMonthly, data.currencySymbol), `${((data.hoaMonthly / data.totalMonthlyPayment) * 100).toFixed(1)}%`],
      ['Total Monthly Outlay', 'All components combined', formatCurrency(data.totalMonthlyPayment, data.currencySymbol), '100%']
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [79, 70, 229],
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: [51, 65, 85]
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      2: { halign: 'right', fontStyle: 'bold' },
      3: { halign: 'right' }
    },
    margin: { left: 14, right: 14 }
  });

  // 5. Loan Amortization Schedule (Summary Table)
  const scheduleRows = data.schedule.map((row) => [
    `Year ${row.year}`,
    formatCurrency(row.principalPaid, data.currencySymbol),
    formatCurrency(row.interestPaid, data.currencySymbol),
    formatCurrency(row.totalInterestToDate, data.currencySymbol),
    formatCurrency(row.remainingBalance, data.currencySymbol),
    formatCurrency(row.equity, data.currencySymbol)
  ]);

  const prevFinalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 140;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('Annual Amortization & Equity Build-Up Schedule', 14, prevFinalY + 8);

  autoTable(doc, {
    startY: prevFinalY + 12,
    head: [['Period', 'Principal Paid', 'Interest Paid', 'Cumul. Interest', 'Remaining Balance', 'Home Equity']],
    body: scheduleRows,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 41, 59], // Slate 800
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [51, 65, 85]
    },
    columnStyles: {
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'right', fontStyle: 'bold', textColor: [22, 101, 52] }
    },
    margin: { left: 14, right: 14 }
  });

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      'Generated 100% locally with DevPulse Utilities (devpulsetools.pages.dev). For informational & projection purposes only.',
      pageWidth / 2,
      290,
      { align: 'center' }
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 14, 290, { align: 'right' });
  }

  doc.save(`devpulse-mortgage-report-${data.propertyPrice}-${data.loanTermYears}yr.pdf`);
}

export function exportInvestmentPdfReport(data: InvestmentReportParams) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Top Header Banner
  doc.setFillColor(16, 185, 129); // #10B981 Emerald
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DevPulse Utilities', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('RENTAL PROPERTY ROI & CAP RATE EXECUTIVE REPORT', 14, 18);

  doc.setFontSize(8);
  doc.text(`Generated: ${dateStr} | Currency: ${data.currencyCode}`, pageWidth - 14, 15, { align: 'right' });

  // Deal Verdict Banner
  doc.setDrawColor(209, 250, 229);
  doc.setFillColor(236, 253, 245);
  doc.roundedRect(14, 30, pageWidth - 28, 18, 2, 2, 'FD');

  doc.setTextColor(6, 95, 70);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Investment Rating & Verdict: ${data.rating}`, 20, 39);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Initial Cash Required: ${formatCurrency(data.totalInitialCash, data.currencySymbol)} | Net Annual Cash Flow: ${formatCurrency(data.annualNetCashFlow, data.currencySymbol)}`, 20, 45);

  // Key Metric Cards (4 cards)
  const cardY = 52;
  const cardW = (pageWidth - 28 - 9) / 4;

  const metrics = [
    { title: 'CAP RATE', val: `${data.capRate}%`, col: [16, 185, 129] },
    { title: 'CASH ON CASH', val: `${data.cashOnCashReturn}%`, col: [79, 70, 229] },
    { title: 'GROSS YIELD', val: `${data.grossYield}%`, col: [217, 119, 6] },
    { title: 'MONTHLY CASH FLOW', val: formatCurrency(data.monthlyNetCashFlow, data.currencySymbol), col: [15, 23, 42] }
  ];

  metrics.forEach((m, idx) => {
    const x = 14 + idx * (cardW + 3);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, cardY, cardW, 22, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(m.title, x + cardW / 2, cardY + 7, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(m.col[0], m.col[1], m.col[2]);
    doc.text(m.val, x + cardW / 2, cardY + 16, { align: 'center' });
  });

  // Table 1: Financial & Purchase Structure
  autoTable(doc, {
    startY: 80,
    head: [['Acquisition & Financing Parameter', 'Amount']],
    body: [
      ['Purchase Price', formatCurrency(data.purchasePrice, data.currencySymbol)],
      ['Closing & Initial Renovation Budget', formatCurrency(data.initialClosingRenovation, data.currencySymbol)],
      ['Total Initial Cash Out-of-Pocket', formatCurrency(data.totalInitialCash, data.currencySymbol)],
      ['Mortgage Loan Principal', formatCurrency(data.loanAmount, data.currencySymbol)],
      ['Monthly Debt Service (Mortgage P&I)', formatCurrency(data.monthlyMortgage, data.currencySymbol)],
      ['Estimated Capital Payback Period', data.paybackYears ? `${data.paybackYears} Years` : 'N/A (Break-even)']
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [16, 185, 129],
      fontSize: 8.5
    },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  const prevFinalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY || 135;

  // Table 2: Rental Income, Expenses & Net Operating Income (NOI)
  autoTable(doc, {
    startY: prevFinalY + 8,
    head: [['Operating Income & Cash Flow Breakdown', 'Monthly', 'Annual']],
    body: [
      ['Gross Expected Rental Income', formatCurrency(data.monthlyRentExpected, data.currencySymbol), formatCurrency(data.grossAnnualRent, data.currencySymbol)],
      ['Effective Gross Income (After Vacancy Allowance)', formatCurrency(data.effectiveGrossIncome / 12, data.currencySymbol), formatCurrency(data.effectiveGrossIncome, data.currencySymbol)],
      ['Total Operating Expenses (Taxes, Insurance, Mgmt, Maint.)', formatCurrency(data.totalOperatingExpenses / 12, data.currencySymbol), formatCurrency(data.totalOperatingExpenses, data.currencySymbol)],
      ['Net Operating Income (NOI)', formatCurrency(data.netOperatingIncome / 12, data.currencySymbol), formatCurrency(data.netOperatingIncome, data.currencySymbol)],
      ['Mortgage Debt Service', formatCurrency(data.monthlyMortgage, data.currencySymbol), formatCurrency(data.monthlyMortgage * 12, data.currencySymbol)],
      ['Net Cash Flow (After Debt Service)', formatCurrency(data.monthlyNetCashFlow, data.currencySymbol), formatCurrency(data.annualNetCashFlow, data.currencySymbol)]
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [30, 41, 59],
      fontSize: 8.5
    },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' },
      2: { halign: 'right', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Generated 100% locally with DevPulse Utilities (devpulsetools.pages.dev). For financial modeling and preliminary feasibility only.',
    pageWidth / 2,
    290,
    { align: 'center' }
  );

  doc.save(`devpulse-investment-roi-report-${data.purchasePrice}.pdf`);
}

export function exportRentVsBuyPdfReport(data: RentVsBuyReportParams) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Top Header Banner
  doc.setFillColor(59, 130, 246); // #3B82F6 Blue
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DevPulse Utilities', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`RENT VS. BUY STRATEGIC WEALTH REPORT (${data.rvbTimeHorizonYears}-YEAR HORIZON)`, 14, 18);

  doc.setFontSize(8);
  doc.text(`Generated: ${dateStr} | Currency: ${data.currencyCode}`, pageWidth - 14, 15, { align: 'right' });

  // Winner Announcement Banner
  doc.setDrawColor(219, 234, 254);
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(14, 30, pageWidth - 28, 22, 3, 3, 'FD');

  doc.setTextColor(30, 58, 138);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(`VERDICT: ${data.winner.toUpperCase()} is the Winner!`, 20, 39);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Over a ${data.rvbTimeHorizonYears}-year horizon, ${data.winner.toLowerCase()} yields an estimated net wealth advantage of ${formatCurrency(data.advantage, data.currencySymbol)}.`,
    20,
    47
  );

  // Comparison Table
  autoTable(doc, {
    startY: 58,
    head: [['Key Milestone Metric', 'Buying Scenario', 'Renting Scenario', 'Differential Advantage']],
    body: [
      ['Estimated Net Wealth at Horizon', formatCurrency(data.buyerNetWealth, data.currencySymbol), formatCurrency(data.renterNetWealth, data.currencySymbol), `${formatCurrency(data.advantage, data.currencySymbol)} (${data.winner})`],
      ['Total Out-of-Pocket Outlay', formatCurrency(data.totalBuyerCost, data.currencySymbol), formatCurrency(data.totalRentPaid, data.currencySymbol), formatCurrency(Math.abs(data.totalBuyerCost - data.totalRentPaid), data.currencySymbol)],
      ['Terminal Asset Value', `Home Value: ${formatCurrency(data.homeValueAtHorizon, data.currencySymbol)}`, `Investment Portfolio: ${formatCurrency(data.renterNetWealth, data.currencySymbol)}`, '-'],
      ['Equity / Accumulated Net Worth', formatCurrency(data.buyerHomeEquity, data.currencySymbol), formatCurrency(data.renterNetWealth, data.currencySymbol), '-']
    ],
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246],
      fontSize: 8.5
    },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' },
      2: { halign: 'right' },
      3: { halign: 'right', fontStyle: 'bold', textColor: [30, 58, 138] }
    },
    margin: { left: 14, right: 14 }
  });

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Generated 100% locally with DevPulse Utilities (devpulsetools.pages.dev). For decision support only.',
    pageWidth / 2,
    290,
    { align: 'center' }
  );

  doc.save(`devpulse-rent-vs-buy-analysis-${data.rvbTimeHorizonYears}yr.pdf`);
}
