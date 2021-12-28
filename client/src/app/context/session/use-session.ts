import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { UseCtxWithControlValue } from '~/utils';
import { useLocalPersistence, useStateFromLocal } from '~/utils/hooks';

export type User = {
  email: string;
  customData?: string;
};
export type Session = {
  user: User | undefined;
};

type SessionContext = {
  session: Session;
  isLoading: boolean;
  setSession: Dispatch<SetStateAction<Session>>;
  setIsLoading: Dispatch<boolean>;
};

type SessionControlContext = Pick<SessionContext, 'setSession' | 'setIsLoading'>;

export const useSessionValue: UseCtxWithControlValue<SessionContext, SessionControlContext> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useStateFromLocal<Session>('sessionLocalCache', JSON.parse, { user: undefined });
  useLocalPersistence('sessionLocalCache', session);

  // session cached so that if user returns to the page, it still can work fine without interruption
  // auth route will check authority and will redirect to login or update local value if it has changed (from other
  // browser, etc.)

  const control = useMemo(() => ({ setSession, setIsLoading }), []);

  return [{ session, isLoading, setSession, setIsLoading }, control];
};
