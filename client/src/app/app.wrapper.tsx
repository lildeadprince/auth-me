import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppThemeProvider, SessionProvider } from './context';

export const AppWrapper: React.FC = ({ children }) => (
  // todo allow default args
  <AppThemeProvider rootElement={document.documentElement} darkSelector={'is-dark'} lightSelector={'is-light'}>
    <SessionProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </SessionProvider>
  </AppThemeProvider>
);
