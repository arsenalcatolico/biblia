"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark';
const FONT_SIZES = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl'];
const FONT_SIZE_DEFAULT_INDEX = 1;

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [fontSizeIndex, setFontSizeIndex] = useState(FONT_SIZE_DEFAULT_INDEX);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme && ['light', 'dark'].includes(storedTheme)) {
        setThemeState(storedTheme);
      }
      
      const storedFontSizeIndex = localStorage.getItem('fontSizeIndex');
      if (storedFontSizeIndex) {
        const index = parseInt(storedFontSizeIndex, 10);
        if(!isNaN(index) && index >= 0 && index < FONT_SIZES.length) {
          setFontSizeIndex(index);
        }
      }
    } catch (error) {
      console.error("Failed to access localStorage", error);
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (isMounted) {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(newTheme);
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error("Failed to save theme to localStorage", error);
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);
    }
  }, [theme, isMounted]);

  useEffect(() => {
    if (isMounted) {
       try {
        localStorage.setItem('fontSizeIndex', fontSizeIndex.toString());
      } catch (error) {
        console.error("Failed to save fontSizeIndex to localStorage", error);
      }
    }
  }, [fontSizeIndex, isMounted]);

  const increaseFontSize = useCallback(() => {
    setFontSizeIndex(prevIndex => Math.min(prevIndex + 1, FONT_SIZES.length - 1));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeIndex(prevIndex => Math.max(0, prevIndex - 1));
  }, []);

  if (!isMounted) {
    // Render nothing or a placeholder on the server to avoid hydration mismatch
    return null;
  }

  const value = {
    theme,
    setTheme,
    fontSize: FONT_SIZES[fontSizeIndex],
    increaseFontSize,
    decreaseFontSize,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
