import { FC, useCallback } from 'react';
import { useSessionControl } from '~/app/context';
import { Button } from '~/some-ui-kit';

import css from './logout-button.module.css';

export const LogoutButton: FC = () => {
  const { setSession } = useSessionControl();

  const performLocalLogout = useCallback(() => setSession({ user: undefined }), []);
  return (
    <Button className={css.themePicker} onClick={performLocalLogout}>
      Log Out
    </Button>
  );
};
