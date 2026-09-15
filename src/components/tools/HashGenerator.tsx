import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, Copy, KeyRound, Check } from 'lucide-react';

export const HashGenerator: React.FC = () => {
  const { addToast } = useApp();
  const [inputText, setInputText] = useState('DevPulse Free Utility Suite');
  const [hmacKey, setHmacKey] = useState('');
  const [useHmac, setUseHmac] = useState(false);

  const [hashes, setHashes] = useState({
    sha256: '',
    sha512: '',
    sha384: '',
    sha1: '',
    md5: ''
  });

  // Fast client MD5 implementation
  const calculateMd5 = (str: string): string => {
    function md5cycle(x: number[], k: number[]) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);
      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function add32(a: number, b: number) {
      return (a + b) & 0xffffffff;
    }
    function md5blk(s: string) {
      const md5blks: number[] = [];
      for (let i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }

    let n = str.length, state = [1732584193, -271733879, -1732584194, 271733878], i: number;
    for (i = 64; i <= str.length; i += 64) {
      md5cycle(state, md5blk(str.substring(i - 64, i)));
    }
    str = str.substring(i - 64);
    const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let j: number;
    for (j = 0; j < str.length; j++) tail[j >> 2] |= str.charCodeAt(j) << ((j % 4) << 3);
    tail[j >> 2] |= 0x80 << ((j % 4) << 3);
    if (j > 55) {
      md5cycle(state, tail);
      for (let k = 0; k < 16; k++) tail[k] = 0;
    }
    tail[14] = n * 8;
    md5cycle(state, tail);

    const hex = '0123456789abcdef';
    let out = '';
    for (let k = 0; k < 4; k++) {
      for (let l = 0; l < 4; l++) {
        out += hex.charAt((state[k] >> (l * 8 + 4)) & 0x0f) + hex.charAt((state[k] >> (l * 8)) & 0x0f);
      }
    }
    return out;
  };

  useEffect(() => {
    const computeHashes = async () => {
      const enc = new TextEncoder();
      const data = enc.encode(inputText);

      const bufferToHex = (buffer: ArrayBuffer) => {
        return Array.from(new Uint8Array(buffer))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
      };

      try {
        if (!useHmac || !hmacKey) {
          const [sha256Buf, sha512Buf, sha384Buf, sha1Buf] = await Promise.all([
            window.crypto.subtle.digest('SHA-256', data),
            window.crypto.subtle.digest('SHA-512', data),
            window.crypto.subtle.digest('SHA-384', data),
            window.crypto.subtle.digest('SHA-1', data)
          ]);

          setHashes({
            sha256: bufferToHex(sha256Buf),
            sha512: bufferToHex(sha512Buf),
            sha384: bufferToHex(sha384Buf),
            sha1: bufferToHex(sha1Buf),
            md5: calculateMd5(inputText)
          });
        } else {
          // HMAC computation using Web Crypto API
          const keyData = enc.encode(hmacKey);
          const cryptoKey = await window.crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: 'SHA-256' } },
            false,
            ['sign']
          );
          const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, data);
          setHashes({
            sha256: bufferToHex(signature),
            sha512: 'HMAC-SHA256 active above',
            sha384: 'HMAC-SHA256 active above',
            sha1: 'HMAC-SHA256 active above',
            md5: 'HMAC not applicable to MD5'
          });
        }
      } catch (err) {
        console.error('Crypto digest error', err);
      }
    };

    computeHashes();
  }, [inputText, hmacKey, useHmac]);

  const copyHash = (name: string, val: string) => {
    navigator.clipboard.writeText(val).then(() => {
      addToast(`Copied ${name} hash!`, '', 'success');
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Input area */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Input String
        </label>
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          rows={3}
          placeholder="Enter text to hash..."
          className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {/* HMAC Toggle */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={useHmac}
            onChange={e => setUseHmac(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
          <span>HMAC Authentication Mode</span>
        </label>

        {useHmac && (
          <div className="flex-1 max-w-sm">
            <input
              type="text"
              value={hmacKey}
              onChange={e => setHmacKey(e.target.value)}
              placeholder="Enter HMAC Secret Key..."
              className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-mono"
            />
          </div>
        )}
      </div>

      {/* Computed Hashes List */}
      <div className="space-y-3">
        {[
          { name: 'SHA-256', val: hashes.sha256, bits: '256 bits', recommended: true },
          { name: 'SHA-512', val: hashes.sha512, bits: '512 bits', recommended: true },
          { name: 'SHA-384', val: hashes.sha384, bits: '384 bits' },
          { name: 'SHA-1', val: hashes.sha1, bits: '160 bits (Legacy)' },
          { name: 'MD5', val: hashes.md5, bits: '128 bits (Checksum)' }
        ].map(item => (
          <div
            key={item.name}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                  {item.name}
                </span>
                <span className="text-[11px] text-slate-400">({item.bits})</span>
                {item.recommended && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                    Secure
                  </span>
                )}
              </div>

              <button
                onClick={() => copyHash(item.name, item.val)}
                className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>
            </div>

            <div className="font-mono text-xs text-slate-600 dark:text-slate-300 break-all select-all bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
              {item.val || 'Calculating...'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
