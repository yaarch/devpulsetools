import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Flag, 
  Volume2, 
  Clock, 
  Check, 
  Trash2 
} from 'lucide-react';

export const StopwatchTimer: React.FC = () => {
  const { addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'stopwatch' | 'timer'>('stopwatch');

  // STOPWATCH STATE
  const [swTime, setSwTime] = useState<number>(0);
  const [swRunning, setSwRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (swRunning) {
      const startTime = Date.now() - swTime;
      swIntervalRef.current = setInterval(() => {
        setSwTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(swIntervalRef.current);
    }
    return () => clearInterval(swIntervalRef.current);
  }, [swRunning]);

  const handleSwStartPause = () => setSwRunning(!swRunning);
  const handleSwReset = () => {
    setSwRunning(false);
    setSwTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (swTime > 0) {
      setLaps([swTime, ...laps]);
    }
  };

  // Format Stopwatch (MM:SS.cs)
  const formatSw = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  // COUNTDOWN TIMER STATE
  const [timerMinutes, setTimerMinutes] = useState<number>(5);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRemaining, setTimerRemaining] = useState<number>(300); // 5 mins in seconds
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerTotalRef = useRef<number>(300);
  const timerIntervalRef = useRef<any>(null);

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.5);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch {
      // Audio not supported or blocked
    }
  };

  useEffect(() => {
    if (timerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setTimerRunning(false);
            playChime();
            addToast('Timer Finished!', 'Your countdown has completed.', 'info');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [timerRunning]);

  const setCountdownPreset = (mins: number) => {
    setTimerRunning(false);
    setTimerMinutes(mins);
    setTimerSeconds(0);
    const totalSec = mins * 60;
    setTimerRemaining(totalSec);
    timerTotalRef.current = totalSec;
  };

  const handleTimerStartPause = () => {
    if (timerRemaining === 0) {
      const totalSec = (timerMinutes * 60) + timerSeconds;
      setTimerRemaining(totalSec);
      timerTotalRef.current = totalSec;
    }
    setTimerRunning(!timerRunning);
  };

  const handleTimerReset = () => {
    setTimerRunning(false);
    const totalSec = (timerMinutes * 60) + timerSeconds;
    setTimerRemaining(totalSec);
    timerTotalRef.current = totalSec;
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const timerProgress = timerTotalRef.current > 0 
    ? ((timerTotalRef.current - timerRemaining) / timerTotalRef.current) * 100 
    : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Tab Switcher */}
      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Stopwatch &amp; Countdown Timer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High-precision sports stopwatch with lap tracking and customizable audio countdown timer.
            </p>
          </div>

          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('stopwatch')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'stopwatch'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Stopwatch
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('timer')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'timer'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Countdown Timer
            </button>
          </div>
        </div>

        {activeTab === 'stopwatch' ? (
          /* STOPWATCH DISPLAY */
          <div className="space-y-8 py-4">
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {formatSw(swTime)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleSwStartPause}
                className={`px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center gap-2 transition-all active:scale-95 ${
                  swRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {swRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{swRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={handleLap}
                disabled={!swRunning}
                className="px-5 py-3 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 disabled:opacity-40 flex items-center gap-2 transition-all"
              >
                <Flag className="w-4 h-4" />
                <span>Lap</span>
              </button>

              <button
                onClick={handleSwReset}
                disabled={swTime === 0}
                className="px-4 py-3 rounded-xl font-medium text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 disabled:opacity-40 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>

            {/* Lap Times List */}
            {laps.length > 0 && (
              <div className="max-w-md mx-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Lap #</span>
                  <span>Split Time</span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto">
                  {laps.map((lapMs, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between text-sm font-mono">
                      <span className="font-semibold text-slate-500">Lap {laps.length - idx}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formatSw(lapMs)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* COUNTDOWN TIMER DISPLAY */
          <div className="space-y-6 py-4">
            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {[1, 3, 5, 10, 15, 25, 30].map(min => (
                <button
                  key={min}
                  type="button"
                  onClick={() => setCountdownPreset(min)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    timerMinutes === min && timerSeconds === 0
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {min} min
                </button>
              ))}
            </div>

            {/* Timer Counter */}
            <div className="text-center space-y-3">
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {formatTimer(timerRemaining)}
              </div>

              {/* Progress bar */}
              <div className="max-w-md mx-auto h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleTimerStartPause}
                className={`px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md flex items-center gap-2 transition-all active:scale-95 ${
                  timerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {timerRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{timerRunning ? 'Pause' : 'Start'}</span>
              </button>

              <button
                onClick={handleTimerReset}
                className="px-4 py-3 rounded-xl font-medium text-sm text-slate-500 dark:text-slate-400 hover:text-rose-600 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
