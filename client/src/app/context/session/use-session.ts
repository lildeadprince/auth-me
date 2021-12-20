import { Dispatch, SetStateAction, useState } from 'react';
import { UseCtxWithControlValue } from '../../../utils';

type User = {
  username: string;
};
type Session = {
  user: User | undefined;
};

type SessionContext = {
  session: Session;
  setSession: Dispatch<SetStateAction<Session>>;
};

type SessionControlContext = SessionContext['setSession'];

export const useSessionValue: UseCtxWithControlValue<SessionContext, SessionControlContext> = () => {
  const [session, setSession] = useState<Session>({ user: undefined });

  return [{ session, setSession }, setSession];
};
