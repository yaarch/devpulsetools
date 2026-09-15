import React from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { ToolCard } from './ToolCard';
import { Clock } from 'lucide-react';

export const RecentTools: React.FC = () => {
  const { recentTools, t } = useApp();

  if (!recentTools || recentTools.length === 0) {
    return null;
  }

  // Get max 4 recent tools
  const recentItems = recentTools
    .slice(0, 4)
    .map(id => TOOLS_LIST.find(t => t.id === id))
    .filter(Boolean) as typeof TOOLS_LIST;

  if (recentItems.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.recentlyUsed}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {recentItems.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};
