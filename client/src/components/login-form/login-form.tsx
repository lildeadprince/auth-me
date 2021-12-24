import classNames from 'classnames/bind';
import { FC } from 'react';
import { Button } from '~/components/button';
import { Input } from '~/components/input';
import css from './login-form.module.css';

const cx = classNames.bind(css);

export const LoginForm: FC = () => {
  return (
    <main className={css.login}>
      <form className={css.login__form}>
        <div className={css.login__form__row}>
          <Input className={cx(css.login__form__input)} name="username" required type="email" placeholder="Email" />
          <Input
            className={cx(css.login__form__input)}
            type="password"
            name="password"
            required
            placeholder="Password"
          />
        </div>

        <div className={css.login__form__row}>
          <Button
            type="submit"
            name="login"
            className={cx(css.login__form__row, css.login__form__button, css.login__form__button_login)}
          >
            Login
          </Button>
          <Button
            type="submit"
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
