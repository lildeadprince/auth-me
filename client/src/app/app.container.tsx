import { FC } from 'react';
import AppLayout from './app';
import { AppWrapper } from './app.wrapper';

export const AppContainer: FC = () => (
  <AppWrapper>
    <AppLayout />
  </AppWrapper>
);
