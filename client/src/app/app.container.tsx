import { FC } from 'react';
import { AppLayout } from './app.layout';
import { AppWrapper } from './app.wrapper';

export const AppContainer: FC = () => (
  <AppWrapper>
    <AppLayout />
  </AppWrapper>
);
