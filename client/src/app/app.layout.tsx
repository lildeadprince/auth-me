import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LogoutButton } from '~/app/components/logount-button/logout-button';
import { ThemePicker } from '~/app/components/theme-picker';
import { AuthorisedRoute } from '~/routes';
import { LoginForm } from '~/routes/login-form';
import { UserInfo } from '~/routes/user-info';
import css from './app.module.css';

export const AppLayout: FC = memo(() => (
  // should've maybe had some "App Bar thing for theme picker and log-out button", but that wouldn't change much

  <div className={css.app}>
    <ThemePicker />

    <main className={css.app__page}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/user"
          element={
            <AuthorisedRoute>
              <LogoutButton />
              <UserInfo />
            </AuthorisedRoute>
          }
        />
      </Routes>
    </main>
  </div>
));
