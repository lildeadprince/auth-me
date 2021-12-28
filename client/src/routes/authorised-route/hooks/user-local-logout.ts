import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '~/app/context';

export function useLocalLogout() {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.user) {
      // if not locally stored user or if user deleted (aka local log-out)
      navigate('/login');
    }
  }, [session.user?.email]);
}
