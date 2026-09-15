import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, ToolCategory, EducationSubCategory, ActivePage, ToastMessage } from '../types';
import { TRANSLATIONS, TranslationDict } from '../i18n/translations';
import { TOOLS_LIST } from '../data/toolsData';
import { ToolRegistry, ToolRegistryService } from '../services/toolRegistry';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: TranslationDict;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activePage: ActivePage;
  navigateTo: (page: ActivePage) => void;
  navigateToTool: (toolId: string) => void;
  activeCategory: ToolCategory;
  setActiveCategory: (cat: ToolCategory) => void;
  activeEducationSubCategory: EducationSubCategory;
  setActiveEducationSubCategory: (sub: EducationSubCategory) => void;
  toolRegistry: ToolRegistryService;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  favorites: string[];
  toggleFavorite: (toolId: string) => void;
  isFavorite: (toolId: string) => boolean;
  recentTools: string[];
  setRecentTools: React.Dispatch<React.SetStateAction<string[]>>;
  clearRecentTools: () => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language state & RTL
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('devpulse_lang');
      if (saved && ['en', 'es', 'fr', 'ar', 'de'].includes(saved)) {
        return saved as Language;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const isRtl = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('devpulse_lang', lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    if (isRtl) {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [language, isRtl]);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  // 2. Dark/Light Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('devpulse_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch {
      // ignore
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      document.body.classList.remove('dark');
    }
    try {
      localStorage.setItem('devpulse_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. Routing state
  const parseUrlToPage = useCallback((): ActivePage => {
    try {
      // 3.1 Pathname routing (e.g. /tools/real-estate-calculator, /real-estate, /tools, /about)
      const pathname = window.location.pathname.replace(/\/+$/, '');
      if (pathname === '/real-estate') return { type: 'real-estate' };
      if (pathname === '/tools') return { type: 'tools' };
      if (pathname === '/about') return { type: 'about' };
      if (pathname === '/privacy') return { type: 'privacy' };
      if (pathname === '/terms') return { type: 'terms' };
      if (pathname === '/contact') return { type: 'contact' };
      if (pathname.startsWith('/tools/')) {
        const toolSlug = pathname.replace('/tools/', '');
        const found = TOOLS_LIST.find(t => t.id === toolSlug || t.slug === toolSlug);
        if (found) {
          return { type: 'tool', toolId: found.id };
        }
      }

      // 3.2 Query param routing (e.g. ?tool=real-estate-calculator, ?page=real-estate)
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool');
      if (toolParam && TOOLS_LIST.some(t => t.id === toolParam || t.slug === toolParam)) {
        const found = TOOLS_LIST.find(t => t.id === toolParam || t.slug === toolParam);
        return { type: 'tool', toolId: found ? found.id : toolParam };
      }
      const pageParam = params.get('page');
      if (pageParam === 'real-estate') return { type: 'real-estate' };
      if (pageParam === 'tools') return { type: 'tools' };
      if (pageParam === 'about') return { type: 'about' };
      if (pageParam === 'privacy') return { type: 'privacy' };
      if (pageParam === 'terms') return { type: 'terms' };
      if (pageParam === 'contact') return { type: 'contact' };

      // 3.3 Hash fallback e.g. #/tools/json-formatter
      const hash = window.location.hash;
      if (hash.startsWith('#/tools/')) {
        const id = hash.replace('#/tools/', '');
        if (TOOLS_LIST.some(t => t.id === id)) {
          return { type: 'tool', toolId: id };
        }
      }
    } catch {
      // ignore
    }
    return { type: 'home' };
  }, []);

  const [activePage, setActivePageState] = useState<ActivePage>(parseUrlToPage);

  // Sync back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActivePageState(parseUrlToPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [parseUrlToPage]);

  // Navigate function
  const navigateTo = useCallback((page: ActivePage) => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let newUrl = window.location.pathname;
    if (page.type === 'home') {
      newUrl = window.location.pathname;
    } else if (page.type === 'tool') {
      newUrl = `?tool=${page.toolId}`;
    } else {
      newUrl = `?page=${page.type}`;
    }
    try {
      window.history.pushState(null, '', newUrl);
    } catch {
      // ignore
    }
  }, []);

  // 4. Favorites & Recents
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devpulse_favorites');
      return saved ? JSON.parse(saved) : ['json-formatter', 'base64-encoder-decoder', 'qr-code-generator'];
    } catch {
      return ['json-formatter', 'base64-encoder-decoder', 'qr-code-generator'];
    }
  });

  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('devpulse_recents');
      return saved ? JSON.parse(saved) : ['json-formatter', 'qr-code-generator', 'image-compressor'];
    } catch {
      return ['json-formatter', 'qr-code-generator', 'image-compressor'];
    }
  });


  const toggleFavorite = (toolId: string) => {
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem('devpulse_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  const navigateToTool = useCallback((toolId: string) => {
    navigateTo({ type: 'tool', toolId });
    setRecentTools(prev => {
      const next = [toolId, ...prev.filter(id => id !== toolId)].slice(0, 8);
      try {
        localStorage.setItem('devpulse_recents', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [navigateTo]);

  const clearRecentTools = useCallback(() => {
    setRecentTools([]);
    try {
      localStorage.removeItem('devpulse_recents');
    } catch {
      // ignore
    }
  }, []);

  // 5. Search & Filters
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [activeEducationSubCategory, setActiveEducationSubCategory] = useState<EducationSubCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 6. Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((title: string, description?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev.slice(-3), { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  }, [removeToast]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isRtl,
        t,
        theme,
        toggleTheme,
        activePage,
        navigateTo,
        navigateToTool,
        activeCategory,
        setActiveCategory,
        activeEducationSubCategory,
        setActiveEducationSubCategory,
        toolRegistry: ToolRegistry,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        favorites,
        toggleFavorite,
        isFavorite,
        recentTools,
        setRecentTools,
        clearRecentTools,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
