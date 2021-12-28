import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '~/app/context';

export const useRedirectOnPresentSession = (session: Session) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (session.user) {
      navigate('/user');
    }
  }, [session]);
};
