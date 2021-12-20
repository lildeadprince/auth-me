import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './app.css';
import { useAppTheme } from './context';

const App: React.FC = function () {
  const { theme, setTheme } = useAppTheme();
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>
      <select
        name="themeSwitcher"
        id="themeSwitcher"
        defaultValue={theme}
        onChange={event => setTheme(event.target.value)}
      >
        <option value="auto">Auto</option>
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
      </select>

      <Routes>
        <Route path="/about">{/* <About /> */}</Route>
        <Route path="/users">{/* <Users /> */}</Route>
        <Route path="/">{/* <Home /> */}</Route>
      </Routes>
    </div>
  );
};

export default App;
