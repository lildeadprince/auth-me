import { FC, PropsWithChildren } from 'react';
import { useLocalLogout, useSessionValidationOnce } from './hooks';

export const AuthorisedRoute: FC<PropsWithChildren> = ({ children }) => {
  useSessionValidationOnce();
  useLocalLogout();

  return <>{children}</>;
};
