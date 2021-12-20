import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './app.css';

const App: React.FC = function () {
  return (
    <BrowserRouter>
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

        <Routes>
          <Route path="/about">{/* <About /> */}</Route>
          <Route path="/users">{/* <Users /> */}</Route>
          <Route path="/">{/* <Home /> */}</Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
