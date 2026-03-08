import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Locale, translations, TranslationKey } from './translations';

interface I18nContext {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nCtx = createContext<I18nContext | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem('lt-locale') as Locale;
    if (stored && ['en', 'fr', 'es'].includes(stored)) return stored;
    const browser = navigator.language.slice(0, 2);
    if (browser === 'fr') return 'fr';
    if (browser === 'es') return 'es';
    return 'en';
  });

  const handleSetLocale = useCallback((l: Locale) => {
    setLocale(l);
    localStorage.setItem('lt-locale', l);
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[locale] || entry.en || key;
  }, [locale]);

  return (
    <I18nCtx.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
