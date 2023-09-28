import type { AppProps } from 'next/app'
import { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { EntriesProvider, UIProvider } from '@/context';
import { ThemeContext, darkTheme, lightTheme } from '@/themes';
import '@/styles/globals.css'
import 'animate.css';




export default function App({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <SnackbarProvider maxSnack={ 3 }>
      <EntriesProvider>
        <UIProvider>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={ theme }>
              <CssBaseline enableColorScheme />
              <Component {...pageProps} />
            </ThemeProvider>
          </ThemeContext.Provider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}