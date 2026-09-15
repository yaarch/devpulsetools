import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KeyRound, CheckCircle2, AlertTriangle, Clock, Copy } from 'lucide-react';

export const JwtDecoder: React.FC = () => {
  const { addToast } = useApp();
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggVGF5bG9yIiwiYWRtaW4iOnRydWUsImlhdCI6MTY3MjU3NjAwMCwiZXhwIjoyMDgwMDAwMDAwfQ.cTh-8K11Z8p480i-vG_G84q7-1w'
  );

  // Safe base64url decode
  const base64UrlDecode = (str: string) => {
    try {
      let output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: break;
        case 2: output += '=='; break;
        case 3: output += '='; break;
        default: return null;
      }
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(output), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch {
      return null;
    }
  };

  const parseJwt = () => {
    const parts = token.trim().split('.');
    if (parts.length < 2) {
      return { error: 'Invalid JWT structure: Token must contain dot separated parts (header.payload.signature)' };
    }

    const headerStr = base64UrlDecode(parts[0]);
    const payloadStr = base64UrlDecode(parts[1]);

    if (!headerStr || !payloadStr) {
      return { error: 'Unable to base64url decode token components' };
    }

    try {
      const header = JSON.parse(headerStr);
      const payload = JSON.parse(payloadStr);

      let isExpired: boolean | null = null;
      let expDate: Date | null = null;
      if (payload.exp) {
        expDate = new Date(payload.exp * 1000);
        isExpired = expDate.getTime() < Date.now();
      }

      return { header, payload, isExpired, expDate, signature: parts[2] || 'None' };
    } catch (err: any) {
      return { error: 'Failed to parse JSON in token: ' + err.message };
    }
  };

  const parsed = parseJwt();

  const handleCopy = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2)).then(() => {
      addToast('JSON copied to clipboard!', '', 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input token */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Encoded JWT Token
        </label>
        <textarea
          value={token}
          onChange={e => setToken(e.target.value)}
          rows={4}
          placeholder="Paste JWT here (e.g. eyJhbGci...)"
          className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {parsed.error ? (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{parsed.error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Status banner */}
          {parsed.expDate && (
            <div
              className={`flex items-center justify-between p-4 rounded-2xl border text-xs font-semibold ${
                parsed.isExpired
                  ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-200'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  Expiration Status: <strong>{parsed.isExpired ? 'EXPIRED' : 'ACTIVE / VALID'}</strong>
                </span>
              </div>
              <span className="font-mono text-[11px] opacity-80">{parsed.expDate.toLocaleString()}</span>
            </div>
          )}

          {/* Header & Payload split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Header */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Header (Algorithm & Type)
                </span>
                <button
                  onClick={() => handleCopy(parsed.header)}
                  className="text-xs text-slate-400 hover:text-indigo-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-xs overflow-x-auto">
                {JSON.stringify(parsed.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Payload (Claims & Data)
                </span>
                <button
                  onClick={() => handleCopy(parsed.payload)}
                  className="text-xs text-slate-400 hover:text-indigo-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-xs overflow-x-auto">
                {JSON.stringify(parsed.payload, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
