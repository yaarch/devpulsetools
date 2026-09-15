const fs = require('fs');

const f1 = `import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowRight, ArrowLeft, RefreshCcw, Save } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export const FlashcardGenerator: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([
    { id: '1', front: 'What does CSS stand for?', back: 'Cascading Style Sheets' },
    { id: '2', front: 'What is the powerhouse of the cell?', back: 'Mitochondria' }
  ]);
  
  const [mode, setMode] = useState<'edit' | 'study'>('edit');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('devpulse_flashcards');
      if (saved) setCards(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveCards = (newCards: Flashcard[]) => {
    setCards(newCards);
    try {
      localStorage.setItem('devpulse_flashcards', JSON.stringify(newCards));
    } catch (e) {}
  };

  const addCard = () => {
    saveCards([...cards, { id: Math.random().toString(), front: '', back: '' }]);
  };

  const updateCard = (id: string, field: 'front' | 'back', value: string) => {
    saveCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCard = (id: string) => {
    saveCards(cards.filter(c => c.id !== id));
  };

  const startStudy = () => {
    if (cards.length === 0) return;
    setMode('study');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  if (mode === 'study') {
    const currentCard = cards[currentIndex];
    return (
      <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center px-2">
          <button onClick={() => setMode('edit')} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
            ← Back to Editor
          </button>
          <span className="text-sm font-medium text-slate-400">Card {currentIndex + 1} of {cards.length}</span>
        </div>

        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full h-80 sm:h-96 cursor-pointer perspective-1000 group"
        >
          <div className={\`w-full h-full transition-all duration-500 transform-style-3d \${isFlipped ? 'rotate-y-180' : ''}\`}>
            <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900/30 rounded-3xl shadow-md flex items-center justify-center p-8 sm:p-12 text-center group-hover:border-indigo-300 dark:group-hover:border-indigo-700/50 transition-colors">
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100">{currentCard.front}</h2>
              <div className="absolute bottom-6 text-xs font-semibold text-slate-400">Click to flip</div>
            </div>
            
            <div className="absolute inset-0 w-full h-full backface-hidden bg-indigo-50 dark:bg-slate-800 border-2 border-indigo-200 dark:border-slate-700 rounded-3xl shadow-md flex items-center justify-center p-8 sm:p-12 text-center rotate-y-180">
              <h2 className="text-2xl sm:text-4xl font-bold text-indigo-900 dark:text-indigo-200">{currentCard.back}</h2>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <button onClick={prevCard} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setIsFlipped(!isFlipped)} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-sm">
            Flip Card
          </button>
          <button onClick={nextCard} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Flashcard Editor</h2>
        <div className="flex gap-3">
          <button onClick={addCard} className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm">
            <Plus className="w-4 h-4" /> Add Card
          </button>
          <button onClick={startStudy} disabled={cards.length === 0} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-sm disabled:opacity-50">
            <PlayIcon className="w-4 h-4" /> Study Mode
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div key={card.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative group">
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="text-xs font-bold text-slate-300 dark:text-slate-600">#{idx + 1}</span>
            </div>
            
            <div className="space-y-4 mt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Front (Question)</label>
                <textarea 
                  value={card.front}
                  onChange={(e) => updateCard(card.id, 'front', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                  placeholder="Enter question here..."
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Back (Answer)</label>
                <textarea 
                  value={card.back}
                  onChange={(e) => updateCard(card.id, 'back', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-20"
                  placeholder="Enter answer here..."
                />
              </div>
            </div>
            
            <button 
              onClick={() => removeCard(card.id)}
              className="absolute -bottom-3 -right-3 w-8 h-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-rose-50 dark:hover:bg-rose-500/10"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);
`;
fs.writeFileSync('src/components/tools/FlashcardGenerator.tsx', f1);

const f2 = `import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings2 } from 'lucide-react';

export const PomodoroTimer: React.FC = () => {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [settings, setSettings] = useState({ focus: 25, shortBreak: 5, longBreak: 15 });
  const [showSettings, setShowSettings] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(settings[newMode] * 60);
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      try {
        new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(() => {});
      } catch (e) {}
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode] * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m.toString().padStart(2, '0')}:\${s.toString().padStart(2, '0')}\`;
  };

  const handleSettingChange = (key: keyof typeof settings, value: string) => {
    const num = parseInt(value) || 1;
    setSettings(prev => ({ ...prev, [key]: num }));
    if (mode === key) {
      setTimeLeft(num * 60);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10">
        <div className="flex justify-center mb-8 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full">
          {(['focus', 'shortBreak', 'longBreak'] as const).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={\`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all \${
                mode === m 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }\`}
            >
              {m === 'focus' ? 'Focus' : m === 'shortBreak' ? 'Short Break' : 'Long Break'}
            </button>
          ))}
        </div>
        <div className="text-center mb-10">
          <div className="text-8xl sm:text-9xl font-extrabold text-slate-800 dark:text-white tracking-tight tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button onClick={resetTimer} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={toggleTimer} className={\`w-20 h-20 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 \${isRunning ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400' : 'bg-indigo-600 text-white'}\`}>
            {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-2" />}
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={\`w-12 h-12 flex items-center justify-center rounded-full transition-colors \${showSettings ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}\`}>
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
        {showSettings && (
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Focus (min)</label>
              <input type="number" min="1" value={settings.focus} onChange={e => handleSettingChange('focus', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Short Break</label>
              <input type="number" min="1" value={settings.shortBreak} onChange={e => handleSettingChange('shortBreak', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Long Break</label>
              <input type="number" min="1" value={settings.longBreak} onChange={e => handleSettingChange('longBreak', e.target.value)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
`;
fs.writeFileSync('src/components/tools/PomodoroTimer.tsx', f2);

const f3 = `import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shuffle, Copy, RefreshCcw } from 'lucide-react';

export const RandomGroupGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [namesText, setNamesText] = useState('Alice\\nBob\\nCharlie\\nDavid\\nEve\\nFrank\\nGrace\\nHeidi');
  const [numGroups, setNumGroups] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  const generateGroups = () => {
    const names = namesText.split('\\n').map(n => n.trim()).filter(n => n !== '');
    if (names.length === 0) {
      addToast('Error', 'Please enter at least one name.', 'error');
      return;
    }
    const shuffled = [...names];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const result: string[][] = Array.from({ length: numGroups }, () => []);
    shuffled.forEach((name, index) => {
      result[index % numGroups].push(name);
    });
    setGroups(result);
  };

  const copyResults = () => {
    if (groups.length === 0) return;
    const text = groups.map((g, i) => \`Group \${i + 1}: \${g.join(', ')}\`).join('\\n');
    navigator.clipboard.writeText(text);
    addToast('Copied', 'Groups copied to clipboard', 'success');
  };

  const reset = () => {
    setNamesText('');
    setGroups([]);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">Names List</label>
              <span className="text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">One per line</span>
            </div>
            <textarea
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full h-48 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-medium"
              placeholder="Enter names here..."
            />
            <div className="flex items-center gap-4 mt-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-500 mb-1">Number of Groups</label>
                <input type="number" min="1" max="50" value={numGroups} onChange={(e) => setNumGroups(parseInt(e.target.value) || 1)} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="flex-none pt-5">
                <button onClick={reset} className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-700 rounded-xl transition-colors">
                  <RefreshCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button onClick={generateGroups} className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-sm">
              <Shuffle className="w-5 h-5" /> Generate Groups
            </button>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner p-5 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Generated Groups</h3>
            {groups.length > 0 && (
              <button onClick={copyResults} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
                <Copy className="w-3.5 h-3.5" /> Copy All
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {groups.length > 0 ? (
              groups.map((group, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/60">
                  <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Group {i + 1}</h4>
                  <ul className="flex flex-wrap gap-2">
                    {group.map((member, j) => (
                      <li key={j} className="bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50">
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <Users className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm">Click generate to create groups</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
`;
fs.writeFileSync('src/components/tools/RandomGroupGenerator.tsx', f3);

const f4 = `import React, { useState } from 'react';
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
    const date = year ? \`(\${year})\` : '(n.d.)';
    const author = authorLast ? \`\${authorLast}\${authorFirst ? \`, \${authorFirst[0]}.\` : ''}\` : 'Unknown Author';
    
    if (style === 'APA') {
      if (type === 'Website') {
        return \`\${author}. \${date}. \${title ? \`\${title}.\` : ''} \${container ? \`\${container}.\` : ''} \${url}\`;
      } else if (type === 'Book') {
        return \`\${author}. \${date}. \${title ? \`*\${title}*.\` : ''} \${publisher ? \`\${publisher}.\` : ''}\`;
      }
    } else if (style === 'MLA') {
      const mlaDate = year ? \`\${day ? day + ' ' : ''}\${month ? month.substring(0,3) + '. ' : ''}\${year}\` : 'n.d.';
      if (type === 'Website') {
        return \`\${authorLast ? authorLast + (authorFirst ? ', ' + authorFirst : '') : 'Unknown Author'}. "\${title}." *\${container}*, \${publisher ? publisher + ', ' : ''}\${mlaDate}, \${url}.\`;
      }
    }
    return \`\${authorLast}, \${authorFirst}. "\${title}". \${container}, \${year}. \${url}\`;
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
`;
fs.writeFileSync('src/components/tools/CitationGenerator.tsx', f4);

