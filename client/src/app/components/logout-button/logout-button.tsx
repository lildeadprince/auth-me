import { FC, useCallback } from 'react';
import { useSessionControl } from '~/app/context';
import { Button } from '~/some-ui-kit';

import css from './logout-button.module.css';

export const LogoutButton: FC = () => {
  const { setSession } = useSessionControl();

  const performLocalLogout = useCallback(() => setSession({ user: undefined }), []);

  // start preloading next anticipated route
  const startPreloadingLoginForm = useCallback(() => import('~/routes/login-form'), []);

  return (
    <Button className={css.themePicker} onClick={performLocalLogout} onMouseOver={startPreloadingLoginForm}>
      Log Out
    </Button>
  );
};
