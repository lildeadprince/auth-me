import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '~/routes';
import css from './app.module.css';
import { useAppTheme } from './context';

export const AppLayout: React.FC = function () {
  const { theme, setTheme } = useAppTheme();
  return (
    <div className={css.app}>
      {/* Some header maybe */}
      {/*<nav></nav>*/}
      <select
        style={{ position: 'absolute', top: 20, left: 20 }}
        name="themeSwitcher"
        id="themeSwitcher"
        defaultValue={theme}
        onChange={event => setTheme(event.target.value)}
      >
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <Routes>
        {/*<Route path="/about">/!* <About /> *!/</Route>*/}
        {/*<Route path="/users">/!* <Users /> *!/</Route>*/}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
};
