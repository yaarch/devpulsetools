import React from 'react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useApp } from '../../context/AppContext';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useApp();

  if (isOnline) return null;

  const messages = {
    en: 'Offline Mode — All tools running 100% locally from device cache',
    ar: 'الوضع غير المتصل — جميع الأدوات تعمل محلياً ١٠٠٪ من الذاكرة المؤقتة',
    es: 'Modo sin conexión — Todas las herramientas funcionan 100% localmente',
    fr: 'Mode hors ligne — Tous les outils fonctionnent à 100% en local',
    de: 'Offline-Modus — Alle Tools laufen zu 100% lokal aus dem Cache'
  };

  const msg = messages[language as keyof typeof messages] || messages.en;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 start-4 z-70 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-amber-600/95 dark:bg-amber-700/95 text-white text-xs font-medium shadow-xl backdrop-blur-xs border border-amber-400/40 animate-in slide-in-from-bottom-2 duration-300"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
      </span>
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>{msg}</span>
    </div>
  );
};
