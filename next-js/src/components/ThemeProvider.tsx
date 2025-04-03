'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeContextType = {
  isDarkTheme: boolean;
  setDarkTheme: (isDark: boolean) => void;
};

const defaultContext: ThemeContextType = {
  isDarkTheme: false,
  setDarkTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const setDarkTheme = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 