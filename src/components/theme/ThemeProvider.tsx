"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "25th-staffing-theme";
const THEME_CHANGE_EVENT = "25th-staffing-theme-change";

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function isTheme(value: string | undefined | null): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function getDocumentTheme() {
  return document.documentElement.dataset.theme;
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const documentTheme = getDocumentTheme();

  if (isTheme(documentTheme)) {
    return documentTheme;
  }

  const storedTheme = getStoredTheme();

  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function saveTheme(theme: Theme) {
  window.localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

function subscribeToThemeChange(callback: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleThemeChange = () => {
    callback();
  };

  const handleStorageChange = () => {
    const storedTheme = getStoredTheme();
    const nextTheme = isTheme(storedTheme) ? storedTheme : getSystemTheme();

    applyTheme(nextTheme);
    callback();
  };

  const handleSystemChange = () => {
    if (isTheme(getStoredTheme())) {
      return;
    }

    applyTheme(getSystemTheme());
    callback();
  };

  window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
  window.addEventListener("storage", handleStorageChange);
  mediaQuery.addEventListener("change", handleSystemChange);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.removeEventListener("storage", handleStorageChange);
    mediaQuery.removeEventListener("change", handleSystemChange);
  };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(
    subscribeToThemeChange,
    getThemeSnapshot,
    () => "light",
  );

  const setTheme = useCallback((nextTheme: Theme) => {
    saveTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
