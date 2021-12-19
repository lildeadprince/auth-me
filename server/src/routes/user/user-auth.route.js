import { Router } from 'express';
import Debug from 'debug';
import { loginUser, registerUser } from './user.controller.js';
import { findIdentity } from '../../service/user/user.js';

const debug = Debug('route:user-auth');

export const userAuthRoute = new Router();

userAuthRoute.post('/logout', handleLogout);

userAuthRoute.use(authValidationGuard);
userAuthRoute.post('/register', handleRegister);
userAuthRoute.post('/login', handleLogin);

function authValidationGuard(req, res, next) {
  // todo npm i -S joi
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

function handleLogout(req, res) {
  req.session.destroy(err => {
    if (!err) {
      res.status(304).send('/');
    } else {
      debug('Failed to remove user session', err);
      console.error(err);
      res.send(400);
    }
  });
}

function populateSession(req, res, user) {
  // add JWT maybe? or not..
  req.session.user = user;
}
