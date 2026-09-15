import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  Code,
  Link as LinkIcon,
  Table,
  Copy,
  Download,
  FileCode,
  Eye,
  Columns
} from 'lucide-react';

export const MarkdownEditor: React.FC = () => {
  const { addToast } = useApp();
  const [markdown, setMarkdown] = useState<string>(`# Welcome to DevPulse Markdown Editor

A high-performance, split-screen **live Markdown previewer** engineered for developers and technical writers.

## Key Highlights
- **100% Client-Side**: No telemetry or remote storage.
- Real-time HTML rendering & syntax styling.
- Export as raw \`.md\` file or compiled HTML.

### Code Demonstration
\`\`\`javascript
function calculateEntropy(password) {
  const charPool = 94; // Standard ASCII symbols
  return Math.log2(Math.pow(charPool, password.length));
}
\`\`\`

### Data Matrix Table
| Utility Tool | Execution | Privacy Guarantee |
| :--- | :--- | :--- |
| JSON Formatter | Browser Native | Zero Server Logs |
| QR Generator | Client Canvas | 100% Offline |
| Base64 Tool | Web API | Zero Roundtrips |

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra
`);

  // Basic client-side markdown to HTML renderer
  const renderMarkdownToHtml = (md: string): string => {
    let html = md
      // Escaping
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3 pb-1 border-b border-slate-200 dark:border-slate-800">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">$1</h1>')
      // Blockquote
      .replace(/^\> (.*$)/gim, '<blockquote class="p-3 my-3 border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 text-slate-700 dark:text-slate-300 italic rounded-r-xl">$1</blockquote>')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      // Inline Code
      .replace(/\`(.*?)\`/gim, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs">$1</code>')
      // Links
      .replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 dark:text-indigo-400 underline">$1</a>')
      // Lists
      .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>')
      // Paragraphs
      .replace(/\n\s*\n/gim, '</p><p class="my-2 leading-relaxed text-slate-700 dark:text-slate-300">');

    return `<p class="my-2 leading-relaxed text-slate-700 dark:text-slate-300">${html}</p>`;
  };

  const insertSyntax = (prefix: string, suffix: string = '') => {
    setMarkdown(prev => `${prev}\n${prefix}sample text${suffix}`);
  };

  const handleCopyHtml = () => {
    const html = renderMarkdownToHtml(markdown);
    navigator.clipboard.writeText(html).then(() => {
      addToast('Copied compiled HTML to clipboard!', '', 'success');
    });
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `document-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded .md document', '', 'success');
  };

  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const chars = markdown.length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertSyntax('**', '**')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('*', '*')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('# ')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('## ')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('- ')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="List Item"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('```\n', '\n```')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('[Link Text](', ')')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            title="Link"
          >
            <LinkIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            <strong>{words}</strong> words • <strong>{chars}</strong> chars
          </span>
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy HTML</span>
          </button>
          <button
            onClick={handleDownloadMd}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export .md</span>
          </button>
        </div>
      </div>

      {/* Split Screen Panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Editor Pane */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5" />
            <span>Markdown Source</span>
          </div>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            rows={18}
            className="w-full p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed border border-slate-800 shadow-inner"
          />
        </div>

        {/* Live Preview Pane */}
        <div className="space-y-1.5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-indigo-500" />
            <span>Rendered Preview</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: renderMarkdownToHtml(markdown) }}
            className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[420px] max-h-[520px] overflow-y-auto text-xs sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
