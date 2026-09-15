import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Check, 
  GraduationCap, 
  FileText, 
  BarChart2, 
  HelpCircle 
} from 'lucide-react';

export const ReadabilityAnalyzer: React.FC = () => {
  const { addToast } = useApp();

  const sampleTexts = [
    {
      label: 'Elementary (Easy)',
      text: 'The sun was shining brightly in the blue sky. The birds sang pleasant songs from the green trees. Jack and his dog Max ran across the park with a red ball.'
    },
    {
      label: 'Standard Article',
      text: 'Renewable energy sources like solar and wind power are becoming increasingly important worldwide. Governments and corporations are investing billions of dollars into modern grid infrastructure to combat climate change and reduce carbon emissions over the next two decades.'
    },
    {
      label: 'Academic Research (Dense)',
      text: 'Epistemological investigations into pedagogical paradigms necessitate a comprehensive evaluation of cognitive heuristics. Consequently, educational practitioners must synthesize empirical methodologies with contextualized formative assessments to optimize scholastic efficacy.'
    }
  ];

  const [text, setText] = useState<string>(sampleTexts[1].text);

  // Count syllables of a word
  const countSyllables = (word: string): number => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    if (!clean) return 0;
    if (clean.length <= 3) return 1;

    let w = clean.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
    w = w.replace(/^y/, '');
    const matched = w.match(/[aeiouy]{1,2}/g);
    return matched ? Math.max(1, matched.length) : 1;
  };

  const stats = useMemo(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        characters: 0,
        words: 0,
        sentences: 0,
        syllables: 0,
        complexWords: 0,
        avgWordsPerSentence: 0,
        avgSyllablesPerWord: 0,
        fleschEase: 0,
        fleschGrade: 0,
        gunningFog: 0,
        colemanLiau: 0,
        readingTimeMinutes: 0
      };
    }

    const characters = trimmed.replace(/\s+/g, '').length;
    // Word splitting
    const wordsArr = trimmed.split(/\s+/).filter(w => /[a-zA-Z0-9]/.test(w));
    const words = wordsArr.length || 1;

    // Sentences splitting
    const sentencesArr = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentences = sentencesArr.length || 1;

    let totalSyllables = 0;
    let complexWords = 0;

    wordsArr.forEach(w => {
      const syl = countSyllables(w);
      totalSyllables += syl;
      if (syl >= 3) {
        complexWords++;
      }
    });

    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = totalSyllables / words;

    // 1. Flesch Reading Ease
    // 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
    let fleschEase = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    fleschEase = Math.min(100, Math.max(0, Math.round(fleschEase * 10) / 10));

    // 2. Flesch-Kincaid Grade Level
    // 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    let fleschGrade = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
    fleschGrade = Math.max(0, Math.round(fleschGrade * 10) / 10);

    // 3. Gunning Fog Index
    // 0.4 * ((words/sentences) + 100*(complexWords/words))
    let gunningFog = 0.4 * (avgWordsPerSentence + (100 * (complexWords / words)));
    gunningFog = Math.max(0, Math.round(gunningFog * 10) / 10);

    // 4. Coleman-Liau Index
    // 0.0588 * L - 0.296 * S - 15.8 (L = avg letters per 100 words, S = avg sentences per 100 words)
    const L = (characters / words) * 100;
    const S = (sentences / words) * 100;
    let colemanLiau = 0.0588 * L - 0.296 * S - 15.8;
    colemanLiau = Math.max(0, Math.round(colemanLiau * 10) / 10);

    const readingTimeMinutes = Math.ceil(words / 200);

    return {
      characters,
      words,
      sentences,
      syllables: totalSyllables,
      complexWords,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      fleschEase,
      fleschGrade,
      gunningFog,
      colemanLiau,
      readingTimeMinutes
    };
  }, [text]);

  // Qualitative reading interpretation
  const getEaseBadge = (score: number) => {
    if (score >= 90) return { label: 'Very Easy (5th Grade)', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
    if (score >= 80) return { label: 'Easy (6th Grade)', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800' };
    if (score >= 70) return { label: 'Fairly Easy (7th Grade)', color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800' };
    if (score >= 60) return { label: 'Standard (8th & 9th Grade)', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800' };
    if (score >= 50) return { label: 'Fairly Difficult (10th - 12th Grade)', color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800' };
    if (score >= 30) return { label: 'Difficult (College Level)', color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800' };
    return { label: 'Very Confusing (Graduate Level)', color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800' };
  };

  const easeBadge = getEaseBadge(stats.fleschEase);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Overview Card */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Text Readability &amp; Grade Level Analyzer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate Flesch-Kincaid, Gunning Fog, and scholastic grade levels in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Clear Text
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Examples:
          </span>
          {sampleTexts.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setText(sample.text)}
              className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={7}
          placeholder="Paste or type text, essays, curriculum materials, or articles here..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
        />
      </div>

      {/* Metrics & Readability Scores Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Flesch Reading Ease */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Flesch Reading Ease
            </span>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {stats.fleschEase} <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
          </div>
          <div className={`mt-3 px-2.5 py-1 text-xs font-semibold rounded-lg border text-center ${easeBadge.color}`}>
            {easeBadge.label}
          </div>
        </div>

        {/* Flesch-Kincaid Grade Level */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              FK Grade Level
            </span>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              Grade {stats.fleschGrade}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Appropriate for US School Grade {Math.round(stats.fleschGrade)} students.
          </p>
        </div>

        {/* Gunning Fog Index */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Gunning Fog Index
            </span>
            <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
              {stats.gunningFog}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Years of formal education needed to understand on first read.
          </p>
        </div>

        {/* Coleman-Liau Index */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
              Coleman-Liau
            </span>
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
              {stats.colemanLiau}
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Character-frequency based grade level approximation.
          </p>
        </div>
      </div>

      {/* Structural Statistics Table */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-indigo-500" />
          Text Mechanics &amp; Corpus Breakdown
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Words</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.words}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Sentences</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.sentences}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Total Syllables</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.syllables}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Complex Words (3+)</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.complexWords}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Avg Words/Sentence</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">{stats.avgWordsPerSentence}</div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Est. Reading Time</div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">~{stats.readingTimeMinutes} min</div>
          </div>
        </div>
      </div>
    </div>
  );
};
