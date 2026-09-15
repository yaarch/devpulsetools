import React, { useState, useMemo, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shuffle, 
  Copy, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Check, 
  BookOpen, 
  HelpCircle,
  ArrowRightLeft,
  Settings2
} from 'lucide-react';

type ScrambleMode = 'typoglycemia' | 'allLetters' | 'wordsInSentence' | 'reverseWords' | 'reverseLetters' | 'shuffleLines';

export const WordScrambler: React.FC = () => {
  const { addToast } = useApp();

  const sampleTexts = [
    {
      label: 'Typoglycemia Effect',
      text: 'According to research at Cambridge University, it does not matter in what order the letters in a word are, the only important thing is that the first and last letter be in the right place. The rest can be a total mess and you can still read it without problem.'
    },
    {
      label: 'Famous Pangram',
      text: 'The quick brown fox jumps over the lazy dog and barked at the shining moon.'
    },
    {
      label: 'Classroom Vocabulary',
      text: 'photosynthesis\nmitochondria\necosystem\nbiodiversity\nhomeostasis\nchromosome'
    },
    {
      label: 'Language Learning',
      text: 'Learning a new language opens doors to different cultures and ways of thinking.'
    }
  ];

  const [input, setInput] = useState<string>(sampleTexts[0].text);
  const [mode, setMode] = useState<ScrambleMode>('typoglycemia');
  const [preservePunctuation, setPreservePunctuation] = useState<boolean>(true);
  const [preserveFirstLast, setPreserveFirstLast] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<number>(4);
  const [seed, setSeed] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Helper to shuffle array (Fisher-Yates)
  const shuffleArray = useCallback(<T,>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, []);

  // Scramble a single word's internal letters (keeping first and last if enabled)
  const scrambleSingleWord = useCallback((word: string): string => {
    if (word.length < minWordLength) return word;

    // Separate leading/trailing punctuation if preservePunctuation is true
    let leading = '';
    let trailing = '';
    let core = word;

    if (preservePunctuation) {
      const matchLeading = core.match(/^[^a-zA-Z0-9\u0600-\u06FF]+/);
      if (matchLeading) {
        leading = matchLeading[0];
        core = core.slice(leading.length);
      }
      const matchTrailing = core.match(/[^a-zA-Z0-9\u0600-\u06FF]+$/);
      if (matchTrailing) {
        trailing = matchTrailing[0];
        core = core.slice(0, core.length - trailing.length);
      }
    }

    if (core.length < minWordLength) {
      return leading + core + trailing;
    }

    const letters = Array.from(core);

    if (preserveFirstLast && letters.length > 3) {
      const first = letters[0];
      const last = letters[letters.length - 1];
      const middle = letters.slice(1, -1);
      
      let shuffledMiddle = shuffleArray(middle);
      // Ensure it's not identical to original if length > 1
      if (shuffledMiddle.join('') === middle.join('') && middle.length > 1) {
        shuffledMiddle = middle.reverse();
      }

      return leading + first + shuffledMiddle.join('') + last + trailing;
    } else {
      let shuffled = shuffleArray(letters);
      if (shuffled.join('') === core && letters.length > 1) {
        shuffled = letters.reverse();
      }
      return leading + shuffled.join('') + trailing;
    }
  }, [minWordLength, preservePunctuation, preserveFirstLast, shuffleArray]);

  // Main scrambling logic
  const scrambledOutput = useMemo(() => {
    if (!input.trim()) return '';

    // We use seed to force recalculation when reshuffle is clicked
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = seed;

    switch (mode) {
      case 'typoglycemia': {
        // Words split by whitespace
        return input.replace(/(\S+)/g, (match) => {
          return scrambleSingleWord(match);
        });
      }

      case 'allLetters': {
        // Scramble every word completely regardless of first/last
        return input.replace(/(\S+)/g, (match) => {
          let leading = '';
          let trailing = '';
          let core = match;

          if (preservePunctuation) {
            const mLead = core.match(/^[^a-zA-Z0-9\u0600-\u06FF]+/);
            if (mLead) {
              leading = mLead[0];
              core = core.slice(leading.length);
            }
            const mTrail = core.match(/[^a-zA-Z0-9\u0600-\u06FF]+$/);
            if (mTrail) {
              trailing = mTrail[0];
              core = core.slice(0, core.length - trailing.length);
            }
          }

          if (core.length <= 1) return match;
          const chars = Array.from(core);
          let shuffled = shuffleArray(chars);
          if (shuffled.join('') === core && chars.length > 1) {
            shuffled = chars.reverse();
          }
          return leading + shuffled.join('') + trailing;
        });
      }

      case 'wordsInSentence': {
        // Scramble word order in each line/sentence
        const lines = input.split('\n');
        return lines.map(line => {
          // Break line into sentences or clauses
          const sentences = line.split(/([.?!؛]+[\s]+)/);
          return sentences.map((chunk, idx) => {
            if (idx % 2 === 1) return chunk; // Punctuation divider
            const words = chunk.trim().split(/\s+/).filter(Boolean);
            if (words.length <= 1) return chunk;
            return shuffleArray(words).join(' ');
          }).join('');
        }).join('\n');
      }

      case 'reverseWords': {
        // Reverse words in each sentence
        const lines = input.split('\n');
        return lines.map(line => {
          const words = line.split(/\s+/).filter(Boolean);
          return words.reverse().join(' ');
        }).join('\n');
      }

      case 'reverseLetters': {
        // Reverse letters in each word
        return input.replace(/(\S+)/g, (match) => {
          let leading = '';
          let trailing = '';
          let core = match;

          if (preservePunctuation) {
            const mLead = core.match(/^[^a-zA-Z0-9\u0600-\u06FF]+/);
            if (mLead) {
              leading = mLead[0];
              core = core.slice(leading.length);
            }
            const mTrail = core.match(/[^a-zA-Z0-9\u0600-\u06FF]+$/);
            if (mTrail) {
              trailing = mTrail[0];
              core = core.slice(0, core.length - trailing.length);
            }
          }

          const reversed = Array.from(core).reverse().join('');
          return leading + reversed + trailing;
        });
      }

      case 'shuffleLines': {
        const lines = input.split('\n').filter(l => l.trim().length > 0);
        return shuffleArray(lines).join('\n');
      }

      default:
        return input;
    }
  }, [input, mode, preservePunctuation, scrambleSingleWord, seed, shuffleArray]);

  const handleCopy = () => {
    if (!scrambledOutput) return;
    navigator.clipboard.writeText(scrambledOutput).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', 'Scrambled text ready to paste.', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (!scrambledOutput) return;
    const blob = new Blob([scrambledOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scrambled-text-${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded TXT file', 'Text file saved successfully.', 'success');
  };

  const handleReshuffle = () => {
    setSeed(prev => prev + 1);
    addToast('Reshuffled!', 'Generated a new random permutation.', 'info');
  };

  // Text metrics
  const wordCount = useMemo(() => {
    return input.trim() ? input.trim().split(/\s+/).length : 0;
  }, [input]);

  const charCount = input.length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Config Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shuffle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Word &amp; Text Scrambler
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Randomize characters, explore the cognitive typoglycemia effect, or create classroom vocabulary scrambles.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReshuffle}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 rounded-xl transition-all shadow-sm active:scale-95"
              title="Generate a new permutation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reshuffle</span>
            </button>
            <button
              onClick={() => setInput('')}
              className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
            Scrambling Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              { id: 'typoglycemia', label: 'Typoglycemia', hint: 'Keep 1st & last letter' },
              { id: 'allLetters', label: 'All Letters', hint: 'Total word shuffle' },
              { id: 'wordsInSentence', label: 'Word Order', hint: 'Shuffle sentence order' },
              { id: 'reverseLetters', label: 'Reverse Letters', hint: 'Backwards spelling' },
              { id: 'reverseWords', label: 'Reverse Words', hint: 'Invert word position' },
              { id: 'shuffleLines', label: 'Shuffle Lines', hint: 'Randomize item list' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id as ScrambleMode)}
                className={`p-2.5 text-left rounded-xl border transition-all ${
                  mode === m.id
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-sm ring-1 ring-indigo-500/20'
                    : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="text-xs font-bold truncate">{m.label}</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{m.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fine-tune Controls */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
            <input
              type="checkbox"
              checked={preservePunctuation}
              onChange={e => setPreservePunctuation(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Preserve punctuation marks (<code className="font-mono">.,?!;</code>)</span>
          </label>

          {mode === 'typoglycemia' && (
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={preserveFirstLast}
                onChange={e => setPreserveFirstLast(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              <span>Keep first &amp; last letter anchored</span>
            </label>
          )}

          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <span>Min word length:</span>
            <select
              value={minWordLength}
              onChange={e => setMinWordLength(Number(e.target.value))}
              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value={2}>2+ chars</option>
              <option value={3}>3+ chars</option>
              <option value={4}>4+ chars (Recommended)</option>
              <option value={5}>5+ chars</option>
              <option value={6}>6+ chars</option>
            </select>
          </div>
        </div>

        {/* Preset Samples */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Presets:
          </span>
          {sampleTexts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInput(sample.text)}
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two Pane Editor: Input & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Original Text
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {wordCount} words &bull; {charCount} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={10}
            placeholder="Type or paste sentences, words, or lists here..."
            className="w-full flex-1 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
          />
        </div>

        {/* Output Column */}
        <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Scrambled Result
              </label>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 capitalize">
                {mode}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handleCopy}
                disabled={!scrambledOutput}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownload}
                disabled={!scrambledOutput}
                className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 transition-colors"
                title="Download as .txt"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            readOnly
            value={scrambledOutput}
            rows={10}
            placeholder="Scrambled text will appear here automatically..."
            className="w-full flex-1 p-3.5 bg-indigo-50/20 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-sans focus:outline-none resize-y leading-relaxed selection:bg-indigo-500 selection:text-white"
          />
        </div>
      </div>

      {/* Educational & Pedagogical Info Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
            What is the Typoglycemia Effect?
          </h3>
          <p className="text-xs text-amber-800/90 dark:text-amber-300/80 leading-relaxed">
            Typoglycemia is a cognitive phenomenon showing that human readers do not read every letter individually, but rather grasp the word as a whole gestalt. As long as the first and last letters are preserved and the inner characters shuffled, fluent readers can comprehend the sentence with minimal friction. Great for classroom brain-teasers, reading comprehension exercises, and vocabulary puzzles.
          </p>
        </div>
      </div>
    </div>
  );
};
