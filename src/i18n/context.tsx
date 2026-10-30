"use client";

import React, { createContext, useCallback, useContext, useSyncExternalStore } from "react";
import { Dictionary, Locale } from "./types";
import { ptDictionary } from "./dictionaries/pt";
import { enDictionary } from "./dictionaries/en";

export const LOCALE_STORAGE_KEY = "preferred_locale";
export const DEFAULT_LOCALE: Locale = "pt_BR";

interface LanguageContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLanguage: () => void;
}

const dictionaries: Record<Locale, Dictionary> = {
  pt_BR: ptDictionary,
  en_US: enDictionary,
};

export function isValidLocale(value: unknown): value is Locale {
  return value === "pt_BR" || value === "en_US";
}

const listeners = new Set<() => void>();

function emitLocaleChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribeLocale(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY || event.key === null) {
      listener();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isValidLocale(stored) ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const activeLocale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const setLocale = useCallback((newLocale: Locale) => {
    const validated: Locale = isValidLocale(newLocale) ? newLocale : DEFAULT_LOCALE;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, validated);
      } catch {
        // Ignore storage write errors in restricted environments
      }
    }
    emitLocaleChange();
  }, []);

  const toggleLanguage = useCallback(() => {
    const current = getLocaleSnapshot();
    const next: Locale = current === "pt_BR" ? "en_US" : "pt_BR";
    setLocale(next);
  }, [setLocale]);

  const t = dictionaries[activeLocale];

  return (
    <LanguageContext.Provider value={{ locale: activeLocale, t, setLocale, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
