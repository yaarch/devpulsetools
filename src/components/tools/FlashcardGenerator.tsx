import React, { useState, useEffect } from 'react';
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
          <div className={`w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
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
