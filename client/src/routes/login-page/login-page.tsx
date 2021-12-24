import { FC } from 'react';
import { LoginForm } from '~/components/login-form';
import css from './login-page.module.css';

export const LoginPage: FC = () => {
  return (
    <div className={css.loginPage}>
      <LoginForm />
    </div>
  );
};
