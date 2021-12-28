import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthorisedRoute, LoginForm, UserInfo } from '~/routes';
import css from './app.module.css';
import { LogoutButton, ThemePicker } from './components';

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
