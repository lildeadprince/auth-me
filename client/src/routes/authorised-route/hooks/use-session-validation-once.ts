import { useEffect } from 'react';
import { User, useSessionControl } from '~/app/context';
import { doFetch } from '~/utils';

export function useSessionValidationOnce() {
  const { setSession, setIsLoading } = useSessionControl();

  useEffect(() => {
    setIsLoading(true);
    doFetch('/user')
      .finally(() => setIsLoading(false))
      .then(response => response.json())
      .then((user: User) => {
        setSession(prevState => ({
          ...prevState,
          user,
        }));
      })
      .catch((error: Response) => {
        if (error?.status === 401) {
          // perform local logout
          setSession({ user: undefined });
          // navigate('/login');
        } else {
          // if server is down, then error messages will be handled in other app areas
          // don't want to implement specific error handling for non-401-failed session requests
          console.error(error);
        }
      });
  }, []);
}
