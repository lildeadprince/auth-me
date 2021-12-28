import classNames from 'classnames/bind';
import { ChangeEventHandler, FC, KeyboardEventHandler, useCallback, useMemo, useReducer } from 'react';
import { useSession } from '~/app/context';
import { Button, Input, PaneWithExtra, Spinner } from '~/some-ui-kit';
import { useDebouncedState, useUserDataUpdater } from './hooks';
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
