import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DeferredBackground } from '~/app/components/deferred-background/deferred-background-image';
import { AppThemeProvider, SessionProvider } from './context';

export const AppWrapper: React.FC = ({ children }) => (
  <AppThemeProvider
    rootElement={document.documentElement}
    darkSelector={'is-dark'}
    lightSelector={'is-light'}
    useBgImageSelector={'use-bg'}
  >
    <DeferredBackground>
      <SessionProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </SessionProvider>
    </DeferredBackground>
  </AppThemeProvider>
);
