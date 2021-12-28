import { FC } from 'react';
import { useLocalLogout, useSessionValidationOnce } from './hooks';

export const AuthorisedRoute: FC = ({ children }) => {
  useSessionValidationOnce();
  useLocalLogout();

  return <>{children}</>;
};
