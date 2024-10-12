import React from 'react';

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
    inputfontcolor: "#333333",
    inputbackgroundcolor: "#F0F0F0",
    mainfontcolor: "#1A1A1A",
    mainbackgroundcolor: "#FFFFFF",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
    inputfontcolor: "#4A4A4A",
    inputbackgroundcolor: "#4A4A4A",
    mainfontcolor: "#E0E0E0",
    mainbackgroundcolor: "#2C2C2C",
  },
};

export const ThemeContext = React.createContext(themes.light);
