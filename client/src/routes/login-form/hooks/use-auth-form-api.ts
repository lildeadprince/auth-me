import { Dispatch, useCallback, useEffect, useState } from 'react';
import { Session } from '~/app/context';
import { doFetch } from '~/utils/do-fetch';

export type ActionType = 'register' | 'login';
export type ActionBody = {
  email: string;
  password: string;
};

export function useAuthFormApi(onLoggedIn: Dispatch<Session>, onRegistered: Dispatch<Session>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const [request, setRequest] = useState<{ action: ActionType; body: ActionBody }>();

  useEffect(() => {
    let isNotCancelled = true;

    if (request) {
      setError(undefined);
      setIsLoading(true);

      switch (request.action) {
        case 'register':
          doFetch('/user/auth/register', request.body, 'post')
            .finally(() => isNotCancelled && setIsLoading(false))
            .then(response => isNotCancelled && response.json())
            .then(onRegistered)
            .catch((error: Response) => {
              if (isNotCancelled) {
                if (error?.status === 409) {
                  setError('User with specified email already exists');
                } else {
                  setError('Server failed to handle your request.\nPlease try again later');
                }
              }
            });
          break;
        case 'login':
          doFetch('/user/auth/login', request.body, 'post')
            .finally(() => isNotCancelled && setIsLoading(false))
            .then(response => isNotCancelled && response.json())
            .then(onLoggedIn)
            .catch((error: Response) => {
              if (isNotCancelled) {
                if (error?.status < 500) {
                  setError('Email and/or password is not correct');
                } else {
                  setError('Server failed to handle your request.\nPlease try again later');
                }
              }
            });

          break;
        default: {
          const unknownAction: never = request.action;
          throw new Error(`Unknown action: ${String(unknownAction)}`);
        }
      }

      setIsLoading(true);
    }

    return () => {
      isNotCancelled = false;
    };
  }, [request]);

  const dispatch = useCallback((action: ActionType, body: ActionBody) => {
    setRequest({ action, body });
  }, []);

  return [isLoading, error, dispatch] as const;
}
