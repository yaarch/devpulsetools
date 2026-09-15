import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import QRCode from 'qrcode';
import {
  QrCode,
  Download,
  Copy,
  Wifi,
  Link,
  FileText,
  User,
  Sliders,
  Sparkles,
  Share2
} from 'lucide-react';

type QrDataType = 'url' | 'text' | 'wifi' | 'vcard';

export const QrCodeGenerator: React.FC = () => {
  const { addToast } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [dataType, setDataType] = useState<QrDataType>('url');
  const [urlInput, setUrlInput] = useState('https://devpulse.tools');
  const [textInput, setTextInput] = useState('Hello from DevPulse Utilities!');

  // WiFi state
  const [wifiSsid, setWifiSsid] = useState('MyOfficeGuest');
  const [wifiPassword, setWifiPassword] = useState('SecurePass123!');
  const [wifiAuth, setWifiAuth] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // vCard state
  const [vcardName, setVcardName] = useState('Alex Taylor');
  const [vcardPhone, setVcardPhone] = useState('+1 (555) 234-5678');
  const [vcardEmail, setVcardEmail] = useState('alex@example.com');
  const [vcardOrg, setVcardOrg] = useState('DevPulse Labs');
  const [vcardTitle, setVcardTitle] = useState('Software Engineer');

  // Customization options
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [errorLevel, setErrorLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [margin, setMargin] = useState<number>(2);
  const [size, setSize] = useState<number>(320);
  const [renderError, setRenderError] = useState<string | null>(null);

  // Generate payload string based on type
  const getPayload = (): string => {
    switch (dataType) {
      case 'url':
        return urlInput.trim() || 'https://';
      case 'text':
        return textInput || 'Sample text';
      case 'wifi':
        return `WIFI:T:${wifiAuth};S:${wifiSsid};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'vcard':
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${vcardName}`,
          `ORG:${vcardOrg}`,
          `TITLE:${vcardTitle}`,
          `TEL:${vcardPhone}`,
          `EMAIL:${vcardEmail}`,
          'END:VCARD'
        ].join('\n');
      default:
        return '';
    }
  };

  // Render QR code to canvas with error handling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const payload = getPayload();
    QRCode.toCanvas(
      canvas,
      payload,
      {
        width: size,
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel
      },
      err => {
        if (err) {
          console.warn('QR code generation warning:', err);
          setRenderError('Data payload is too large for the selected error correction level. Try using Level L or reducing text length.');
        } else {
          setRenderError(null);
        }
      }
    );
  }, [dataType, urlInput, textInput, wifiSsid, wifiPassword, wifiAuth, wifiHidden, vcardName, vcardPhone, vcardEmail, vcardOrg, vcardTitle, fgColor, bgColor, errorLevel, margin, size]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `qrcode-${dataType}-${Date.now()}.png`;
    a.click();
    addToast('Downloaded high-res QR PNG!', '', 'success');
  };

  const handleDownloadSvg = async () => {
    const payload = getPayload();
    try {
      const svgString = await QRCode.toString(payload, {
        type: 'svg',
        margin: margin,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: errorLevel
      });
      const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${dataType}-${Date.now()}.svg`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Downloaded crisp vector SVG QR code!', '', 'success');
    } catch {
      addToast('Failed to generate SVG', '', 'error');
    }
  };

  const handleCopyDataUrl = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    navigator.clipboard.writeText(url).then(() => {
      addToast('Copied QR Image Data URL!', '', 'success');
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Form & Configuration */}
      <div className="lg:col-span-7 space-y-6">
        {/* Type Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
          <button
            onClick={() => setDataType('url')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              dataType === 'url'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Website URL</span>
          </button>

          <button
            onClick={() => setDataType('text')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              dataType === 'text'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Plain Text</span>
          </button>

          <button
            onClick={() => setDataType('wifi')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              dataType === 'wifi'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>WiFi Network</span>
          </button>

          <button
            onClick={() => setDataType('vcard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              dataType === 'vcard'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>vCard Contact</span>
          </button>
        </div>

        {/* Content Form depending on type */}
        <div className="space-y-4">
          {dataType === 'url' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Target URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {dataType === 'text' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Text Content
              </label>
              <textarea
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                rows={4}
                placeholder="Enter any text, code or message..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              />
            </div>
          )}

          {dataType === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Network Name (SSID)
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={e => setWifiSsid(e.target.value)}
                  placeholder="HomeWiFi"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  WiFi Password
                </label>
                <input
                  type="text"
                  value={wifiPassword}
                  onChange={e => setWifiPassword(e.target.value)}
                  placeholder="Network password"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Security Encryption
                  </label>
                  <select
                    value={wifiAuth}
                    onChange={e => setWifiAuth(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                  >
                    <option value="WPA">WPA/WPA2/WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None (Open)</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wifiHidden}
                      onChange={e => setWifiHidden(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>Hidden Network</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {dataType === 'vcard' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={vcardName}
                  onChange={e => setVcardName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={vcardPhone}
                  onChange={e => setVcardPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={vcardEmail}
                  onChange={e => setVcardEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Company</label>
                <input
                  type="text"
                  value={vcardOrg}
                  onChange={e => setVcardOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Customization Options Accordion/Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            <span>Design Customization</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Foreground</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={e => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={e => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0"
                />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{bgColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Correction Level</label>
              <select
                value={errorLevel}
                onChange={e => setErrorLevel(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                <option value="L">L (7% recovery)</option>
                <option value="M">M (15% recovery)</option>
                <option value="Q">Q (25% recovery)</option>
                <option value="H">H (30% recovery)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Margin: {margin}px</label>
              <input
                type="range"
                min="0"
                max="6"
                value={margin}
                onChange={e => setMargin(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Live QR Preview & Actions */}
      <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
        {/* Canvas Display */}
        <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200/80 mb-4">
          <canvas ref={canvasRef} className="max-w-full h-auto rounded-lg" />
        </div>

        {renderError && (
          <div className="p-3 mb-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs leading-relaxed">
            {renderError}
          </div>
        )}

        <div className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
          Live real-time client preview. Scannable by any mobile camera or QR reader.
        </div>

        {/* Action Export Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            onClick={handleDownloadPng}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download SVG</span>
          </button>

          <button
            onClick={handleCopyDataUrl}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            title="Copy Image Data URL"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
