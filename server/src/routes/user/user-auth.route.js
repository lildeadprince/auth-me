import { Router } from 'express';
import { loginUser, registerUser } from './user.controller.js';
import { findIdentity } from '../../service/user/user.js';

export const userAuthRoute = new Router();

userAuthRoute.use(authValidationGuard);
userAuthRoute.post('/register', handleRegister);
userAuthRoute.post('/login', handleLogin);
userAuthRoute.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(304).send('/');
});

function authValidationGuard(req, res, next) {
  if (req.body.username && req.body.username) {
    next();
  } else {
    console.error('Bad username or password');
    res.status(400).send('Bad username or password');
  }
}

async function handleRegister(req, res, next) {
  try {
    if (!(await findIdentity(req.body.username))) {
      const user = await registerUser(req.body);
      if (user) {
        populateSession(req, res, user);
        res.sendStatus(201);
      } else {
        // user should've been returned if no exception were thrown
        res.sendStatus(500);
      }
    } else {
      res.status(409).send('Username is already used');
    }
  } catch (e) {
    next(e);
  }
}

async function handleLogin(req, res, next) {
  try {
    const user = await loginUser(req.body);

    if (user) {
      populateSession(req, res, user);
      res.status(200).send(`Hi, ${user.username}!`);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    next(e);
  }
}

function populateSession(req, res, user) {
  // add JWT maybe? or not..
  req.session.user = user;
}
