import React, { FC, memo } from 'react';
import { useAppTheme } from '~/app/context';
import css from './theme-picker.module.css';

export const ThemePicker: FC = memo(() => {
  const { theme, setTheme } = useAppTheme();
  return (
    <select
      className={css.themePicker}
      name="themeSwitcher"
      id="themeSwitcher"
      defaultValue={theme}
      onChange={event => setTheme(event.target.value)}
    >
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
});
