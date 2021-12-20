import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './context';

export const AppWrapper: React.FC = ({ children }) => (
  <SessionProvider>
    <BrowserRouter>{children}</BrowserRouter>
  </SessionProvider>
);
