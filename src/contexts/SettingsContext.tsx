"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'beige' | 'dark';
const FONT_SIZES = ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'];
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
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme && ['light', 'beige', 'dark'].includes(storedTheme)) {
      setThemeState(storedTheme);
    }
    const storedFontSizeIndex = localStorage.getItem('fontSizeIndex');
    if (storedFontSizeIndex) {
      const index = parseInt(storedFontSizeIndex, 10);
      if(index >= 0 && index < FONT_SIZES.length) {
        setFontSizeIndex(index);
      }
    }
  }, []);

  useEffect(() => {
    if(isMounted) {
      document.body.classList.remove('theme-beige', 'dark');
      if (theme === 'beige') {
        document.body.classList.add('theme-beige');
      } else if (theme === 'dark') {
        document.body.classList.add('dark');
      }
      localStorage.setItem('theme', theme);
    }
  }, [theme, isMounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const increaseFontSize = useCallback(() => {
    setFontSizeIndex(prevIndex => {
      const newIndex = Math.min(FONT_SIZES.length - 1, prevIndex + 1);
      localStorage.setItem('fontSizeIndex', newIndex.toString());
      return newIndex;
    });
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSizeIndex(prevIndex => {
      const newIndex = Math.max(0, prevIndex - 1);
      localStorage.setItem('fontSizeIndex', newIndex.toString());
      return newIndex;
    });
  }, []);

  const value = {
    theme,
    setTheme,
    fontSize: FONT_SIZES[fontSizeIndex],
    increaseFontSize,
    decreaseFontSize,
  };

  if (!isMounted) {
    return null;
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
