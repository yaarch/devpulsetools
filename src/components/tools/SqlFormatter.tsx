import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Trash2, Code, Sparkles, FileText } from 'lucide-react';

const SAMPLE_SQL = `SELECT u.id, u.username, u.email, count(o.id) as total_orders, sum(o.amount) as total_spent FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND u.created_at >= '2026-01-01' GROUP BY u.id, u.username, u.email HAVING count(o.id) > 5 ORDER BY total_spent DESC LIMIT 50;`;

export const SqlFormatter: React.FC = () => {
  const { addToast } = useApp();
  const [input, setInput] = useState(SAMPLE_SQL);
  const [indentSize, setIndentSize] = useState<number>(2);
  const [uppercaseKeywords, setUppercaseKeywords] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // High-performance client-side SQL formatter
  const formatSql = (sql: string): string => {
    if (!sql.trim()) return '';

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN',
      'JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'UNION', 'UNION ALL',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'DROP TABLE',
      'ALTER TABLE', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'AS', 'IN', 'NOT IN', 'BETWEEN',
      'EXISTS', 'NOT EXISTS', 'LIKE', 'ILIKE', 'IS NULL', 'IS NOT NULL', 'ASC', 'DESC',
      'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'
    ];

    let result = sql.replace(/\s+/g, ' ').trim();

    // Standardize keywords casing
    if (uppercaseKeywords) {
      keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        result = result.replace(regex, kw);
      });
    }

    // Line breaks before major SQL clauses
    const majorClauses = [
      'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'JOIN',
      'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'UNION', 'INSERT INTO', 'VALUES',
      'UPDATE', 'SET', 'DELETE FROM'
    ];

    const indent = ' '.repeat(indentSize);

    majorClauses.forEach(clause => {
      const regex = new RegExp(`\\s+(${clause})\\b`, 'g');
      result = result.replace(regex, `\n$1`);
    });

    // Indent sub-clauses like AND, OR
    result = result.replace(/\s+(AND|OR)\b/g, `\n${indent}$1`);

    return result;
  };

  const formattedSql = formatSql(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedSql);
    setCopied(true);
    addToast('Copied formatted SQL!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const minifySql = () => {
    const minified = input.replace(/\s+/g, ' ').trim();
    setInput(minified);
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={uppercaseKeywords}
              onChange={e => setUppercaseKeywords(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>UPPERCASE SQL Keywords</span>
          </label>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-600 dark:text-slate-300">Indent:</span>
            <div className="inline-flex rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-0.5">
              {[2, 4].map(s => (
                <button
                  key={s}
                  onClick={() => setIndentSize(s)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    indentSize === s ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {s} spaces
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={minifySql}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            Minify Single-Line
          </button>
          <button
            onClick={() => setInput('')}
            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy SQL'}</span>
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Raw SQL Query
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={14}
            className="w-full p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
            Beautified Formatted SQL
          </label>
          <textarea
            value={formattedSql}
            readOnly
            rows={14}
            className="w-full p-4 rounded-2xl bg-slate-900 text-indigo-300 font-mono text-xs focus:outline-none border border-slate-800 resize-y"
          />
        </div>
      </div>
    </div>
  );
};
