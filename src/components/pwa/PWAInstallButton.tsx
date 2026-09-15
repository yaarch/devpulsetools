import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useApp } from '../../context/AppContext';
import { Download, Smartphone, X, Check, Share } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'header' | 'hero' | 'mobile';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'header' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language, isRtl } = useApp();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);

  // If already installed and running standalone, suppress
  if (isInstalled && !justInstalled) {
    return null;
  }

  // Multilingual text
  const labels = {
    en: {
      install: 'Install App',
      installMobile: 'Install DevPulse',
      iosPrompt: 'Install on iPhone/iPad',
      iosTitle: 'Install DevPulse on iOS',
      iosStep1: 'Tap the Share button in Safari toolbar below',
      iosStep2: 'Scroll down and tap "Add to Home Screen"',
      iosStep3: 'Launch DevPulse anytime without browser tabs',
      offlineReady: 'Works 100% Offline',
      close: 'Got it',
      installed: 'App Installed!'
    },
    ar: {
      install: 'تثبيت التطبيق',
      installMobile: 'تثبيت ديف بلس',
      iosPrompt: 'تثبيت على آيفون / آيباد',
      iosTitle: 'تثبيت ديف بلس على نظام iOS',
      iosStep1: 'اضغط على زر المشاركة (Share) في شريط سفاري بالأسفل',
      iosStep2: 'مرر لأسفل واضغط على "إضافة إلى الصفحة الرئيسية"',
      iosStep3: 'افتح التطبيق في أي وقت بدون اتصال بالإنترنت',
      offlineReady: 'يعمل ١٠٠٪ بدون إنترنت',
      close: 'حسناً، فهمت',
      installed: 'تم التثبيت بنجاح!'
    },
    es: {
      install: 'Instalar App',
      installMobile: 'Instalar DevPulse',
      iosPrompt: 'Instalar en iPhone/iPad',
      iosTitle: 'Instalar DevPulse en iOS',
      iosStep1: 'Toca el botón Compartir en la barra de Safari',
      iosStep2: 'Desplázate hacia abajo y toca "Añadir a pantalla de inicio"',
      iosStep3: 'Accede a DevPulse en cualquier momento sin pestañas',
      offlineReady: 'Funciona 100% Sin Conexión',
      close: 'Entendido',
      installed: '¡App Instalada!'
    },
    fr: {
      install: 'Installer l\'App',
      installMobile: 'Installer DevPulse',
      iosPrompt: 'Installer sur iPhone/iPad',
      iosTitle: 'Installer DevPulse sur iOS',
      iosStep1: 'Touchez l\'icône Partager dans la barre Safari',
      iosStep2: 'Faites défiler et sélectionnez "Sur l\'écran d\'accueil"',
      iosStep3: 'Ouvrez DevPulse même sans connexion internet',
      offlineReady: 'Fonctionne 100% Hors-ligne',
      close: 'Compris',
      installed: 'Application installée !'
    },
    de: {
      install: 'App installieren',
      installMobile: 'DevPulse installieren',
      iosPrompt: 'Auf iPhone/iPad installieren',
      iosTitle: 'DevPulse auf iOS installieren',
      iosStep1: 'Tippen Sie in der Safari-Leiste auf das Teilen-Symbol',
      iosStep2: 'Nach unten scrollen und "Zum Home-Bildschirm" wählen',
      iosStep3: 'DevPulse jederzeit offline und blitzschnell starten',
      offlineReady: 'Funktioniert 100% Offline',
      close: 'Verstanden',
      installed: 'App installiert!'
    }
  };

  const l = labels[language as keyof typeof labels] || labels.en;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setJustInstalled(true);
        setTimeout(() => setJustInstalled(false), 3000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  // If not installable and not iOS, we don't render a broken button
  if (!isInstallable && !isIOS && !justInstalled) {
    return null;
  }

  if (justInstalled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        {l.installed}
      </span>
    );
  }

  // Mobile menu button
  if (variant === 'mobile') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm shadow-md hover:from-indigo-700 hover:to-violet-700 transition"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>{isIOS ? l.iosPrompt : l.installMobile}</span>
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 text-white font-semibold">
            PWA
          </span>
        </button>

        {showIOSGuide && (
          <IOSGuideModal onClose={() => setShowIOSGuide(false)} labels={l} isRtl={isRtl} />
        )}
      </>
    );
  }

  // Hero banner action button
  if (variant === 'hero') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>{isIOS ? l.iosPrompt : l.install}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-white">
            Offline
          </span>
        </button>

        {showIOSGuide && (
          <IOSGuideModal onClose={() => setShowIOSGuide(false)} labels={l} isRtl={isRtl} />
        )}
      </>
    );
  }

  // Header compact button
  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs transition-all hover:scale-[1.02]"
        title={l.offlineReady}
      >
        <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
        <span className="hidden sm:inline">{isIOS ? l.iosPrompt : l.install}</span>
        <span className="sm:hidden">{l.install}</span>
      </button>

      {showIOSGuide && (
        <IOSGuideModal onClose={() => setShowIOSGuide(false)} labels={l} isRtl={isRtl} />
      )}
    </>
  );
};

interface IOSGuideModalProps {
  onClose: () => void;
  labels: {
    iosTitle: string;
    iosStep1: string;
    iosStep2: string;
    iosStep3: string;
    close: string;
  };
  isRtl: boolean;
}

const IOSGuideModal: React.FC<IOSGuideModalProps> = ({ onClose, labels, isRtl }) => {
  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-left"
        style={{ direction: isRtl ? 'rtl' : 'ltr', textAlign: isRtl ? 'right' : 'left' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {labels.iosTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ol className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">
              1
            </span>
            <div className="flex-1">
              <span>{labels.iosStep1}</span>
              <Share className="w-4 h-4 inline-block mx-1.5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </li>
          <li className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">
              2
            </span>
            <div className="flex-1">
              <span>{labels.iosStep2}</span>
            </div>
          </li>
          <li className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">
              3
            </span>
            <div className="flex-1">
              <span>{labels.iosStep3}</span>
            </div>
          </li>
        </ol>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-sm"
        >
          {labels.close}
        </button>
      </div>
    </div>
  );
};
