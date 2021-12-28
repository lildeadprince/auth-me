import classNames from 'classnames/bind';
import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useSession, useSessionControl } from '~/app/context';
import { Spinner } from '~/some-ui-kit';
import { Button } from '~/some-ui-kit/button';
import { Input } from '~/some-ui-kit/input';
import { PaneWithExtra } from '~/some-ui-kit/pane-with-extra';
import { doFetch } from '~/utils/hooks/use-fetch';
import css from './user-info.module.css';

const cx = classNames.bind(css);

export const UserInfo: FC = () => {
  const { session } = useSession();
  const userCustomData = useMemo(() => session.user?.customData || '', [session.user]);

  // don't submit effects until user changes data
  const [isTouched, setTouched] = useReducer(() => true, false);

  const [userData, setUserData, forceUserDataSave, presentationalValue] = useDebouncedState(
    400,
    isTouched,
    userCustomData,
  );
  const { successTimestamp, error, isUpdateInProgress, forceRemoteUpdate } = useUserDataUpdater(userData, isTouched);

  const handleInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => {
      setUserData(e.target.value);
      setTouched();
    },
    [setUserData],
  );
  const handleInputKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    e => e.key === 'Enter' && forceUserDataSave(),
    [forceUserDataSave],
  );

  const ErrorBlock = useMemo(
    () =>
      error ? (
        <>
          Update failed, <Button onClick={forceRemoteUpdate}>try again</Button> later
        </>
      ) : null,
    [error, forceRemoteUpdate],
  );

  return (
    <>
      <PaneWithExtra extra={ErrorBlock}>
        <main className={css.userInfo}>
          <article className={css.userInfo__content}>
            <div className={css.userInfo__valueRow}>
              <div className={css.userInfo__valueRow__title}>User email:</div>
              <div className={css.userInfo__valueRow__value}>{session.user?.email}</div>
            </div>
          </article>
          <article className={css.userInfo__content}>
            <div className={css.userInfo__valueRow}>
              <div className={css.userInfo__valueRow}>Optional user data:</div>
              <div className={css.userInfo__textFieldContainer}>
                {isUpdateInProgress && (
                  <div className={css.userInfo__textFieldContainer__floatingSpinner}>
                    <Spinner size={15} invert={true} />
                  </div>
                )}
                <Input
                  className={css.userInfo__textFieldContainer__textField}
                  aria-label="User Data"
                  placeholder="Put something in here"
                  onChange={handleInputChange}
                  value={presentationalValue}
                  onKeyDown={handleInputKeyDown}
                  onBlur={forceUserDataSave}
                />
              </div>
            </div>
            <div className={css.userInfo__valueRow}>
              <div>&nbsp;</div>
              <div key={successTimestamp} className={css.userInfo__valueRow__blinker}>
                {successTimestamp ? <i>- Saved -</i> : null}
              </div>
            </div>
          </article>
        </main>
      </PaneWithExtra>
    </>
  );
};

function useDebouncedState<T>(debounceTimeMs: number, isTouched: boolean, storedSessionValue: T) {
  const timeout = useRef<number>();
  const [lastValue, setLastValue] = useState(storedSessionValue);
  const [committedValue, setCommittedValue] = useState(storedSessionValue);

  useEffect(() => {
    // when session value was updated
    if (!timeout.current) {
      // and there's not pending debounced changes in queue
      // then forcibly update state
      // use case: Update customData -> stored in DB, stored in server session -> REFRESH -> loading old value from
      // localStorage -> GET /user -> synchronize local session -> FORCIBLY UPDATE THE INPUT
      setLastValue(storedSessionValue);
      setCommittedValue(storedSessionValue);
    }
  }, [storedSessionValue]);

  useEffect(() => {
    if (isTouched) {
      timeout.current = window.setTimeout(() => {
        setCommittedValue(lastValue);
        timeout.current = undefined;
      }, debounceTimeMs);
    } // else no queueing until actually touched

    return () => clearTimeout(timeout.current);
  }, [lastValue, debounceTimeMs]);

  const forceCommit = useCallback(() => {
    clearTimeout(timeout.current);
    setCommittedValue(lastValue);
  }, [lastValue]);

  return [committedValue, setLastValue, forceCommit, lastValue] as const;
}

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
