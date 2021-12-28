import { useEffect, useReducer, useState } from 'react';
import { useSessionControl } from '~/app/context';
import { doFetch } from '~/utils';

export function useUserDataUpdater(userData: string, isTouched: boolean) {
  const { setSession } = useSessionControl();
  const [triggerUpdateFlag, forceRemoteUpdate] = useReducer(() => ({}), {});
  const [error, setError] = useState<string>();
  const [updatesSemaphore, setUpdatedSemaphore] = useState(0);

  const [successTimestamp, updateSuccessTimestamp] = useReducer(() => Date.now(), NaN);

  // Might've actually been some proper saga stuff, etc.
  // Would much simplify with states consistency
  useEffect(() => {
    if (isTouched) {
      // 1. Update localStorage to reduce components render latency on direct page refresh (eliminate sync between
      // "user from localStorage" and "user from immediate /user request")
      // Although, the sync is still necessary when thinking about multiple local-sessions (i.e. browsers, etc.)

      // But one another unresolved thing would be "lost connectivity" case, where local value is more up-to-date,
      // than persistent, and the local will be overwritten if page will be refreshed, when connection is restored
      // Solution is to track timestamps for the local and for the persistent data
      setSession(prevState => {
        if (prevState.user) {
          return {
            user: {
              ...prevState.user,
              customData: userData,
            },
          };
        } else {
          return prevState;
        }
      });

      // 2. Update persistent storage
      setUpdatedSemaphore(prev => prev + 1);
      doFetch('/user/data', { data: userData }, 'PUT' /* Remove value update is idempotent */)
        .finally(() => setUpdatedSemaphore(prev => prev - 1))
        .then(
          () => {
            updateSuccessTimestamp();
            // error is unset only on another successful commit, compared to usual "pristine on request"
            setError(undefined);
          },
          () => setError('Failed to perform an update'),
        );
    }
  }, [userData, triggerUpdateFlag]);

  return {
    successTimestamp,
    error,
    isUpdateInProgress: updatesSemaphore > 0,
    forceRemoteUpdate,
  };
}
