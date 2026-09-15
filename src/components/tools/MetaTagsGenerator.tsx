import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Globe, Share2, Sparkles, Image as ImageIcon } from 'lucide-react';

export const MetaTagsGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [title, setTitle] = useState('DevPulse Tools - 100% In-Browser Privacy Utilities');
  const [description, setDescription] = useState('A fast, zero-tracking suite of 40 essential developer, designer, and security tools running entirely in client-side memory.');
  const [url, setUrl] = useState('https://devpulsetools.pages.dev/');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop');
  const [siteName, setSiteName] = useState('DevPulse Tools');
  const [twitterHandle, setTwitterHandle] = useState('@devpulsetools');
  const [copied, setCopied] = useState(false);
  const [previewTab, setPreviewTab] = useState<'google' | 'facebook' | 'twitter'>('google');

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${imageUrl}" />
<meta property="og:site_name" content="${siteName}" />

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${imageUrl}" />
${twitterHandle ? `<meta property="twitter:creator" content="${twitterHandle}" />` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    addToast('Copied meta tags to clipboard!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Grid: Form Inputs & Social Previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Metadata Details
          </span>

          {/* Title */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Page Title</span>
              <span className={`font-mono ${title.length > 60 ? 'text-amber-500' : 'text-slate-400'}`}>
                {title.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Meta Description</span>
              <span className={`font-mono ${description.length > 160 ? 'text-amber-500' : 'text-slate-400'}`}>
                {description.length}/160 chars
              </span>
            </div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
            />
          </div>

          {/* URL & Site Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Canonical URL</label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Site Name</label>
              <input
                type="text"
                value={siteName}
                onChange={e => setSiteName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
          </div>

          {/* Image URL & Twitter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Social Card Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">Twitter / X Creator</label>
              <input
                type="text"
                value={twitterHandle}
                onChange={e => setTwitterHandle(e.target.value)}
                placeholder="@username"
                className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Live Social Previews (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
              {(['google', 'facebook', 'twitter'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setPreviewTab(tab)}
                  className={`px-3 py-1 text-xs font-bold capitalize rounded-lg transition-all ${
                    previewTab === tab ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tab === 'google' ? 'Google Search' : tab === 'facebook' ? 'Facebook / LinkedIn' : 'Twitter / X'}
                </button>
              ))}
            </div>
          </div>

          {/* Preview Box */}
          <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[300px] flex items-center justify-center">
            {previewTab === 'google' && (
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-lg w-full space-y-1">
                <div className="text-xs text-slate-500 font-mono truncate">{url}</div>
                <h4 className="text-blue-700 dark:text-blue-400 text-base font-medium hover:underline cursor-pointer truncate">
                  {title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {previewTab === 'facebook' && (
              <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-md">
                <div className="h-44 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img src={imageUrl} alt="Social Card" className="w-full h-full object-cover" />
                </div>
                <div className="p-3.5 space-y-1 bg-slate-50 dark:bg-slate-900">
                  <div className="text-[10px] uppercase font-bold text-slate-400 truncate">{new URL(url).hostname || siteName}</div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">{description}</p>
                </div>
              </div>
            )}

            {previewTab === 'twitter' && (
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md w-full shadow-md">
                <div className="relative h-44 bg-slate-800 overflow-hidden">
                  <img src={imageUrl} alt="Twitter Card" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-semibold">
                    {new URL(url).hostname}
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{title}</h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Generated Meta Tag Code Card */}
      <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            HTML &lt;head&gt; Meta Tags
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy All Tags'}</span>
          </button>
        </div>
        <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 font-mono text-xs overflow-x-auto select-all leading-relaxed">
          {generatedHtml}
        </pre>
      </div>
    </div>
  );
};
