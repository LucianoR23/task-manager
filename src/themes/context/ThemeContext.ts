import { createContext, useContext } from 'react';
import { darkTheme } from '../darkTheme';


export const ThemeContext = createContext({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);