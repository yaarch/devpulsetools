import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, Type, Sparkles, RefreshCw } from 'lucide-react';

const FONT_MAPS = {
  bold: {
    offsetA: 0x1D400 - 65,
    offseta: 0x1D41A - 97,
    offset0: 0x1D7CE - 48,
  },
  italic: {
    offsetA: 0x1D434 - 65,
    offseta: 0x1D44E - 97,
  },
  script: {
    offsetA: 0x1D49C - 65,
    offseta: 0x1D4B6 - 97,
  },
  fraktur: {
    offsetA: 0x1D504 - 65,
    offseta: 0x1D51E - 97,
  },
  doubleStruck: {
    offsetA: 0x1D538 - 65,
    offseta: 0x1D552 - 97,
    offset0: 0x1D7D8 - 48,
  },
  monospace: {
    offsetA: 0x1D670 - 65,
    offseta: 0x1D68A - 97,
    offset0: 0x1D7F6 - 48,
  },
  circled: {
    offsetA: 0x24B6 - 65,
    offseta: 0x24D0 - 97,
    offset0: 0x24EA - 48,
  },
  fullwidth: {
    offsetA: 0xFF21 - 65,
    offseta: 0xFF41 - 97,
    offset0: 0xFF10 - 48,
  },
};

const convertUnicode = (text: string, styleKey: keyof typeof FONT_MAPS): string => {
  const map = FONT_MAPS[styleKey];
  return text.split('').map(char => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90 && map.offsetA) {
      return String.fromCodePoint(code + map.offsetA);
    }
    if (code >= 97 && code <= 122 && map.offseta) {
      return String.fromCodePoint(code + map.offseta);
    }
    if (code >= 48 && code <= 57 && (map as any).offset0) {
      return String.fromCodePoint(code + (map as any).offset0);
    }
    return char;
  }).join('');
};

const flipText = (text: string): string => {
  const upsideDownMap: Record<string, string> = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ',
    k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ',
    u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    A: '∀', B: '𐐒', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ',
    K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '┴',
    U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
    '?': '¿', '!': '¡', '.': '˙', ',': '\'', '_': '‾'
  };
  return text.split('').map(c => upsideDownMap[c] || c).reverse().join('');
};

export const TextAsciiStyler: React.FC = () => {
  const { addToast } = useApp();
  const [inputText, setInputText] = useState('DevPulse Tools 2026');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const STYLES = [
    { key: 'bold', name: 'Mathematical Bold', output: convertUnicode(inputText, 'bold') },
    { key: 'italic', name: 'Italic Serif', output: convertUnicode(inputText, 'italic') },
    { key: 'script', name: 'Script / Cursive', output: convertUnicode(inputText, 'script') },
    { key: 'fraktur', name: 'Gothic / Fraktur', output: convertUnicode(inputText, 'fraktur') },
    { key: 'doubleStruck', name: 'Double-Struck / Blackboard', output: convertUnicode(inputText, 'doubleStruck') },
    { key: 'monospace', name: 'Monospace Typewriter', output: convertUnicode(inputText, 'monospace') },
    { key: 'circled', name: 'Circled / Bubble Letters', output: convertUnicode(inputText, 'circled') },
    { key: 'fullwidth', name: 'Vaporwave / Fullwidth', output: convertUnicode(inputText, 'fullwidth') },
    { key: 'upsideDown', name: 'Upside-Down / Inverted', output: flipText(inputText) },
  ];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast('Copied styled text!', '', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Input Box */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <Type className="w-4 h-4 text-indigo-500" /> Type Plain Text
        </label>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="Type here to convert styles..."
          className="w-full p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
      </div>

      {/* Styled Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLES.map(style => (
          <div
            key={style.key}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition-all flex flex-col justify-between space-y-3 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {style.name}
              </span>
              <button
                onClick={() => handleCopy(style.output, style.key)}
                className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-100 transition-colors"
              >
                {copiedKey === style.key ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === style.key ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-base overflow-x-auto select-all">
              {style.output || <span className="text-slate-400 text-xs italic">Enter text above...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
