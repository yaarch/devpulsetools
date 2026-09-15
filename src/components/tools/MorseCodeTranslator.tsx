import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Radio, 
  Volume2, 
  VolumeX, 
  ArrowRightLeft, 
  Copy, 
  Download, 
  Sparkles, 
  Check, 
  Play, 
  Square 
} from 'lucide-react';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--',
  '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
  ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
  '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

const REVERSE_MORSE: Record<string, string> = Object.entries(MORSE_MAP).reduce((acc, [k, v]) => {
  acc[v] = k;
  return acc;
}, {} as Record<string, string>);

export const MorseCodeTranslator: React.FC = () => {
  const { addToast } = useApp();

  const [mode, setMode] = useState<'textToMorse' | 'morseToText'>('textToMorse');
  const [textInput, setTextInput] = useState<string>('SOS Mayday Mayday');
  const [morseInput, setMorseInput] = useState<string>('... --- ...');
  const [copied, setCopied] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Audio Context Ref
  const audioContextRef = useRef<AudioContext | null>(null);
  const stopPlaybackRef = useRef<boolean>(false);

  // Text to Morse conversion
  const textToMorseResult = useMemo(() => {
    if (!textInput) return '';
    return textInput
      .toUpperCase()
      .split('')
      .map(char => {
        if (char === ' ') return '/';
        return MORSE_MAP[char] || char;
      })
      .join(' ');
  }, [textInput]);

  // Morse to Text conversion
  const morseToTextResult = useMemo(() => {
    if (!morseInput) return '';
    // Words are separated by / or double spaces
    const words = morseInput.trim().split(/\s*\/\s*|\s{2,}/);
    return words
      .map(word => {
        const letters = word.trim().split(/\s+/);
        return letters
          .map(code => REVERSE_MORSE[code] || '?')
          .join('');
      })
      .join(' ');
  }, [morseInput]);

  const handleCopy = (val: string) => {
    if (!val) return;
    navigator.clipboard.writeText(val).then(() => {
      setCopied(true);
      addToast('Copied to clipboard!', '', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSwap = () => {
    if (mode === 'textToMorse') {
      setMode('morseToText');
      setMorseInput(textToMorseResult || '... --- ...');
    } else {
      setMode('textToMorse');
      setTextInput(morseToTextResult || 'SOS');
    }
  };

  // Play Morse Code Audio via Web Audio API
  const playMorseAudio = async () => {
    const codeToPlay = mode === 'textToMorse' ? textToMorseResult : morseInput;
    if (!codeToPlay || isPlaying) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      setIsPlaying(true);
      stopPlaybackRef.current = false;

      const dotDuration = 0.08; // 80ms standard dot
      const dashDuration = dotDuration * 3;
      const pauseBetweenElements = dotDuration;
      const pauseBetweenLetters = dotDuration * 3;
      const pauseBetweenWords = dotDuration * 7;

      let currentTime = ctx.currentTime + 0.05;

      const symbols = codeToPlay.split('');

      for (let i = 0; i < symbols.length; i++) {
        if (stopPlaybackRef.current) break;
        const sym = symbols[i];

        if (sym === '.' || sym === '-') {
          const duration = sym === '.' ? dotDuration : dashDuration;

          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(700, currentTime);

          gain.gain.setValueAtTime(0, currentTime);
          gain.gain.linearRampToValueAtTime(0.3, currentTime + 0.005);
          gain.gain.setValueAtTime(0.3, currentTime + duration - 0.005);
          gain.gain.linearRampToValueAtTime(0, currentTime + duration);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(currentTime);
          osc.stop(currentTime + duration);

          currentTime += duration + pauseBetweenElements;
        } else if (sym === ' ') {
          currentTime += pauseBetweenLetters;
        } else if (sym === '/') {
          currentTime += pauseBetweenWords;
        }
      }

      const totalDelay = (currentTime - ctx.currentTime) * 1000;
      setTimeout(() => {
        setIsPlaying(false);
      }, Math.max(0, totalDelay));

    } catch (err) {
      console.error(err);
      setIsPlaying(false);
      addToast('Audio Error', 'Unable to initialize Web Audio player.', 'error');
    }
  };

  const stopMorseAudio = () => {
    stopPlaybackRef.current = true;
    setIsPlaying(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Container */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Morse Code Translator &amp; Audio Synthesizer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Encode text into dots and dashes, decode Morse sequences, and listen to acoustic radio beeps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all shadow-sm active:scale-95"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Switch Direction</span>
            </button>
          </div>
        </div>

        {/* Mode Selector & Audio Action */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setMode('textToMorse')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'textToMorse'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Text &rarr; Morse
            </button>
            <button
              type="button"
              onClick={() => setMode('morseToText')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mode === 'morseToText'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Morse &rarr; Text
            </button>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-2">
            {isPlaying ? (
              <button
                onClick={stopMorseAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded-xl transition-all active:scale-95"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop Beeping</span>
              </button>
            ) : (
              <button
                onClick={playMorseAudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Sound (700Hz)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mode === 'textToMorse' ? (
          <>
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Plain Text Input
                </label>
                <button
                  onClick={() => setTextInput('SOS')}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Load SOS
                </button>
              </div>
              <textarea
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                rows={8}
                placeholder="Type messages to translate into Morse code..."
                className="w-full flex-1 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm text-slate-900 dark:text-slate-100 font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Morse Code (. and -)
                </label>
                <button
                  onClick={() => handleCopy(textToMorseResult)}
                  disabled={!textToMorseResult}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={textToMorseResult}
                rows={8}
                placeholder="Morse code will appear here..."
                className="w-full flex-1 p-3.5 bg-indigo-50/20 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-sm font-mono text-slate-900 dark:text-slate-100 tracking-widest focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </>
        ) : (
          <>
            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Morse Code Input (. and - separated by spaces)
                </label>
                <button
                  onClick={() => setMorseInput('... --- ...')}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Load ... --- ...
                </button>
              </div>
              <textarea
                value={morseInput}
                onChange={e => setMorseInput(e.target.value)}
                rows={8}
                placeholder="Enter dots (.) and dashes (-) separated by spaces (use / for word breaks)..."
                className="w-full flex-1 p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-mono tracking-widest text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y leading-relaxed"
              />
            </div>

            <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Decoded English Text
                </label>
                <button
                  onClick={() => handleCopy(morseToTextResult)}
                  disabled={!morseToTextResult}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-40 transition-colors shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={morseToTextResult}
                rows={8}
                placeholder="Decoded text will appear here..."
                className="w-full flex-1 p-3.5 bg-indigo-50/20 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700/80 rounded-xl text-sm font-sans text-slate-900 dark:text-slate-100 focus:outline-none resize-y leading-relaxed"
              />
            </div>
          </>
        )}
      </div>

      {/* Morse Alphabet Cheat Sheet */}
      <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
          International Morse Reference Key
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2 text-xs font-mono">
          {Object.entries(MORSE_MAP).slice(0, 36).map(([char, code]) => (
            <div key={char} className="p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-center border border-slate-100 dark:border-slate-800">
              <div className="font-bold text-indigo-600 dark:text-indigo-400">{char}</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{code}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
