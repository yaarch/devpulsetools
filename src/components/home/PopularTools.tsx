import React from 'react';
import { useApp } from '../../context/AppContext';
import { TOOLS_LIST } from '../../data/toolsData';
import { ToolCard } from './ToolCard';
import { Flame } from 'lucide-react';

export const PopularTools: React.FC = () => {
  const { t } = useApp();
  const popularIds = [
    'json-formatter',
    'image-compressor',
    'qr-code-generator',
    'password-generator',
    'color-converter',
    'jwt-decoder',
    'gpa-calculator'
  ];

  const popularTools = TOOLS_LIST.filter(t => popularIds.includes(t.id));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.popularTools}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {popularTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
};
