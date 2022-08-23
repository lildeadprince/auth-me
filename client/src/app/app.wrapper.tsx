import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DeferredBackground } from '~/app/components/deferred-background/deferred-background-image';
import { AppThemeProvider, SessionProvider } from './context';

export const AppWrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <AppThemeProvider rootElement={document.documentElement} darkSelector={'is-dark'} lightSelector={'is-light'}>
    <DeferredBackground>
      <SessionProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </SessionProvider>
    </DeferredBackground>
  </AppThemeProvider>
);
