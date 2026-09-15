import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Download, ArrowUpDown, Trash2, Table as TableIcon, FileSpreadsheet } from 'lucide-react';

const SAMPLE_JSON = `[
  { "id": 1, "name": "Sarah Connor", "email": "sarah@sky.net", "role": "Admin", "active": true },
  { "id": 2, "name": "John Doe", "email": "john@example.com", "role": "Developer", "active": false },
  { "id": 3, "name": "Elena Rostova", "email": "elena@pulse.dev", "role": "Designer", "active": true }
]`;

export const JsonCsvConverter: React.FC = () => {
  const { addToast } = useApp();
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [input, setInput] = useState(SAMPLE_JSON);
  const [delimiter, setDelimiter] = useState<',' | ';' | '\t'> (',');
  const [copied, setCopied] = useState<boolean>(false);
  const [showTablePreview, setShowTablePreview] = useState<boolean>(true);

  // Conversion logic
  const convertJsonToCsv = (jsonStr: string, delim: string): { output: string; previewRows: string[][] } => {
    try {
      const parsed = JSON.parse(jsonStr);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (arr.length === 0) return { output: '', previewRows: [] };

      // Collect all keys
      const headers = Array.from(new Set(arr.flatMap(item => Object.keys(item))));

      const escapeCell = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
        if (str.includes(delim) || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const rows = [
        headers.map(escapeCell).join(delim),
        ...arr.map(row => headers.map(h => escapeCell(row[h])).join(delim)),
      ];

      const previewRows = [headers, ...arr.map(row => headers.map(h => (row[h] !== undefined ? String(row[h]) : '')))];

      return { output: rows.join('\n'), previewRows };
    } catch (err: any) {
      return { output: `Error converting JSON: ${err.message}`, previewRows: [] };
    }
  };

  const convertCsvToJson = (csvStr: string, delim: string): { output: string; previewRows: string[][] } => {
    try {
      const lines = csvStr.trim().split(/\r?\n/).filter(Boolean);
      if (lines.length === 0) return { output: '[]', previewRows: [] };

      // Simple regex csv parser
      const parseLine = (text: string) => {
        const re = new RegExp(`(?:${delim}|^)(?:"([^"]*(?:""[^"]*)*)"|([^"${delim}]*))`, 'gi');
        const row: string[] = [];
        let match;
        while ((match = re.exec(text)) !== null) {
          let value = match[1] !== undefined ? match[1].replace(/""/g, '"') : match[2];
          row.push(value || '');
          if (re.lastIndex === 0) break;
        }
        return row;
      };

      const headers = parseLine(lines[0]);
      const dataRows = lines.slice(1).map(parseLine);

      const jsonObjects = dataRows.map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header, i) => {
          const val = row[i] ?? '';
          if (val === 'true') obj[header] = true;
          else if (val === 'false') obj[header] = false;
          else if (!isNaN(Number(val)) && val !== '') obj[header] = Number(val);
          else obj[header] = val;
        });
        return obj;
      });

      return {
        output: JSON.stringify(jsonObjects, null, 2),
        previewRows: [headers, ...dataRows],
      };
    } catch (err: any) {
      return { output: `Error converting CSV: ${err.message}`, previewRows: [] };
    }
  };

  const result = mode === 'json-to-csv'
    ? convertJsonToCsv(input, delimiter)
    : convertCsvToJson(input, delimiter);

  const handleCopy = () => {
    if (!result.output || result.output.startsWith('Error')) return;
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    addToast('Copied output to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result.output || result.output.startsWith('Error')) return;
    const isCsv = mode === 'json-to-csv';
    const blob = new Blob([result.output], {
      type: isCsv ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isCsv ? 'converted_data.csv' : 'converted_data.json';
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded file!', a.download, 'success');
  };

  const handleSwap = () => {
    if (!result.output || result.output.startsWith('Error')) return;
    setInput(result.output);
    setMode(prev => (prev === 'json-to-csv' ? 'csv-to-json' : 'json-to-csv'));
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-700 p-1">
            <button
              onClick={() => setMode('json-to-csv')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'json-to-csv'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              JSON &rarr; CSV
            </button>
            <button
              onClick={() => setMode('csv-to-json')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'csv-to-json'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              CSV &rarr; JSON
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Delimiter:</span>
            <select
              value={delimiter}
              onChange={e => setDelimiter(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-xs"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="	">Tab (\t)</option>
            </select>
          </div>

          <button
            onClick={() => setShowTablePreview(!showTablePreview)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              showTablePreview
                ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table Preview</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Swap</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Editor Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>{mode === 'json-to-csv' ? 'Input JSON Array' : 'Input CSV Content'}</span>
            <button
              onClick={() => setInput('')}
              className="text-slate-400 hover:text-rose-500"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            {mode === 'json-to-csv' ? 'Converted CSV Output' : 'Converted JSON Output'}
          </span>
          <textarea
            value={result.output}
            readOnly
            rows={12}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none resize-y"
          />
        </div>
      </div>

      {/* Table Data Preview */}
      {showTablePreview && result.previewRows.length > 0 && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-indigo-500" />
              Tabular Data Preview ({result.previewRows.length - 1} rows)
            </span>
          </div>
          <div className="overflow-x-auto max-h-72">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  {result.previewRows[0]?.map((header, idx) => (
                    <th key={idx} className="p-2.5 font-semibold whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-[11px]">
                {result.previewRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
