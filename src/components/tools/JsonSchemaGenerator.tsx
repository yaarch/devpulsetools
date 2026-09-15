import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Braces, Sparkles, Download, Trash2 } from 'lucide-react';

const SAMPLE_JSON = `{
  "id": 101,
  "title": "Quantum Computing Essentials",
  "author": {
    "name": "Dr. Sarah Adams",
    "email": "sarah.adams@university.edu"
  },
  "tags": ["physics", "computing", "algorithms"],
  "isPublished": true,
  "views": 15420,
  "rating": 4.85
}`;

export const JsonSchemaGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [inputJson, setInputJson] = useState(SAMPLE_JSON);
  const [requireAll, setRequireAll] = useState(true);
  const [copied, setCopied] = useState(false);

  // Infer schema
  const inferSchema = (val: any): any => {
    if (val === null) return { type: 'null' };
    if (typeof val === 'boolean') return { type: 'boolean' };
    if (typeof val === 'number') {
      return Number.isInteger(val) ? { type: 'integer' } : { type: 'number' };
    }
    if (typeof val === 'string') {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      const isIsoDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(val);
      if (isEmail) return { type: 'string', format: 'email' };
      if (isIsoDate) return { type: 'string', format: 'date-time' };
      return { type: 'string' };
    }
    if (Array.isArray(val)) {
      if (val.length === 0) return { type: 'array', items: {} };
      return {
        type: 'array',
        items: inferSchema(val[0]),
      };
    }
    if (typeof val === 'object') {
      const properties: Record<string, any> = {};
      const required: string[] = [];

      for (const [k, v] of Object.entries(val)) {
        properties[k] = inferSchema(v);
        if (requireAll) required.push(k);
      }

      const schema: any = {
        type: 'object',
        properties,
      };
      if (required.length > 0) {
        schema.required = required;
      }
      return schema;
    }
    return { type: 'string' };
  };

  const getSchemaOutput = (): string => {
    try {
      const parsed = JSON.parse(inputJson);
      const body = inferSchema(parsed);
      const fullSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
        title: 'GeneratedSchema',
        ...body,
      };
      return JSON.stringify(fullSchema, null, 2);
    } catch (err: any) {
      return `// Invalid JSON: ${err.message}`;
    }
  };

  const schemaOutput = getSchemaOutput();

  const handleCopy = () => {
    if (schemaOutput.startsWith('//')) return;
    navigator.clipboard.writeText(schemaOutput);
    setCopied(true);
    addToast('Copied JSON Schema!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (schemaOutput.startsWith('//')) return;
    const blob = new Blob([schemaOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schema.json';
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded schema.json', '', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={requireAll}
            onChange={e => setRequireAll(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>Mark all object properties as "required"</span>
        </label>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Schema</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Schema'}</span>
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            <span>Input Sample JSON</span>
            <button
              onClick={() => setInputJson('{}')}
              className="text-slate-400 hover:text-rose-500 transition-colors"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            value={inputJson}
            onChange={e => setInputJson(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Generated Draft-07 JSON Schema
          </span>
          <textarea
            value={schemaOutput}
            readOnly
            rows={14}
            className="w-full p-4 rounded-2xl bg-slate-900 text-indigo-300 font-mono text-xs focus:outline-none border border-slate-800 resize-y"
          />
        </div>
      </div>
    </div>
  );
};
