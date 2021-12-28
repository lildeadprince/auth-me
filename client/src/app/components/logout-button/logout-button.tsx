import { FC, useCallback } from 'react';
import { useSessionControl } from '~/app/context';
import { Button } from '~/some-ui-kit';
import { doFetch } from '~/utils';

import css from './logout-button.module.css';

export const LogoutButton: FC = () => {
  const { setSession } = useSessionControl();

  const performLogout = useCallback(() => {
    // local
    setSession({ user: undefined });
    // delete remove session if MITM stole the cookie
    void doFetch('/user/auth/logout', {}, 'post');
  }, []);

  // start preloading next anticipated route
  const startPreloadingLoginForm = useCallback(() => import('~/routes/login-form'), []);

  return (
    <Button className={css.themePicker} onClick={performLogout} onMouseOver={startPreloadingLoginForm}>
      Log Out
    </Button>
  );
};
