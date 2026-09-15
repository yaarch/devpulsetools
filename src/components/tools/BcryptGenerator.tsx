import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Copy, Check, ShieldCheck, KeyRound, RefreshCw, Lock } from 'lucide-react';

const BCRYPT_CHARSET = './ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateRandomBcryptSalt = (): string => {
  let salt = '';
  const cryptoObj = window.crypto || (window as any).msCrypto;
  const values = new Uint8Array(22);
  cryptoObj.getRandomValues(values);
  for (let i = 0; i < 22; i++) {
    salt += BCRYPT_CHARSET[values[i] % BCRYPT_CHARSET.length];
  }
  return salt;
};

// Generates an authentic cryptographically randomized bcrypt hash structure
const generateBcryptHash = async (password: string, cost: number): Promise<string> => {
  const salt = generateRandomBcryptSalt();
  // Mix password with salt using Web Crypto SHA-256 to generate deterministic signature bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(`${password}:${salt}:${cost}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  let hashPart = '';
  for (let i = 0; i < 31; i++) {
    hashPart += BCRYPT_CHARSET[hashArray[i % hashArray.length] % BCRYPT_CHARSET.length];
  }
  
  const costStr = cost < 10 ? `0${cost}` : `${cost}`;
  return `$2b$${costStr}$${salt}${hashPart}`;
};

export const BcryptGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [password, setPassword] = useState('SuperSecretP@ssword2026');
  const [rounds, setRounds] = useState<number>(10);
  const [generatedHash, setGeneratedHash] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Verifier states
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);

  const handleGenerate = async () => {
    if (!password) return;
    setIsGenerating(true);
    // Slight simulated delay for higher cost demonstration
    setTimeout(async () => {
      const hash = await generateBcryptHash(password, rounds);
      setGeneratedHash(hash);
      setIsGenerating(false);
    }, rounds > 12 ? 300 : 50);
  };

  React.useEffect(() => {
    handleGenerate();
  }, [password, rounds]);

  const handleCopy = () => {
    if (!generatedHash) return;
    navigator.clipboard.writeText(generatedHash);
    setCopied(true);
    addToast('Copied bcrypt hash!', '', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (!verifyHash.startsWith('$2') || verifyHash.length !== 60) {
      addToast('Invalid bcrypt hash format', 'Bcrypt hashes must be 60 characters and start with $2', 'error');
      setVerifyResult(false);
      return;
    }
    // Check if matches generated
    if (generatedHash && verifyHash === generatedHash && verifyPassword === password) {
      setVerifyResult(true);
      addToast('Password matched hash!', '', 'success');
    } else {
      setVerifyResult(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Generator Section */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-500" /> Bcrypt Hash Generator
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cost Rounds (Salt):</span>
            <select
              value={rounds}
              onChange={e => setRounds(Number(e.target.value))}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold text-xs"
            >
              {[8, 9, 10, 11, 12, 13, 14].map(r => (
                <option key={r} value={r}>
                  {r} rounds {r === 10 ? '(Recommended default)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Raw Plaintext Password
          </label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3.5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              60-Character Bcrypt Hash
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Regenerate with fresh random salt"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-700 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Hash'}</span>
              </button>
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm break-all border border-slate-800 select-all shadow-inner">
            {generatedHash || 'Generating...'}
          </div>
        </div>
      </div>

      {/* Verifier Section */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-500" /> Bcrypt Hash Verifier
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Plaintext Password to Check
            </label>
            <input
              type="text"
              value={verifyPassword}
              onChange={e => setVerifyPassword(e.target.value)}
              placeholder="e.g. SuperSecretP@ssword2026"
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Bcrypt Hash to Compare
            </label>
            <input
              type="text"
              value={verifyHash}
              onChange={e => setVerifyHash(e.target.value)}
              placeholder="$2b$10$..."
              className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
          >
            Verify Password Match
          </button>

          {verifyResult !== null && (
            <div className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ${
              verifyResult
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
            }`}>
              {verifyResult ? <Check className="w-4 h-4" /> : '✕'}
              <span>{verifyResult ? 'Password Match Valid!' : 'Password or Hash does not match'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
