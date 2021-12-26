import classNames from 'classnames/bind';
import { ChangeEventHandler, FC, useCallback, useRef } from 'react';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import css from './login-form.module.css';

const cx = classNames.bind(css);

/* FormData does not allow null values (i.e. <button name='submitName'/> -> {submitName:null}) and I'm just too lazy
 r.n. to implement completely native submission  */
export const LoginFormLayout: FC = () => {
  // just simpler than useState + handle-callbacks re-creating on each render/update
  const username = useRef('');
  const password = useRef('');

  const updateUsername: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => (username.current = e.target.value),
    [],
  );
  const updatePassword: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => (password.current = e.target.value),
    [],
  );

  const handleSubmitLogin = useCallback(() => {
    fetch('https://auth-me-api.alpenditrix.com/user/auth/login', {
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      method: 'post',
      body: JSON.stringify({ username: username.current, password: password.current }),
    })
      .then(response => response.json())
      .then(
        r => console.warn('success', r),
        e => console.error('fail', e),
      );
  }, [username]);

  const handleSubmitRegistration = useCallback(() => {
    fetch('https://auth-me-api.alpenditrix.com/user/auth/login', {
      headers: {
        'content-type': 'application/json',
      },
      mode: 'cors',
      method: 'post',
      body: JSON.stringify({ username: username.current, password: password.current }),
    })
      .then(response => response.json())
      .then(
        r => console.warn('success', r),
        e => console.error('fail', e),
      );
  }, [password]);

  return (
    <main className={css.login}>
      <form className={css.login__form}>
        <div className={cx(css.login__form__row, css.login__form__content)}>
          <Input
            className={cx(css.login__form__content__input)}
            name="username"
            required
            // type="email"
            placeholder="Email"
            onChange={updateUsername}
          />
          <Input
            className={cx(css.login__form__content__input)}
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={updatePassword}
          />
        </div>

        <div className={css.login__form__row}>
          <Button
            onClick={handleSubmitLogin}
            type="button"
            name="login"
            className={cx(css.login__form__row, css.login__form__button, css.login__form__button_login)}
          >
            Login
          </Button>
          <Button
            onClick={handleSubmitRegistration}
            type="button"
            name="register"
            className={cx(css.login__form__row, css.login__form__button, css.login__form__button_register)}
          >
            Register
          </Button>
        </div>
      </form>
    </main>
  );
};
