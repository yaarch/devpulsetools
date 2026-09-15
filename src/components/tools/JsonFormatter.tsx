import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Code,
  Copy,
  Download,
  Trash2,
  Sparkles,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  FileJson
} from 'lucide-react';

export const JsonFormatter: React.FC = () => {
  const { addToast, language, t } = useApp();
  const [inputJson, setInputJson] = useState('');
  const [indentSpaces, setIndentSpaces] = useState<number>(2);
  const [validationError, setValidationError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const sampleJson = {
    name: "DevPulse Utilities",
    version: "2.0.0",
    features: ["100% Client-Side", "Privacy Guaranteed", "Zero Latency", "No Data Logs"],
    settings: {
      theme: "dark",
      language: language,
      autoSave: true
    },
    metrics: {
      activeUsers: 45000,
      rating: 4.95,
      supportedBrowsers: ["Chrome", "Firefox", "Safari", "Edge"]
    }
  };

  const isAr = language === 'ar';

  const strings = {
    prettify2: isAr ? 'تنسيق (مسافتان)' : 'Prettify (2 spaces)',
    prettify4: isAr ? '٤ مسافات' : '4 spaces',
    minify: isAr ? 'ضغط وتقليص (Minify)' : 'Minify',
    validate: isAr ? 'تدقيق وفحص (Validate)' : 'Validate',
    loadSample: isAr ? 'تحميل نموذج' : 'Load Sample',
    copy: isAr ? 'نسخ' : 'Copy',
    download: isAr ? 'تحميل' : 'Download',
    clear: isAr ? 'مسح' : 'Clear',
    placeholder: isAr ? 'الصق أو اكتب كود أو كائن JSON هنا...' : 'Paste or type your JSON code here...',
    syntaxErrorTitle: isAr ? 'خطأ في صياغة JSON' : 'JSON Syntax Error',
    detectedAt: isAr ? 'تم اكتشاف الخطأ بالقرب من السطر' : 'Detected near Line',
    column: isAr ? 'العمود' : 'Column',
    validJson: isAr ? 'نص JSON سليم ومطابق للمواصفات تماماً!' : 'Valid JSON syntax! No parsing errors found.',
    emptyInput: isAr ? 'حقل الإدخال فارغ' : 'Input is empty',
    lines: isAr ? 'الأسطر:' : 'Lines:',
    size: isAr ? 'الحجم:' : 'Size:',
    clientReady: isAr ? 'المعالج المحلي جاهز' : 'Client parser ready',
    formattedSuccess: isAr ? 'تم تنسيق JSON بنجاح!' : 'JSON formatted successfully!',
    minifiedSuccess: isAr ? 'تم ضغط JSON بنجاح!' : 'JSON minified successfully!',
    copiedSuccess: isAr ? 'تم نسخ كود JSON إلى الحافظة!' : 'JSON copied to clipboard!',
    downloadedSuccess: isAr ? 'تم تحميل ملف JSON بنجاح' : 'Downloaded JSON file'
  };

  const handleFormat = (indent: number = indentSpaces) => {
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed, null, indent));
      setValidationError(null);
      setIsValid(true);
      addToast(strings.formattedSuccess, '', 'success');
    } catch (err: any) {
      parseAndSetError(err);
      setIsValid(false);
    }
  };

  const handleMinify = () => {
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setInputJson(JSON.stringify(parsed));
      setValidationError(null);
      setIsValid(true);
      addToast(strings.minifiedSuccess, '', 'success');
    } catch (err: any) {
      parseAndSetError(err);
      setIsValid(false);
    }
  };

  const handleValidate = () => {
    if (!inputJson.trim()) {
      setValidationError({ message: strings.emptyInput });
      setIsValid(false);
      return;
    }
    try {
      JSON.parse(inputJson);
      setValidationError(null);
      setIsValid(true);
      addToast(strings.validJson, '', 'success');
    } catch (err: any) {
      parseAndSetError(err);
      setIsValid(false);
    }
  };

  const parseAndSetError = (err: any) => {
    const message = err.message || 'Invalid JSON syntax';
    let line: number | undefined;
    let column: number | undefined;

    const lineColMatch = message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else {
      const posMatch = message.match(/position (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const upToPos = inputJson.substring(0, pos);
        const lines = upToPos.split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    setValidationError({ message, line, column });
  };

  const handleCopy = () => {
    if (!inputJson) return;
    navigator.clipboard.writeText(inputJson).then(() => {
      addToast(strings.copiedSuccess, '', 'success');
    });
  };

  const handleDownload = () => {
    if (!inputJson) return;
    const blob = new Blob([inputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast(strings.downloadedSuccess, '', 'success');
  };

  const handleLoadSample = () => {
    setInputJson(JSON.stringify(sampleJson, null, 2));
    setValidationError(null);
    setIsValid(true);
  };

  // Line counter calculation
  const lineCount = inputJson ? inputJson.split('\n').length : 1;
  const byteSize = new Blob([inputJson]).size;

  return (
    <div className="space-y-4">
      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleFormat(2)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{strings.prettify2}</span>
          </button>

          <button
            onClick={() => handleFormat(4)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <span>{strings.prettify4}</span>
          </button>

          <button
            onClick={handleMinify}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>{strings.minify}</span>
          </button>

          <button
            onClick={handleValidate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{strings.validate}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleLoadSample}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
          >
            {strings.loadSample}
          </button>

          <button
            onClick={handleCopy}
            disabled={!inputJson}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title={strings.copy}
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{strings.copy}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!inputJson}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700 disabled:opacity-40 transition-colors"
            title={strings.download}
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{strings.download}</span>
          </button>

          <button
            onClick={() => {
              setInputJson('');
              setValidationError(null);
              setIsValid(null);
            }}
            disabled={!inputJson}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors"
            title={strings.clear}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error / Success Notification Banner */}
      {validationError && (
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200 text-xs sm:text-sm animate-in fade-in duration-150">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <div className="font-bold">{strings.syntaxErrorTitle}</div>
            <div className="font-mono text-xs opacity-90">{validationError.message}</div>
            {validationError.line && (
              <div className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                {strings.detectedAt} {validationError.line}
                {validationError.column ? `, ${strings.column} ${validationError.column}` : ''}
              </div>
            )}
          </div>
        </div>
      )}

      {isValid && !validationError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-200 text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{strings.validJson}</span>
        </div>
      )}

      {/* Editor Box */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-xs sm:text-sm shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
        <textarea
          value={inputJson}
          onChange={e => {
            setInputJson(e.target.value);
            if (isValid !== null || validationError !== null) {
              setIsValid(null);
              setValidationError(null);
            }
          }}
          placeholder={strings.placeholder}
          rows={16}
          dir="ltr"
          spellCheck={false}
          className="w-full p-4 bg-transparent text-slate-100 font-mono focus:outline-none resize-y leading-relaxed text-left"
        />

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-800 text-[11px] text-slate-400 font-sans">
          <div className="flex items-center gap-3">
            <span>{strings.lines} <strong className="text-slate-200">{lineCount}</strong></span>
            <span>{strings.size} <strong className="text-slate-200">{(byteSize / 1024).toFixed(2)} KB</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>{strings.clientReady}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
