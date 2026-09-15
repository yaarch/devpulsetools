import React, { useState } from 'react';
import { Copy, RefreshCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CitationGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [style, setStyle] = useState<'APA' | 'MLA' | 'Chicago'>('APA');
  const [type, setType] = useState<'Website' | 'Book' | 'Article'>('Website');
  
  const [formData, setFormData] = useState({
    authorFirst: '', authorLast: '', title: '', container: '', publisher: '', year: '', month: '', day: '', url: '', pages: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateCitation = () => {
    const { authorFirst, authorLast, title, container, publisher, year, month, day, url, pages } = formData;
    const date = year ? `(${year})` : '(n.d.)';
    const author = authorLast ? `${authorLast}${authorFirst ? `, ${authorFirst[0]}.` : ''}` : 'Unknown Author';
    
    if (style === 'APA') {
      if (type === 'Website') {
        return `${author}. ${date}. ${title ? `${title}.` : ''} ${container ? `${container}.` : ''} ${url}`;
      } else if (type === 'Book') {
        return `${author}. ${date}. ${title ? `*${title}*.` : ''} ${publisher ? `${publisher}.` : ''}`;
      }
    } else if (style === 'MLA') {
      const mlaDate = year ? `${day ? day + ' ' : ''}${month ? month.substring(0,3) + '. ' : ''}${year}` : 'n.d.';
      if (type === 'Website') {
        return `${authorLast ? authorLast + (authorFirst ? ', ' + authorFirst : '') : 'Unknown Author'}. "${title}." *${container}*, ${publisher ? publisher + ', ' : ''}${mlaDate}, ${url}.`;
      }
    }
    return `${authorLast}, ${authorFirst}. "${title}". ${container}, ${year}. ${url}`;
  };

  const copyToClipboard = () => {
    const citation = generateCitation();
    navigator.clipboard.writeText(citation);
    addToast('Citation Copied', 'The citation has been copied to your clipboard.', 'success');
  };

  const reset = () => {
    setFormData({ authorFirst: '', authorLast: '', title: '', container: '', publisher: '', year: '', month: '', day: '', url: '', pages: '' });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Citation Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value as any)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="APA">APA (7th ed.)</option>
                <option value="MLA">MLA (9th ed.)</option>
                <option value="Chicago">Chicago</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-500 mb-1">Source Type</label>
              <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="Website">Website</option>
                <option value="Book">Book</option>
                <option value="Article">Journal Article</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Author First Name</label>
              <input type="text" name="authorFirst" value={formData.authorFirst} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Author Last Name</label>
              <input type="text" name="authorLast" value={formData.authorLast} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Source Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Container (Website Name, Journal)</label>
            <input type="text" name="container" value={formData.container} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Year</label>
              <input type="text" name="year" value={formData.year} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Month</label>
              <input type="text" name="month" value={formData.month} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Day</label>
              <input type="text" name="day" value={formData.day} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">URL (if applicable)</label>
            <input type="text" name="url" value={formData.url} onChange={handleChange} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm" />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800/30 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">Generated Citation</h3>
              <button onClick={reset} className="p-1.5 text-indigo-400 hover:text-indigo-600 bg-white dark:bg-slate-800 rounded-md shadow-sm">
                <RefreshCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex-1">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl text-slate-800 dark:text-slate-200 text-sm leading-relaxed border border-slate-200 shadow-inner break-words italic">
                {generateCitation()}
              </div>
            </div>
            <button onClick={copyToClipboard} className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm">
              <Copy className="w-4 h-4" /> Copy Citation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
