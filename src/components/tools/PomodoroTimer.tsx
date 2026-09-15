import React, { useState, useEffect, useRef } from 'react';
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
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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
              className={`flex-1 py-2 px-4 rounded-full text-sm font-semibold transition-all ${
                mode === m 
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
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
          <button onClick={toggleTimer} className={`w-20 h-20 flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${isRunning ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400' : 'bg-indigo-600 text-white'}`}>
            {isRunning ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-2" />}
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${showSettings ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
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
