import classNames from 'classnames/bind';
import { FC, FormEventHandler, KeyboardEventHandler, useCallback, useEffect, useReducer, useState } from 'react';
import { BlockingOverlay, Button, Input, PaneWithExtra } from '~/some-ui-kit';
import css from './login-form.module.css';

const cx = classNames.bind(css);

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
  error: string | null | undefined;
};
export const LoginFormLayout: FC<Props> = ({ onSubmit, isLoading, error }) => {
  const [formTouched, touch] = useReducer(() => true, false);
  const touchOnEnter = useCallback<KeyboardEventHandler<HTMLInputElement>>(e => {
    if (e.key === 'Enter') {
      touch();
    }
  }, []);

  return (
    <main className={css.login}>
      <PaneWithExtra extra={error}>
        <form
          className={cx({
            [css.login__form]: true,
            [css.login__form_touched]: formTouched,
          })}
          onSubmit={onSubmit}
        >
          <div className={cx(css.login__form__row, css.login__form__content)}>
            <Input
              className={cx(css.login__form__input)}
              type="email"
              name="email"
              aria-label="Email"
              placeholder="Email"
              required
              onKeyDown={touchOnEnter}
            />
            <Input
              className={cx(css.login__form__input)}
              type="password"
              name="password"
              aria-label="Password"
              placeholder="Password"
              required
              onKeyDown={touchOnEnter}
            />
          </div>

          <div className={css.login__form__row}>
            <Button
              aria-label="Log In"
              type="submit"
              name="action"
              value="login"
              className={cx(css.login__form__row, css.login__form__button, css.login__form__button_login)}
              onClick={touch}
            >
              Login
            </Button>
            <Button
              aria-label="Sign Up"
              type="submit"
              name="action"
              value="register"
              className={cx(css.login__form__row, css.login__form__button, css.login__form__button_register)}
              onClick={touch}
            >
              Sign Up
            </Button>
          </div>
        </form>
        <BlockingOverlay show={isLoading} />
      </PaneWithExtra>
    </main>
  );
};
