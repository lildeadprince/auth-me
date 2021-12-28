import { FC, lazy, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthorisedRoute } from '~/routes';
import { Spinner } from '~/some-ui-kit';
import css from './app.module.css';
import { LogoutButton, ThemePicker } from './components';

// Do not know initial app state, so lazy on both
const AsyncUserInfo = lazy(() =>
  import('~/routes/user-info').then(module => ({
    default: module.UserInfo,
  })),
);
const AsyncLoginForm = lazy(() =>
  import('~/routes/login-form').then(module => ({
    default: module.LoginForm,
  })),
);

export const AppLayout: FC = memo(() => (
  // should've maybe had some "App Bar thing for theme picker and log-out button", but that wouldn't change much

  <div className={css.app}>
    <ThemePicker />

    <main className={css.app__page}>
      <Suspense fallback={<Spinner size={60} invert={true} />}>
        <Routes>
          <Route path="/login" element={<AsyncLoginForm />} />
          <Route
            path="/user"
            element={
              <AuthorisedRoute>
                <LogoutButton />
                <AsyncUserInfo />
              </AuthorisedRoute>
            }
          />
        </Routes>
      </Suspense>
    </main>
  </div>
));
